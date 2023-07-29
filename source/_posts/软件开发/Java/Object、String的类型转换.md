---
title: Object、String的类型转换
date: 2020-03-03 22:31:52
summary: 本文归纳总结java.lang.Object转换为java.lang.String的三种方法。
tags:
- Java
categories:
- 开发技术
---

# Object → String

java.lang.Object转型为java.lang.String的方法有三种：
- `String str = (String)obj;`：使用强转，从父类型Object向下转型为String。
- `String str = obj.toString();`：使用Object一定会存在的toString()方法。
- `String str = String.valueOf(obj);`：使用String类的静态方法，将一个Object类型的变量转成String类型对象。

## 方法1: object.toString()

Object类是所有Java类的父类，toString()方法返回对象的字符串表示形式。当我们将一个对象传递给System.out.println()或者直接在字符串中使用+号连接时，Java会自动调用该对象的toString()方法。因此，我们可以在自定义类中重写toString()方法，返回该对象的字符串表示形式。

如果object实际上不是String类型的，会抛出java.lang.ClassCastException的，这点要注意。采用此方法前，建议使用 <font color="red">object instanceof String</font> 先做一下判断。

```java
public class Person {
    private String name;
    private int age;

    // 省略构造方法和其他方法

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

Person p = new Person("John", 30);
String str = p.toString(); // str为"Person{name='John', age=30}"
```

## 方法2: (String)object

在Java中，类型转换符可以将一个对象转换成指定的类型。我们可以使用类型转换符将Object类型对象转换成其他类型。

如果object实际上是null的，会抛出java.lang.NullPointerException的，这点要注意。采用此方法前，建议使用 <font color="red">if (object == null)</font> 做一下判断。

## 方法3: String.valueOf(Object obj)

String类提供了一个静态方法valueOf(Object obj)，该方法可以将任意类型的对象转换成字符串。

```java
Integer i = 123;
String str1 = String.valueOf(i); // str1为"123"

Object obj = null;
String str2 = String.valueOf(obj); // str2为"null"
```

这个方法比较神奇，因为它有9个重载方法（重载就是方法/函数同名，但参数列表个数或者类型不同）：
- **String.valueOf(boolean value): String**
- **String.valueOf(char value): String**
- **String.valueOf(char[] data): String**
- **String.valueOf(double value): String**
- **String.valueOf(float value): String**
- **String.valueOf(int value): String**
- **String.valueOf(long value): String**
- **String.valueOf(Object data): String**
- **String.valueOf(char[] data, int start, int length): String**

使用的时候特殊情况是<code>String.valueOf(null)</code>，
这时调用的是：<code>String.valueOf(Object data)</code>。
（IDE中按住Ctrl就可以追溯引用了）

String.valueOf(Object data)的源码如下：
```java
public static String valueOf(Object obj) {
    return obj == null ? "null" : obj.toString();
}
```

最终并不会空指针，而是返回<code>"null"</code>！

如果传入的参数为null，此方法不会抛出java.lang.NullPointerException的，而是返回"null"字符串，值得注意。
