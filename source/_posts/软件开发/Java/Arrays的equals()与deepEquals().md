---
title: Arrays的equals()与deepEquals()
date: 2022-03-14 23:15:33
summary: 本文分享java.util.Arrays的equals()与deepEquals()。
tags:
- Java
categories:
- 开发技术
---

# equals()

equals()方法通过比较两个数组的长度和元素来判断它们是否相等。如果两个数组引用相同，或者长度相等且元素也相等，则认为两个数组相等。这个方法同时支持比较null引用，将两个null引用视为相等。

```java
public static boolean equals(int[] a, int[] a2) {
    if (a==a2)
        return true;
    if (a==null || a2==null)
        return false;
    int length = a.length;
    if (a2.length != length)
        return false;
    return ArraysSupport.mismatch(a, a2, length) < 0;
}
```

```java
public static boolean equals(int[] a, int aFromIndex, int aToIndex, int[] b, int bFromIndex, int bToIndex) {
    rangeCheck(a.length, aFromIndex, aToIndex);
    rangeCheck(b.length, bFromIndex, bToIndex);
    int aLength = aToIndex - aFromIndex;
    int bLength = bToIndex - bFromIndex;
    if (aLength != bLength)
        return false;
    return ArraysSupport.mismatch(a, aFromIndex, b, bFromIndex, aLength) < 0;
}
```

根据源码可知，equals()方法的具体步骤如下：
1. 首先，检查两个数组的引用是否相同，如果相同则直接返回true，因为它们引用同一个数组对象。
2. 接着，检查两个数组是否有一个为null，如果其中一个数组为null，则它们不相等，返回false。
3. 获取数组a的长度，并与数组a2的长度进行比较，如果长度不相等，则两个数组不相等，返回false。
4. 最后，调用jdk.internal.util.ArraysSupport.mismatch()方法比较两个数组的元素。
    - 如果返回值小于0，表示两个数组在相同位置上的元素都相等，数组相等，返回true。
    - 如果返回值大于等于0，表示两个数组在某个位置上的元素不相等，数组不相等，返回false。

推荐阅读：[Arrays的compare()与mismatch()](https://blankspace.blog.csdn.net/article/details/130468210)

java.util.Arrays.rangeCheck()是一个静态方法，仅用于检查fromIndex和toIndex是否合规，当fromIndex大于toIndex时抛出java.lang.IllegalArgumentException，当越界时抛出java.lang.ArrayIndexOutOfBoundsException。

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

# deepEquals()

deepEquals()递归地比较嵌套数组的每个元素，使用了递归调用的方式判断嵌套元素的深度相等性。如果两个数组包含相同数量的元素，且对应位置上的元素深度相等，则认为两个数组深度相等。与普通的数组相等性判断不同，这个方法适用于多维数组，可以比较任意维数的多维数组是否相等。

```java
public static boolean deepEquals(Object[] a1, Object[] a2) {
    if (a1 == a2)
        return true;
    if (a1 == null || a2==null)
        return false;
    int length = a1.length;
    if (a2.length != length)
        return false;
    for (int i = 0; i < length; i++) {
        Object e1 = a1[i];
        Object e2 = a2[i];
        if (e1 == e2)
            continue;
        if (e1 == null)
            return false;
        boolean eq = deepEquals0(e1, e2);
        if (!eq)
            return false;
    }
    return true;
}
```

根据源码可知，deepEquals()方法的具体步骤如下：
1. 首先，检查两个数组的引用是否相同，如果相同则直接返回true，因为它们引用同一个数组对象。
2. 接着，检查两个数组是否有一个为null，如果其中一个数组为null，则它们不相等，返回false。
3. 获取数组a1的长度，并与数组a2的长度进行比较，如果长度不相等，则两个数组不相等，返回false。
4. 遍历数组的每个元素，比较对应位置上的元素。
    1. 如果两个元素的引用相同，继续下一次循环。
    2. 如果其中一个元素为null，则两个数组不相等，返回false。
    3. 调用deepEquals0()方法判断两个元素是否深度相等。
        - 如果深度相等，继续下一次循环。
        - 如果不相等，返回false。
5. 如果所有元素都比较完毕且相等，则返回true。

```java
static boolean deepEquals0(Object e1, Object e2) {
    assert e1 != null;
    boolean eq;
    if (e1 instanceof Object[] && e2 instanceof Object[])
        eq = deepEquals ((Object[]) e1, (Object[]) e2);
    else if (e1 instanceof byte[] && e2 instanceof byte[])
        eq = equals((byte[]) e1, (byte[]) e2);
    else if (e1 instanceof short[] && e2 instanceof short[])
        eq = equals((short[]) e1, (short[]) e2);
    else if (e1 instanceof int[] && e2 instanceof int[])
        eq = equals((int[]) e1, (int[]) e2);
    else if (e1 instanceof long[] && e2 instanceof long[])
        eq = equals((long[]) e1, (long[]) e2);
    else if (e1 instanceof char[] && e2 instanceof char[])
        eq = equals((char[]) e1, (char[]) e2);
    else if (e1 instanceof float[] && e2 instanceof float[])
        eq = equals((float[]) e1, (float[]) e2);
    else if (e1 instanceof double[] && e2 instanceof double[])
        eq = equals((double[]) e1, (double[]) e2);
    else if (e1 instanceof boolean[] && e2 instanceof boolean[])
        eq = equals((boolean[]) e1, (boolean[]) e2);
    else
        eq = e1.equals(e2);
    return eq;
}
```
