---
title: Java对象序列化IO
date: 2020-03-07 16:08:14
summary: 本文总结归纳Java对象序列化I/O体系。
tags:
- Java
categories:
- Java
---

# 对象序列化体系概述

- 通过使用ObjectInputStream和ObjectOutputStream类保存和读取对象的机制叫做序列化机制
- 序列化与反序列化
  - 对象序列化是指将对象转换为字节序列的过程
  - 对象反序列化则是根据字节序列恢复对象的过程 
- 序列化一般用于以下场景：
  - 永久性保存对象，保存对象的字节序列到本地文件中
  - 通过序列化对象在网络中传递对象 
  - 通过序列化在进程间传递对象

# 支持序列化的接口和类

- 序列化的过程，是将任何实现了Serializable接口或Externalizable接口的对象通过ObjectOutputStream类提供的相应方法转换为连续的字节数据，这些数据以后仍可通过ObjectInputStream类提供的相应方法被还原为原来的对象状态，这样就可以将对象完成的保存在本地文件中，或在网络间、进程间传递
- 支持序列化的接口和类 
  - Serializable接口
  - Externalizable接口 
  - ObjectInputStream类
  - ObjectOutputStream类 
 
## Serializable接口

只有一个实现Serializable接口的对象可以被序列化工具存储和恢复。

Serializable接口没有定义任何属性或方法。它只用来表示一个类可以被序列化。

如果一个类可以序列化，它的所有子类都可以序列化。

## Externalizable接口

可以让需要序列化的类实现Serializable接口的子接口Externalizable。

Externalizable接口表示实现该接口的类在序列化中由该类本身来控制信息的写出和读入。

## ObjectOutputStream类

ObjectOutputStream类继承OutputStream类，并实现了ObjectOutput接口，它负责向流写入对象。 

**构造方法**
```java
ObjectOutputStream(OutputStream out) 
```

**主要方法**

```java
writeObject(Object obj) // 向指定的OutputStream中写入对象obj
```

## ObjectInputStream类

ObjectInputStream类继承InputStream类，并实现了ObjectInput接口，它负责从流中读取对象 。

**构造方法**

```java
ObjectInputStream(InputStream in) 
```

**主要方法**

```java
readObject(Object obj) // 从指定的InputStream中读取对象 
```

# 对象序列化的条件

- 该对象类必须实现Serializable接口
- 如果该类有直接或者间接的不可序列化的基类，那么该基类必须 有一个默认的构造器。该派生类需要负责将其基类中的数据写入 流中
- 建议所有可序列化类都显式声明serialVersionUID值

# 序列化与serialVersionUID

这个属性，在IDEA里是不主动提示的，但Eclipse中会提示的，并建议开发者自己指定或者使用默认值。

默认值是这么写的：

```java
private static long serialVersionUID = 1L;
```

serialVersionUID在反序列化过程中用于验证序列化对象的发送者和接收者是否为该对象加载了与序列化兼容的类。

如果接收者加载的该对象的类的serialVersionUID与对应的发送者的类的版本号不同，则反序列化将会抛出InvalidClassException。

# 序列化与transient关键词

推荐阅读：[举例浅谈Java关键词transient的使用](https://blog.csdn.net/weixin_43896318/article/details/104581904)

# 封装序列化文件操作工具

推荐阅读：[Java封装序列化文件工具类](https://blankspace.blog.csdn.net/article/details/103467993)
