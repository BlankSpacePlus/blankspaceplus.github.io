---
title: Servlet收发HTTP请求中文乱码
date: 2021-02-16 13:48:09
summary: 本文分享Servlet收发HTTP请求中文乱码的相关内容。
tags:
- Java
- Servlet
- HTTP
categories:
- Java
---

# 请求中文乱码

在进行请求参数传递时，经常会遇到请求数据为中文时的乱码问题，当Form表单的文本域中输入中文时会产生乱码问题，出现乱码的原因与客户端的请求编码方式（GET请求或POST请求）以及服务器的处理编码方式有关。

# POST请求乱码

浏览器会按当前显示页面所采用的字符集对请求的中文数据进行编码，而后再以报文体的形式传送给服务器，Servlet在调用getParameter()方法获取参数时，会以HttpServletRequest对象的getCharacterEncoding()方法返回的字符集对其进行解码，而该方法的返回值在未经过setCharacterEncoding(charset)方法设置编码的情况下为null，这时getParameter()方法将以服务器默认的ISO-8859-1字符集对参数进行解码，而ISO-8859-1字符集并不包含中文，于是造成中文参数的乱码问题。

解决办法：
在调用getParameter()方法前先调用setCharacterEncoding(charset)方法设定与页面请求编码相同的解码字符集。

# GET请求乱码

GET请求参数以`?`或`&`为连接字符附加在URL地址后，根据网络标准RFC1738规定，只有字母和数字以及一些特殊符号和某些保留字才可以不经过编码直接用于URL，因此在请求参数为中文时必须先由浏览器进行编码后才能发送给服务器，服务器端对GET请求参数依照服务器本身默认的字符集进行解码。

在服务器端，由于GET请求参数是作为请求行发送给服务器的，因此Servlet在通过getParameter()获取请求参数时，并不能使用setCharacterEncoding(charset)方法指定的字符集进行解码，而是依照服务器本身默认的字符集进行解码。

Tomcat服务器各版本中默认的URIEncoding字符集并不完全相同，例如，Tomcat6和Tomcat7都默认为ISO-8859-1，这类版本中，对于GET请求的中文参数必须经处理后才会避免乱码问题，因此在实际开发中尽量避免使用GET请求来传递中文参数。
