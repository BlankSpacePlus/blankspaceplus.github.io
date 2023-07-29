---
title: Java随机发牌程序的设计与实现
date: 2019-09-25 22:07:51
summary: 本文基于Java设计实现随机发牌程序。
mathjax: true
tags:
- Java
categories:
- 开发技术
---

# 功能需求

开发一个随机发牌的Java程序，不含大小王。每次输出的牌不得重复。

红心、方片、梅花、黑桃
A、2、3、4、5、6、7、8、9、10、J、Q、K

红心A、红心2、红心3、红心4、红心5、红心6、红心7、红心8、红心9、红心10、红心J、红心Q、红心K
方片A、方片2、方片3、方片4、方片5、方片6、方片7、方片8、方片9、方片10、方片J、方片Q、方片K
梅花A、梅花2、梅花3、梅花4、梅花5、梅花6、梅花7、梅花8、梅花9、梅花10、梅花J、梅花Q、梅花K
黑桃A、黑桃2、黑桃3、黑桃4、黑桃5、黑桃6、黑桃7、黑桃8、黑桃9、黑桃10、黑桃J、黑桃Q、黑桃K

# 程序设计

## 实现方案1

开辟一个二维的标记数组，默认牌均为发出。每次发牌生成二维随机数，先判断数组中是否标记已发出，已发出的跳过，未发出的牌可以发出并标记为已发出。

该方案的弊端是：越往后，二维随机数命中未发出牌的概率越低，因为并没有从随机数的生成方面就排除掉不命中的可能。

### 实现代码

```java
import java.util.Random;

public class Cards {
    
    /**
     * 初始化标志数组，牌均未发出
     */
    private int[][] cards = new int[4][13];
    
    /**
     * 花色
     */
    private String[] suits;
    
    /**
     * 点数
     */
    private String[] points;

    /**
     * 构造器初始化花色、点数
     * @param suits
     * @param points
     */
    public Cards(String[] suits, String[] points) {
        super();
        this.suits = suits;
        this.points = points;
    }

    public int[][] getCards() {
        return cards;
    }

    public void setCards(int[][] cards) {
        this.cards = cards;
    }

    public String[] getSuits() {
        return suits;
    }

    public void setSuits(String[] suits) {
        this.suits = suits;
    }

    public String[] getPoints() {
        return points;
    }

    public void setPoints(String[] points) {
        this.points = points;
    }

    public void sendCards(int n) {
        // 记录扑克牌信息
        String sendCards = new String("发放的扑克牌为：");
        // 生成随机数的生成对象
        Random randomBuilder = new Random();
        // 定义发放扑克牌花色、点数
        int suit, point;
        for (int i = 0; i < n; ) {
            suit = randomBuilder.nextInt(4);
            point = randomBuilder.nextInt(13);
            if (cards[suit][point] == 1) {
                continue;
            } else {
                cards[suit][point] = 1;
                // 追加新发扑克牌花色
                sendCards = sendCards + suits[suit];
                // 追加点数
                sendCards = sendCards + points[point] + " ";
                // 准备发放下一张牌
                i++;
            }
        }
        System.out.println(sendCards.toString());
    }
    
    public static void main(String[] args) {
        String[] suits = {"红心", "方片", "梅花", "黑桃"};
        String[] points = {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"};
        Cards cards = new Cards(suits, points);
        cards.sendCards(10);
    }
    
}
```

### 运行结果

运行程序，发现在$0≤x≤52$范围内可以得到随机发牌的准确结果。

提供代码的main方法里是发10张牌，运行示例：
> 发放的扑克牌为：黑桃8 方片J 红心3 黑桃J 黑桃10 方片10 红心7 黑桃A 黑桃Q 红心A 

## 实现方案2

开辟一个固定的一维数组记录所有的牌面，将信息导入ArrayList。每次发牌根据List的size()生成范围内的随机数，根据随机数取牌，发牌后将牌从List中移除。

为发牌提供了重载方法`dealTheCards`，分别支持默认的发一张牌和发N张牌。

该方案的弊端是：没有做牌数的限制，超出54张牌会产生异常。

### 实现代码

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Cards {

    // Spade黑桃 Heart红心 Diamond方片 Club梅花
    private static final String[] CARDS = {
            "黑桃1", "黑桃2", "黑桃3", "黑桃4", "黑桃5", "黑桃6", "黑桃7", "黑桃8", "黑桃9", "黑桃10", "黑桃J", "黑桃Q", "黑桃K",
            "红心1", "红心2", "红心3", "红心4", "红心5", "红心6", "红心7", "红心8", "红心9", "红心10", "红心J", "红心Q", "红心K",
            "方片1", "方片2", "方片3", "方片4", "方片5", "方片6", "方片7", "方片8", "方片9", "方片10", "方片J", "方片Q", "方片K",
            "梅花1", "梅花2", "梅花3", "梅花4", "梅花5", "梅花6", "梅花7", "梅花8", "梅花9", "梅花10", "梅花J", "梅花Q", "梅花K"};

    private List<String> cardsLeft;

    private Random random;

    public Cards() {
        this.cardsLeft = new ArrayList<>(Arrays.asList(CARDS));
        this.random = new Random();
    }

    public String dealTheCards() {
        int randomIndex = random.nextInt(cardsLeft.size());
        String newCard = this.cardsLeft.get(randomIndex);
        this.cardsLeft.remove(newCard);
        return newCard;
    }

    public String dealTheCards(int cardNum) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < cardNum; i++) {
            result.append(dealTheCards()).append(' ');
        }
        return result.toString();
    }

    public static void main(String[] args) {
        Cards cards = new Cards();
        System.out.println(cards.dealTheCards());
        System.out.println(cards.dealTheCards(10));
    }

}
```

### 运行结果

运行示例：

>黑桃10
梅花9 红心1 黑桃1 红心10 黑桃Q 方片10 梅花10 方片J 方片3 梅花K 
