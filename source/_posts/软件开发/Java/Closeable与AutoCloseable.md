---
title: Closeable与AutoCloseable
date: 2021-02-20 23:39:51
summary: 本文分享java.io.Closeable和java.lang.AutoCloseable与自动回收资源的try-with-resources语句块之间的关系。
tags:
- Java
categories:
- Java
---

java.io.Closeable和java.lang.AutoCloseable是两个在Java中用于关闭资源的接口。java.lang.AutoCloseable更适合在try-with-resources语句中使用，而java.io.Closeable则更多用于早期的Java版本或不支持try-with-resources的环境中。

# java.io.Closeable

java.io.Closeable是一个标记接口，它定义了一个方法`public abstract void close() throws IOException`，用于关闭可关闭的资源。一些常见的实现类包括java.io.InputStream、java.io.OutputStream、java.io.Reader、java.io.Writer等。在使用这些类时，应该显式地关闭这些资源以避免资源泄漏。

java.io.Closeable接口它定义了一个对象，该对象可以关闭以释放它持有的任何资源，例如打开的文件或网络连接。java.io.Closeable是java.lang.AutoCloseable的子接口，并将java.io.IOException添加到关闭方法的签名中。

java.io.Closeable的close()方法通常用于释放与对象关联的任何系统资源，例如文件描述符、套接字或数据库连接。 如果对象已经关闭，则调用close()无效。 如果在关闭对象时发生I/O错误，close()方法将抛出java.io.IOException。

java.io.Closeable旨在与try-with-resources语句一起使用，它会在语句块的末尾自动关闭资源。 因为java.io.Closeable扩展了java.lang.AutoCloseable，所以任何实现java.io.Closeable的对象都可以与try-with-resources语句一起使用。

```java
public interface Closeable extends AutoCloseable {
    public void close() throws IOException;
}
```

# java.lang.AutoCloseable

java.lang.AutoCloseable也是一个类似的接口，但它是在Java7中引入的。它定义了一个方法`void close() throws Exception`，它也用于关闭资源，但它的异常声明比java.io.Closeable更广泛。java.lang.AutoCloseable的主要用途是在try-with-resources语句中使用。在try-with-resources语句块中创建的对象会在代码块执行完成后自动关闭。这种方式避免了忘记关闭资源的风险，并使代码更加简洁。

java.lang.AutoCloseable接口提供了一种方式来确保在使用资源后及时释放这些资源，以避免资源耗尽异常和其他可能的错误。java.lang.AutoCloseable接口具有一个close()方法，调用该方法可以关闭实现java.lang.AutoCloseable接口的对象，并释放该对象控制的所有资源。

该接口通常用于try-with-resources语句块中，try-with-resources语句块可确保在程序退出该块时自动调用close()方法，从而释放相关资源。因此，实现java.lang.AutoCloseable接口的类可以自动管理资源，避免手动关闭资源，减少代码出错的可能性。

需要注意的是，close()方法声明抛出java.lang.Exception异常，但是实现该接口的类应该尽可能地抛出更具体的异常，或者在关闭操作无法失败时不抛出异常。此外，实现java.lang.AutoCloseable接口的类的close()方法应该是幂等的，即多次调用该方法与单次调用效果相同。虽然该方法不强制要求幂等性，但是实现该接口的类应该尽可能地使close()方法幂等，这样可以确保在多次调用close()方法时不会出现任何不良后果。

```java
public interface AutoCloseable {
    void close() throws Exception;
}
```

虽然java.io.Closeable和java.lang.AutoCloseable都可以使用try-with-resources语句块，但是从使用上的角度来看，java.lang.AutoCloseable 更适合用于try-with-resources语句块。
原因是java.lang.AutoCloseable是从Java7开始引入的，是为了增强资源管理的语言特性。java.lang.AutoCloseable的close()方法声明抛出java.lang.Exception，而java.io.Closeable的close()方法只声明抛出java.io.IOException。因此，使用java.lang.AutoCloseable时，可以在try-with-resources语句块中关闭任何实现了java.lang.AutoCloseable接口的资源，包括那些不会抛出java.io.IOException的资源。而使用java.io.Closeable时，只能关闭那些会抛出 IOException 的资源。

另外，从Java9开始，JVM对java.lang.AutoCloseable接口的支持得到优化，因此使用java.lang.AutoCloseable可能会比使用java.io.Closeable更加高效。
