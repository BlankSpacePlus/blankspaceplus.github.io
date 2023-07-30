---
title: Arrays的compare()与mismatch()
date: 2023-05-03 01:55:58
summary: 本文分享java.util.Arrays的compare()与mismatch()方法的实现机制，以及这两个方法依赖的工具类jdk.internal.util.ArraysSupport。
tags:
- Java
categories:
- Java
---

# mismatch()

java.util.Arrays提供了mismatch()方法用于查找并返回两个同类型数组之间第一个不匹配的索引，否则如果没有找到不匹配则返回 -1。当不限定两个数组的区间始末时，默认两个数组都比较完整区间长度。

如果两个数组共享一个公共前缀，则返回的索引是公共前缀的长度，这表明在各自数组中该索引处的两个元素之间存在不匹配。 如果一个数组是另一个数组的适当前缀，则返回的索引是较小数组的长度，因此该索引仅对较大数组有效。否则，不存在不匹配。

```java
public static int mismatch(int[] a, int[] b) {
    int length = Math.min(a.length, b.length);
    if (a == b)
        return -1;
    int i = ArraysSupport.mismatch(a, b, length);
    return (i < 0 && a.length != b.length) ? length : i;
}
```

```java
public static int mismatch(int[] a, int aFromIndex, int aToIndex, int[] b, int bFromIndex, int bToIndex) {
    rangeCheck(a.length, aFromIndex, aToIndex);
    rangeCheck(b.length, bFromIndex, bToIndex);
    int aLength = aToIndex - aFromIndex;
    int bLength = bToIndex - bFromIndex;
    int length = Math.min(aLength, bLength);
    int i = ArraysSupport.mismatch(a, aFromIndex, b, bFromIndex, length);
    return (i < 0 && aLength != bLength) ? length : i;
}
```

java.util.Arrays的rangeCheck()是一个静态方法，仅用于检查`fromIndex`和`toIndex`是否合规，当`fromIndex`大于`toIndex`时抛出java.lang.IllegalArgumentException，当越界时抛出java.lang.ArrayIndexOutOfBoundsException。

```java
static void rangeCheck(int arrayLength, int fromIndex, int toIndex) {
    if (fromIndex > toIndex) {
        throw new IllegalArgumentException("fromIndex(" + fromIndex + ") > toIndex(" + toIndex + ")");
    }
    if (fromIndex < 0) {
        throw new ArrayIndexOutOfBoundsException(fromIndex);
    }
    if (toIndex > arrayLength) {
        throw new ArrayIndexOutOfBoundsException(toIndex);
    }
}
```

java.util.Arrays的mismatch()方法的具体实现依赖于jdk.internal.util.ArraysSupport的mismatch()方法。

```java
public static int mismatch(int[] a, int[] b, int length) {
    int i = 0;
    if (length > 1) {
        if (a[0] != b[0])
            return 0;
        i = vectorizedMismatch(a, Unsafe.ARRAY_INT_BASE_OFFSET, b, Unsafe.ARRAY_INT_BASE_OFFSET, length, LOG2_ARRAY_INT_INDEX_SCALE);
        if (i >= 0)
            return i;
        i = length - ~i;
    }
    for (; i < length; i++) {
        if (a[i] != b[i])
            return i;
    }
    return -1;
}
```

jdk.internal.util.ArraysSupport的mismatch()方法的具体步骤如下：
1. 初始化变量i为0。
2. 如果传入的length大于1，进行以下步骤：
    1. 如果数组a的第一个元素与数组b的第一个元素不相等，返回索引0。
    2. 调用vectorizedMismatch方法，使用向量化方式比较数组a和b从索引0开始的length个元素，找到第一个不同的位置的索引。该方法使用底层的Unsafe类来实现高效的向量化比较。
    3. 如果找到不同的位置的索引i大于等于0，返回该索引。
    4. 计算i的值为length-~i。这个计算是为了处理vectorizedMismatch返回的负索引，将其转换为正索引。
