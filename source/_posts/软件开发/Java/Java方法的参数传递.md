---
title: Java方法的参数传递
date: 2020-12-20 13:14:26
summary: 本文探究Java方法的参数传递是值传递还是引用传递。
tags:
- Java
categories:
- Java
---

# 测试思路

每个更改形参的方法，返回值都是void，不同方法的参数设置不同类型。

注意在方法内测地址的时候在改之前测一下，才能看出传入参数是不是传了地址。（注意反正OS的内存地址是虚拟的，JVM中的也是，掰扯不清的，所以就姑且按照JVM中的虚拟地址来考虑吧）

# 数组参数传递

```java
private static void changeArray(int[] array) {
    Arrays.fill(array, 2);
}
```
数组的值改变了，但地址没变，是引用传递。

# 基本类型及其包装类的参数传递

```java
private static void changeInt(int data) {
    data = 3;
}

private static void changeInteger(Integer data) {
    data = 3;
}
```
无论是int还是Integer，没有返回值，所以外面的实参值没变。

对于基本类型，打印地址也能看出地址改了，是值传递。
对于包装类型，打印地址能看出地址没改，是引用传递。

由于hashCode()被重写了，所以可以用`System.out.println(System.identityHashCode(data));`来看虚拟地址（当然不是真的地址啦）。

# 普通类参数传递

```java
private static class Person {
    int id;
    String name;
    int age;
    Person(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    @Override
    public String toString() {
        return "Person{" + "id=" + id + ", name='" + name + '\'' + ", age=" + age + '}';
    }
}

private static void changePerson(Person data) {
    data = new Person(101, "Bob", 15);
}
```
是引用类型，也是引用传递。打印地址测试过，确实在new之前的虚拟地址与传入实参的虚拟地址一致。（想测地址就把@Override的toString()注释掉，再打印对象啊）

## 只改属性

```java
private static void changePersonAttributes(Person data) {
    data.id = 101;
    data.name = "Bob";
    data.age = 15;
}
```

改了属性，打印结果改了，但是实际地址没改，说明是引用传递。

# 完整代码

部分打印地址的测试内容就删掉不附上了，感兴趣可以自测。

```java
import java.util.Arrays;

public class ReferenceTest {
    private static void changeArray(int[] array) {
        Arrays.fill(array, 2);
    }

    private static void changeInt(int data) {
        data = 144;
    }

    private static void changeInteger(Integer data) {
        data = 155;
    }

    private static class Person {
        int id;
        String name;
        int age;
        Person(int id, String name, int age) {
            this.id = id;
            this.name = name;
            this.age = age;
        }
        @Override
        public String toString() {
            return "Person{" + "id=" + id + ", name='" + name + '\'' + ", age=" + age + '}';
        }
    }

    private static void changePerson(Person data) {
        data = new Person(101, "Bob", 15);
    }

    private static void changePersonAttributes(Person data) {
        data.id = 101;
        data.name = "Bob";
        data.age = 15;
    }

    public static void main(String[] args) {
        int[] array = new int[5];
        System.out.println(Arrays.toString(array));
        changeArray(array);
        System.out.println(Arrays.toString(array));
        Integer a = 133;
        changeInteger(a);
        System.out.println(a);
        changeInt(a);
        System.out.println(a);
        Person p = new Person(100, "Sam", 10);
        System.out.println(p);
        changePerson(p);
        System.out.println(p);
        changePersonAttributes(p);
        System.out.println(p);
    }
}
```

# 测试结果

```java
[0, 0, 0, 0, 0]
[2, 2, 2, 2, 2]
133
133
Person{id=100, name='Sam', age=10}
Person{id=100, name='Sam', age=10}
Person{id=101, name='Bob', age=15}
```

# 总结反思

其实自己也一直没搞明白Java的参数传递到底是值传递还是引用传递，网上说法众说纷纭，于是下定决心自己认真测一下。

按照JVM的虚拟地址来做测试，在整数测试的时候还考虑了整数缓存池，选了127以上的数。

个人认为，其实不能单纯利用返回值为void的函数运行后查看原值来判断是值传递还是引用传递。我选择在传完参数后的函数内测地址，地址一样就是引用传递，不一样就是值传递。
hashCode()一般包含了地址，但Integer的hashCode()则只是原值，得使用System.identityHashCode(data)来测。

# 总结

- 基本类型是值传递
- 引用类型是引用传递，返回值为void的话未必能在外面看到改变。
  - 引用类型对象重新被new了以后，看不到改变；但改变属性能看到改变。
  - 数组也是引用类型，数组元素值的改变能在void方法外面测出来。


其实研究这个问题Real迷惑，如有不足还请指正！

# 补充

强调String这个问题，如果你简单地测试得到地址没变，这是不对的，涉及到String常量池等等……
因为我还不太会，所以回头再来补充orz

看来这篇文章可能有些我思虑不周（尚未涉猎）的地方啊，果然水深莫涉啊
