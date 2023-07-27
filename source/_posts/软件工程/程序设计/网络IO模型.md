---
title: 网络IO模型
date: 2019-11-29 00:55:07
summary: 本文介绍BIO、NIO、AIO三种网络I/O模型。
tags:
- 程序设计
categories:
- 程序设计
---

# 网络I/O模型

我们知道，UNIX环境下常见的网络I/O模型有5种：
 - 同步阻塞
 - 同步非阻塞
 - I/O复用
 - 信号驱动
 - 异步非阻塞

那么基于上述五种模型，Java中，随着NIO和AIO(NIO 2.0)的引入，一般具有以下三种网络编程模型：
 - BIO
 - NIO
 - AIO

这次，我们就简单聊聊这三种网络编程模型。

# BIO模型

BIO是一个经典的网络编程模型，是通常我们实现一个服务器端程序的过程。

步骤如下：
 - 主线程accept请求阻塞。
 - 请求到达，创建新的线程来处理这个socket，完成对客户端的响应。
 - 主线程继续accept下一个请求。

这个模型的一个明显的缺点：
当客户端连接快速增长时，服务器端创建的线程也会骤增，系统性能可能会骤降。

因此，在该模型的基础上，可以创建线程池，从而避免对每个客户端线程都创建一个新的服务器端线程，进而提升性能（创建线程是很耗费资源的，尽管线程可以看做轻量级进程）。
可参考Tomcat 的 BIO Connector。
这种方式也有被称为“伪异步I/O”，因为它是把请求抛到线程池中异步等待处理。

# NIO模型

Java的NIO类库从JDK1.4（Java4）开始引入，这里NIO主要指非阻塞I/O，主要使用Selector多路复用器来实现的。
Selector在Linux等主流操作系统中是通过epoll实现的。
[epoll 详解](https://blog.csdn.net/daaikuaichuan/article/details/83862311)
[epoll 百度百科](https://baike.baidu.com/item/epoll/10738144?fr=aladdin)
[Java NIO Selector 剖析](https://blog.csdn.net/u014730165/article/details/85089085)

NIO的实现流程类似于select：
 - 创建ServerSocketChannel监听客户端连接并绑定监听窗口，设置为非阻塞模式。
 - 创建Reactor线程，创建多路复用器Selector并启动线程。
 - 将ServerSocketChannel注册到Reactor线程的Selector上。监听accept事件。
 - Selector在线程run方法中无限循环轮询准备就绪的key。
 - Selector监听到新的客户端接入，处理新的请求，完成TCP三次握手，建立物理连接。
 - 将新的客户端连接注册到Selector上，监听读操作。读取客户端发送的网络消息。
 - 客户端发送的数据就绪则读取客户端请求，进行处理。

# AIO模型

传说中的AIO其实是NIO 2.0，Java的AIO类库从JDK1.7（Java7）引入，它提供了异步文件通道和异步socket通道的实现。
AIO底层在Windows上是通过IOCP实现的，在Linux上则是通过epoll实现的。
[IOCP 解读](https://blog.csdn.net/jing_nnn/article/details/102635428)
[IOCP 百度百科](https://baike.baidu.com/item/IOCP/9207102?fr=aladdin)
LinuxAsynchronousChannelProvider.java
UnixAsynchronousServerSocketChannelImpl.java

流程：
- 创建AsynchronousServerSocketChannel，绑定监听端口。
- 调用AsynchronousServerSocketChannel的accpet方法，传入自己实现的CompletionHandler。包括上一步都是非阻塞的。
- 连接传入，回调CompletionHandler的completed方法，在里面，调用AsynchronousSocketChannel的read方法，传入负责处理数据的CompletionHandler。
- 数据就绪，触发负责处理数据的CompletionHandler的completed方法。继续做下一步处理即可。
- 写入操作类似，也需要传入CompletionHandler。

AIO比起NIO，有了不少的简化。

# 对比总结

|对比指标|同步阻塞IO|伪异步IO|NIO|AIO|
|:----:|:----:|:----:|:----:|:----:|
|客户端数目 : 服务器端 I/O 线程数目|1 : 1|m : n|m : 1|m : 0|
|网络 I/O 模型|同步阻塞 I/O |同步阻塞I/O|同步非阻塞I/O|异步非阻塞I/O|
|吞吐量|较低|一般|较高|较高|
|编程复杂度|比较简单|比较简单|非常复杂|比较复杂|
