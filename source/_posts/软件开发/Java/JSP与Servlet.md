---
title: JSP与Servlet
date: 2021-02-16 15:41:59
summary: 本文讨论JSP与Servlet的关系。
tags:
- Java
- Servlet
- JSP
categories:
- Java
---

# Servlet

Servlet是基于Java语言的Web服务器端编程技术，按照Java EE规范定义，Servlet是运行在Servlet容器中的Java类，它能处理Web客户的HTTP请求，并产生HTTP响应。

# JSP

JSP全称是Java Server Pages，它和Servlet技术一样，都是SUN公司定义的一种用于开发动态Web资源的技术。

JSP是一种服务器端脚本语言，其出现降低了Servlet编写页面的难度。JSP本质上就是Servlet，实际上JSP是首先被编译成Servlet后才编译运行的，因此JSP能够实现Servlet所能够实现的所有功能。

相比HTML而言，HTML只能为用户提供静态数据，而JSP技术允许在页面中嵌套Java代码，为用户提供动态数据。

# JSP与Servlet的关系

JSP与Servlet，虽然都可以用于开发动态Web资源，但由于这两门技术各自的特点，在长期的软件实践中，人们逐渐把Servlet作为Web应用中的控制器组件来使用，而把JSP技术作为数据显示模板来使用，各取所长。

Servlet+JSP模式：
- Servlet：用于开发动态资源，是一个Java类，较擅长写Java代码
    1. 接收参数
    2. 处理业务逻辑
    3. 把结果保存到域对象中
    4. 跳转到JSP页面
- JSP：用于开发动态资源，通过Java代码较擅长输出HTML代码
    1. 从域对象取出数据
    2. 把数据显示到浏览器
