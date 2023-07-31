---
title: Java基本输入输出
date: 2020-02-07 23:24:25
summary: 本文深入剖析Java输入输出的那些细节。
tags:
- Java
categories:
- Java
---

# Java的基本输入

**java.util.Scanner**类可以直接读取特定类型的数据：

| 方法名 | 方法说明 |
|:----:|:----:|
| **public String next()** | 读取下一个字符串（默认分隔符为Space or Tab or Enter）|
| **public String next​(String pattern)** | 读取下一个字符串（匹配到的串符合指定的正则表达式）|
| **public String next​(Pattern pattern)** | 读取下一个字符串（匹配到的串符合指定的正则表达式）|
| **public BigDecimal nextBigDecimal(**) | 读取下一个高精小数（默认十进制）|
| **public BigInteger nextBigInteger()** | 读取下一个高精整数（默认十进制）|
| **public BigInteger nextBigInteger​(int radix)** | 读取下一个高精整数（指定进制）|
| **public boolean nextBoolean()** | 读取下一个布尔值 |
| **public byte nextByte()** | 读取下一个byte整型数值（超容会报错，默认十进制）|
| **public byte nextByte​(int radix)** | 读取下一个byte整型数值（超容会报错，指定进制）|
| **public double nextDouble()** | 读取下一个双精度浮点数值（默认十进制）|
| **public float nextFloat()** | 读取下一个单精度浮点数值（默认十进制）|
| **public int nextInt()** | 读取下一个int整型数值（超容会报错，默认十进制）|
| **public int nextInt​(int radix)** | 读取下一个int整型数值（超容会报错，指定进制）|
| **public String nextLine()** | 读取下一行内容以字符串类型返回（分隔符为Enter）|
| **public long nextLong()** | 读取下一个long整型数值（超容会报错，默认十进制）|
| **public long nextLong​(int radix)** | 读取下一个long整型数值（超容会报错，指定进制）|
| **public short nextShort()** | 读取下一个short整型数值（超容会报错，默认十进制）|
| **public short nextShort​(int radix)** | 读取下一个short整型数值（超容会报错，指定进制）|

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

# Java的基本输出

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
