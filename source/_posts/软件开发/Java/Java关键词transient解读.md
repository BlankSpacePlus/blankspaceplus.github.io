---
title: Java关键词transient解读
date: 2020-02-29 21:11:30
summary: 本文解读Java关键词transient。
tags:
- Java
categories:
- Java
---

# 说明

本文的路径被我删了部分，所以复制代码的话要注意自己写好文件的path。

# 控制序列化IO的类

```java
import java.io.*;

public class PersonMapper {

    private PersonMapper() {}

    private static PersonMapper mapper;

    /**
     * 获取单例
     * @return 单例
     */
    public static PersonMapper getInstance() {
        if (mapper == null) {
            mapper = new PersonMapper();
        }
        return mapper;
    }

    /**
     * 反序列化从文件中读取Person的序列化对象
     */
    public Person readObject() {
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("src/com/.../test/serialPerson.dat"))) {
            Person obj = (Person)ois.readObject();
            return obj;
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 序列化对象
     */
    public void writeObject(Person object) {
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("src/com/.../test/serialPerson.dat"))) {
            oos.writeObject(object);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
```

# 测试类

```java
public class TransientTest {
    public static void main(String[] args) {
        Person person = new Person(1, "Tim", 10);
        PersonMapper mapper = PersonMapper.getInstance();
        mapper.writeObject(person);
        System.out.println(mapper.readObject());
    }
}
```

# 使用transient的Person类

**注意实现 java.io.Serializable，并写一下serialVersionUID。**

注意 **transient** ！！！

```java
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;

    private String name;

    private transient Integer age;

    public Person(Integer id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" + "id=" + id + ", name='" + name + '\'' + ", age=" + age + '}';
    }

}
```

测试结果：

```java
Person{id=1, name='Tim', age=null}
```

# 去掉transient的Person类

只删去 transient：
```java
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;

    private String name;

    private Integer age;

    public Person(Integer id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" + "id=" + id + ", name='" + name + '\'' + ", age=" + age + '}';
    }

}
```

测试结果：

```java
Person{id=1, name='Tim', age=10}
```

# 结论

Java没有把对象被transient标记的属性序列化。

# 荐读

- [Java transient关键字使用示例](https://www.jianshu.com/p/2911e5946d5c)
- [Java transient关键字使用小记](https://www.cnblogs.com/lanxuezaipiao/p/3369962.html)

# 补充

- transient修饰的属性不进行序列化的操作，起到一定消息屏蔽 的效果
- 被transient修饰的属性可以正确的创建，但被系统赋为默认值。 
比如，int类型为0，String类型为null 

注：ObjectInputStream和ObjectOutputStream类不会保存和 读写对象中的transient和static类型的成员变量 
