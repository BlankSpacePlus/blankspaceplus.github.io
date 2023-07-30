---
title: BigInteger与BigDecimal
date: 2023-04-25 00:26:00
summary: 本文分享BigInteger与BigDecimal的相关内容。
tags:
- Java
categories:
- Java
---

# java.math.BigInteger

BigInteger 是 Java 中提供的一个用于表示任意精度整数的类。其内部实现机制是基于数组的，即使用数组来存储这个任意精度整数。这种实现机制使得 BigInteger 能够表示任意长度的整数，而不受固定数据类型长度的限制。

具体来说，BigInteger 内部使用一个 int[] 数组来存储整数，每个数组元素代表四个字节，即 32 位。这个数组的长度可以动态变化，因此能够表示非常大的整数。

BigInteger 支持大量的整数运算，包括加、减、乘、除等等。在运算时，它会将两个 BigInteger 对象的数组逐位进行运算，并将结果存储到新的 BigInteger 对象中。这种运算机制保证了 BigInteger 的运算精度和正确性。

BigDecimal的常用构造方法包括：
- `public BigInteger(String val)`：该构造方法接收一个字符串参数val，并将其转换为BigInteger类型。字符串val中只能包含数字字符和可选的符号（+、-），否则将抛出NumberFormatException异常。
- `public BigInteger(int signum, byte[] magnitude)`：该构造方法接收两个参数：signum表示值的正负，1为正数，-1为负数，0为零；magnitude表示值的绝对值。magnitude是一个字节数组，最高位是符号位，剩下的位表示数值。如果magnitude的长度为0，则表示值为零。
- `public BigInteger(int bitLength, int certainty, Random rnd)`：该构造方法接收三个参数：bitLength表示要生成的BigInteger值的二进制位数；certainty表示该值为素数的概率，概率为1 - 1/2^certainty；rnd是用于生成随机数的Random对象。如果bitLength小于等于0，则抛出IllegalArgumentException异常；如果certainty小于等于0，则使用默认值10；如果rnd为null，则使用默认的随机数生成器。

BigInteger类的实例是不可变的，即一旦创建就不能更改。它提供了多种构造方法，可以从Java基本类型、字符串、字节数组等多种数据类型转换而来。下面是一些常用的方法：
- `add(BigInteger val)`：加法操作，返回当前对象与val相加的结果。
- `subtract(BigInteger val)`：减法操作，返回当前对象减去val的结果。
- `multiply(BigInteger val)`：乘法操作，返回当前对象与val相乘的结果。
- `divide(BigInteger val)`：除法操作，返回当前对象除以val的结果。
- `mod(BigInteger val)`：取模操作，返回当前对象除以val的余数。
- `and(BigInteger val)`：按位与操作，返回当前对象与val进行按位与运算的结果。
- `or(BigInteger val)`：按位或操作，返回当前对象与val进行按位或运算的结果。
- `xor(BigInteger val)`：按位异或操作，返回当前对象与val进行按位异或运算的结果。
- `shiftLeft(int n)`：左移n位操作，返回当前对象左移n位的结果。
- `shiftRight(int n)`：右移n位操作，返回当前对象右移n位的结果。

需要注意的是，由于 BigInteger 是通过数组来存储整数的，因此其性能可能比固定长度的整数类型差。在需要大量进行整数运算时，应该尽量使用固定长度的整数类型，比如 int、long 等。

# java.math.BigDecimal

BigDecimal是Java中用于表示任意精度的十进制数的类，它的实现机制涉及到了高精度计算、位运算、字符串处理等多个方面。

在Java中，浮点数的计算是基于IEEE 754标准进行的，因此浮点数的运算结果可能会存在舍入误差。而BigDecimal则可以通过使用任意精度的定点数来避免这种误差。它的内部实现是基于一个int类型的数组，每个元素表示一个十进制数位。而整个数组的长度则根据实际数值的位数来确定。

BigDecimal的常用构造方法包括：
- `public BigDecimal(double val)`：用double类型的值创建BigDecimal对象。
- `public BigDecimal(String val)`：用字符串表示的数值创建BigDecimal对象。

BigDecimal常用的方法：
- `add(BigDecimal value)`：将当前BigDecimal对象与传入的value相加并返回结果。
- `subtract(BigDecimal value)`：将当前BigDecimal对象减去传入的value并返回结果。
- `multiply(BigDecimal value)`：将当前BigDecimal对象乘以传入的value并返回结果。
- `divide(BigDecimal value)`：将当前BigDecimal对象除以传入的value并返回结果。
- `pow(int n)`：将当前BigDecimal对象的值做n次方并返回结果。
- `negate()`：返回当前BigDecimal对象的相反数。
- `abs()`：返回当前BigDecimal对象的绝对值。
- `compareTo(BigDecimal value)`：将当前BigDecimal对象与传入的value进行比较，返回值为-1、0或1，表示当前对象小于、等于或大于传入的值。
- `equals(Object obj)`：判断当前BigDecimal对象是否与传入的obj相等。
- `toString()`：返回当前BigDecimal对象的字符串表示。
- `stripTrailingZeros()`：去除当前BigDecimal对象尾部的0。
- `setScale(int scale, RoundingMode roundingMode)`：将当前BigDecimal对象的小数位数设置为scale，同时指定舍入模式roundingMode。
- `round(MathContext mathContext)`：按照指定的舍入模式roundingMode对当前BigDecimal对象进行舍入，返回结果。
- `remainder(BigDecimal value)`：计算当前BigDecimal对象除以传入的value的余数并返回结果。
- `scale()`：返回当前BigDecimal对象的小数位数。
- `precision()`：返回当前BigDecimal对象的精度。
- `unscaledValue()`：返回当前BigDecimal对象的非标度值。

当进行加、减、乘、除等运算时，BigDecimal会根据运算符的不同，调用相应的方法实现对应的运算。例如，加法运算的实现过程如下：
1. 获取参与运算的两个BigDecimal对象的小数位数。
2. 取两个对象的小数位数的最大值。
3. 根据最大小数位数创建一个新的BigDecimal对象。
4. 对于两个对象的整数部分，按位进行加法运算，将结果保存到新的BigDecimal对象中。
5. 对于两个对象的小数部分，按位进行加法运算，将结果保存到新的BigDecimal对象中。
6. 最终得到的新的BigDecimal对象即为加法运算的结果。

除此之外，BigDecimal还提供了一系列方法，用于实现比较、取绝对值、取余数、取幂等数学运算。它的实现机制比较复杂，需要进行高精度计算和位运算等操作，因此在处理大量数据时可能会影响性能。
