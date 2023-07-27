---
title: max函数与min函数
date: 2020-02-08 12:00:28
summary: 本文分享编程语言对最大值和最小值的支持，还介绍如何自己实现max()和min()。
mathjax: true
tags:
- 程序设计
categories:
- 程序设计
---

# max()与min()

max()与min()分别用于求解入参数值中最大值和最小值。由于这是编程语言常用的数值运算功能，因此常见的编程语言一般内置了max()和min()的API。

## C的max()与min()

C语言没有内置的max()和min()函数，需要开发者自己实现。

## C++的max()与min()

C++标准库中有内置的max()和min()函数，它们定义在头文件`<algorithm>`中，通过`#include <algorithm>`引入应用程序。

使用这两个函数可以计算多个整数中的最大值或最小值。
要计算两个整数a和b的最大值，可以使用以下代码：`int max = std::max(a, b);`。
要计算两个整数a和b的最小值，可以使用以下代码：`int min = std::min(a, b);`。

这两个函数也可以用于其他类型的数据，例如浮点数和字符串。
要计算两个浮点数x和y的最大值，可以使用以下代码：`double max = std::max(x, y);`。
要计算两个浮点数x和y的最小值，可以使用以下代码：`double min = std::max(x, y);`。

max()和min()在比较字符串大小时，会按照字典序比较。

## Java的max()与min()

Java有内置的max()和min()函数，它们定义在java.lang.Math类中。这些函数可以用于计算两个数的最大值或最小值。

要计算两个整数a和b的最大值，可以使用以下代码：`int max = Math.max(a, b);`。
要计算两个整数a和b的最小值，可以使用以下代码：`int min = Math.min(a, b);`。

Math.max()和Math.min()函数也可以用于其他类型的数据，例如浮点数和长整型。

需要注意的是，Math.max()和Math.min()函数是静态方法，因此不需要创建Math类的实例即可使用。此外，虽然Java为Math.max()和Math.min()提供了支持多种类型数据的重载实现，但Java只提供两个入参的实现，多入参的实现需要开发者自行实现。

## Python的max()与min()

Python有内置的max()和min()函数，它们可以用于计算多个值中的最大值或最小值。这些函数不需要引入其他模块或库，可以直接在Python中使用。

Python内置的max()和min()函数比起C++和Java要更加灵活，支持多种形参的重载实现。

Python内置的max()和min()函数支持比较两个或多个值：
```python
max_val = max(a, b, c)
min_val = min(a, b, c)
```

Python内置的max()和min()函数也可以用于多种序列，例如列表、元组、集合、字符串。此时，只需要传入一个参数即可。
```python
max_char = max(s)
min_char = min(s)
```

当max()和min()函数用于非数值类型的序列时，会按照字典序进行比较。

# 实现max()与min()

## 条件判断

```java
int max(int a, int b) {
    if (a >= b) {
        return a;
    }
    return b;
}
```

```java
int min(int a, int b) {
    if (a <= b) {
        return a;
    }
    return b;
}
```

## 三目运算

下面的代码使用了三元运算符，它的含义是：如果a大于或等于b，则将max设置为a，否则将其设置为b。

```java
int max(int a, int b) {
    return a >= b ? a : b;
}
```

下面的代码使用了三元运算符，它的含义是：如果a小于或等于b，则将min设置为a，否则将其设置为b。

```java
int min(int a, int b) {
    return a <= b ? a : b;
}
```

## 数值计算

不直接使用比较运算符：>、<、>=、<=、==、!= 等，也可以实现max()和min()。

$\max(a,b)⇔\frac{a+b+|a-b|}{2}$

$\min(a,b)⇔\frac{a+b-|a-b|}{2}$

证明：
当$a>b$时，$a-b>0$，$\frac{a+b+|a-b|}{2}=\frac{a+b+a-b}{2}=a$，$\frac{a+b-|a-b|}{2}=\frac{a+b-a+b}{2}=b$
当$a<b$时，$a-b<0$，$\frac{a+b+|a-b|}{2}=\frac{a+b-a+b}{2}=b$，$\frac{a+b-|a-b|}{2}=\frac{a+b+a-b}{2}=a$

需要辅助函数abs()，用于求解绝对值。

```java
int max(int a, int b) {
    return (a + b + abs(a-b)) / 2;
}
```

```java
int min(int a, int b) {
    return (a + b - abs(a-b)) / 2;
}
```

## 序列的max()与min()

以上三种实现针对的都是两个入参的情况，实际输入可能是一个序列。

以Java为例，可以使用循环和条件语句来计算多个数的最大值或最小值。

```java
public static int max(int[] numbers) {
    int max = numbers[0]; // 初始化最大值为数组中的第一个元素
    for (int i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i]; // 更新最大值
        }
    }
    return max;
}
```

```java
public static int min(int[] numbers) {
    int min = numbers[0]; // 初始化最小值为数组中的第一个元素
    for (int i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i]; // 更新最小值
        }
    }
    return min;
}
```
