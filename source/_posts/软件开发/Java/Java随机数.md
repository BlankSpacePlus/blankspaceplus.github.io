---
title: Java随机数
date: 2020-02-12 00:46:07
summary: 本文介绍Java随机数的内容。
tags:
- Java
categories:
- Java
---

# 随机数

根据密码学原理，随机数的随机性检验可以分为三个标准：
- **统计学伪随机性**。统计学伪随机性指的是在给定的随机比特流样本中，1的数量大致等于0的数量，同理，“10”“01”“00”“11”四者数量大致相等。类似的标准被称为统计学随机性。满足这类要求的数字在人类“一眼看上去”是随机的。
- **密码学安全伪随机性**。其定义为，给定随机样本的一部分和随机算法，不能有效的演算出随机样本的剩余部分。
- **真随机性**。其定义为随机样本不可重现。实际上只要给定边界条件，真随机数并不存在，可是如果产生一个真随机数样本的边界条件十分复杂且难以捕捉（比如计算机当地的本底辐射波动值），可以认为用这个方法演算出来了真随机数。

相应的，随机数也分为三类：
- **伪随机数**：满足第一个条件的随机数。
- **密码学安全的伪随机数**：同时满足前两个条件的随机数。可以通过密码学安全伪随机数生成器计算得出。
- **真随机数**：同时满足三个条件的随机数。

# java.lang.Math.random()

定义：`public static double random()`

源码实现：

```java
public static double random() {
    return Math.RandomNumberGeneratorHolder.randomNumberGenerator.nextDouble();
}
```

```java
private static final class RandomNumberGeneratorHolder {

    static final Random randomNumberGenerator = new Random();

    private RandomNumberGeneratorHolder() {}
    
}
```

根据源码分析得：<br>
**java.lang.Math** 类里有一个私有静态内部类，内有一个静态的 **java.util.Random** 类对象，调用其 **nextDouble()** 方法，生成 **[0.0, 1.0)** 范围内的伪随机浮点数。

注意：使用的时候别忘了**强转**int或者long，除非需要的是浮点数。

# java.util.Random

主要API：

- **protected int next​(int bits)**：生成下一个伪随机数。（注意**protected**，直接调用不了的）
- **public boolean nextBoolean()**：从此随机数生成器的序列中返回下一个伪随机、均匀分布的布尔值。
- **public void nextBytes​(byte[] bytes)**：生成随机字节并将其放入用户提供的字节数组中。
- **public double nextDouble()**：返回下一个伪随机数，它是此随机数生成器的序列中介于0.0和1.0之间的均匀分布的double值。
- **public float nextFloat()**：返回下一个伪随机数，此随机数生成器的序列在0.0和1.0之间均匀分布的float值。
- **public double nextGaussian()**：返回下一个伪随机数，与该随机数生成器的序列的 **$μ=0.0$，$σ^2=1.0$** 的高斯（“正态”）分布双精度值。
- **public int nextInt()**：返回下一个伪随机数，它是此随机数生成器序列中均匀分布的int值。
- **public int nextInt​(int bound)**：返回一个伪随机数，它从此随机数生成器的序列中提取，在0（**含**）和指定值（**不含**）之间均匀分布的int值。
- **public long nextLong()**：返回下一个伪随机数，该随机数是从此随机数生成器的序列中均匀分布的long值。

