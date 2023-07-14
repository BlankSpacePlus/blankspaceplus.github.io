---
title: 正确利用Java解决OJ题目
date: 2023-01-13 21:35:09
summary: 本文分享如何正确利用Java解决OJ题目。
mathjax: true
tags:
- 算法
categories:
- 算法分析与设计
---

# 前言

Java作为后端开发的主流语言，应用广泛。尽管如此，在解决OJ问题上，Java难以与C++相比，尤其是算法比赛的题目。

ICPC/CCPC比赛上用Java处理大数运算、LeetCode用Java刷题准备面试、非ICPC/CCPC选手避开C++组选择Java组参加蓝桥杯……事实上，Java解算法题也有很大的需求。

本人长期采用Java刷题，也曾用Java获得蓝桥杯国赛实质奖励，试给出自己的学习实践心得。

# Java的运行效率

Java程序的运行效率远低于C++程序，这是不争的事实。博主的朋友曾获得ICPC/CCPC的银牌，其参加比赛时，偶尔也会用Java来简化代码，可见Java也没有慢到不可接受。

Java算法程序执行的运行时间快慢，跟算不算JVM进程启动、销毁时间关系很大。博主读研的时候选修过一门高级数据结构与算法课程，那门课的OJ系统对Java程序的性能评估就不是很友好。等效的代码，Java竟然比Python还要慢上许多。这种时候，Java就变成了不可能的选项。

Java的输入输出也特别慢，还不方便。输入输出的性能问题，也是一个痛点。

对于不限制语言、重视算法优化细节的题目，一般会按照C/C++的性能来考虑，Java只能TLE。

# Java的优势

Java又慢又臃肿，还面向对象，都对解题不利。那为什么还要考虑Java？

Java最大的优势就是集合、大数、字符串。

java.util包下的集合类、java.math下的BigInteger和BigDecimal、丰富的字符串处理函数，都对快速实现任务目标非常有利。

# Java的输入输出

