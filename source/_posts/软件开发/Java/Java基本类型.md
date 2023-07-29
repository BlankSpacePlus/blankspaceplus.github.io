---
title: Java基本类型
date: 2020-02-27 21:50:49
summary: 本文深入剖析Java八种基本类型，包括byte、short、int、long、float、double、char、boolean。
tags:
- Java
categories:
- 开发技术
---

# 基本数据类型

Java语言提供了八种基本类型。六种数值类型（四种整数型，两种浮点型），一种字符类型，还有一种布尔型。

- 数值类型
    - 整数类型
        - **byte**
        - **short**
        - **int**
        - **long**
    - 浮点类型
        - **float**
        - **double**
  - 字符类型
      - **char**
  - 布尔类型
      - **boolean**

# 整数类型

## byte类型

byte 数据类型是8位、有符号的，以二进制补码表示的整数，用在大型数组中可节约空间，主要代替整数，因为 byte 变量占用的空间只有 int 类型的四分之一。
- 最小值：-128（-2^7^）
- 最大值：127（2^7^-1）
- 默认值：0

Example：

```java
byte a = 100;
byte b = -30;
```

## short类型

short 数据类型是 16 位、有符号的以二进制补码表示的整数，也可以像 byte 那样节省空间，一个short变量是int型变量所占空间的二分之一。
- 最小值：-32768（-2^15^）
- 最大值：32767（2^15^ - 1）
- 默认值：0

Example：

```java
short a = 30000;
short b = -200;
```

值得一提的是，下面的两段代码有所不同。第一段代码是合法的，第二段代码是不合法的。

```java
short s1 = 1;
s1 += 1;
```

第一段代码是合法的，因为+=操作符会将右侧的值进行自动类型转换为short类型，所以不会报错。

```java
short s2 = 1;
s2 = s2 + 1;
```

第二段代码是不合法的。因为+操作符会将两个操作数的类型转换为相同的类型，也就是int类型。因此，s1会先被自动转换成int类型，然后与常量1相加，结果也是int类型。而将一个int类型的变量的值直接赋值给short类型的变量时，需要进行强制类型转换，否则会出现编译错误。因此，第二段代码应该改为：

```java
short s2 = 1;
s2 = (short) (s2 + 1);
```

## int类型

int 数据类型是32位、有符号的以二进制补码表示的整数，整型变量默认为 int 类型。
- 最小值：-2,147,483,648（-2^31^）
- 最大值：2,147,483,647（2^31^ - 1）
- 默认值：0 

Example：

```java
int a = 1000000;
int b = -2000000;
```

## long类型

long 数据类型是 64 位、有符号的以二进制补码表示的整数，这种类型主要使用在需要比较大整数的系统上（真正巨大的数据要用java.math.BigInteger）。
需要强调的是：<code>long a = 9_223_372_036_854_775_807;</code> 是不对的，必须写成<code>long a = 9_223_372_036_854_775_807L;</code>，因为默认的整数数值就是int类型的。
"L"不分大小写，但是若写成"l"容易与数字"1"混淆，不容易分辨，所以应该大写。

- 最小值：-9,223,372,036,854,775,808L（-2^63^）
- 最大值：9,223,372,036,854,775,807L（2^63^ -1）
- 默认值：0L

Example： 

```java
long a = 9_223_372_036_854_775_807L;
long b = -2000000L;
```

byte数值、short数值、int数值、char数值可用于switch语句，而long数值不能用于switch语句。

# 浮点数类型

## float类型

float 数据类型是单精度、32位、符合IEEE 754标准的浮点数，float 在储存大型浮点数组的时候可节省内存空间。浮点数不能用来表示精确的值，Java高精运算要用java.math.BigDecimal。

- 默认值：0.0f

Example：

```java
float a = 123.4f;
```

值得一提的是，下面的代码是错误的：

```java
float n = 1.8;
```

## double类型

double 数据类型是双精度、64 位、符合IEEE 754标准的浮点数，浮点数的默认类型为double类型。double类型同样不能表示精确的值，Java高精运算要用java.math.BigDecimal。

- 默认值：0.0

Example：

```java
double a = 123.4;
```

# 字符类型

## char类型

char类型是一个单一的 16 位 Unicode 字符，char 数据类型理论上可以储存任何Unicode字符。

- 最小值：\u000（即为数值0，相当于''）
- 最大值：\uffff（即为数值65,535）
- 默认值：\u000（即为数值0，相当于''）

Example：

```java
char a = 'A';
char b = 100;
```

# 布尔类型

## boolean类型

boolean数据类型表示一位的信息，只有两个取值：true 和 false。这种类型只作为一种标志来记录 true/false 情况。但 boolean 的开销比 byte 大，byte 显然是更节省一些的。

- 默认值：false

Example：

```java
boolean a = true;
boolean a = false;
```