通过`new Random().nextInt(to-from)+from`，输出两端的边界，就可以生成[**左闭右开**](https://blankspace.blog.csdn.net/article/details/99618264)区间的随机整数了。

还可以自己借助循环逐位生成的大随机数：

```java
Random random = new Random();
StringBuilder result = new StringBuilder();
for (int i = 0; i < 9; i++) {
    result.append(random.nextInt(10));
}
System.out.println(Long.parseLong(result.toString()));
```

`Long.parseLong(result.toString())`这步处理是为了消除先导0。

或者一步到位：

```java
Random random = new Random();
StringBuilder result = new StringBuilder();
result.append(random.nextInt(9)+1);
for (int i = 0; i < 8; i++) {
    result.append(random.nextInt(10));
}
System.out.println(Long.parseLong(result.toString()));
```

对于 java.util.Random，JVM 通过传入的**种子**（seed）来确定生成随机数的区间。

种子是一个**数字**，可称“种子值”，它为生成新的随机数提供了基础。
只要种子值相同，获取的随机数的序列就是一致的，而且生成的结果都是可以预测的。

这里seed对象的类型是 **java.util.concurrent.AtomicLong**，而不是简简单单的long。

种子值还是可变的。

**public void setSeed​(long seed)** 方法可生成随机数：

```java
public synchronized void setSeed(long seed) {
    this.seed.set(initialScramble(seed));
    this.haveNextNextGaussian = false;
}
```
调用的initialScramble()：
```java
private static long initialScramble(long seed) {
    return (seed ^ 25214903917L) & 281474976710655L;
}
```

这是一种伪随机数的实现，而不是真正的随机数 。

伪随机只是统计学上的概念，生成的伪随机数是**有一定规律的**，而这个规律出现的周期随着伪随机算法的优劣而不同。一般来说这个“周期”比较长，但是也是可以预测的。

再看看next(int bits)方法的源码：

```java
protected int next(int bits) {
    AtomicLong seed = this.seed;
    long oldseed;
    long nextseed;
    do {
        oldseed = seed.get();
        nextseed = oldseed * 25214903917L + 11L & 281474976710655L;
    } while(!seed.compareAndSet(oldseed, nextseed));
    return (int)(nextseed >>> 48 - bits);
}
```

Random 类是线程安全的，根据 next(int bits) 还有seed的属性，可以看出其内部使用 CAS 来保证线程安全性。

一般而言，CAS 相比加锁有一定的优势（参考“乐观锁”），但**并不一定意味着高效**。
我们可以在每次使用 Random 时都去 new 一个新的线程私有化的 Random 对象。在不同线程上并发使用相同的Random实例可能会导致争用，从而导致性能不佳，问题源于使用种子来生成随机数。

首先，旧种子和新种子存储在两个辅助变量上。在这一点上，创造新种子的规则并不重要。<br>
要保存新种子，使用 **compareAndSet()** 方法将旧种子替换为下一个新种子，但这仅仅在旧种子对应于当前设置的种子的条件下才会触发。<br>
如果此时的值由并发线程操纵，则该方法返回false，这意味着旧值与例外值不匹配。因为是循环内进行的操作，那么会发生**自旋**，直到变量与例外值匹配。这可能会导致性能不佳和线程竞争。

使用 java.lang.ThreadLocal 来维护线程私有化对象 以及 使用java.util.concurrent.ThreadLocalRandom 都更适合于多线程并发环境。

# java.util.concurrent.ThreadLocalRandom

ThreadLocalRandom是**隔离到当前线程**的随机数生成器。

像Math类使用的全局Random生成器一样，ThreadLocalRandom会使用内部生成的种子进行初始化，否则无法进行修改。

ThreadLocalRandom 继承了Random并添加选项以限制其使用到相应的线程实例。为此，ThreadLocalRandom的实例保存在相应线程的内部映射中，并通过调用current()来返回对应的Random。

如果适用的话，在并发程序中使用ThreadLocalRandom而不是共享Random对象通常会遇到更少的开销和竞争。

当多个任务（例如，每个ForkJoinTask）在线程池中并行使用随机数时，使用ThreadLocalRandom特别合适。

ThreadLocalRandom的构造器是private的：

```java
private ThreadLocalRandom() {}
```

获取对象要调用current()：

```java
public static ThreadLocalRandom current() {
    if (U.getInt(Thread.currentThread(), PROBE) == 0) {
        localInit();
    }

    return instance;
}
```

当所有用法都是这种形式时，永远不可能在多个线程之间意外地共享ThreadLocalRandom。

调用方法：
```java
ThreadLocalRandom.current().nextX()
```
nextX()包括nextBoolean()、nextDouble()、nextFloat()、nextInt()、nextLong()等……

例如：
```java
ThreadLocalRandom.current().nextInt()
```

ThreadLocalRandom的实例不是加密安全的，还是普通的“伪随机数”。考虑在对安全敏感的应用程序中使用SecureRandom。此外，除非系统属性`java.util.secureRandomSeed`设置为true，否则默认构造的实例不会使用加密的随机种子。

# java.security.SecureRandom

通过对Random的一些分析我们可以知道Random事实上是伪随机，是可以推导出规律的，而且依赖种子（seed）。如果抽奖或者其他一些对随机数敏感的场景时，用Random不合适。JDK提供了 **java.security.SecureRandom** 来解决问题。

SecureRandom提供了加密功能强的随机数生成器（RNG）。

加密强度高的随机数至少要符合FIPS 140-2“加密模块的安全性要求”第4.9.1节中指定的统计随机数生成器测试。此外，SecureRandom必须产生不确定的输出。因此，传递给SecureRandom对象的任何种子材料都必须不可预测，并且所有SecureRandom输出序列必须具有加密强度，如RFC 4086：安全性的随机性要求中所述。

许多SecureRandom实现采用伪随机数生成器（PRNG，也称为确定性随机位生成器或DRBG）的形式，这意味着它们使用确定性算法从随机种子生成伪随机序列。其他实现可以产生真正的随机数，而其他实现则可以使用两种技术的组合。

SecureRandom是强随机数生成器，它可以产生高强度的随机数，产生高强度的随机数依赖两个重要的因素：**种子**和**算法**。算法是可以有很多的，通常如何选择种子是非常关键的因素。 
Random的种子是 **System.currentTimeMillis()**，所以它的随机数都是**可预测**的， 是弱伪随机数。

强伪随机数的生成思路：收集计算机的各种信息，键盘输入时间，内存使用状态，硬盘空闲空间，IO延时，进程数量，线程数量等信息，CPU时钟，来得到一个近似随机的种子，主要是达到**不可预测性**。<br>
说的更通俗就是，使用加密算法生成很长的一个随机种子，让人无法猜测出种子，也就无法推导出随机序列数。

调用者通过无参数构造函数或getInstance方法之一获取SecureRandom实例。<br>
例如：
- `SecureRandom r1 = new SecureRandom();`
- `SecureRandom r2 = SecureRandom.getInstance("NativePRNG");`
- `SecureRandom r3 = SecureRandom.getInstance("DRBG", DrbgParameters.instantiation(128, RESEED_ONLY, null));`

上面的第三条语句返回支持特定实例化参数的特定算法的SecureRandom对象。实现的有效实例化参数必须匹配此最小请求，但不一定相同。例如，即使请求不需要某个功能，实际的实例也可以提供该功能。一个实现可以延迟地实例化SecureRandom，直到它被实际使用为止，但是有效的实例化参数必须在创建后立即确定，并且getParameters() 始终应返回不变的相同结果。

SecureRandom的典型调用者调用以下方法来检索随机字节：
- `SecureRandom random = new SecureRandom();`
- `byte[] bytes = new byte[20];`
- `random.nextBytes(bytes);`

调用者还可以调用generateSeed(int)方法来生成给定数量的种子字节（例如，为其他随机数生成器提供种子）：`byte[] seed = random.generateSeed(20);`

不播种新创建的PRNG SecureRandom对象（除非它是由SecureRandom(byte [])创建的）。对nextBytes的首次调用将强制其从实现特定的熵源中播种自身。如果先前调用过setSeed，则不会发生这种自我播种。

通过调用reseed或setSeed方法，可以随时重新播种SecureRandom。重新设定种子的方法从其熵源读取熵输入以重新设定其自身的种子。 setSeed方法要求调用者提供种子。

请注意，**并非所有SecureRandom实施都支持种子**。

一些SecureRandom实现可能在其`nextBytes(byte []，SecureRandomParameters)`和`reseed(SecureRandomParameters)`方法中接受SecureRandomParameters参数，以进一步控制这些方法的行为。

注意：**根据实现的不同，例如，在各种类Unix操作系统上，如果熵源是/dev/random，则在收集熵时，generateSeed、reseed、nextBytes方法可能会阻塞。**

SecureRandom对象可安全用于多个并发线程。<br>
通过在注册提供程序时将服务提供程序属性“ ThreadSafe”设置为“ true”，SecureRandom服务提供程序可以公告它是线程安全的。 否则，此类将改为同步对SecureRandomSpi实现的以下方法的访问：
- `SecureRandomSpi.engineSetSeed(byte[])`
- `SecureRandomSpi.engineNextBytes(byte[])`
- `SecureRandomSpi.engineNextBytes(byte[], SecureRandomParameters)`
- `SecureRandomSpi.engineGenerateSeed(int)`
- `SecureRandomSpi.engineReseed(SecureRandomParameters)`

# java.lang.System.currentTimeMillis()

可以用`System.currentTimeMillis()`生成随机数：<br>
利用System.currentTimeMillis()，获取从1970年1月1日0时0分0秒（这与UNIX系统有关，Java就这么搞的）到此刻的一个long型的毫秒数，取模之后即可得到所需范围内的随机数。

```java 
int max=100,min=1;
long randomNum = System.currentTimeMillis();  
int ran3 = (int) (randomNum%(max-min)+min);  
System.out.println(ran3);
```
