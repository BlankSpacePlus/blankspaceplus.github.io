---
title: java.lang.String
date: 2023-04-26 22:28:35
summary: 本文分享java.lang.String的核心知识。
tags:
- Java
categories:
- Java
---

# String的创建和初始化

Java中的String是一个不可变的对象，即一旦String对象被创建，其内容就不能再被改变。String类采用了常量池的机制，即如果多个String对象的内容相同，则它们在常量池中只会有一份拷贝，这样可以节省内存空间。

在Java中创建String对象有两种方式：
- 直接使用双引号括起来的字符串字面量创建String对象，例如："hello"。
- 使用new关键字创建String对象，例如：new String("hello")。

String对象的创建和初始化在Java虚拟机中的过程是：
- 当使用双引号括起来的字符串字面量创建String对象时，Java编译器会首先在常量池中查找是否存在该字符串的拷贝，如果存在，则直接返回该拷贝的引用，否则创建一个新的String对象，并将其存储到常量池中。
- 当使用new关键字创建String对象时，Java虚拟机首先会在堆内存中创建一个新的String对象，然后再将该对象的引用存储到栈内存中。

由于String是不可变对象，因此对String对象的任何操作都会创建一个新的String对象。例如，当使用"+"符号连接两个String对象时，Java虚拟机会首先创建一个新的String对象，然后将两个被连接的String对象的内容复制到新的String对象中。因此，如果需要进行大量的字符串操作，应该尽量避免使用"+"符号连接字符串，而是应该使用StringBuilder或StringBuffer类来进行字符串操作，因为它们可以修改已有的字符串对象，从而避免创建大量的新的String对象，提高程序的性能。

