---
title: Arrays的toString()与deepToString()
date: 2020-03-04 00:46:21
summary: 本文分享java.util.Arrays的toString()与deepToString()。
tags:
- Java
categories:
- 开发技术
---

# toString()

toString()方法将数组的元素转换为字符串，并按照指定格式进行拼接，最终返回表示数组内容的字符串。

```java
public static String toString(int[] a) {
    if (a == null)
        return "null";
    int iMax = a.length - 1;
    if (iMax == -1)
        return "[]";
    StringBuilder b = new StringBuilder();
    b.append('[');
    for (int i = 0; ; i++) {
        b.append(a[i]);
        if (i == iMax)
            return b.append(']').toString();
        b.append(", ");
    }
}
```

根据源码可知，toString()方法的具体步骤如下：
1. 首先，检查数组a是否为null，如果为null，则返回字符串"null"。
2. 获取数组的长度，并将长度减去1，得到变量iMax。
3. 如果iMax的值为-1，说明数组为空，返回字符串"[]"表示一个空数组。
4. 创建一个java.lang.StringBuilder对象，用于构建最终的字符串表示。
5. 在java.lang.StringBuilder对象中添加左括号"["。
6. 使用循环遍历数组的每个元素，将其转换为字符串并添加到java.lang.StringBuilder对象中。
    - 如果当前元素是最后一个元素（索引为iMax），则在字符串末尾添加右括号"]"，并将java.lang.StringBuilder对象转换为字符串并返回。
    - 否则，在字符串末尾添加逗号和空格", "，继续下一次循环。
7. 如果数组的所有元素都添加完毕，但是未达到最后一个元素的情况下退出循环，这种情况应该是不会发生的。

推荐阅读：[StringBuilder与StringBuffer](https://blankspace.blog.csdn.net/article/details/129968838)

# deepToString()

deepToString()方法将多维数组的完整内容转换为字符串，并按照指定格式进行拼接，最终返回表示数组内容的字符串。如果数组存在循环引用（数组中包含自身或间接引用自身），则使用 "[...]" 表示循环引用。例如，对于数组 [[1, 2], [3, [4, 5]]]，该方法将返回字符串 "[[1, 2], [3, [...]]]"。

```java
public static String deepToString(Object[] a) {
    if (a == null)
        return "null";
    int bufLen = 20 * a.length;
    if (a.length != 0 && bufLen <= 0)
        bufLen = Integer.MAX_VALUE;
    StringBuilder buf = new StringBuilder(bufLen);
    deepToString(a, buf, new HashSet<>());
    return buf.toString();
}
```

根据源码可知，toString()方法的具体步骤如下：

1. 首先，检查数组a是否为null，如果为null，则返回字符串"null"。
2. 计算java.lang.StringBuilder对象的初始容量bufLen。它是根据数组的长度乘以常数因子20得出的。
3. 进行容量检查，如果数组长度不为0且bufLen小于等于0，则将bufLen设置为Integer.MAX_VALUE，以确java.lang.StringBuilder对象具有足够的容量。
4. 创建一个java.lang.StringBuilder对象，初始容量为bufLen。
5. 调用辅助方法deepToString(a, buf, new HashSet<>())，传递数组a、java.lang.StringBuilder对象buf和一个空的java.util.HashSet对象作为参数。
6. 返回java.lang.StringBuilder对象的字符串表示。

```java
private static void deepToString(Object[] a, StringBuilder buf, Set<Object[]> dejaVu) {
    if (a == null) {
        buf.append("null");
        return;
    }
    int iMax = a.length - 1;
    if (iMax == -1) {
        buf.append("[]");
        return;
    }
    dejaVu.add(a);
    buf.append('[');
    for (int i = 0; ; i++) {
        Object element = a[i];
        if (element == null) {
            buf.append("null");
        } else {
            Class<?> eClass = element.getClass();
            if (eClass.isArray()) {
                if (eClass == byte[].class)
                    buf.append(toString((byte[]) element));
                else if (eClass == short[].class)
                    buf.append(toString((short[]) element));
                else if (eClass == int[].class)
                    buf.append(toString((int[]) element));
                else if (eClass == long[].class)
                    buf.append(toString((long[]) element));
                else if (eClass == char[].class)
                    buf.append(toString((char[]) element));
                else if (eClass == float[].class)
                    buf.append(toString((float[]) element));
                else if (eClass == double[].class)
                    buf.append(toString((double[]) element));
                else if (eClass == boolean[].class)
                    buf.append(toString((boolean[]) element));
                else {
                    if (dejaVu.contains(element))
                        buf.append("[...]");
                    else
                        deepToString((Object[])element, buf, dejaVu);
                }
            } else {
                buf.append(element.toString());
            }
        }
        if (i == iMax)
            break;
        buf.append(", ");
    }
    buf.append(']');
    dejaVu.remove(a);
}
```

根据源码可知，deepToString(Object[] a, StringBuilder buf, Set<Object[]> dejaVu)辅助方法的具体步骤如下：
1. 检查数组a是否为null，如果为null，则将字符串"null"添加到java.lang.StringBuilder对象中并返回。
2. 将数组的长度添加到java.lang.StringBuilder对象中，并添加左括号"["。
3. 检查数组a是否已经在dejaVu集合中出现过。如果是，则将字符串"[...]"添加到java.lang.StringBuilder对象中，并返回。
4. 将数组a添加到dejaVu集合中，以便检测循环引用。
5. 遍历数组的每个元素，并将元素转换为字符串添加到java.lang.StringBuilder对象中。
    - 如果当前元素是数组：
        - 检查当前元素是否在dejaVu集合中出现过。如果是，则将字符串"[...]"添加到java.lang.StringBuilder对象中，表示循环引用。
        - 否则，递归调用deepToString()方法，将当前元素作为新的数组进行处理。
    - 否则，将当前元素转换为字符串并添加到java.lang.StringBuilder对象中。
    - 如果当前元素不是最后一个元素，则添加逗号和空格", "。
6. 添加右括号"]"到java.lang.StringBuilder对象中。
7. 返回java.lang.StringBuilder对象。

# 完整代码

```java
import java.util.Arrays;

public class ArrayCloneTest {
    public static void main(String[] args) {
        int[] array1 = new int[] {1, 2, 3, 4};
        int[] array2 = array1.clone();
        System.out.println(Arrays.toString(array2));
        array1[3] = 5;
        System.out.println(Arrays.toString(array2));
        int[][] array3 = new int[][] {{1, 2, 3, 4}, {2, 3, 4, 5}, {3, 4, 5, 6}};
        int[][] array4 = array3.clone();
        array4[2][0] = 4;
        array4[2][1] = 5;
        array4[2][2] = 6;
        array4[2][3] = 7;
        System.out.println(Arrays.deepToString(array4));
        array4[2][0] = 3;
        array4[2][1] = 4;
        array4[2][2] = 5;
        array4[2][3] = 6;
        for (int i = 0; i < array3.length; i++) {
            array4[i] = array3[i].clone();
        }
        System.out.println(Arrays.deepToString(array4));
    }
}
```

运行结果：

```java
[1, 2, 3, 4]
[1, 2, 3, 4]
[[1, 2, 3, 4], [2, 3, 4, 5], [4, 5, 6, 7]]
[[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
```