本节内容摘自本人文章：[深入剖析Java输入输出的那些细节](https://blankspace.blog.csdn.net/article/details/104216294)

## 输入

**java.util.Scanner**类可以直接读取特定类型的数据：
- **public String next()** → 读取下一个字符串（默认分隔符为Space or Tab or Enter）
- **public String next​(String pattern)** → 读取下一个字符串（匹配到的串符合指定的正则表达式）
- **public String next​(Pattern pattern)** → 读取下一个字符串（匹配到的串符合指定的正则表达式）
- **public BigDecimal nextBigDecimal(**) → 读取下一个高精小数（默认十进制）
- **public BigInteger nextBigInteger()** → 读取下一个高精整数（默认十进制）
- **public BigInteger nextBigInteger​(int radix)** → 读取下一个高精整数（指定进制）
- **public boolean nextBoolean()** → 读取下一个布尔值
- **public byte nextByte()** → 读取下一个byte整型数值（超容会报错，默认十进制）
- **public byte nextByte​(int radix)** → 读取下一个byte整型数值（超容会报错，指定进制）
- **public double nextDouble()** → 读取下一个双精度浮点数值（默认十进制）
- **public float nextFloat()** → 读取下一个单精度浮点数值（默认十进制）
- **public int nextInt()** → 读取下一个int整型数值（超容会报错，默认十进制）
- **public int nextInt​(int radix)** → 读取下一个int整型数值（超容会报错，指定进制）
- **public String nextLine()** → 读取下一行内容以字符串类型返回（分隔符为Enter）
- **public long nextLong()** → 读取下一个long整型数值（超容会报错，默认十进制）
- **public long nextLong​(int radix)** → 读取下一个long整型数值（超容会报错，指定进制）
- **public short nextShort()** → 读取下一个short整型数值（超容会报错，默认十进制）
- **public short nextShort​(int radix)** → 读取下一个short整型数值（超容会报错，指定进制）

案例代码：
```java
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
for (int i = 0; i < n; i++) {
    int x = sc.nextInt(), y = sc.nextInt();
    // do something
}
sc.close();
```

Scanner之所以能如此全能，依赖于Java支持的正则表达式。**反反复复的IO操作，每次都要判断和处理，会拉低效率。**

比如说在洛谷刷算法题的时候，博主一般是用Java，但很多次都TLE，不管怎么优化也不行。最后发现问题就在Scanner身上，此时可以换java.io.BufferedReader，性能大幅提升。

案例代码(方法声明throws java.io.IOException)：
```java
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
int num = Integer.parseInt(br.readLine());
int[] record = new int[num];
String[] nums = br.readLine().split("\\s+");
for (int i = 0; i < num; i++) {
    record[i] = Integer.parseInt(nums[i]);
}
br.close();
```

更极端的情况，需要手写快读代码。其实，此时已经可以考虑放弃Java改用C++了。

说明：
1. 性能实在不达标，看不对就换BufferedReader，再不行就手写快读或换更快的语言。
2. 切记scanner.nextInt()之后没换行，此时如果读一行scanner.nextLine()可能只读到空字符串`""`，导致后续RE或WA。所以遇到单行单个数值+单行多数值的情况，就直接先用`Integer.parseInt(scanner.nextLine())`再用`String[] array = scanner.nextLine().split("\\s+")`，把String[]转成int[]即可（切记不可直接强转，二者毫无关系）。
3. I/O非常慢，要减少I/O次数。
4. 使用完输入流后记得关闭，这是一个好习惯。用scanner，就写`scanner.close()`，用reader，就写`reader.close()`。
5. 输入流关闭之后就不能再用了，这点要注意，在最后用完之后关闭就好。
6. java.util.Scanner不需要处理异常，java.io.BufferedReader需要处理java.io.IOException，要么try...catch...finally，要么throws，不处理是不能通过编译的。当然啦，自动关闭资源的try语句也挺好的。

## 输出

**普通输出流**有**三种**输出方式：

第一种是**不换行输出**：
```java
int n = 1;
System.out.print(n);
```

第二种是**换行输出**：

```java
System.out.println(n);
```

第三种是**格式化输出**：

```java
System.out.printf("%d", n);
```

还有**错误输出流**，与上述内容类似：


第一种是**不换行输出**：
```java
System.err.print(n);
```

第二种是**换行输出**：

```java
System.err.println(n);
```

第三种是**格式化输出**：

```java
System.err.printf("%d", n);
```

说明：
1. 如果`printf()`的格式化不正确，就会爆`java.util.IllegalFormatConversionException`异常。
2. 为什么Eclipse/IDEA这样的IDE在爆异常的时候都可能红字和普通字混合？<br>异常是err错误流，普通输出是out普通输出流，可能会在IDE里由于线程的问题而混合在一起。
3. System.in/System.out/System.err是什么？<br>根据下面的源码（java.lang.System），可知分别是InputStream、PrintStream对象，err流和out流是同一个类的不同对象。
   ```java
    public static final InputStream in;
    public static final PrintStream out;
    public static final PrintStream err;`
4. 打印输出的时候会启动I/O，所以不建议直接输出，可以用StringBuilder把答案“组织好”再统一输出。
5. 循环里每次都cout的时候能不输出最后的空格，不需要额外的调整，但System.out.println()输出的时候没有这种考虑，必须自己处理最后一次的结果。我建议可以用`builder.append(i).append(" ")`和`builder.toString().trim()`，最后消去末尾的一个空格，即可完成所需要的输出。
6. 格式化打印指定位数小数是常见操作，可用printf()完成任务目标。比如，如果System.out.printf("%.5f")如果就是保留五位小数打印浮点数。

# JDK工具API

## java.lang.Math

java.lang.Math中的关键方法都是静态的，需要通过Math.method()的格式调用。

全部API：
public static double sin(double a)
public static double cos(double a)
public static double tan(double a)
public static double asin(double a)
public static double acos(double a)
public static double atan(double a)
public static double toRadians(double angdeg)
public static double toDegrees(double angrad)
public static double exp(double a)
public static double log(double a)
public static double log10(double a)
public static double sqrt(double a)
public static double cbrt(double a)
public static double IEEEremainder(double f1, double f2)
public static double ceil(double a)
public static double floor(double a)
public static double rint(double a)
public static double atan2(double y, double x)
public static double pow(double a, double b)
public static int round(float a)
public static long round(double a)
public static double random()
public static int addExact(int x, int y)
public static long addExact(long x, long y)
public static int subtractExact(int x, int y)
public static long subtractExact(long x, long y)
public static int multiplyExact(int x, int y)
public static long multiplyExact(long x, int y)
public static long multiplyExact(long x, long y)
public static int divideExact(int x, int y)
public static long divideExact(long x, long y)
public static int floorDivExact(int x, int y)
public static long floorDivExact(long x, long y)
public static int ceilDivExact(int x, int y)
public static long ceilDivExact(long x, long y)
public static int incrementExact(int a)
public static long incrementExact(long a)
public static int decrementExact(int a)
public static long decrementExact(long a)
public static int negateExact(int a)
public static long negateExact(long a)
public static int toIntExact(long value)
public static long multiplyFull(int x, int y)
public static long multiplyHigh(long x, long y)
public static long unsignedMultiplyHigh(long x, long y)
public static int floorDiv(int x, int y)
public static long floorDiv(long x, int y)
public static long floorDiv(long x, long y)
public static int floorMod(int x, int y)
public static int floorMod(long x, int y)
public static long floorMod(long x, long y)
public static int ceilDiv(int x, int y)
public static long ceilDiv(long x, int y)
public static long ceilDiv(long x, long y)
public static int ceilMod(int x, int y)
public static int ceilMod(long x, int y)
public static long ceilMod(long x, long y)
public static int abs(int a)
public static int absExact(int a)
public static long abs(long a)
public static long absExact(long a)
public static float abs(float a)
public static double abs(double a)
public static int max(int a, int b)
public static long max(long a, long b)
public static float max(float a, float b)
public static double max(double a, double b)
public static int min(int a, int b)
public static long min(long a, long b)
public static float min(float a, float b)
public static double min(double a, double b)
public static double fma(double a, double b, double c)
public static float fma(float a, float b, float c)
public static double ulp(double d)
public static float ulp(float f)
public static double signum(double d)
public static float signum(float f)
public static double sinh(double x)
public static double cosh(double x)
public static double tanh(double x)
public static double hypot(double x, double y)
public static double expm1(double x)
public static double log1p(double x)
public static double copySign(double magnitude, double sign)
public static float copySign(float magnitude, float sign)
public static int getExponent(float f)
public static int getExponent(double d)
public static double nextAfter(double start, double direction)
public static float nextAfter(float start, double direction)
public static double nextUp(double d)
public static float nextUp(float f)
public static double nextDown(double d)
public static float nextDown(float f)
public static double scalb(double d, int scaleFactor)
public static float scalb(float f, int scaleFactor)

## java.math.BigInteger

全部API：
public static BigInteger probablePrime(int bitLength, Random rnd)
public BigInteger nextProbablePrime()
public static BigInteger valueOf(long val)
public BigInteger add(BigInteger val)
public BigInteger subtract(BigInteger val)
public BigInteger multiply(BigInteger val)
public BigInteger parallelMultiply(BigInteger val)
public BigInteger divide(BigInteger val)
public BigInteger[] divideAndRemainder(BigInteger val)
public BigInteger remainder(BigInteger val)
public BigInteger pow(int exponent)
public BigInteger sqrt()
public BigInteger[] sqrtAndRemainder()
public BigInteger gcd(BigInteger val)
public BigInteger abs()
public BigInteger negate()
public int signum()
public BigInteger mod(BigInteger m)
public BigInteger modPow(BigInteger exponent, BigInteger m)
public BigInteger modInverse(BigInteger m)
public BigInteger shiftLeft(int n)
public BigInteger shiftRight(int n)
public BigInteger and(BigInteger val)
public BigInteger or(BigInteger val)
public BigInteger xor(BigInteger val)
public BigInteger not()
public BigInteger andNot(BigInteger val)
public boolean testBit(int n)
public BigInteger setBit(int n)
public BigInteger clearBit(int n)
public BigInteger flipBit(int n)
public int getLowestSetBit()
public int bitLength()
public int bitCount()
public boolean isProbablePrime(int certainty)
public int compareTo(BigInteger val)
public boolean equals(Object x)
public BigInteger min(BigInteger val)
public BigInteger max(BigInteger val)
public int hashCode()
public String toString(int radix)
public String toString()
public byte[] toByteArray()
public int intValue()
public long longValue()
public float floatValue()
public double doubleValue()
public long longValueExact()
public int intValueExact()
public short shortValueExact()
public byte byteValueExact()

## java.lang.String

全部API：
public int length()
public boolean isEmpty()
public char charAt(int index)
public int codePointAt(int index)
public int codePointBefore(int index)
public int codePointCount(int beginIndex, int endIndex)
public int offsetByCodePoints(int index, int codePointOffset)
public void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)
@Deprecated(since="1.1") public void getBytes(int srcBegin, int srcEnd, byte[] dst, int dstBegin)
public byte[] getBytes(String charsetName) throws UnsupportedEncodingException
public byte[] getBytes(Charset charset)
public byte[] getBytes()
public boolean equals(Object anObject)
public boolean contentEquals(StringBuffer sb)
public boolean contentEquals(CharSequence cs)
public boolean equalsIgnoreCase(String anotherString)
public int compareTo(String anotherString)
public int compareToIgnoreCase(String str)
public boolean regionMatches(int toffset, String other, int ooffset, int len)
public boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)
public boolean startsWith(String prefix, int toffset)
public boolean startsWith(String prefix)
public boolean endsWith(String suffix)
public int hashCode()
public int indexOf(int ch)
public int indexOf(int ch, int fromIndex)
public int lastIndexOf(int ch)
public int lastIndexOf(int ch, int fromIndex)
public int indexOf(String str)
public int indexOf(String str, int fromIndex)
public int lastIndexOf(String str)
public int lastIndexOf(String str, int fromIndex)
public String substring(int beginIndex)
public String substring(int beginIndex, int endIndex)
public CharSequence subSequence(int beginIndex, int endIndex)
public String concat(String str)
public String replace(char oldChar, char newChar)
public boolean matches(String regex)
public boolean contains(CharSequence s)
public String replaceFirst(String regex, String replacement)
public String replaceAll(String regex, String replacement)
public String replace(CharSequence target, CharSequence replacement)
public String[] split(String regex, int limit)
public String[] split(String regex)
public static String join(CharSequence delimiter, CharSequence... elements)
public static String join(CharSequence delimiter, Iterable<? extends CharSequence> elements)
public String toLowerCase(Locale locale)
public String toLowerCase()
public String toUpperCase(Locale locale)
public String toUpperCase()
public String trim()
public String strip()
public String stripLeading()
public String stripTrailing()
public boolean isBlank()
public Stream<String> lines()
public String indent(int n)
public String stripIndent()
public String translateEscapes()
public <R> R transform(Function<? super String,? extends R> f)
public String toString()
public IntStream chars()
public IntStream codePoints()
public char[] toCharArray()
public static String format(String format, Object... args)
public static String format(Locale l, String format, Object... args)
public String formatted(Object... args)
public static String valueOf(Object obj)
public static String valueOf(char[] data)
public static String valueOf(char[] data, int offset, int count)
public static String copyValueOf(char[] data, int offset, int count)
public static String copyValueOf(char[] data)
public static String valueOf(boolean b)
public static String valueOf(char c)
public static String valueOf(int i)
public static String valueOf(long l)
public static String valueOf(float f)
public static String valueOf(double d)
public String intern()
public String repeat(int count)
public Optional<String> describeConstable()
public String resolveConstantDesc(MethodHandles.Lookup lookup)

## 集合框架

![](../../images/算法分析与设计/正确利用Java解决OJ题目/1.gif)

常用集合：ArrayList、LinkedList、HashMap、TreeMap、HashSet、TreeSet、Deque、PriorityQueue。

迭代器可以用for..each...结构替代：
```java
for (String s : collection) {
    // do something
}
```

## 自定义排序

```java
private static class Person {
    Integer value;
    Integer id;
    Person(int value, int id) {
        this.value = value;
        this.id = id;
    }
}
```

```java
Arrays.sort(person_array, (person1, person2) -> {
    int result = -person1.value.compareTo(person2.value);
    return result == 0 ? person1.id.compareTo(person2.id) : result;
});
```

数组可以通过`java.util.Arrays.sort()`实现，集合可以通过`java.util.Collections.sort()`实现。

也可以构造`java.util.Comparator`，复用此Comparator。