3. 进入循环，从索引i开始，遍历数组的剩余元素，比较数组a和b在相同索引位置上的元素，直到找到第一个不同的位置的索引，然后返回该索引。
4. 如果在循环结束后仍然没有找到不同的位置，返回-1，表示两个数组相等。

```java
public static int mismatch(int[] a, int aFromIndex, int[] b, int bFromIndex, int length) {
    int i = 0;
    if (length > 1) {
        if (a[aFromIndex] != b[bFromIndex])
            return 0;
        int aOffset = Unsafe.ARRAY_INT_BASE_OFFSET + (aFromIndex << LOG2_ARRAY_INT_INDEX_SCALE);
        int bOffset = Unsafe.ARRAY_INT_BASE_OFFSET + (bFromIndex << LOG2_ARRAY_INT_INDEX_SCALE);
        i = vectorizedMismatch(a, aOffset, b, bOffset, length, LOG2_ARRAY_INT_INDEX_SCALE);
        if (i >= 0)
            return i;
        i = length - ~i;
    }
    for (; i < length; i++) {
        if (a[aFromIndex + i] != b[bFromIndex + i])
            return i;
    }
    return -1;
}
```

jdk.internal.util.ArraysSupport的mismatch()方法依赖于jdk.internal.util.ArraysSupport的vectorizedMismatch()方法。该方法用向量化方式比较两个原始数组的元素，找到第一个不匹配的位置的相对索引，或者返回剩余待比较元素的数量的按位取反的值。这个方法利用底层的jdk.internal.misc.Unsafe类和位运算操作，实现了高效的向量化比较，适用于需要比较大量元素的情况。

```java
@IntrinsicCandidate
public static int vectorizedMismatch(Object a, long aOffset, Object b, long bOffset, int length, int log2ArrayIndexScale) {
    int log2ValuesPerWidth = LOG2_ARRAY_LONG_INDEX_SCALE - log2ArrayIndexScale;
    int wi = 0;
    for (; wi < length >> log2ValuesPerWidth; wi++) {
        long bi = ((long) wi) << LOG2_ARRAY_LONG_INDEX_SCALE;
        long av = U.getLongUnaligned(a, aOffset + bi);
        long bv = U.getLongUnaligned(b, bOffset + bi);
        if (av != bv) {
            long x = av ^ bv;
            int o = BIG_ENDIAN
                    ? Long.numberOfLeadingZeros(x) >> (LOG2_BYTE_BIT_SIZE + log2ArrayIndexScale)
                    : Long.numberOfTrailingZeros(x) >> (LOG2_BYTE_BIT_SIZE + log2ArrayIndexScale);
            return (wi << log2ValuesPerWidth) + o;
        }
    }
    int tail = length - (wi << log2ValuesPerWidth);
    if (log2ArrayIndexScale < LOG2_ARRAY_INT_INDEX_SCALE) {
        int wordTail = 1 << (LOG2_ARRAY_INT_INDEX_SCALE - log2ArrayIndexScale);
        if (tail >= wordTail) {
            long bi = ((long) wi) << LOG2_ARRAY_LONG_INDEX_SCALE;
            int av = U.getIntUnaligned(a, aOffset + bi);
            int bv = U.getIntUnaligned(b, bOffset + bi);
            if (av != bv) {
                int x = av ^ bv;
                int o = BIG_ENDIAN
                        ? Integer.numberOfLeadingZeros(x) >> (LOG2_BYTE_BIT_SIZE + log2ArrayIndexScale)
                        : Integer.numberOfTrailingZeros(x) >> (LOG2_BYTE_BIT_SIZE + log2ArrayIndexScale);
                return (wi << log2ValuesPerWidth) + o;
            }
            tail -= wordTail;
        }
        return ~tail;
    } else {
        return ~tail;
    }
}
```