推荐阅读：[StringBuilder与StringBuffer](https://blankspace.blog.csdn.net/article/details/129968838)

# String的不可变性

String的不可变性是Java语言设计的一个重要特性，它为Java程序提供了更高的安全性、效率和优化能力。

首先，String的不可变性保证了字符串对象在被创建后不可被修改，避免了在多线程环境下出现线程安全问题。如果String是可变的，那么在多个线程同时操作同一个字符串对象时，可能会导致数据不一致、数据损坏等问题。

其次，String的不可变性也可以提高字符串的效率。由于String是不可变的，因此它们可以被缓存，这样相同的字符串只需要在内存中存储一次，避免了重复的创建和销毁字符串对象的开销。此外，不可变字符串还可以通过hash值进行缓存，这样在进行字符串比较时可以更快速地完成。

最后，String的不可变性还可以提高Java程序的优化能力。由于String是不可变的，因此编译器可以在编译时对字符串进行优化，例如字符串常量折叠和字符串拼接的优化等。

Java通过如下机制保证了String的不可变性：
- 类声明为final：String类被声明为final，因此无法被继承修改。推荐阅读：[final、finally、finalize](https://blankspace.blog.csdn.net/article/details/130036796)
- 字符数组：在String内部使用字符数组来保存字符串，这个字符数组被声明为final的（常量），因此无法被修改。当需要对String进行修改时，实际上是创建了一个新的String对象。
- private修饰符：在String类中，使用`private final char value[]`成员变量来存储字符串，由于它除了是final的还是private的，因此无法在外部进行访问或修改。推荐阅读：[可见性](https://blankspace.blog.csdn.net/article/details/114701507)
- 不提供修改数据的公共方法：在String类中，没有对外提供直接修改String对象内容的公共方法。如果需要修改String对象中的字符，只能通过新建String对象来实现。

由于String是不可变的，因此它非常适合用于字符串常量和字符串池等应用场景。

# String的底层存储

在Java9之前，Java使用UTF-16编码方式表示字符串，每个char字符需要占用2个字节的内存空间，这导致对于只包含ASCII字符的字符串，会浪费大量的内存空间。而在Java 9之后，Java引入了一个名为"Compact Strings"的特性，将只包含ASCII字符的字符串存储为byte数组，每个字符只占用1个字节的内存空间，从而节省了内存空间的使用。

由于ASCII字符占用1个字节，因此使用byte数组存储字符串时，可以将字符串长度乘以1，而使用char数组存储字符串时，需要将字符串长度乘以2，这样会导致占用的内存空间变大，影响程序的性能。此外，使用byte数组存储字符串还可以提高缓存命中率，加快字符串操作的速度。

与此对应的是，现版本的Java字符串支持StringLatin1和StringUTF16两种内部表示方式。它们的主要区别在于字符编码和占用空间大小。
StringLatin1使用单字节编码（ISO-8859-1），即每个字符只需要占用一个字节的空间，可以表示256种不同的字符。而StringUTF16使用双字节编码（UTF-16），即每个字符需要占用两个字节的空间，可以表示更多的字符，包括Unicode中的所有字符。
因此，当字符串中只包含ASCII字符（即字符编码在0~127之间）时，StringLatin1比StringUTF16更节省空间。对于其他字符，StringUTF16是更常见的内部表示方式，因为它可以表示更多种类的字符。

# String的hashCode方法

String的hashCode方法实现中，对字符串中每个字符进行遍历，对每个字符进行哈希值的计算，并将每个字符的哈希值累加起来。具体实现中，Java使用了一种称为“移位叠加”的算法，对每个字符的哈希值进行了叠加和移位操作，最终得到一个32位整数的哈希值。

Java中的String类的hashCode值是通过以下方式计算的：
1. 首先将字符串的第一个字符乘以一个幻数31，然后加上第二个字符，乘以幻数31，以此类推，直到加完整个字符串。
2. 对于hashCode的计算可能会出现数值溢出，因此在每次计算时都要进行模运算，以保证计算结果在合法范围内。
3. 将所得到的hashCode值返回。

这种算法确保了同一个字符串对象在不同的Java虚拟机中具有相同的hashCode值，同时保证了不同字符串对象的hashCode值尽量不同，从而提高散列表的效率。

需要注意的是，hashCode方法只是用来生成哈希值的，并不是唯一的。同一个字符串在不同的Java虚拟机或者不同的操作系统中，可能会生成不同的哈希值。这一点需要在使用字符串作为哈希表的键值时进行注意。

实际实现中，StringLatin1和StringUTF16使用的算法是不同的。需要注意的是，相同的字符串在不同的内部表示方式下，它们的hashCode值也可能是不同的。

java.lang.String.hashCode()：

```java
public int hashCode() {
    int h = hash;
    if (h == 0 && !hashIsZero) {
        h = isLatin1() ? StringLatin1.hashCode(value) : StringUTF16.hashCode(value);
        if (h == 0) {
            hashIsZero = true;
        } else {
            hash = h;
        }
    }
    return h;
}
```

java.lang.StringLatin1.hashCode()：
```java
public static int hashCode(byte[] value) {
    int h = 0;
    for (byte v : value) {
        h = 31 * h + (v & 0xff);
    }
    return h;
}
```

其中，value同样是一个char数组，表示字符串中的字符。由于StringLatin1中使用单字节编码，因此将字符转换为整数时需要进行`& 0xff`的位运算。其他方面，它的hashCode计算方式与StringUTF16相同。

由于StringLatin1只适用于包含ASCII字符的字符串，因此它的应用范围相对较窄。但是，对于符合条件的字符串，它的hashCode计算方式可以提高计算效率。

说明：`0xff`对应的二进制数是`0b11111111`，`& 0xff`的意味着取`v`的低八位，符合单字节编码的特点。

java.lang.StringUTF16.hashCode()：
```java
public static int hashCode(byte[] value) {
    int h = 0;
    int length = value.length >> 1;
    for (int i = 0; i < length; i++) {
        h = 31 * h + getChar(value, i);
    }
    return h;
}
```

其中，value是一个byte数组，表示字符串中的字符。该计算方式将字符串中的每个字符乘以31的不同次幂，然后相加得到最终的hashCode值。这种算法具有良好的散列性能，但也存在一些缺点，例如对于长字符串计算hashCode的效率较低。
