---
title: 随机选出一对小于等于N的互异正整数的概率
date: 2021-03-30 12:14:34
summary: 本文介绍计算机的基本组成、发展历程、国际标准组织。
mathjax: true
tags:
- 概率论
categories:
- 计算机科学的数学基础
---

# 题目要求

计算两个随机选取的、小于或者等于N的互异正整数的概率。

事实上，当N增大时，结果将趋于$\frac{6}{π^2}$

# 程序设计

设计概率模拟程序需要考虑以下几点：
- 确定问题和目标：首先要明确你的程序要解决哪些问题，以及达成何种目标。
- 收集数据并建立模型：如何收集数据是个复杂的过程，一般可以通过实验或者采集历史数据来获取。根据数据的特征，我们可以尝试从中提取出相应的随机变量，并建立模型。
- 选择合适的模拟方法：模拟的方法有很多，比如蒙特卡罗方法、拉斯维加斯方法等，在设计程序时应该根据问题的特点选择合适的方法。
- 编写代码：确定好数据和模拟方法后，就可以开始编写代码了。在编写代码的时候，需要注意代码的可重复性和可读性。
- 进行结果分析：经过一系列的模拟之后，得到了一些结果，需要进行分析，判断结果是否符合预期，如果不符合，则需要重新调整模型或者修改代码。

总体来说，设计概率模拟程序需要我们掌握一定的数学知识，具备较强的编程能力，并且需要有耐心和毅力来不断地对程序进行优化和改进。

# 实现代码

```java
public class Main {

    public static int gcd(int m, int n) {
        if (m < n) {
            return gcd(n, m);
        }
        if (n == 0) {
            return m;
        }
        return gcd(n, m % n);
    }
    
    public static double probRelPrime(int n) {
        int rel = 0, tot = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = i + 1; j <= n; j++) {
                tot++;
                if (gcd(i, j) == 1) {
                    rel++;
                }
            }
        }
        return (double)rel / tot;
    }
    
    public static void main(String[] args) {
        for (int n = 500; n <= 64000; n *= 2) {
            long start = System.currentTimeMillis();
            double prob = probRelPrime(n);
            long end = System.currentTimeMillis();
            if (n == 500) {
                continue;
            }
            long elapsed = (end - start);
            System.out.print( String.format("%4d", n));
            System.out.print( String.format("\t%d", elapsed));
            System.out.print( String.format("\t%.9f", elapsed / (double)n / n));
            System.out.print( String.format("\t%.12f", elapsed / (double)n / n / n));
            System.out.print( String.format("\t%.9f", elapsed / (double)n / n / (Math.log10(n) / Math.log10(2))));
            System.out.println();
        }
    }
    
}
```

# 测试结果

<font color="blue">1000&emsp;31&emsp;0.000031000&emsp;0.000000031000&emsp;0.000003111
2000&emsp;93&emsp;0.000023250&emsp;0.000000011625&emsp;0.000002120
4000&emsp;453&emsp;0.000028313&emsp;0.000000007078&emsp;0.000002366
8000&emsp;1896&emsp;0.000029625&emsp;0.000000003703&emsp;0.000002285
16000&emsp;8199&emsp;0.000032027&emsp;0.000000002002&emsp;0.000002293
32000&emsp;35568&emsp;0.000034734&emsp;0.000000001085&emsp;0.000002321
64000&emsp;152640&emsp;0.000037266&emsp;0.000000000582&emsp;0.000002334</font>
