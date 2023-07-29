---
title: Object.clone()与java.lang.Cloneable
date: 2021-04-08 14:28:59
summary: 本文分享Java对对象克隆的支持，主要内容包括java.lang.Object.clone()方法与java.lang.Cloneable接口。
tags:
- Java
categories:
- 开发技术
---

# Object.clone()

java.lang.Object类是所有类的基类，它定义了一些通用的方法，包括clone()方法。但是，在默认情况下，Object类的clone()方法是受保护的，因此不能直接通过java.lang.Object类的实例调用clone()方法。

```java
protected native Object clone() throws CloneNotSupportedException;
```

推荐阅读：[java.lang.Object](https://blankspace.blog.csdn.net/article/details/104711521)

要能够调用clone()方法，需要满足以下两个条件：
- 类必须实现java.lang.Cloneable接口：java.lang.Cloneable是一个标记接口，用于指示类可以被克隆。如果一个类没有实现java.lang.Cloneable接口，调用其clone()方法将会抛出java.lang.CloneNotSupportedException异常。
- clone()方法必须重写并指定为public访问级别：为了能够调用clone()方法，需要在类中重写该方法，并将其访问级别设置为public。如果使用其他访问级别（如protected或默认访问级别），在调用clone()方法时可能会因为访问权限不足而导致编译错误。

clone()方法使用起来的注意事项包括：
- clone()方法创建的对象副本是浅拷贝，它只复制对象本身和对象引用，而不复制引用的对象。如果被克隆的对象包含引用类型的字段，那么这些字段在原始对象和副本对象中将引用同一个对象。这可能导致在修改副本对象的引用类型字段时影响到原始对象。
- 如果需要实现深拷贝，即复制对象及其引用的所有对象，可以在clone()方法中进行递归拷贝或其他相关处理。这样可以确保副本对象和原始对象引用的对象是相互独立的，修改副本对象的字段不会影响原始对象。推荐阅读：[浅拷贝与深拷贝](https://blankspace.blog.csdn.net/article/details/130355884)
- 需要clone()操作的类必须实现java.lang.Cloneable接口。java.lang.Cloneable是一个标记接口，用于指示当前类的实例可以被克隆。如果没有实现java.lang.Cloneable接口，调用clone()方法时会抛出java.lang.CloneNotSupportedException异常。
- clone()方法的不恰当使用可能会导致java.lang.CloneNotSupportedException异常被抛出，因此在使用clone()方法时需要捕获或声明抛出该异常。
- 在重写clone()方法时，为了让外部类访问该方法，需要使用public访问修饰符来覆盖基类的访问级别。如果使用其他访问修饰级别（如protected或默认访问级别），在调用clone()方法时可能会因为访问权限不足而导致编译错误。推荐阅读：[可见性](https://blankspace.blog.csdn.net/article/details/114701507)
- 使用clone()方法进行对象拷贝并不是最推荐的方式。通常情况下，更灵活、安全和可控的对象拷贝方式是通过构造函数或工厂方法来创建对象的副本，或者使用序列化和反序列化技术实现对象的深拷贝。

```java
public class CloneClassDemo implements Cloneable {
    private int value;

    public CloneClassDemo(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    @Override
    public CloneClassDemo clone() throws CloneNotSupportedException {
        return (CloneClassDemo) super.clone();
    }

    public static void main(String[] args) {
        try {
            CloneClassDemo obj1 = new CloneClassDemo(123);
            CloneClassDemo obj2 = obj1.clone();
            System.out.println(obj1 == obj2);
            System.out.println(obj1.getValue() == obj2.getValue());
            System.out.println(obj1.getClass() == obj2.getClass());
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
    }
}
```

上面的CloneClassDemo类实现了java.lang.Cloneable接口，并重写了clone()方法，将其访问级别设置为public。这样就可以通过clone()方法创建CloneClassDemo对象的副本。

# java.lang.Cloneable

java.lang.Cloneable是一个标记接口，它没有定义任何方法。该接口的目的是向类提供一个标记，指示该类的实例可以进行克隆。注意：虽然java.lang.Cloneable接口是一个标记接口，但它并不是一个空接口。

当一个类实现了java.lang.Cloneable接口时，它表明该类的实例可以通过clone()方法进行复制。但需要注意的是，java.lang.Cloneable接口本身并没有提供clone()方法的实现，它只是作为一个标记，告诉编译器该类支持克隆操作。类的clone()方法是从java.lang.Object继承来的。

java.lang.Cloneable接口的存在是为了提供给类的设计者一个机会，使他们能够通过克隆来实现对象的复制，而不需要使用其他的复制方法。

java.lang.Cloneable接口中的API文档中有一个重要的警告：

> Note that this interface does not contain the clone method. Therefore, it is not possible to clone an object merely by virtue of the fact that it implements this interface. Even if the clone method is invoked reflectively, there is no guarantee that it will succeed.
