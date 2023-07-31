---
title: JSP作用域
date: 2021-02-16 16:15:43
summary: 本文分享JSP的四种作用域的相关内容。
tags:
- Java
- JSP
categories:
- Java
---

对象的生命周期和可访问性称为作用域（scope），在JSP中有四种作用域：
- pageContext：page域
- request：request域
- session：session域
- application：context域

域对象作用：保存数据和获取数据 ，用于数据共享。

域对象方法：
- `setAttribute("name",Object)`：保存数据
- `getAttribute("name")`：获取数据
- `removeAttribute("name")`：清除数据

四种作用域的生命周期和可访问性介绍如下：
- 页面域（page scope）：存储在页面域的对象只对于它**所在页面**是可访问的。
- 请求域（request scope）：请求域的生命周期是指**一次请求过程**，包括请求被转发（forward）或者被包含（include）的情况。存储在请求域中的对象只有在此次请求过程中才可以被访问。
- 会话域（session scope）：会话域的生命周期是指**某个客户端与服务器所连接的时间**，存储在会话域中的对象在整个会话期间（可能包含多次请求）都可以被访问。
- 应用域（application scope）：应用域的生命周期是指**从服务器开始执行服务到服务器关闭为止**，是四个作用域中时间最长的。存储在应用域中的对象在整个应用程序运行期间可以被所有JSP和Servlet共享访问，在使用时要特别注意存储数据的大小和安全性，否则可能会造成服务器负载过重和线程安全性问题。
