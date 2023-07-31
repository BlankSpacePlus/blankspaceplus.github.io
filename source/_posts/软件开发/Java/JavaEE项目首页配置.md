---
title: JavaEE项目首页配置
date: 2021-02-03 21:31:51
summary: 本文分享以web.xml配置JavaEE项目首页的方法。
tags:
- Java
- Servlet
- JSP
categories:
- Java
---

为项目的web.xml配置如下xml代码：
```xml
<welcome-file-list>
    <welcome-file>login.jsp</welcome-file>
</welcome-file-list>
```

即表示服务器开启时，浏览器直接访问该项目，会显示login.jsp。

比如：我们原先想要开启login.jsp需要输入：`localhost:8080/web/login.jsp`，但我们现在只需要输入：`localhost:8080/web`即可显示登录页面。

进一步讲，我们可能要做多种准备，即：
```xml
<welcome-file-list>
    <welcome-file>login.jsp</welcome-file>
    <welcome-file>login.html</welcome-file>
    <welcome-file>login.htm</welcome-file>
</welcome-file-list>
```

它保证了在访问项目时，如果login.jsp不存在，则访问login.html替代它，如果login.html也不存在，则访问login.htm替代它。
