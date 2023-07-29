---
title: Java数组的类型
date: 2020-01-25 14:18:46
summary: 本文探究Java数组的类型。
tags:
- Java
categories:
- 开发技术
---

# 数组是一种引用类型

想要证明一个对象是引用类型的变量，找到它的类即可。

虽然我们找不到Java里任何数组的类的实现（注意java.util.Arrays只是数组的工具类，并不是数组的类），但我们可以用反射来证实：

```java
int[] int_array = new int[10];
System.out.println("int[]的类型是：" + int_array.getClass());
```

结果是：
<font color="red">int[]的类型是：class [I</font>

我们知道，Java里面所有的类都有公有的父类：java.lang.Object，int[]的类型应该是java.lang.Object类型的派生类。

我们用反射先获取int[]的类型再获取其基类类型：

```java
int[] int_array = new int[10];
System.out.println("int[]的类型是：" + int_array.getClass());
System.out.println("int[]的父类：" + int_array.getClass().getSuperclass());
```

结果是：
<font color="red">int[]的类型是：class [I
int[]的父类：class java.lang.Object</font>

# 数组的类型名称

## 基本类型元素的数组

获取基本类型元素的数组类型名称：

```java
long[] long_array = new long[10];
int[] int_array = new int[10];
short[] short_array = new short[10];
byte[] byte_array = new byte[10];
char[] char_array = new char[10];
double[] double_array = new double[10];
float[] float_array = new float[10];
boolean[] boolean_array = new boolean[10];
System.out.println("long[]的类型是：" + long_array.getClass());
System.out.println("int[]的类型是：" + int_array.getClass());
System.out.println("short[]的类型是：" + short_array.getClass());
System.out.println("byte[]的类型是：" + byte_array.getClass());
System.out.println("char[]的类型是：" + char_array.getClass());
System.out.println("double[]的类型是：" + double_array.getClass());
System.out.println("float[]的类型是：" + float_array.getClass());
System.out.println("boolean[]的类型是：" + boolean_array.getClass());
```

输出结果：
<font color="red">long[]的类型是：class [J
int[]的类型是：class [I
short[]的类型是：class [S
byte[]的类型是：class [B
char[]的类型是：class [C
double[]的类型是：class [D
float[]的类型是：class [F
boolean[]的类型是：class [Z</font>

## 引用类型元素的数组

获取引用类型元素的数组类型名称：

```java
Integer[] integer_array = new Integer[10];
Boolean[] boolean_b_array = new Boolean[10];
String[] string_array = new String[10];
Arrays[] arrays_array = new Arrays[10];
BigInteger[] bigInteger_array = new BigInteger[10];
System.out.println("Integer[]的类型是：" + integer_array.getClass());
System.out.println("Boolean[]的类型是：" + boolean_b_array.getClass());
System.out.println("String[]的类型是：" + string_array.getClass());
System.out.println("Arrays[]的类型是：" + arrays_array.getClass());
System.out.println("BigInteger[]的类型是：" + bigInteger_array.getClass());
```

输出结果：
<font color="red">Integer[]的类型是：class [Ljava.lang.Integer;
Boolean[]的类型是：class [Ljava.lang.Boolean;
String[]的类型是：class [Ljava.lang.String;
Arrays[]的类型是：class [Ljava.util.Arrays;
BigInteger[]的类型是：class [Ljava.math.BigInteger;</font>

# 二维数组与多维数组

获取二维数组与多维数组的类型名称：

```java
int[][] int_int_array = new int[10][10];
int[][][] int_int_int_array = new int[10][10][10];
System.out.println("int[][]的类型是：" + int_int_array.getClass());
System.out.println("int[][][]的类型是：" + int_int_int_array.getClass());
```

输出结果：
<font color="red">int[][]的类型是：class [[I
int[][][]的类型是：class [[[I</font>

# 完整代码

```java
import java.math.BigInteger;
import java.util.Arrays;

public class ArrayTypeDemo {
    public static void main(String[] args) {
        long[] long_array = new long[10];
        int[] int_array = new int[10];
        short[] short_array = new short[10];
        byte[] byte_array = new byte[10];
        char[] char_array = new char[10];
        double[] double_array = new double[10];
        float[] float_array = new float[10];
        boolean[] boolean_array = new boolean[10];
        // 包装类的数组
        Integer[] integer_array = new Integer[10];
        Boolean[] boolean_b_array = new Boolean[10];
        // 某些引用类型的数组
        String[] string_array = new String[10];
        Arrays[] arrays_array = new Arrays[10];
        BigInteger[] bigInteger_array = new BigInteger[10];
        // 二维数组
        int[][] int_int_array = new int[10][10];
        // 三维数组
        int[][][] int_int_int_array = new int[10][10][10];
        System.out.println("long[]的类型是：" + long_array.getClass());
        System.out.println("int[]的类型是：" + int_array.getClass());
        System.out.println("short[]的类型是：" + short_array.getClass());
        System.out.println("byte[]的类型是：" + byte_array.getClass());
        System.out.println("char[]的类型是：" + char_array.getClass());
        System.out.println("double[]的类型是：" + double_array.getClass());
        System.out.println("float[]的类型是：" + float_array.getClass());
        System.out.println("boolean[]的类型是：" + boolean_array.getClass());
        System.out.println("Integer[]的类型是：" + integer_array.getClass());
        System.out.println("Boolean[]的类型是：" + boolean_b_array.getClass());
        System.out.println("String[]的类型是：" + string_array.getClass());
        System.out.println("Arrays[]的类型是：" + arrays_array.getClass());
        System.out.println("BigInteger[]的类型是：" + bigInteger_array.getClass());
        System.out.println("int[][]的类型是：" + int_int_array.getClass());
        System.out.println("int[][][]的类型是：" + int_int_int_array.getClass());
        // 父类
        System.out.println("int[]的父类：" + int_array.getClass().getSuperclass());
    }
}
```

输出结果：

```
long[]的类型是：class [J
int[]的类型是：class [I
short[]的类型是：class [S
byte[]的类型是：class [B
char[]的类型是：class [C
double[]的类型是：class [D
float[]的类型是：class [F
boolean[]的类型是：class [Z
Integer[]的类型是：class [Ljava.lang.Integer;
Boolean[]的类型是：class [Ljava.lang.Boolean;
String[]的类型是：class [Ljava.lang.String;
Arrays[]的类型是：class [Ljava.util.Arrays;
BigInteger[]的类型是：class [Ljava.math.BigInteger;
int[][]的类型是：class [[I
int[][][]的类型是：class [[[I
int[]的父类：class java.lang.Object
```
