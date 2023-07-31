---
title: Servlet生命周期
date: 2021-02-15 23:58:46
summary: Servlet生命周期是指Servlet实例从创建到响应客户请求直至销毁的过程，本文分享此生命周期。
tags:
- Java
- Servlet
categories:
- Java
---

**Servlet生命周期**是指Servlet实例从创建到响应客户请求，直至销毁的过程。

Servlet程序本身不直接在Java虚拟机上运行，由**Servlet容器**负责管理其整个生命周期。

Servlet生命周期可分为四个阶段：**实例化**、**初始化**、**处理请求**、**销毁**。
- Servlet加载和实例化
    - 在Servlet容器启动后，客户首次向Servlet发出请求，Servlet容器会判断内存中是否存在指定的Servlet对象，如果没有则创建它，然后根据客户的请求创建HttpRequest、HttpResponse对象，从而调用Servlet 对象的service方法。
    - 在为Servlet配置了自动装入选项（load-on-startup）时，服务器在启动时会自动装入此Servlet。
- Servlet初始化
    - Servlet实例化后，Servlet容器将调用Servlet的init方法来对Servlet实例进行初始化，如果初始化成功，Servlet在Web容器中会处于服务可用状态；如果初始化失败，Servlet容器会销毁该实例。
    - 当Servlet运行出现异常时，Servlet容器会使该实例变为服务不可用状态。
- Servlet请求处理
    - 服务器接收到客户端请求，会为该请求创建“请求”对象和“响应”对象，并调用service()方法，service()方法再调用其他方法来处理请求。
    - 在Servlet生命周期中，service()方法可能被多次调用。当多个客户端同时访问某个Servlet的service()方法时，服务器会为每个请求创建一个线程，这样可以并行处理多个请求，减少请求处理的等待时间，提高服务器的响应速度。但同时也要注意对同一对象的并发访问问题。
- Servlet服务终止
    - 当Servlet容器需要终止Servlet（如Web服务器被关闭或需要出让资源），它会先调用Servlet的destroy()方法使其释放正在使用的资源。
    - 在调用destroy()方法之前，必须让当前正在执行service()方法的任何线程完成执行，或者超过了服务器定义的时间限制。
    - 在destroy()方法完成后，Servlet容器必须释放Servlet实例以便被垃圾回收。
