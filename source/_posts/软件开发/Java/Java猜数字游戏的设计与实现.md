---
title: Java猜数字游戏的设计与实现
date: 2020-09-26 19:47:32
summary: 本文分享Java猜数字游戏设计与实现。
tags:
- Java
categories:
- 开发技术
---

# 功能需求

猜数字游戏是一款简单的休闲游戏，玩家需要猜测计算机随机生成的一个数字，直到猜中为止。

本文的目标是设计一个猜数字小游戏。

游戏规则：
- 游戏开始时，计算机随机生成一个三位数的数字，每个数位上的数字可以重复。
- 玩家需要输入一个三位数的数字，每个数位上的数字可以重复，程序将判断玩家猜测的数字与答案的数字进行比较，并提示玩家猜测的数字与答案数字的大小比较情况。
- 每次猜测后，程序将显示玩家本次猜测的数字与答案数字的大小比较情况，即比猜测的数字大还是比猜测的数字小。
- 玩家可以根据上一次的匹配情况，推测出猜测的范围应该如何去缩小才是正确的，然后根据推测猜测下一次的数字。
- 可以为玩家设置最多N次猜测机会，如果N次都没有猜中，游戏结束，可以并告诉玩家答案。

# 程序设计

首先，我们实现一个可以交互的猜数字框架。

待猜测的数字人为指定，猜测的数字由用户输入，比较大小的代码采用选择结构实现。

```java
if (guess > num) {
    System.out.println("Higher!");
} else if (guess < num) {
    System.out.println("Lower!");
} else {
    System.out.println("Correct! Congratulation!");
}
```

```java
import java.util.Scanner;

public class GuessNumber {

    public static void main(String[] args) {
        System.out.println("Hello, what's your name?");
        Scanner in = new Scanner(System.in);
        String name = in.next();
        System.out.println("Hi, " + name + ". Nice to meet you. ");
        System.out.println("Let's play a game. I hold a number between 100 and 999, can you guess what is it?");
        int num = 234;
        int guess = in.nextInt();
        if (guess > num) {
            System.out.println("Higher!");
        } else if (guess < num) {
            System.out.println("Lower!");
        } else {
            System.out.println("Correct! Congratulation!");
        }
        System.out.println("Bye! Have a nice day!");
    }

}
```

至此，我们实现了一个猜数字的基础框架。但不够完善，因为待猜测的数字不具备随机性，一次猜中100到999间的一个三位数也不现实，完成一次游戏就不能再玩一局。

因此，我们设计出了第二版代码，支持不止一次猜测。

```java
import java.util.Scanner;

public class GuessNumber {

    public static void main(String[] args) {
        System.out.println("Hello, what's your name?");
        Scanner in = new Scanner(System.in);
        String name = in.next();
        System.out.println("Hi, " + name + ". Nice to meet you. ");
        System.out.println("Let's play a game. I hold a number between 100 and 999, can you guess what is it?");
        int num = 234;
        System.out.println("You have 3 times.");
        int i;
        for (i = 0; i < 3; i++) {
            int guess = in.nextInt();
            if (guess > num) {
                System.out.println("Higher!");
                if (i < 2) {
                    System.out.println("Try again!");
                }
            } else if (guess < num) {
                System.out.println("Lower!");
                if (i < 2) {
                    System.out.println("Try again!");
                }
            } else {
                System.out.println("Correct! Congratulation!");
                break;
            }
        }
        if (i == 3) {
            System.out.println("Game over!");
        }
        System.out.println("Bye! Have a nice day!");
    }

}
```

至此，我们修复了只能猜测一次的问题，可以多次猜测，并依然给予用户高低提示，增加了游戏的可玩性。

遗憾的是，还不够。因此，我们写出了第三版代码。

```java
import java.util.Scanner;

public class GuessNumber {

    public static void main(String[] args) {
        System.out.println("Hello, what's your name?");
        Scanner in = new Scanner(System.in);
        String name = in.next();
        System.out.println("Hi, " + name + ". Nice to meet you. ");
        System.out.println("Let's play a game. I hold a number between 100 and 999, can you guess what is it?");
        final int num = 234;
        while (true) {
            int guess = in.nextInt();
            if (guess > num) {
                System.out.println("Higher!");
                System.out.println("Try again!");
            } else if (guess < num) {
                System.out.println("Lower!");
                System.out.println("Try again!");
            } else {
                System.out.println("Correct! Congratulation!");
                break;
            }
        }
        System.out.println("Bye! Have a nice day!");
    }

}
```

