---
title: Java数组的拷贝
date: 2020-03-04 01:34:54
summary: 本文分享四种Java数组的拷贝方法。
tags:
- Java
categories:
- 开发技术
---

# 数组拷贝

数组拷贝是将一个数组的内容复制到另一个数组中的过程。

推荐阅读：[浅拷贝与深拷贝](https://blankspace.blog.csdn.net/article/details/130355884)

# 方法1：System.arraycopy()

java.lang.System.arraycopy()是Java中用于执行数组拷贝的native方法。它可以将一个源数组的指定范围的元素复制到目标数组的指定位置。该方法对大数组比较高效。

```java
public static native void arraycopy(Object src,  int  srcPos, Object dest, int destPos, int length);
```

- `src`：源数组，即要从中复制元素的数组。
- `srcPos`：源数组的起始位置，即从源数组的哪个索引开始复制元素。
- `dest`：目标数组，即要将元素复制到的数组。
- `destPos`：目标数组的起始位置，即从目标数组的哪个索引开始存放复制的元素。
- `length`：要复制的元素个数。

java.lang.System.arraycopy()方法执行的是浅拷贝，即只复制数组元素的引用。如果源数组和目标数组是对象数组，那么源数组和目标数组的元素将引用同一块内存。如果源数组和目标数组是基本类型数组，那么元素的值将被复制到目标数组。

需要注意的是，java.lang.System.arraycopy()方法不会自动扩展目标数组的长度，因此如果目标数组长度不足以容纳要复制的元素，将会抛出java.lang.ArrayIndexOutOfBoundsException异常。如果要实现数组的扩容或缩容，可以使用java.util.Arrays.copyOf()方法或手动创建一个新的数组来实现。

# 方法2：Arrays.copyOf()

java.util.Arrays的copyOf()与copyOfRange()方法都用于实现数组拷贝，前者用于完整数组的拷贝，后者用于数组区间的拷贝。

推荐阅读：[Arrays的copyOf()与copyOfRange()](https://blankspace.blog.csdn.net/article/details/114838354)

# 方法3：arrayObj.clone()

数组是引用类型，因此也是java.lang.Object的派生类，自然从java.lang.Object中继承到了clone()。

推荐阅读：[java.lang.Object](https://blankspace.blog.csdn.net/article/details/104711521)

# 方法4：for循环逐元素拷贝

```java
int[] sourceArray = {1, 2, 3, 4, 5};
int[] destinationArray = new int[sourceArray.length];
for (int i = 0; i < sourceArray.length; i++) {
    destinationArray[i] = sourceArray[i];
}
```

这个在小数据量级别既简单又快速，数据量较大时较慢。

对于多维数组或更复杂的需求，可能需要使用嵌套的 for 循环或其他适当的算法来完成数组的拷贝。

# 运行效率比较

推荐阅读：[代码段运行时长测量](https://blankspace.blog.csdn.net/article/details/104633563)

```java
import java.util.Arrays;

public class ArrayCopyDemo {
    public static void main(String[] args) {
        final int LIMIT = 10_000_000;
        String[] array0 = new String[LIMIT];
        Arrays.fill(array0, "orzorzorzorz");
        String[] array = new String[LIMIT];
        long time1 = System.currentTimeMillis();
        System.arraycopy(array0, 0, array, 0, LIMIT);
        long time2 = System.currentTimeMillis();
        array = Arrays.copyOf(array0, LIMIT);
        long time3 = System.currentTimeMillis();
        array = array0.clone();
        long time4 = System.currentTimeMillis();
        for (int i = 0; i < LIMIT; i++) {
            array[i] = array0[i];
        }
        long time5 = System.currentTimeMillis();
        System.out.println("方法一耗时：" + (time2-time1));
        System.out.println("方法二耗时：" + (time3-time2));
        System.out.println("方法三耗时：" + (time4-time3));
        System.out.println("方法四耗时：" + (time5-time4));
    }
}
```

输出结果参考：

```java
方法一耗时：15
方法二耗时：47
方法三耗时：48
方法四耗时：78
```

总结：
- 原始数组长度不管是多少的时候，Arrays.copyOf()的效率都比System.arraycopy()差。
- 原始数组长度比较小的时候，千以内的范围中，for循环表现十分优异，并随着数组长度的增加，效率越来越低，因此，for循环适合于小型数组，且简单易用。
- 原始数组长度中等的时候，万以内的范围内，两个native方法的效率差不多。
- 原始数组长度比较大的时候，几万、几十万+乃至更多，这时候native方法System.arraycopy()的优势体现出来了，性能优势明显。
- 较大数据量的时候四种方法按照效率降序排列：
    - No.1: System.arraycopy()
    - No.2: Arrays.copyOf()
    - No.3: arrayObj.clone()
    - No.4: for循环逐元素拷贝
