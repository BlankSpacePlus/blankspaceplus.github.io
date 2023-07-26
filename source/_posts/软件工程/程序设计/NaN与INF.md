---
title: NaN与INF
date: 2023-03-23 16:07:01
summary: 本文分享程序设计中浮点数值运算可能遇到的NaN和INF。
mathjax: true
tags:
- 程序设计
categories:
- 程序设计
---

# 除0

在数学中，除以0是一个不合法的操作，因为它没有意义。同样地，计算机科学也不支持整数除法中除以0，遇此情况会抛出异常。

Java中，当我们执行整数除0操作时会抛出java.lang.ArithmeticException异常：
```java
@Test
public void divideZeroTest() {
    Assertions.assertThrows(ArithmeticException.class, () -> {
        int result = 1 / 0;
        System.out.println(result);
    });
}
```

不论如何，除0异常一定要避免。

# NaN

NaN（Not a Number）是一个特殊的浮点数值，表示一个无效的或不可表示的数值，用于本来要返回数值的操作数未返回数值的情况。

首次引入NaN的是1985年的IEEE 754浮点数标准。在IEEE 754-1985中，用指数部分全为1、小数部分非零表示NaN。

NaN在许多编程语言中是一个合法的值。现代编程语言大多支持NaN：
- C/C++：IEEE 754标准定义了NaN，C/C++遵循该标准，支持NaN。
- Java：Java也支持IEEE 754标准定义的NaN。
- Python：Python中的浮点类型也支持NaN。
- JavaScript：JavaScript中的Number类型也支持NaN。
- Ruby：Ruby中的Float类型也支持NaN。
- Perl：Perl中的浮点类型也支持NaN。

Java和Python等编程语言提供isNaN()方法来检查一个数值是否为NaN。

```java
@Test
public void nanTest() {
    Assertions.assertDoesNotThrow(() -> {
        double result = 0.0 / 0.0;
        Assertions.assertTrue(Double.isNaN(result));
    });
}
```

返回NaN的运算可能是：
- 至少有一个参数是NaN的运算。
- 由$0$、$∞$运算产生的不定式。
    - 下列除法运算：$\frac{0}{0}$、$\frac{+∞}{+∞}$、$\frac{+∞}{-∞}$、$\frac{-∞}{+∞}$、$\frac{-∞}{-∞}$
    - 下列乘法运算：$0×(+∞)$、$0×(−∞)$
    - 下列加法运算：$(+∞)+(−∞)$、$(−∞)+(+∞)$
    - 下列减法运算：$(+∞)-(+∞)$、$(−∞)-(−∞)$
- 产生复数结果的实数运算。
    - 对负数进行开偶次方的运算。
    - 对负数进行对数运算。
    - 对正弦或余弦到达域以外的数进行反正弦或反余弦运算。

NaN的运算规则：
- 任何数值与NaN相加、相减或相乘的结果都是NaN。
    ```java
    @Test
    public void operateWithNaNTest() {
        Assertions.assertTrue(Double.isNaN(1.0 + Double.NaN));
        Assertions.assertTrue(Double.isNaN(2.0 * Double.NaN));
        Assertions.assertTrue(Double.isNaN(-3.0 - Double.NaN));
    }
    ```
- 任何数值与NaN都不相等，包括NaN本身。
    ```java
    @Test
    public void compareWithNaNTest() {
        Assertions.assertFalse(Double.NaN > 8.0);
        Assertions.assertFalse(Double.NaN < -3.0);
        Assertions.assertFalse(Double.NaN == 5.0);
        Assertions.assertTrue(Double.NaN != 10.0);
        Assertions.assertFalse(Double.NaN > Double.NaN);
        Assertions.assertFalse(Double.NaN < Double.NaN);
        Assertions.assertFalse(Double.NaN == Double.NaN);
        Assertions.assertTrue(Double.NaN != Double.NaN);
    }
    ```

# INF

无穷大在许多编程语言中是一个合法的浮点数值，通常使用INF或Infinity来表示正无穷大，使用-INF或-Infinity来表示负无穷大。现代编程语言大多支持NaN：
- C/C++: 用INFINITY表示正无穷大，用-INFINITY表示负无穷大。这需要包含math.h头文件并使用编译器支持的数学库。
- Java: 用Double.POSITIVE_INFINITY表示正无穷大，用Double.NEGATIVE_INFINITY表示负无穷大。
- Python: 用float('inf')表示正无穷大，用-float('inf')表示负无穷大。
- JavaScript: 用Infinity表示正无穷大，用-Infinity表示负无穷大。
- Ruby: 用Float::INFINITY表示正无穷大，用-Float::INFINITY表示负无穷大。
- PHP: 用INF表示正无穷大，用-INF表示负无穷大。

Java提供isInfinite()方法来检查一个数值是否为NaN。
```java
@Test
public void infTest() {
    Assertions.assertDoesNotThrow(() -> {
        double result = 1.0 / 0.0;
        Assertions.assertTrue(Double.isInfinite(result));
    });
}
```

返回INF的运算可能是：
- 非0.0浮点数值除以0.0。
- 数值超出了所能表示的范围发生浮点数溢出，例如`pow(10.0, 100.0)`。

INF的运算规则：
- 无穷大加减任何数值仍为无穷大。
    ```java
    @Test
    public void numAddInfTest() {
        Assertions.assertDoesNotThrow(() -> {
            Assertions.assertTrue(Double.isInfinite(1 + Double.POSITIVE_INFINITY));
            Assertions.assertTrue(Double.isInfinite(1 - Double.POSITIVE_INFINITY));
        });
    }
    ```
- 无穷大乘以非零数值仍为无穷大，乘以0得到NaN。
    ```java
    @Test
    public void numMultiplyInfTest() {
        Assertions.assertDoesNotThrow(() -> {
            Assertions.assertTrue(Double.isInfinite(1 * Double.POSITIVE_INFINITY));
            Assertions.assertTrue(Double.isNaN(0 * Double.POSITIVE_INFINITY));
            Assertions.assertTrue(Double.isNaN(0 * Double.NEGATIVE_INFINITY));
        });
    }
    ```
- 无穷大除以非零数值仍为无穷大，除以0得到INF或NaN。
    ```java
    @Test
    public void infDivideNumTest() {
        Assertions.assertDoesNotThrow(() -> {
            Assertions.assertTrue(Double.isInfinite(Double.POSITIVE_INFINITY / 1));
            Assertions.assertTrue(Double.isInfinite(Double.NEGATIVE_INFINITY / 1));
            Assertions.assertTrue(Double.isInfinite(Double.POSITIVE_INFINITY / 0));
        });
    }
    ```
- 任何有限数值除以无穷大得到0，除以负无穷大得到0。
    ```java
    @Test
    public void numDivideInfTest() {
        Assertions.assertDoesNotThrow(() -> {
            Assertions.assertEquals(0, 1 / Double.POSITIVE_INFINITY);
            Assertions.assertEquals(-0.0, 1 / Double.NEGATIVE_INFINITY);
            Assertions.assertEquals(0, 0 / Double.POSITIVE_INFINITY);
            Assertions.assertEquals(-0.0, 0 / Double.NEGATIVE_INFINITY);
        });
    }
    ```