jdk.internal.util.ArraysSupport的vectorizedMismatch()方法的具体步骤如下：
1. 根据传入的参数和偏移量，通过底层的Unsafe类来访问数组的内存。
2. 根据传入的参数，计算向量化比较时需要使用的偏移量和长度。
3. 进入循环，使用向量化方式比较数组a和b中的元素。
    1. 通过偏移量从数组中加载待比较的元素。
    2. 将加载的元素进行比较，如果不相等，计算不匹配位置的相对索引，并返回。
4. 如果在循环结束后仍然没有找到不匹配的位置，计算剩余待比较元素的数量，并返回其按位取反的值。

# compare()

java.util.Arrays提供了compare()方法用于按字典顺序比较两个int数组。

如果两个数组共享一个公共前缀，那么字典顺序比较是比较两个元素的结果，就像Integer.compare(int, int)在各自数组中的索引处（前缀长度）进行比较一样。否则，一个数组是另一个数组的适当前缀，字典序比较是比较两个数组长度的结果。

空数组引用在字典序上被认为小于非空数组引用。两个空数组引用被认为是相等的。

推荐阅读：[字典序](https://blankspace.blog.csdn.net/article/details/129772488)

```java
public static int compare(int[] a, int[] b) {
    if (a == b)
        return 0;
    if (a == null || b == null)
        return a == null ? -1 : 1;
    int i = ArraysSupport.mismatch(a, b, Math.min(a.length, b.length));
    if (i >= 0) {
        return Integer.compare(a[i], b[i]);
    }
    return a.length - b.length;
}
```

java.util.Arrays的compare()方法实现了比较两个同类型数组的字典顺序。

该方法的比较规则如下：
- 如果两个数组有一个共同的前缀，比较结果是在共同前缀长度的位置上，通过调用Integer.compare()比较对应位置上的两个元素。
- 否则，一个数组是另一个数组的真前缀，比较结果是根据两个数组的长度进行比较。

在进行比较之前，该方法会进行一些特殊情况的处理：
- 如果两个数组引用相同（即指向同一个对象），则认为它们相等，返回结果为0。
- 如果有一个数组为null，则认为null数组在字典顺序中小于非null数组；如果两个数组都为 null，则认为它们相等，返回结果为0。

这个方法还遵循以下规则：
- compare()方法的相等判定与equals()方法的相等判定一致，即对于数组a和b，满足`Arrays.equals(a, b) == (Arrays.compare(a, b) == 0)`。

据此，java.util.Arrays.compare(int[], int[])方法的具体实现如下：
1. 调用jdk.internal.util.ArraysSupport.mismatch()方法，找到两个数组的不同之处的索引i，该方法比较数组中的元素并返回第一个不同的索引；如果数组相等或长度不足n，则返回-1。
2. 如果i>=0，说明找到了不同的位置，使用`Integer.compare(a[i], b[i])`比较这两个位置上的元素，并返回比较结果。
3. 如果i<0，说明没有找到不同的位置，比较两个数组的长度，返回`a.length - b.length`的结果。

```java
public static int compare(int[] a, int aFromIndex, int aToIndex, int[] b, int bFromIndex, int bToIndex) {
    rangeCheck(a.length, aFromIndex, aToIndex);
    rangeCheck(b.length, bFromIndex, bToIndex);
    int aLength = aToIndex - aFromIndex;
    int bLength = bToIndex - bFromIndex;
    int i = ArraysSupport.mismatch(a, aFromIndex, b, bFromIndex, Math.min(aLength, bLength));
    if (i >= 0) {
        return Integer.compare(a[aFromIndex + i], b[bFromIndex + i]);
    }
    return aLength - bLength;
}
```

java.util.Arrays.compare(int[], int[])方法依赖于java.lang.Integer.compare(int, int)。
```java
public static int compare(int x, int y) {
    return (x < y) ? -1 : ((x == y) ? 0 : 1);
}
```