# 测试代码

```java
public class PrimitiveTypes {  
    public static void main(String[] args) {  
		System.out.println("****************************************************");  
        // byte类型  
        System.out.println("基本类型：byte 二进制位数：" + Byte.SIZE);  
        System.out.println("包装类：java.lang.Byte");  
        System.out.println("最小值：Byte.MIN_VALUE=" + Byte.MIN_VALUE);  
        System.out.println("最大值：Byte.MAX_VALUE=" + Byte.MAX_VALUE);  
        System.out.println("****************************************************");  
        // short类型  
        System.out.println("基本类型：short 二进制位数：" + Short.SIZE);  
        System.out.println("包装类：java.lang.Short");  
        System.out.println("最小值：Short.MIN_VALUE=" + Short.MIN_VALUE);  
        System.out.println("最大值：Short.MAX_VALUE=" + Short.MAX_VALUE);  
        System.out.println("****************************************************");  
        // int类型  
        System.out.println("基本类型：int 二进制位数：" + Integer.SIZE);  
        System.out.println("包装类：java.lang.Integer");  
        System.out.println("最小值：Integer.MIN_VALUE=" + Integer.MIN_VALUE);  
        System.out.println("最大值：Integer.MAX_VALUE=" + Integer.MAX_VALUE);  
        System.out.println("****************************************************");  
        // long类型  
        System.out.println("基本类型：long 二进制位数：" + Long.SIZE);  
        System.out.println("包装类：java.lang.Long");  
        System.out.println("最小值：Long.MIN_VALUE=" + Long.MIN_VALUE);  
        System.out.println("最大值：Long.MAX_VALUE=" + Long.MAX_VALUE);  
        System.out.println("****************************************************");  
        // float类型  
        System.out.println("基本类型：float 二进制位数：" + Float.SIZE);  
        System.out.println("包装类：java.lang.Float");  
        System.out.println("最小正数值：Float.MIN_VALUE=" + Float.MIN_VALUE);  
        System.out.println("最大正数值：Float.MAX_VALUE=" + Float.MAX_VALUE);  
        System.out.println("****************************************************");    
        // double类型  
        System.out.println("基本类型：double 二进制位数：" + Double.SIZE);  
        System.out.println("包装类：java.lang.Double");  
        System.out.println("最小正数值：Double.MIN_VALUE=" + Double.MIN_VALUE);  
        System.out.println("最大正数值：Double.MAX_VALUE=" + Double.MAX_VALUE);  
        System.out.println("****************************************************");  
        // char类型  
        System.out.println("基本类型：char 二进制位数：" + Character.SIZE);  
        System.out.println("包装类：java.lang.Character"); 
		System.out.println("最小值：Character.MIN_VALUE=" + Character.MIN_VALUE);
		System.out.println("最大值：Character.MAX_VALUE=" + Character.MAX_VALUE);
        // 以数值形式而不是字符形式将Character.MIN_VALUE输出到控制台  
        System.out.println("最小值：Character.MIN_VALUE=" + (int) Character.MIN_VALUE);  
        // 以数值形式而不是字符形式将Character.MAX_VALUE输出到控制台  
        System.out.println("最大值：Character.MAX_VALUE=" + (int) Character.MAX_VALUE);  
		System.out.println("****************************************************");  
    }  
}  
```

# 输出结果

```java
****************************************************
基本类型：byte 二进制位数：8
包装类：java.lang.Byte
最小值：Byte.MIN_VALUE=-128
最大值：Byte.MAX_VALUE=127
****************************************************
基本类型：short 二进制位数：16
包装类：java.lang.Short
最小值：Short.MIN_VALUE=-32768
最大值：Short.MAX_VALUE=32767
****************************************************
基本类型：int 二进制位数：32
包装类：java.lang.Integer
最小值：Integer.MIN_VALUE=-2147483648
最大值：Integer.MAX_VALUE=2147483647
****************************************************
基本类型：long 二进制位数：64
包装类：java.lang.Long
最小值：Long.MIN_VALUE=-9223372036854775808
最大值：Long.MAX_VALUE=9223372036854775807
****************************************************
基本类型：float 二进制位数：32
包装类：java.lang.Float
最小正数值：Float.MIN_VALUE=1.4E-45
最大正数值：Float.MAX_VALUE=3.4028235E38
****************************************************
基本类型：double 二进制位数：64
包装类：java.lang.Double
最小正数值：Double.MIN_VALUE=4.9E-324
最大正数值：Double.MAX_VALUE=1.7976931348623157E308
****************************************************
基本类型：char 二进制位数：16
包装类：java.lang.Character
最小值：Character.MIN_VALUE=
最大值：Character.MAX_VALUE=￿
最小值：Character.MIN_VALUE=0
最大值：Character.MAX_VALUE=65535
****************************************************
```
