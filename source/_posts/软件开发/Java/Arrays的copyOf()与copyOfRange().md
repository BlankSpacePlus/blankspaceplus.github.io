---
title: Arrays的copyOf()与copyOfRange()
date: 2021-03-15 18:48:32
summary: 本文分享java.util.Arrays的copyOf()与copyOfRange()。
tags:
- Java
categories:
- 开发技术
---

java.util.Arrays的copyOf()与copyOfRange()方法都用于实现数组拷贝，前者用于完整数组的拷贝，后者用于数组区间的拷贝。

# copyOf()

copyOf()方法用于将指定数组进行复制，并根据需要截断或填充零值，以使复制数组具有指定的长度。
- 如果指定的新长度与原始数组的长度相同，直接返回原始数组的克隆副本。
- 如果指定的新长度大于原始数组的长度，将原始数组的内容复制到新数组中，并在新数组的末尾填充零值。
- 如果指定的新长度小于原始数组的长度，将原始数组的内容截断到新数组的指定长度。
- 如果指定的新长度为负数，将抛出java.lang.NegativeArraySizeException异常。

```java
public static int[] copyOf(int[] original, int newLength) {
    if (newLength == original.length) {
        return original.clone();
    }
    int[] copy = new int[newLength];
    System.arraycopy(original, 0, copy, 0, Math.min(original.length, newLength));
    return copy;
}
```

根据源码可知，copyOf()方法的具体步骤如下：
1. 首先，检查要复制的原始数组original是否为null，如果为null，则抛出java.lang.NullPointerException异常。
2. 检查要复制的新长度newLength是否与原始数组的长度相同。如果相同，则返回原始数组的克隆副本，使用clone()方法创建一个新的数组，并返回。
3. 创建一个新的数组copy，长度为newLength。
4. 使用System.arraycopy()方法将原始数组的内容复制到新的数组中。
    - 拷贝的起始位置为原始数组的索引0。
    - 拷贝的目标位置为新数组的索引0。
    - 拷贝的长度为原始数组的长度和新长度之间的较小值。
5. 返回复制后的数组copy。

java.lang.System.arraycopy()是native的，因此查看Java代码是查不到其实现的。

```java
public static native void arraycopy(Object src,  int  srcPos, Object dest, int destPos, int length);
```

# copyOfRange()

copyOfRange()方法复制原始数组中指定范围的内容到新数组中。如果结束索引to大于原始数组的长度，新数组的后续元素将填充为零。返回的新数组的长度为结束索引to减去起始索引from。
如果起始索引from小于0或大于原始数组的长度，将抛出java.lang.ArrayIndexOutOfBoundsException异常。
如果起始索引from大于结束索引to，将抛出java.lang.IllegalArgumentException异常。

```java
public static int[] copyOfRange(int[] original, int from, int to) {
    if (from != 0 || to != original.length)
        return copyOfRangeInt(original, from, to);
    else // from == 0 && to == original.length
        return original.clone();
}
```

根据源码可知，copyOfRange()方法的具体步骤如下：
1. 首先，检查原始数组original是否为null，如果为null，则抛出java.lang.NullPointerException异常。
2. 检查起始索引from是否在有效范围内，即大于等于0且小于等于original.length。如果不在范围内，则抛出java.lang.ArrayIndexOutOfBoundsException异常。
3. 检查结束索引to是否大于等于起始索引from。如果不满足条件，则抛出java.lang.IllegalArgumentException异常。
4. 如果起始索引from不等于0或结束索引to不等于原始数组的长度，调用copyOfRangeInt()方法进行复制。
5. 如果起始索引from等于0且结束索引to等于原始数组的长度，直接返回原始数组的克隆副本。

copyOfRange()方法依赖于copyOfRangeInt()方法。

```java
@ForceInline
private static int[] copyOfRangeInt(int[] original, int from, int to) {
    checkLength(from, to);
    int newLength = to - from;
    int[] copy = new int[newLength];
    System.arraycopy(original, from, copy, 0, Math.min(original.length - from, newLength));
    return copy;
}
```

根据源码可知，copyOfRangeInt()方法的具体步骤如下：
1. 检查起始索引from和结束索引to是否在有效范围内。如果不在范围内，则抛出java.lang.ArrayIndexOutOfBoundsException异常。
2. 计算新数组的长度newLength，即结束索引to减去起始索引from。
3. 创建一个新的数组copy，长度为newLength。
4. 使用System.arraycopy()方法将原始数组中指定范围的内容复制到新的数组中。
    - 拷贝的起始位置为原始数组的索引from。
    - 拷贝的目标位置为新数组的索引0。
    - 拷贝的长度为原始数组的长度减去起始索引from和新数组长度之间的较小值。
5. 返回复制后的数组copy。

copyOfRangeInt()方法依赖于checkLength()方法。

```java
private static void checkLength(int from, int to) {
    if (to < from) {
        throw new IllegalArgumentException(from + " > " + to);
    }
}
```

如果起始索引from大于结束索引to，将抛出java.lang.IllegalArgumentException异常。
