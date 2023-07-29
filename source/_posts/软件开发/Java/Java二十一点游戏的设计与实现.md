---
title: Java二十一点游戏的设计与实现
date: 2020-09-26 21:35:29
summary: 本文分享Java二十一点小游戏的设计与实现。
tags:
- Java
categories:
- 开发技术
---

# 游戏规则

推荐阅读：[二十一点](https://baike.baidu.com/item/21%E7%82%B9/5481683?fr=aladdin)

本文实现的游戏对原规则进行了一些改造。

本游戏规则：
- 扑克牌有四种花色：Spade黑桃、Heart红心、Diamond方片、Club方片。我们提供的正是一套不含大小王的52张牌的扑克牌组，不同花色的同数值扑克牌没有区别。
- 不设庄家，每个玩家的数值都是公开的，可供其他人决策参考。
- 游戏可以多人参与，系统会为每个玩家发一张初始牌，初始牌不会超出范围。
- 每轮中，没输掉的玩家都可以选择是否要牌，当所有玩家都不要牌或超出范围输掉时，会进入结算。
- 结算时，如果全超出范围，则都没赢；如果有玩家没超出范围，则比大小，点数大的玩家获胜。

本游戏的缺点：
- 机制存在一个比较大的问题：为了简化代码，本系统对不超过21点的同最高点数玩家简单的取了id最小的玩家作为winner，这是不公平的。
- 本游戏虽然支持多人游戏，但暂未直接提供公开接口供玩家选择玩家人数，只能硬编码。

# 程序设计

玩家内部类封装玩家游戏数据，只对外暴露抽牌、是否可继续两个接口。

外部扑克牌数据存在数组中，再转给List。为了实现扑克牌牌面与数值的映射，加了一个硬编码的HashMap。

尽量遵循面向对象的思想，不采用纯过程化的思想。

# 编程实现

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Scanner;


public class BlackJackGame {

    // Spade黑桃 Heart红心 Diamond方片 Club梅花
    private static final String[] CARDS = {
            "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "SJ", "SQ", "SK",
            "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "HJ", "HQ", "HK",
            "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "DJ", "DQ", "DK",
            "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "CJ", "CQ", "CK"};

    private static final Map<String, Integer> CARD_VALUE_MAP = new HashMap<>();

    private static Scanner INPUT = new Scanner(System.in);

    private static Random RANDOM_GENERATOR = new Random();

    static {
        CARD_VALUE_MAP.put("S1", 1);
        CARD_VALUE_MAP.put("S2", 2);
        CARD_VALUE_MAP.put("S3", 3);
        CARD_VALUE_MAP.put("S4", 4);
        CARD_VALUE_MAP.put("S5", 5);
        CARD_VALUE_MAP.put("S6", 6);
        CARD_VALUE_MAP.put("S7", 7);
        CARD_VALUE_MAP.put("S8", 8);
        CARD_VALUE_MAP.put("S9", 9);
        CARD_VALUE_MAP.put("S10", 10);
        CARD_VALUE_MAP.put("SJ", 11);
        CARD_VALUE_MAP.put("SQ", 12);
        CARD_VALUE_MAP.put("SK", 13);
        CARD_VALUE_MAP.put("H1", 1);
        CARD_VALUE_MAP.put("H2", 2);
        CARD_VALUE_MAP.put("H3", 3);
        CARD_VALUE_MAP.put("H4", 4);
        CARD_VALUE_MAP.put("H5", 5);
        CARD_VALUE_MAP.put("H6", 6);
        CARD_VALUE_MAP.put("H7", 7);
        CARD_VALUE_MAP.put("H8", 8);
        CARD_VALUE_MAP.put("H9", 9);
        CARD_VALUE_MAP.put("H10", 10);
        CARD_VALUE_MAP.put("HJ", 11);
        CARD_VALUE_MAP.put("HQ", 12);
        CARD_VALUE_MAP.put("HK", 13);
        CARD_VALUE_MAP.put("D1", 1);
        CARD_VALUE_MAP.put("D2", 2);
        CARD_VALUE_MAP.put("D3", 3);
        CARD_VALUE_MAP.put("D4", 4);
        CARD_VALUE_MAP.put("D5", 5);
        CARD_VALUE_MAP.put("D6", 6);
        CARD_VALUE_MAP.put("D7", 7);
        CARD_VALUE_MAP.put("D8", 8);
        CARD_VALUE_MAP.put("D9", 9);
        CARD_VALUE_MAP.put("D10", 10);
        CARD_VALUE_MAP.put("DJ", 11);
        CARD_VALUE_MAP.put("DQ", 12);
        CARD_VALUE_MAP.put("DK", 13);
        CARD_VALUE_MAP.put("C1", 1);
        CARD_VALUE_MAP.put("C2", 2);
        CARD_VALUE_MAP.put("C3", 3);
        CARD_VALUE_MAP.put("C4", 4);
        CARD_VALUE_MAP.put("C5", 5);
        CARD_VALUE_MAP.put("C6", 6);
        CARD_VALUE_MAP.put("C7", 7);
        CARD_VALUE_MAP.put("C8", 8);
        CARD_VALUE_MAP.put("C9", 9);
        CARD_VALUE_MAP.put("C10", 10);
        CARD_VALUE_MAP.put("CJ", 11);
        CARD_VALUE_MAP.put("CQ", 12);
        CARD_VALUE_MAP.put("CK", 13);
    }

    private List<String> cardsLeft;

    private List<Player> playerList;

    public BlackJackGame() {
        this.cardsLeft = new ArrayList<>(Arrays.asList(CARDS));
        this.playerList = new ArrayList<>();
        Player player1 = new Player(1);
        Player player2 = new Player(2);
        this.playerList.add(player1);
        this.playerList.add(player2);
    }

    private class Player {

        private int id;

        private int score;

        private boolean lose;

        private boolean sayNo;

        private List<String> cardList;

        Player(int id) {
            this.id = id;
            this.lose = false;
            this.sayNo = false;
            this.cardList = new ArrayList<>();
            int randomIndex = RANDOM_GENERATOR.nextInt(cardsLeft.size());
            String initCard = BlackJackGame.this.cardsLeft.get(randomIndex);
            this.cardList.add(initCard);
            System.out.println("玩家" + id + "底牌是：" + initCard);
            this.score = CARD_VALUE_MAP.get(initCard);
            System.out.println("玩家" + id + "初始分数是：" + this.score);
            BlackJackGame.this.cardsLeft.remove(randomIndex);
        }

        void getNewCard() {
            if (!this.lose) {
                System.out.println("玩家" + id + "是否要牌(Y/N)");
                String judge = INPUT.nextLine();
                this.sayNo = !judge.equalsIgnoreCase("Y");
                // 当玩家需要时重复给玩家发牌
                if (judge.equalsIgnoreCase("Y")) {
                    int randomIndex = RANDOM_GENERATOR.nextInt(cardsLeft.size());
                    String newCard = BlackJackGame.this.cardsLeft.get(randomIndex);
                    this.cardList.add(newCard);
                    System.out.println("玩家" + id + "得到的牌是：" + newCard);
                    this.score += CARD_VALUE_MAP.get(newCard);
                    System.out.println("玩家" + id + "当前分数是：" + this.score);
                    BlackJackGame.this.cardsLeft.remove(newCard);
                    if (judgeLose()) {
                        System.out.println("玩家" + id + "输了");
                        this.lose = true;
                    }
                }
            }
        }

        private boolean judgeLose() {
            return this.score > 21;
        }

        boolean canEnd() {
            return this.lose || this.sayNo;
        }

    }

    public void dealTheCards() {
        boolean flag = true;
        while (flag) {
            flag = false;
            for (Player player : this.playerList) {
                player.getNewCard();
                if (!player.canEnd()) {
                    flag = true;
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("这个游戏是一个多人游戏，电脑会给玩家们随机发放初始牌，"
                + "玩家自行决定是否继续加牌，确保自己所有牌的点数和不"
                + "超过21（J,Q,K按11, 12, 13记）。\n如果某玩家总点数超过21，该玩家直接输掉比赛，"
                + "如果所有玩家都不再加牌或已经输掉，则进入结算阶段，凑出最大点数的玩家获胜。");
        BlackJackGame newGame = new BlackJackGame();
        newGame.dealTheCards();
        newGame.judgeResult();
        INPUT.close();
    }


    public void judgeResult() {
        int maxScore = -1;
        int maxPlayerId = -1;
        for (Player player : this.playerList) {
            if (!player.lose) {
                if (player.score > maxScore) {
                    maxScore = player.score;
                    maxPlayerId = player.id;
                }
            }
        }
        if (maxScore == -1) {
            System.out.println("所有玩家都输掉了对局！");
        } else {
            System.out.println("玩家" + maxPlayerId + "最先获得了" + maxScore + "分，获得胜利！");
        }
    }

}
```

# 运行效果

试选一例输出结果：

```
这个游戏是一个多人游戏，电脑会给玩家们随机发放初始牌，玩家自行决定是否继续加牌，确保自己所有牌的点数和不超过21（J,Q,K按11, 12, 13记）。
如果某玩家总点数超过21，该玩家直接输掉比赛，如果所有玩家都不再加牌或已经输掉，则进入结算阶段，凑出最大点数的玩家获胜。
玩家1底牌是：H4
玩家1初始分数是：4
玩家2底牌是：H10
玩家2初始分数是：10
玩家1是否要牌(Y/N)
y
玩家1得到的牌是：D5
玩家1当前分数是：9
玩家2是否要牌(Y/N)
y
玩家2得到的牌是：S1
玩家2当前分数是：11
玩家1是否要牌(Y/N)
y
玩家1得到的牌是：HJ
玩家1当前分数是：20
玩家2是否要牌(Y/N)
y
玩家2得到的牌是：C1
玩家2当前分数是：12
玩家1是否要牌(Y/N)
n
玩家2是否要牌(Y/N)
y
玩家2得到的牌是：C7
玩家2当前分数是：19
玩家1是否要牌(Y/N)
n
玩家2是否要牌(Y/N)
n
玩家1最先获得了20分，获得胜利！
```
