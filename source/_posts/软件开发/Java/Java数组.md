---
title: Java数组
date: 2019-09-26 22:02:01
summary: 本文浅析Java数组使用时的注意事项。
tags:
- Java
categories:
- Java
---

# 数组

Java数组是一种用于存储多个相同类型数据的数据结构，可以包含基本数据类型和对象类型。数组在Java中属于引用类型，使用时需要先创建并分配内存空间。数组可以是一维或多维的，一维数组是最基本的形式，可以通过在数组名后面加方括号来声明一个数组，如：`int[] nums = new int[10]; // 声明一个包含10个整数的一维数组`。

多维数组可以看作是由一维数组组成的数组，例如：`int[][] matrix = new int[3][3]; // 声明一个3行3列的二维数组`。

Java数组提供了许多有用的方法，例如length属性可以获取数组的长度，数组元素可以通过索引进行访问和修改，也可以使用java.util.Arrays 类的sort()方法对数组进行排序，使用java.lang.System类的arraycopy()方法进行数组的复制等操作。需要注意的是，Java数组的下标从0开始，数组越界访问会导致运行时错误。

数组的重要规则：
1. 数组是定长的，一旦创建后就不能改变长度。
2. 数组元素的类型必须相同，不支持不同类型的元素。
3. 数组的下标从0开始，到长度减1结束。
4. 数组中的元素可以是基本类型或对象类型，但不能是void类型。
5. 数组变量本身是引用类型，需要使用new运算符进行初始化。
6. 数组可以作为参数传递给方法，但是数组本身是对象，传递的是引用。
7. 数组可以通过for循环或foreach循环进行遍历访问。
8. 数组的长度可以通过数组的length属性获取，但是不能使用数组的length()方法。

# 数组注意事项

1. 要知道，数组也是一种类型。Java数组不是基本类型，而是引用类型。
int是基本类型，但int[]就是引用类型了。
2. 一个数组需指定类型，只能存放一种类型的元素。如果我们在一个泛型类\<T\>里面写：`T[] t = new T[5];`。
    这会引发编译错误（CE），因为T并不是可确定的类型。我们应该这么写：`T[] t = (T[]) new Object[5];`。
    这时会报黄色的Warning (起码Eclipse有)，可以用`@SuppressWarning("unchecked")`修饰方法，避免编译警告，但是需要小心java.lang.ClassCastException。
3. 数组长度虽然可以动态确定，但是一旦定长，就不可改变。
毕竟，数组长度的获取是用其length属性获取的，这个属性是public的，但由于被final修饰，只能读不能改。
不允许这样写（CE）：
    ```java
    int[] a = new int[5];
    a.length = 1;
    ```
    不允许这样写（CE）：
    ```java
    int[] b = new int[3] {1, 2, 3};
    ```
4. 数组变量处存的不是数组元素，而是数组的引用。举个例子比较形象：
比如有`c{1, 2, 3}`和`d{4, 5, 6, 7}`，假设数组变量内存区存数组本身，如果有`c=d`语句，则c处空间是不够的。这样举例子也许不是那么合适，但是数组变量处确实存的只是引用。
5. 数组长度不可变，但是由于所谓的“赋值语句”本质上只是改变了数组变量存放的引用，所以表面上“数组长度可变”，然这是错误的。
6. int[]是一维数组，int[][]是二维数组，那么能否从int[]出发扩展到n维数组？
答案是no，因为Java是强类型语言，int[]中引用的是int类型，所以不能再指向int[]，这在js里或许可以，但Java中不行。
7. 操作数组的类在java.util包里，类名是Arrays，里面有很多static方法可供使用。
8. 数组也可以用foreach循环来遍历。
9. 由于数组是引用类型，所以不new一个对象，默认是null。
10. 多个相同类型、具有逻辑关系的对象（或基本类型）可以用数组存放。数组随机存取，存取O(1)，很方便，而且按索引寻址，很快。但是也是因为数组的“定长”，使得它显得没有集合框架使用方便，比如ArrayList。但是对于编写数据结构，如顺序表、顺序栈等数组很方便；甚至矩阵的压缩存储也是用了一维数组，简单的二维矩阵也可以用二维数组表示......用好数组也是Java的基本能力。
11. Java封装了数组的底层实现，就好比基本类型。但还是要强调：Java数组不是基本类型！
12. 关于Java数组的类型问题，可以阅读：[Java数组的类型](https://blankspace.blog.csdn.net/article/details/104083129)。

# java.util.Arrays

java.util.Arrays提供了很多用于操作Java数组的有效方法，其中比较重要的方法如下所示：
- [sort()](https://blankspace.blog.csdn.net/article/details/130460659)
- parallelSort()
- parallelPrefix()
- binarySearch()
- [equals()](https://blankspace.blog.csdn.net/article/details/123490088)
- fill()
- [copyOf()](https://blankspace.blog.csdn.net/article/details/114838354)
- [copyOfRange()](https://blankspace.blog.csdn.net/article/details/114838354)
- [asList()](https://blankspace.blog.csdn.net/article/details/123453777)
- hashCode()
- deepHashCode()
- [deepEquals()](https://blankspace.blog.csdn.net/article/details/123490088)
- [toString()](https://blankspace.blog.csdn.net/article/details/104645688)
- [deepToString()](https://blankspace.blog.csdn.net/article/details/104645688)
- setAll()
- parallelSetAll()
- spliterator()
- stream()
- [compare()](https://blankspace.blog.csdn.net/article/details/130468210)
- compareUnsigned()
- [mismatch()](https://blankspace.blog.csdn.net/article/details/130468210)