显然，三次猜测对这样大的范围是不够的，因此我们取消了猜测次数的限制。

接下来，我们着手解决游戏只能玩一次的问题，让用户可以玩任意次猜数字游戏。

实现此功能主要通过以下代码段：
```java
do {
    System.out.println("Do you want to contitue?(Y/N)");
    flag = in.next();
    if (flag.equalsIgnoreCase("N")) {
        break;
    } else if (flag.equalsIgnoreCase("Y")) {
        System.out.println("Try again!");
        break;
    } else {
        System.out.println("Sorry I can not understand.");
    }
} while (!flag.equalsIgnoreCase("N") && !flag.equalsIgnoreCase("Y"));
if (flag.equalsIgnoreCase("N")) {
    break;
}
```

```java
import java.util.Scanner;

public class GuessNumber {

    public static void main(String[] args) {
        System.out.println("Hello, what's your name?");
        Scanner in = new Scanner(System.in);
        String name = in.next();
        System.out.println("Hi, " + name + ". Nice to meet you. ");
        System.out.println("Let's play a game. I hold a number between 100 and 999, can you guess what is it?");
        int num = 234;
        String flag;
        while (true) {
            int guess = in.nextInt();
            if (guess > num) {
                System.out.println("Higher!");
            } else if (guess < num) {
                System.out.println("Lower!");
            } else {
                System.out.println("Correct! Congratulation!");
                break;
            }
            do {
                System.out.println("Do you want to contitue?(Y/N)");
                flag = in.next();
                if (flag.equalsIgnoreCase("N")) {
                    break;
                } else if (flag.equalsIgnoreCase("Y")) {
                    System.out.println("Try again!");
                    break;
                } else {
                    System.out.println("Sorry I can not understand.");
                }
            } while (!flag.equalsIgnoreCase("N") && !flag.equalsIgnoreCase("Y"));
            if (flag.equalsIgnoreCase("N")) {
                break;
            }
        }
        System.out.println("Bye! Have a nice day!");
    }

}
```

至此，我们还差一个任务目标：待猜测数据的随机生成。通过`java.util.Random`即可实现。

```java
import java.util.Random;
import java.util.Scanner;

public class GuessNumber {

    public static void main(String[] args) {
        System.out.println("Hello, what's your name?");
        Scanner in = new Scanner(System.in);
        String name = in.next();
        Random random = new Random();
        System.out.println("Hi, " + name + ". Nice to meet you. ");
        while (true) {
            System.out.println("Let's play a game. I hold a number between 100 and 999, can you guess what is it?");
            int num = random.nextInt(900) + 100;
            String flag;
            while (true) {
                int guess = in.nextInt();
                if (guess > num) {
                    System.out.println("Higher!");
                } else if (guess < num) {
                    System.out.println("Lower!");
                } else {
                    System.out.println("Correct! Congratulation!");
                    break;
                }
                do {
                    System.out.println("Do you want to contitue?(Y/N)");
                    flag = in.next();
                    if (flag.equalsIgnoreCase("Y")) {
                        System.out.println("Try again!");
                    } else if (!flag.equalsIgnoreCase("N")) {
                        System.out.println("Sorry I can not understand.");
                    }
                } while (!flag.equalsIgnoreCase("N") && !flag.equalsIgnoreCase("Y"));
                if (flag.equalsIgnoreCase("N")) {
                    break;
                }
            }
            do {
                System.out.println("Do you want to contitue to play?(Y/N)");
                flag = in.next();
                if (!flag.equalsIgnoreCase("N") && !flag.equalsIgnoreCase("Y")) {
                    System.out.println("Sorry I can not understand.");
                }
            } while (!flag.equalsIgnoreCase("N") && !flag.equalsIgnoreCase("Y"));

            if (flag.equalsIgnoreCase("N")) {
                break;
            }
        }
        System.out.println("Bye! Have a nice day!");
    }

}
```
