---
title: JSP与JavaBean
date: 2021-02-16 15:34:11
summary: 本文探讨JSP与JavaBean的关系。
tags:
- Java
- JSP
categories:
- Java
---

JavaBean是一种特殊的Java类，以封装和重用为目的，在类的设计上遵从一定的规范，以供其它组件根据这种规范来调用。

JavaBean最大的优势在于重用，同时它又具有以下特性：
- 易于维护、使用、编写。
- 封装了复杂的业务逻辑。
- 可移植性。
- 便于传输，既可用于本地也可用于网络传输。

JavaBean可分为两种：
- 有用户界面（UI，User Interface）的JavaBean，例如一些GUI组件（按钮、文本框、报表组件等）。
- 没有用户界面、主要负责封装数据、业务处理的JavaBean。

JSP通常访问的是后一种JavaBean。

JSP与JavaBean搭配使用，具有以下优势：
- JSP页面中的HTML代码与Java代码分离，便于页面设计人员和Java编程人员的分工与维护。
- 使JSP更加侧重于生成动态网页，事务处理由JavaBean来完成，使系统更趋于组件化、模块化。

JavaBean的这些优势，使系统具有了更好的健壮性和灵活性，使得JSP+JavaBean和JSP+Servlet+JavaBean的组合设计模式成为以前开发Java Web应用的主流模式之一。

一个标准的JavaBean需要遵从以下规范：
- JavaBean是一个公开的（public）类，以便被外部程序访问。
- 具有一个无参的构造方法（即一般类中默认的构造方法），以便被外部程序实例化时调用。
- 提供setXxx()方法和getXxx()方法，以便让外部程序设置和获取其属性。

凡是符合上述规范的Java类，都可以被称为JavaBean。

JavaBean中的setXxx()方法和getXxx()方法也被称为setter方法和getter方法，是针对JavaBean方法的一种命名方式。
方法的名称由字符“set+属性名”和“get+属性名”构成，“属性名”是将JavaBean的属性名称首字母大写后得来。
例如：名称为“userName”的JavaBean属性，对应的setter和getter方法为：setUserName()和getUserName()。

JavaBean通过这种方法的命名规范，以及对类的访问权限和构造函数的要求，使得外部程序能够通过反射机制来实例化JavaBean和查找到这些方法，从而调用这些方法来设置和获取JavaBean对象的属性。

JSP提供的访问JavaBean 的3个动作元素：
- `<jsp:useBean>`：创建或查找JavaBean实例对象。
- `<jsp:setProperty>`：设置JavaBean对象的属性值。
- `<jsp:getProperty>`：获取JavaBean对象的属性值。
