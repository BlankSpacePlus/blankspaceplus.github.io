---
title: Java遍历时优雅地删除集合元素
date: 2020-03-04 16:29:29
summary: 以List为例，细说遍历时如何优雅地删除Java集合元素。
tags:
- Java
categories:
- 开发技术
---

# 实体类

```java
import java.io.Serializable;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return Objects.equals(id, person.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
```

# 数据预设定

| id |  name| age |
|:----:|:----:|:----:|
| 100 | Sam1 | 12 |
| 101 | Sam2 | 13 |
| 102 | Sam3 | 14 |
| 103 | Sam4 | 15 |
| 104 | Sam5 | 16 |
| 105 | Sam6 | 17 |
| 106 | Sam7 | 18 |
| 107 | Sam8 | 19 |
| 108 | Sam9 | 20 |

# 优雅的List打印方式

```java
list.forEach(System.out::println);
```

# 不知索引仍直接使用remove()

想直接remove()还不知索引，就需要按照equals()和hashCode()的指引，我们已经设定equals()的判据是id，也就是相当于把id当成了辨别人的唯一依据，那只需要构造一个id为指定值的对象，就能直接删了！

```java
 list.remove(new Person(101, "Bob", 333));
```

# 三种遍历时的删除方法

## 直接删

直接删注意index，如果删一个元素，其后一个元素的index就减一了，此时我们仍让i++，就会漏情况，所以要按下面说的写：

```java
for (int i = 0; i < list.size();) {
    if ("Sam5".equals(list.get(i).getName())) {
        list.remove(i);
    } else {
        i++;
    }
}
```

## 增强for循环删除

在这里面删元素，再遍历下去就是并发修改异常了，所以如果只删一个的话，赶紧break吧！

```java
for (Person p : list) {
    if ("Sam7".equals(p.getName())) {
         list.remove(p);
         break;
    }
}
```

## 迭代器删除

获取List对象的迭代器，进行遍历。
删除使用iterator.remove()，能不出现并发修改异常，不需要一删除就break。

```java
Iterator<Person> iterator = list.iterator();
while (iterator.hasNext()) {
    Person p = iterator.next();
    if ("Sam3".equals(p.getName())) {
        iterator.remove();
    }
}
```

# 完整代码

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ListRemoveTest {
    public static void main(String[] args) {
        List<Person> list = new ArrayList<>();
        list.add(new Person(100, "Sam1", 12));
        list.add(new Person(101, "Sam2", 13));
        list.add(new Person(102, "Sam3", 14));
        list.add(new Person(103, "Sam4", 15));
        list.add(new Person(104, "Sam5", 16));
        list.add(new Person(105, "Sam6", 17));
        list.add(new Person(106, "Sam7", 18));
        list.add(new Person(107, "Sam8", 19));
        list.add(new Person(108, "Sam9", 20));
        System.out.println("**********************************************");
        list.forEach(System.out::println);
        System.out.println("**********************************************");
        list.remove(new Person(101, "Bob", 333));
        list.forEach(System.out::println);
        System.out.println("**********************************************");
        for (int i = 0; i < list.size();) {
            if ("Sam5".equals(list.get(i).getName())) {
                list.remove(i);
            } else {
                i++;
            }
        }
        list.forEach(System.out::println);
        System.out.println("**********************************************");
        for (Person p : list) {
            if ("Sam7".equals(p.getName())) {
                list.remove(p);
                break;
            }
        }
        list.forEach(System.out::println);
        System.out.println("**********************************************");
        Iterator<Person> iterator = list.iterator();
        while (iterator.hasNext()) {
            Person p = iterator.next();
            if ("Sam3".equals(p.getName())) {
                iterator.remove();
            }
        }
        list.forEach(System.out::println);
        System.out.println("**********************************************");
    }
}
```

# 测试结果

```java
**********************************************
Person{id=100, name='Sam1', age=12}
Person{id=101, name='Sam2', age=13}
Person{id=102, name='Sam3', age=14}
Person{id=103, name='Sam4', age=15}
Person{id=104, name='Sam5', age=16}
Person{id=105, name='Sam6', age=17}
Person{id=106, name='Sam7', age=18}
Person{id=107, name='Sam8', age=19}
Person{id=108, name='Sam9', age=20}
**********************************************
Person{id=100, name='Sam1', age=12}
Person{id=102, name='Sam3', age=14}
Person{id=103, name='Sam4', age=15}
Person{id=104, name='Sam5', age=16}
Person{id=105, name='Sam6', age=17}
Person{id=106, name='Sam7', age=18}
Person{id=107, name='Sam8', age=19}
Person{id=108, name='Sam9', age=20}
**********************************************
Person{id=100, name='Sam1', age=12}
Person{id=102, name='Sam3', age=14}
Person{id=103, name='Sam4', age=15}
Person{id=105, name='Sam6', age=17}
Person{id=106, name='Sam7', age=18}
Person{id=107, name='Sam8', age=19}
Person{id=108, name='Sam9', age=20}
**********************************************
Person{id=100, name='Sam1', age=12}
Person{id=102, name='Sam3', age=14}
Person{id=103, name='Sam4', age=15}
Person{id=105, name='Sam6', age=17}
Person{id=107, name='Sam8', age=19}
Person{id=108, name='Sam9', age=20}
**********************************************
Person{id=100, name='Sam1', age=12}
Person{id=103, name='Sam4', age=15}
Person{id=105, name='Sam6', age=17}
Person{id=107, name='Sam8', age=19}
Person{id=108, name='Sam9', age=20}
**********************************************
```
