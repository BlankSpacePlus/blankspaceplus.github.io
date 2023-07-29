---
title: Java存储单元的设计与实现
date: 2020-02-22 22:50:23
summary: 本文提供Java实现存储单元ADT的案例。
tags:
- Java
categories:
- 开发技术
---

# 存储单元

## 结构设计

存储单元如果也能说是一种ADT的话，那应该具有的基本功能我认为是两个：
- **存/写入**
- **取/读出**

初始化的时候可以按照默认的来，也可以指定具体的**initialValue**。

据此，将其抽象成一个类就可以实现了。

## 编程实现

泛型类MemoryCell<T>的实现：

```java
public class MemoryCell<T> {

    private T storedValue;

    public MemoryCell() {}

    public MemoryCell(T storedValue) {
        this.storedValue = storedValue;
    }

    public T read() {
        return storedValue;
    }

    public void write(T x) {
        storedValue = x;
    }

}
```

## 功能测试

```java
public class MemoryCellTest {
    public static void main(String [] args) {
        MemoryCell<Integer> cell = new MemoryCell<>(7);
        System.out.println("Contents are: " + cell.read());
        cell.write(5);
        System.out.println("Contents are: " + cell.read());
    }
}
```

这里用一个int做了测试，如我们所愿：

<font color="blue">Contents are: 7
Contents are: 5</font>

# 整数存储单元

下面以int类型的变量为例再实践一下。

## 结构设计

上文说过，存储单元如果也能说是一种ADT的话，那应该具有的基本功能我认为是两个：

- 存/写入
- 取/读出

初始化的时候可以按照默认的来，也可以指定具体的initialValue。

据此，将其抽象成一个类就可以实现了。

那按照这个思路，设计整数存储单元就很容易啦。

## 编程实现

实现类IntCell的实现：

```java
public class IntCell {

    private int storedValue;

    public IntCell() {
        this(0);
    }

    public IntCell(int initialValue) {
        storedValue = initialValue;
    }

    public int read() {
        return storedValue;
    }

    public void write(int x) {
        storedValue = x;
    }

}
```

## 功能测试

先初始化一个数，接下来逐一进行读，写，读：

```java
public class IntCellTest {
    public static void main(String [] args) {
        IntCell cell = new IntCell(7);
        System.out.println("Cell contents: " + cell.read());
        cell.write(5);
        System.out.println("Cell contents: " + cell.read());
    }
}
```

测试结果：

<font color="blue">Cell contents: 7
Cell contents: 5</font>
