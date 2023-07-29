---
title: Java数值计算的常见错误
date: 2020-03-07 01:07:00
summary: 本文归纳Java数值计算容易出现的错误。
tags:
- Java
categories:
- 开发技术
---

# 错误1：整数除法得整数

这是老生常谈的话题了，也是很坑的一个点。

```java
1 / 2 => 0
```

为啥？因为整数除法，得到整数，相当于应得的浮点数会被截断取整。

解决策略：先转型：

```java
(double)1 / 2 => 0.5
```

# 错误2：运算后转型会溢出

之前在做洛谷OJ题解的时候多次提到这个问题：
比如两个int相乘再除以一个int，结果不会爆，但如果你使用int就会爆，甚至可能得到负数。
就算你用了long，也是先执行等号右边的计算，计算的类型还是int，只不过相当于先进行了运算后进行了转换。
我们要操作的话，宁可先转型后运算也不要弄颠倒了。

# 错误3：负数取模得负数

```java
3 % 2 => 1
-1 % 2 => -1
-3 % 2 => -1
(-3) % 2 => -1
```

所以说，千万别以为负数会按照正数的规则去取模，当然，只不过互为相反数的两个数，取模结果也互为相反数。

补充，对负数取模会被认为是对其相反数取模。

取模的算法被模拟为Java代码大概是这样的（以a%b为例）：

```java
ans = a - a/b*b;
```

# 错误4：奇偶数判定不靠谱

这里有个讲究：奇偶数的判定，要用偶判断，不要用奇判断。

```java
i % 2 == 1
```
上面的判断表达式就是奇判断，根据上面讲的取模的坑，我们就知道了，负数取模还是负数啊，怎么可能是正整数1呢？
所以，得到的偶数范围包含了正偶数、零和负整数。


其实，用下面的偶判断表达式更合理一些：

```java
i % 2 == 0
```
（可以用位运算替换）

# 错误5：运算符不能算大数

大数要用 java.math.BigInteger 或者 java.math.BigDecimal ，这两个类都是非基本类型包装类的引用类型，也不是String这种特殊类型，所以用于基本运算的 + 、- 、* 、/ 就不好使了，应该使用对象的成员方法。

# 错误6：不要滥用++

++尽量不要乱用，尤其是在长表达式中。

# 错误7：不会取相反数

下面的代码是一个很好的处理方案：
```java
a = -a;
```

# 错误8：不会构造BigInteger对象

```java
BigInteger num1 = new BigInteger(1);
```

上面的代码并不对，BigInteger没有整数构造器参数，但可以使用String，所以可以这么写：

```java
BigInteger num1 = new BigInteger("1");
```
或者：

```java
int a = 1;
BigInteger num1 = new BigInteger(Integer.toString(a));
```

BigInteger类中有三个好使的静态属性：ZERO、ONE、TWO（TWO早期兼不兼容我不知道，但我知道洛谷OJ的Java8交上去TWO会CE）

注意静态导入（不好）或者自行使用，但却是减免了自己构造0、1、2的麻烦。

# 错误9：不会读大数

考虑到BigInteger要用String来构造，因此代码容易写成这样：

```java
BigInteger num1 = new BigInteger(scanner.next());
BigDecimal num2 = new BigDecimal(scanner.nextDouble());
```

Scanner慢归慢，能力很强的，自然可以直接生成BigInteger和BigDecimal：

```java
BigInteger num1 = scanner.nextBigInteger();
BigDecimal num2 = scanner.nextBigDecimal();
```
这不就省事了？

# 错误10：不熟悉各个基本类型的范围

别笑话，有时候真的让人迷惑。
再有一说是，Java缺几个东西：long double（真没有）、long long（实际上在Java里是long）、无符号数……

# 错误11：不熟悉abs()可能导致的问题

Math.abs()存在一个问题：`Math.abs(Integer.MIN_VALUE)`和`Integer.MIN_VALUE`相等。

这点问题的成因跟所谓的二进制“怪异数”有关，推荐阅读：[二进制“怪异数”](https://blankspace.blog.csdn.net/article/details/113667114)
