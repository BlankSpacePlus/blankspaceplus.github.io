---
title: Groovy程序设计基础
date: 2020-09-15 18:29:42
summary: 本文分享Groovy程序设计的基本内容。
tags:
- Groovy
categories:
- 开发技术
---

# Groovy

1. Groovy有同时支持静态和动态类型（Java本质上只支持静态类型）
2. Groovy支持运算符重载（Java不支持）
3. Groovy支持本地语法列表和关联数组
4. Groovy有对正则表达式的本地支持
5. Groovy有各种标记语言，如XML和HTML原生支持
6. Groovy和Java的语法非常相似
7. 可以使用现有的Java库
8. Groovy扩展了java.lang.Object

# Groovy下载安装

[官网下载](https://groovy.apache.org/download.html)

博主觉得不需要安装包，用现成的zip解压，添加bin路径到path即可。

# Groovy关键词

- as
- assert
- break
- case
- catch
- class
- const
- continue
- def
- default
- do
- else
- enum
- extends
- false
- finally
- for
- goto
- if
- implements
- import
- `in`
- instanceof
- interface
- new
- `pull`
- package
- return
- super
- switch
- this
- throw
- throws
- `trait`
- true
- try
- while	 	 	 

# Groovy语法笔记

1. 基本格式是：`def regex = ~'Groovy'`，当Groovy运算符=〜在if和while语句中作为谓词(返回布尔值的表达式)出现时，左侧的String操作数与右侧的正则表达式操作数匹配。
2. Groovy的OOP语法感觉和Java基本一样。
3. Groovy的泛型感觉和Java也一样，甚至支持菱形语法。
4. 定义变量可以不强行指定类型，即`def a = 1;`，感觉有点儿像Java10的`var`。
5. 增强的迭代列表for循环不是Java那种格式了，改成了`for...in`的格式。
6. 对于函数/方法的使用，感觉也没啥特殊的。
7. Groovy也有装箱和拆箱的说法。
8. Groovy把字符串重复增强了，Java得用repeat()，Groovy直接用`*`即可，如`"Hello"*2`就是`"HelloHello"`
9. Groovy可以定义一个叫`范围`的东西，就是一个序列，可以是数值，可以是字符，可以升序，可以降序，便于速记一个间隔固定的范围区间。
10. Java数组用的是真难受，而我们亲爱的Groovy把数组做成了列表，和Python似的，极度便捷易用，嵌套、索引不在话下。
11. Java想弄映射一般得用Map，Groovy又做了个和Python字典很像的东西，用中括号括起来，就是一堆kv对儿的映射，空的格式是`[:]`。
12. Groovy日期用起来和Java手感差不多。
13. Groovy好像不搞什么Lambda表达式了，做了个闭包，这个概念在很多编程语言中也都有的。
14. JMX是defacto标准，Groovy可用其监控与Java虚拟环境有任何关系的所有应用程序。
15. 用JDBC的包就能直接连数据库，挺方便的。
16. 其实Groovy不需要用分号。
17. 感觉Trait像抽象类，具体没深入探究。

# Groovy错误解决

## Groovyc: Internal groovyc error: code 1

博主在编译Groovy代码时，发现报错：<font color="red">Groovyc: Internal groovyc error: code 1</font>

下面分析错误原因和解决方法。

Groovy和Java同为运行在JVM上的语言，有一定的相似性，因此要先了解Java编译命令javac。

javac是java中的编译源代码的命令工具，将.java文件编译成`.class`文件。而groovyc的作用大致相当于javac，这个报错明显是编译出现了问题。

博主在刚遇到这个错误的时候查了查资料，有的人说重新build就行了，其实未必。

我在查看了自己的Java版本后发现自己的Java11已被移除，但项目显示的仍是Java11，我立即调整Project Structure里的JDK版本为1.8，再运行就OK了。

如果你也遇到了同样的问题，这篇文章的解决方法不一定适合于你，但或许可以启发你多去找找其他原因，而非网上XXX说的XXX原因。
