---
title: Java进制转换
date: 2020-03-16 13:39:18
summary: 本文介绍Java进制转换的相关内容，尤其是八进制。
tags:
- Java
categories:
- 开发技术
---

# 八进制

## 直接数值赋值

众所周知，数值前不加0，所以八进制数的表示要求开头加0，注意不是o或者O。
比如0123，直接赋值，对应的其实是十进制数83。
```java
jshell> int a = 0123;
a ==> 83
```

## 来自字符串的转型

但字符串的强制转型则截然不同。
我们的数值串可能以0开头，比如下面的串"0123"：

```java
jshell> String b = "0123";
b ==> "0123"
```
直接转型，发现只是把0消去了而已，还是妥妥的十进制。
理由是：Integer.parseInt()默认十进制。
```java
jshell> int c = Integer.parseInt(b);
c ==> 123
```
那怎么转八进制呢？显然是加上radix参数的啦，参数值就是8。
```java
jshell> int d = Integer.parseInt(b, 8);
d ==> 83
```
你以为决定能转成八进制是因为b是"0123"？其实不是，任意数就可以，没必要有先导0的：
```java
jshell> b = "123";
b ==> "123"

jshell> int d = Integer.parseInt(b, 8);
d ==> 83
```

## printf()输出八进制

这个部分该使用%0还是%o呢？

先看看%0吧！

```java
jshell> System.out.printf("%0", a);
|  异常错误 java.util.UnknownFormatConversionException：Conversion = '0'
|        at Formatter.checkText (Formatter.java:2732)
|        at Formatter.parse (Formatter.java:2718)
|        at Formatter.format (Formatter.java:2655)
|        at PrintStream.format (PrintStream.java:1053)
|        at PrintStream.printf (PrintStream.java:949)
|        at (#4:1)
```

明显在扯皮……%0什么鬼啊。。。

所以要用%o，打印出的结果就是八进制的啦！（%d是十进制整数）

```java
jshell> System.out.printf("%o", a);
123$5 ==> java.io.PrintStream@65e2dbf3

jshell> System.out.printf("%o", c);
173$6 ==> java.io.PrintStream@65e2dbf3

jshell> System.out.printf("%d", a);
83$7 ==> java.io.PrintStream@65e2dbf3
```

大O行吗？

```java
jshell> System.out.printf("%O", c);
|  异常错误 java.util.UnknownFormatConversionException：Conversion = 'O'
|        at Formatter$FormatSpecifier.conversion (Formatter.java:2839)
|        at Formatter$FormatSpecifier.<init> (Formatter.java:2865)
|        at Formatter.parse (Formatter.java:2713)
|        at Formatter.format (Formatter.java:2655)
|        at PrintStream.format (PrintStream.java:1053)
|        at PrintStream.printf (PrintStream.java:949)
|        at (#7:1)
```
显然不行啊！

## 八进制转型String

注意前面已经定义了a的值是0123，即83。
那么同样可以使用 Integer.toString() 中的radix来破解，radix置为8即可。
```java
jshell> String e = Integer.toString(a, 8);
e ==> "123"
```
结果不带先导0。

## 八进制总结

有关八进制的使用，大概可以这么做一下归纳：
- 八进制用的不多，不如二进制、十进制、十六进制广泛。
- 八进制直接赋值要加先导0，但显示出来的还是十进制的值，底层还是二进制在运算，八进制没实际意义。注意这里不是o或者O，是0。
- 八进制使用printf()打印的时候用的是"%o"，不是O或者0。
- 将String转换成八进制数的时候，使用Integer.parseInt()，指明radix即可，结果还是十进制（显示）/二进制（底层）表示的。注意String不必加先导0。
- 八进制数转成String的时候，使用逆向的Integer.toString()，指明radix即可，结果就是不带先导0的八进制字符串表示。

# 进制转换

推荐阅读：[进制、进制转换和数据运算](https://blankspace.blog.csdn.net/article/details/113667114)

## X进制转Y进制

X进制转Y进制的一个比较笨的方法就是以十进制为桥梁，$X$进制→十进制→$Y$进制。

当然，复杂的进制转化一般只有算法题才会涉及。例如[洛谷 P1143 进制转换](https://www.luogu.com.cn/problem/P1143)：

>请你编一程序实现两种不同进制之间的数据转换。
>输入数据共三行，第一行是一个正整数，表示需要转换的数的进制$n(2≤n≤16)$，第二行是一个n进制数，若$n>10$则用大写字母$A-F$表示数码$10-15$，并且该$n$进制数对应的十进制的值不超过$1000000000$，第三行也是一个正整数，表示转换之后的数的进制$m(2≤m≤16)$。


实现代码：
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int origin_radix = Integer.parseInt(scanner.nextLine());
        String num = scanner.nextLine();
        int now_radix = Integer.parseInt(scanner.nextLine());
        scanner.close();
        System.out.println(Integer.toString(Integer.parseInt(num, origin_radix), now_radix).toUpperCase());
    }
}
```

# 进制与位运算

## 计算二进制数中1的个数

推荐阅读：[用位运算判断2的N次幂](https://blankspace.blog.csdn.net/article/details/104251718)

```java
public int numberOfSetBits(int n) {
    int result = 0;
    for ( ; n > 0; result++) {
        n &= n-1;
    }
    return result;
}
```
