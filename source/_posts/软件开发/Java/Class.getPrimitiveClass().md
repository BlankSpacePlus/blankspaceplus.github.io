---
title: Class.getPrimitiveClass()
date: 2021-03-08 20:53:12
summary: 本文分享java.lang.Class.getPrimitiveClass()的解读，结合基本类型、包装类型、java.lang.Void。
tags:
- Java
categories:
- Java
---

# 基本类型

推荐阅读：[Java基本类型](https://blankspace.blog.csdn.net/article/details/104545979)

# java.lang.Void

```java
public final class Void {

    public static final Class<Void> TYPE = (Class<Void>) Class.getPrimitiveClass("void");

    private Void() {}

}
```

java.lang.Void类是一个占位符类，用于持有表示Java关键字void的java.lang.Class对象的引用。它是一个final类，因此不能被继承，也包含一个私有的构造方法，因此不能被实例化。

java.lang.Void类中有一个名为TYPE的公共静态常量，它是一个`java.lang.Class<Void>`类型的引用，表示关键字void所对应的虚拟类型。这个常量是通过调用java.lang.Class.getPrimitiveClass("void")来获得的，因为void不是一个类而是一个关键字。由于void类型不能有实例，因此不能使用new运算符创建其对象。因此，Void类的唯一目的是为了表示void类型，并提供一个与其它类型相似的引用。

# Class.getPrimitiveClass()

```java
static native Class<?> getPrimitiveClass(String name);
```

该方法是一个本地方法(native method)，具体实现由JVM提供。该方法接受一个字符串类型的参数name，表示需要返回其对应的基本类型的java.lang.Class对象。例如，当传入参数为"int"时，返回的是int类型对应的java.lang.Class对象。该方法常用于获取基本类型的java.lang.Class对象，从而方便地获取相应的包装类，例如：int对应的包装类为java.lang.Integer，double对应的包装类为java.lang.Double等。

## TYPE

java.lang.Boolean、java.lang.Byte、java.lang.Character、java.lang.Double、java.lang.Float、java.lang.Integer、java.lang.Long、java.lang.Short这八种基本类型对应的包装类型，加上java.lang.Void，都提供了一个公共静态属性TYPE，它返回一个Class对象，该对象表示对应的基本数据类型（这里将void也算进去）。

推荐阅读：[Java包装类型](https://blankspace.blog.csdn.net/article/details/104715326)

- `java.lang.Boolean`：`public static final Class<Boolean> TYPE = (Class<Boolean>) Class.getPrimitiveClass("boolean");`
- `java.lang.Byte`：`public static final Class<Byte> TYPE = (Class<Byte>) Class.getPrimitiveClass("byte");`
- `java.lang.Character`：`public static final Class<Character> TYPE = (Class<Character>) Class.getPrimitiveClass("char");`
- `java.lang.Double`：`public static final Class<Double> TYPE = (Class<Double>) Class.getPrimitiveClass("double");`
- `java.lang.Float`：`public static final Class<Float> TYPE = (Class<Float>) Class.getPrimitiveClass("float");`
- `java.lang.Integer`：`public static final Class<Integer> TYPE = (Class<Integer>) Class.getPrimitiveClass("int");`
- `java.lang.Long`：`public static final Class<Long> TYPE = (Class<Long>) Class.getPrimitiveClass("long");`
- `java.lang.Short`：`public static final Class<Short> TYPE = (Class<Short>) Class.getPrimitiveClass("short");`
- `java.lang.Void`：`public static final Class<Boolean> TYPE = (Class<Boolean>) Class.getPrimitiveClass("void");`

TYPE属性可以用于一些反射操作，例如通过java.lang.Class对象获取类的名称、修饰符、字段、方法等。

获取int类型的java.lang.Class对象：

```java
Class<Integer> intClass = int.class;
```

或者

```java
Class<Integer> integerClass = Integer.TYPE;
```
