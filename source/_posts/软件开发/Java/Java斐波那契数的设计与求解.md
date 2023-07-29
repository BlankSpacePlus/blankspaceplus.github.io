---
title: Java斐波那契数的设计与求解
date: 2020-02-26 00:58:22
summary: 本文提供Java编写Fibonacci数列的递归/非递归版本。
mathjax: true
tags:
- Java
categories:
- 开发技术
---

# 斐波那契

斐波那契数列是一个由 1 和 1 开始，之后的每一项都是前两项的和所组成的数列。换句话说，数列的第n个数是由前两个数相加得到的，依次类推。斐波那契数列的前几项为：1、1、2、3、5、8、13、21、34、55、89、144......以此类推。

斐波那契数列不仅仅是一个数列，它还与许多自然现象和人类活动有着密切的联系，例如，在自然界中，许多生物体的生长规律、植物的分枝规律等都呈现出斐波那契数列的规律；在人类社会中，斐波那契数列也被广泛地应用于艺术、建筑、金融等领域，成为了一种独特的美学和哲学符号。

在计算机科学中，斐波那契数列也被广泛地应用于算法和数据结构等领域。因为斐波那契数列具有递归和迭代两种不同的计算方式，因此也成为了算法设计和性能优化的经典案例之一。

# 实现代码

## 递归实现

```java
private static int fibonacci1(int n) {
    if(n <= 1) {
        return 1;
    } else {
        return fibonacci1(n - 1) + fibonacci1(n - 2);
    }
}
```

这段代码实现了一个递归的斐波那契数列生成函数，根据传入的参数n，计算并返回第n个斐波那契数。

具体的代码分析如下：
- private关键字表示该方法是一个私有方法，只能在当前类中被调用。
- static关键字表示该方法是一个静态方法，可以通过类名直接调用。
- 方法名为fibonacci1，接受一个整数参数n。
- 第1行代码通过if条件语句判断n是否小于等于1，如果是，则返回1，因为斐波那契数列的前两个数均为1。
- 如果n大于1，则执行else代码块中的递归操作，即调用fibonacci1(n - 1)和fibonacci1(n - 2)来计算第n个斐波那契数。递归操作会一直执行到n等于1或0时才停止。
- 最终将递归得到的结果相加，并返回给调用者。

需要注意的是，由于递归调用会多次计算相同的斐波那契数，因此在计算较大的斐波那契数时，会出现性能问题。可以使用迭代的方式来解决这个问题，避免重复计算。

该算法的复杂度为$O((\frac{5}{3})^{n})$

$F_{0}=1$
$F_{1}=1$
$F_{2}=2$
$F_{3}=3$
$F_{4}=5$
$……$
$F_{i}=F_{i-1}+F_{i-2}$

$证：对于i≥1，有F_{i}＜(\frac{5}{3})^{n}$
$易证，F_{1}=1<\frac{5}{3}，F_{2}=2<(\frac{5}{3})^{2}=\frac{25}{9}$
$假设F_{k}<(\frac{5}{3})^{k}$
$下面只需要证明F_{k+1}<(\frac{5}{3})^{k+1}$
$F_{k+1}=F_{k}+F_{k-1}$
$F_{k+1}<(\frac{5}{3})^{k}+(\frac{5}{3})^{k-1}=(\frac{3}{5})(\frac{5}{3})^{k+1}+(\frac{3}{5})^{2}(\frac{5}{3})^{k+1}=(\frac{15}{25})(\frac{5}{3})^{k+1}+(\frac{9}{25})(\frac{5}{3})^{k+1}=(\frac{24}{25})(\frac{5}{3})^{k+1}<(\frac{5}{3})^{k+1}$
$得证$

## 非递归实现

```java
private static int fibonacci2(int n) {
    if(n <= 1) {
        return 1;
    }
    int last = 1;
    int nextToLast = 1;
    int answer = 1;
    for(int i = 2; i <= n; i++) {
        answer = last + nextToLast;
        nextToLast = last;
        last = answer;
    }
    return answer;
}
```

这段代码实现了一个迭代的斐波那契数列生成函数，通过循环的方式计算并返回第n个斐波那契数。

具体的代码分析如下：
- private关键字表示该方法是一个私有方法，只能在当前类中被调用。
- static关键字表示该方法是一个静态方法，可以通过类名直接调用。
- 方法名为fibonacci2，接受一个整数参数n。
- 第1行代码通过if条件语句判断n是否小于等于1，如果是，则返回1，因为斐波那契数列的前两个数均为1。
- 如果n大于1，则通过for循环计算第n个斐波那契数。循环变量i从2开始，一直循环到i等于n为止。
- 在循环中，使用三个整型变量last、nextToLast和answer来计算斐波那契数。变量last和nextToLast分别保存上一个和上上一个斐波那契数，变量answer保存当前的斐波那契数。
- 在每次循环中，将last和nextToLast的值分别更新为上一个斐波那契数和上上一个斐波那契数，同时计算出当前的斐波那契数，并保存到answer中。
- 最后返回answer作为第n个斐波那契数的值。

相比于递归方式，迭代方式不会重复计算相同的斐波那契数，因此计算较大的斐波那契数时，具有更好的性能表现。

## 完整代码


```java
public class Fibonacci {

    private static int fibonacci1(int n) {
        if(n <= 1) {
            return 1;
        } else {
            return fibonacci1(n - 1) + fibonacci1(n - 2);
        }
    }

    private static int fibonacci2(int n) {
        if(n <= 1) {
            return 1;
        }
        int last = 1;
        int nextToLast = 1;
        int answer = 1;
        for(int i = 2; i <= n; i++) {
            answer = last + nextToLast;
            nextToLast = last;
            last = answer;
        }
        return answer;
    }

    public static void main(String [] args) {
        System.out.println("fibonacci(10) = " + fibonacci1(10));
        System.out.println("fibonacci(10) = " + fibonacci2(10));
    }

}
```
