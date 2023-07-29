---
title: int、String、BigInteger的类型转换
date: 2023-04-26 21:25:47
summary: 本文分享int、String、BigInteger之间的类型转换方法。
tags:
- Java
categories:
- 开发技术
---

# int、Integer、String的类型转换

推荐阅读：[int、Integer、String的类型转换](https://blankspace.blog.csdn.net/article/details/104082723)

# int → BigInteger

推荐阅读：[BigInteger与BigDecimal](https://blankspace.blog.csdn.net/article/details/130354777)

Java提供了多种将int类型转换成BigInteger类型的方法。

方法1：通过BigInteger类的静态方法valueOf(int val)将int转换为BigInteger。

```java
int num = 123;
BigInteger bigInteger = BigInteger.valueOf(num);
```

这种方法比较简单直接。

方法2：通过将int转换为字符串，再使用BigInteger类的构造方法BigInteger(String val)将字符串转换为BigInteger。

```java
int num = 123;
String strNum = String.valueOf(num);
BigInteger bigInteger = new BigInteger(strNum);
```

如果int数值已经以字符串形式存在，或者需要用到其字符串对象，则用这种方法更合适。

方法3：通过将int转换为byte数组，再使用BigInteger类的构造方法BigInteger(byte[] val)将byte数组转换为BigInteger。

```java
int num = 123;
byte[] bytes = ByteBuffer.allocate(4).putInt(num).array();
BigInteger bigInteger = new BigInteger(bytes);
```

如果要进行进一步的计算，需要将int转换为byte数组，这种方法会比较方便。

# BigInteger → int

Java提供了多种将BigInteger类型转换成int类型的方法。

在将BigInteger转换为int时，需要注意BigInteger的值可能超出int类型的范围。如果超出了int类型的范围，那么转换的结果将是不准确的，可能会导致数据丢失或溢出。

方法1：使用BigInteger.intValue()方法。如果BigInteger的值超出了int类型的范围，则只返回int类型的最大或最小值。

```java
BigInteger bigInteger = new BigInteger("123456789");
int intValue = bigInteger.intValue();
```

对于int溢出的情况，BigInteger.longValue()方法可以将BigInteger转换为long类型。

```java
BigInteger bigInteger = new BigInteger("123456789");
long longValue = bigInteger.longValue();
```

方法2：使用BigInteger.intValueExact()方法，将BigInteger转换为int类型。如果BigInteger的值超出了int类型的范围，则会抛出java.lang.ArithmeticException异常。示例如下：

```java
BigInteger bigInteger = new BigInteger("123456789");
int intValueExact = bigInteger.intValueExact();
```

对于int溢出的情况，BigInteger.longValueExact()方法可以将BigInteger转换为long类型。

```java
BigInteger bigInteger = new BigInteger("123456789");
int intValueExact = (int) bigInteger.longValueExact();
```

# String → BigInteger

Java提供了BigInteger(String val)构造方法来将字符串转换成BigInteger。这个构造函数会把字符串按照10进制转换成BigInteger对象。如果需要使用其他进制，可以使用BigInteger(String val, int radix)构造方法创建对象。

下面使用了三种不同的方式来将字符串转换成BigInteger对象：
- 使用字符串构造函数：new BigInteger(str)
- 使用十六进制字符串构造函数：new BigInteger(hexStr, 16)
- 使用二进制字符串构造函数：先将二进制字符串转换成字节数组，然后使用new BigInteger(bytes)

```java
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        String str = "123456789012345678901234567890";
        BigInteger bigInteger1 = new BigInteger(str);
        System.out.println(bigInteger1);

        String hexStr = "1A2B3C4D5E6F";
        BigInteger bigInteger2 = new BigInteger(hexStr, 16);
        System.out.println(bigInteger2);

        String binStr = "10101010101010101010101010101010";
        byte[] bytes = new byte[binStr.length() / 8];
        for (int i = 0; i < binStr.length(); i += 8) {
            String byteStr = binStr.substring(i, i + 8);
            bytes[i / 8] = (byte) Integer.parseInt(byteStr, 2);
        }
        BigInteger bigInteger3 = new BigInteger(bytes);
        System.out.println(bigInteger3);
    }
}
```

可以看到，输出结果分别为字符串的十进制、十六进制和二进制表示形式对应的BigInteger对象。

# BigInteger → String

Java提供了toString()方法将BigInteger类型转换成String类型。

```java
BigInteger bigInteger = new BigInteger("123456789");
String str = bigInteger.toString();
```

以上代码将BigInteger类型的变量bi转换成String类型的变量str。在toString()方法中，BigInteger对象的值会被转换成一个十进制的字符串。如果需要转换成其他进制的字符串，可以使用toString(int radix)方法。例如，将BigInteger对象转换成二进制字符串：

```java
BigInteger bigInteger = new BigInteger("123456789");
String binaryStr = bigInteger.toString(2);
```

以上代码将BigInteger类型的变量bi转换成二进制字符串binaryStr。toString(int radix)方法中的参数radix指定了转换后的进制数，可以是2~36之间的任意整数。
