---
title: int、Integer、String的类型转换
date: 2020-01-25 11:08:12
summary: 本文分享int、Integer、String之间的类型转换方法。
tags:
- Java
categories:
- 开发技术
---

# int → String

Java提供了多种将int类型转换成String类型的方法。

方法1：使用String.valueOf()方法。
```java
String str = String.valueOf(123);
```

方法2：使用Integer.toString()方法。
```java
String str = Integer.toString(123);
```

该方法的源码如下所示：
```java
public static String toString(int i) {
    int size = stringSize(i);
    if (COMPACT_STRINGS) {
        byte[] buf = new byte[size];
        getChars(i, size, buf);
        return new String(buf, LATIN1);
    } else {
        byte[] buf = new byte[size * 2];
        StringUTF16.getChars(i, size, buf);
        return new String(buf, UTF16);
    }
}
```

无需先将int变量自动装箱为Integer再调用intObject.toString()。

因为还是调用了Integer.toString(int i)：
```java
private final int value;

public String toString() {
    return toString(value);
}
```

方法3：使用String.format()方法。
```java
String str = String.format("%d", 123);
```

方法4：使用StringBuilder或StringBuffer的append方法。
```java
StringBuilder sb = new StringBuilder();
sb.append(123);
String str = sb.toString();
```

这种方法比起直接采用`"" + 123`稍微好一点。

方法5：使用String的构造函数。
```java
String str = new String("123");
```

其中，方法1和方法2是最常用的方法，它们都是调用Integer类的静态方法将int类型转换为String类型。方法3使用了类似于C语言的格式化输出的方式，方法4使用StringBuilder或StringBuffer来拼接字符串，而方法5直接使用String类的构造函数来创建一个新的String对象。

需要注意的是，以上方法的效率不尽相同，方法1和方法2的效率较高，而方法3和方法4的效率较低，方法5的效率最低，因为它每次都会创建一个新的String对象。一般来说，应该尽量使用方法1或方法2来将int类型转换成String类型。

# String → int

Java提供了多种将String类型转换成int类型的方法。这些方法都可以将String类型的数字字符串转换成int类型，需要根据具体情况选择适合的方法。需要注意的是，在转换时要注意字符串是否合法，否则会抛出异常。

方法1：使用Integer类的parseInt()方法。

```java
String str = "123";
int num = Integer.parseInt(str);
```
这个方法可以将一个由数字字符组成的字符串转换成对应的int值。如果字符串不是合法的数字字符串，会抛出NumberFormatException异常。

方法2：使用Integer类的valueOf()方法。

```java
String str = "123";
int num = Integer.valueOf(str);
```
这个方法与parseInt()类似，也可以将数字字符串转换成int值。不同的是，它返回的是一个Integer对象，需要通过intValue()方法获取int值。同样，如果字符串不是合法的数字字符串，会抛出NumberFormatException异常。

方法3：使用Scanner类的nextInt()方法。

```java
Scanner scanner = new Scanner("123");
int num = scanner.nextInt();
```
这个方法是通过Scanner类来进行转换的，可以读取标准输入或者字符串中的int值。需要注意的是，如果读取到的值不是int类型的，会抛出InputMismatchException异常。

方法4：使用正则表达式。

```java
String str = "123";
if (str.matches("\\d+")) {
    int num = Integer.parseInt(str);
}
```
这个方法使用正则表达式来判断字符串是否为数字字符串，如果是则调用parseInt()方法进行转换。

# int → Integer

Java提供了多种将int类型转换成Integer类型的方法。需要注意的是，由于Integer类是不可变类，因此它的实例在创建后不能修改。因此，如果需要对一个已有的Integer对象进行修改，则需要创建一个新的Integer对象，而不能直接修改原对象。

方法1：使用Integer类的valueOf()方法。
```java
int num = 123;
Integer integer = Integer.valueOf(num);
```

方法2：使用Integer类的构造方法。
```java
int num = 123;
Integer integer = new Integer(num);
```

方法3：使用自动装箱。
```java
int num = 123;
Integer integer = num;
```

方法4：使用字符串拼接。
```java
int num = 123;
Integer integer = Integer.parseInt("" + num);
```

其中，前三种方法比较常用。

# Integer → int

Java提供了多种将Integer类型转换成int类型的方法。需要注意的是，Integer对象可能是null，因此要小心java.lang.NullPointerException空指针异常。

方法1：使用intValue()方法。
```java
Integer i = new Integer(42);
int j = i.intValue();
```

方法2：使用自动拆箱。（自动拆箱是指将包装类型自动转换为基本类型的过程，可以通过将Integer对象赋值给int类型的变量来实现自动拆箱。）
```java
Integer i = new Integer(42);
int j = i;
```

方法3：使用valueOf()方法。
```java
Integer i = new Integer(42);
int j = Integer.valueOf(i);
```
