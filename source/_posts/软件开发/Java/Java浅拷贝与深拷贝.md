---
title: Java浅拷贝与深拷贝
date: 2023-04-25 01:24:14
summary: 本文分享Java语境下浅拷贝与深拷贝的相关内容。
tags:
- Java
categories:
- 开发技术
---

# 浅拷贝与深拷贝

推荐阅读：[浅拷贝与深拷贝](https://blankspace.blog.csdn.net/article/details/129455061)

# 深拷贝的实现方法

在Java中，实现深拷贝的方法有以下几种：
- 通过实现Cloneable接口和重写clone()方法来实现深拷贝。需要注意的是，在重写clone()方法时，需要将被复制对象的属性都进行拷贝，而不能简单地进行浅拷贝。同时，clone()方法只能用于拷贝对象本身，而无法拷贝其引用对象。
- 通过实现Serializable接口，将对象序列化为字节流，再将其反序列化成一个新的对象。这种方法可以实现深拷贝，但需要注意的是，被复制对象和引用对象都必须实现Serializable接口。
- 通过使用第三方工具类，如Apache Commons Lang库中的SerializationUtils类、Google Gson库中的fromJson()和toJson()方法等，来实现对象的深拷贝。

需要注意的是，在进行深拷贝时，需要确保所有被拷贝的对象都是可序列化的或者实现了Cloneable接口。同时，如果被拷贝对象中包含了非基本类型的引用对象，则需要对这些引用对象也进行深拷贝，以保证整个对象图都被完整地复制。

## 实现Cloneable接口并重写clone()

以下是一个通过实现Cloneable接口和重写clone()方法来实现深拷贝的例子：

```java
public class Address implements Cloneable {
    private String city;
    private String state;

    public Address(String city, String state) {
        this.city = city;
        this.state = state;
    }

    // Getter and setter methods

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

```java
public class Person implements Cloneable {
    private String name;
    private Address address;

    public Person(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    // Getter and setter methods

    @Override
    public Object clone() throws CloneNotSupportedException {
        Person clonedPerson = (Person) super.clone();
        clonedPerson.address = (Address) this.address.clone();
        return clonedPerson;
    }
}
```

在上面的例子中，Person对象中包含Address对象，因此需要对Address对象进行深拷贝。重写Person类的clone()方法时，先调用super.clone()方法进行浅拷贝，然后再对Address对象进行深拷贝，即调用address对象的clone()方法，将返回值赋值给新的Person对象的address属性。需要注意的是，Address类也需要实现Cloneable接口，并重写clone()方法，否则会抛出CloneNotSupportedException异常。

## 实现Serializable接口实现序列化

下面是一个通过序列化和反序列化来实现深拷贝的例子：

```java
import java.io.Serializable;

public class Address implements Serializable {
    private String street;
    private String city;

    public Address(String street, String city) {
        this.street = street;
        this.city = city;
    }

    // 省略 getter 和 setter 方法
}
```

```java
import java.io.Serializable;

public class Person implements Serializable {
    private String name;
    private int age;
    private Address address;

    public Person(String name, int age, Address address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    // 省略 getter 和 setter 方法
}
```

为了完成任务，可以先将Person对象序列化为一个字节数组，然后再将其反序列化为一个新的对象。实现代码如下：

```java
import java.io.*;

public class DeepCopyDemo {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        // 创建一个 Person 对象
        Address address = new Address("知春路", "北京");
        Person person1 = new Person("小明", 30, address);

        // 将 person1 序列化为字节数组
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(person1);

        // 将字节数组反序列化为一个新的 Person 对象
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bais);
        Person person2 = (Person) ois.readObject();

        // 输出 person1 和 person2 的信息
        System.out.println("person1: " + person1.getName() + ", " + person1.getAge() + ", " + person1.getAddress().getStreet() + ", " + person1.getAddress().getCity());
        System.out.println("person2: " + person2.getName() + ", " + person2.getAge() + ", " + person2.getAddress().getStreet() + ", " + person2.getAddress().getCity());

        // 修改 person1 的信息，不影响 person2
        person1.getAddress().setCity("Los Angeles");
        System.out.println("person1: " + person1.getName() + ", " + person1.getAge() + ", " + person1.getAddress().getStreet() + ", " + person1.getAddress().getCity());
        System.out.println("person2: " + person2.getName() + ", " + person2.getAge() + ", " + person2.getAddress().getStreet() + ", " + person2.getAddress().getCity());
    }
}
```

在上面的代码中，我们先创建了一个Person对象person1，然后将其序列化为字节数组。接着，我们将字节数组反序列化为一个新的Person对象person2，这样就得到了一个完全独立的副本。最后，我们修改了person1的地址信息，但是并不会影响person2。

## 利用JSON库实现序列化

通过JSON实现深拷贝可以使用第三方库，比如Jackson、Gson等。这里以Jackson为例，假设我们有一个Person类：

```java
public class Person {
    private String name;
    private int age;
    private List<String> hobbies;
    // 省略构造方法和getter/setter方法
}
```

要实现对一个Person对象进行深拷贝，可以先将Person对象转为JSON字符串，再将JSON字符串转回Person对象。具体代码如下：

```java
ObjectMapper objectMapper = new ObjectMapper();
Person originalPerson = new Person("小明", 30, Arrays.asList("唱", "跳", "Rap", "篮球"));
String jsonString = objectMapper.writeValueAsString(originalPerson);
Person copiedPerson = objectMapper.readValue(jsonString, Person.class);
```

首先，创建一个ObjectMapper对象，该对象是Jackson库中用于序列化和反序列化的核心类。接着，创建一个Person对象originalPerson，并将其转为JSON字符串，这里使用了ObjectMapper的writeValueAsString()方法。然后，使用ObjectMapper的readValue()方法将JSON字符串转回Person对象，并存入copiedPerson对象中。这样就实现了深拷贝。
