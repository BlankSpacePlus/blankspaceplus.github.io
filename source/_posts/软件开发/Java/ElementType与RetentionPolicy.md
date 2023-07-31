---
title: ElementType与RetentionPolicy
date: 2021-03-11 19:40:08
summary: 本文分享java.lang.annotation.ElementType与java.lang.annotation.RetentionPolicy的相关内容，其中ElementType与@Target、RetentionPolicy与@Retention绑定。
tags:
- Java
categories:
- Java
---

java.lang.annotation.ElementType与java.lang.annotation.RetentionPolicy分别是用于@Target与@Retention的枚举类型，它们用于声明注解的应用范围和保留策略。

推荐阅读：[Java中常见的注解](https://blankspace.blog.csdn.net/article/details/116377460)

# @Target与ElementType

```java
public enum ElementType {
    TYPE,
    FIELD,
    METHOD,
    PARAMETER,
    CONSTRUCTOR,
    LOCAL_VARIABLE,
    ANNOTATION_TYPE,
    PACKAGE,
    TYPE_PARAMETER,
    TYPE_USE,
    MODULE,
    RECORD_COMPONENT;
}
```

java.lang.annotation.ElementType定义了注解可以出现的不同语法位置，它指定了在Java程序中可以编写特定类型的注解的位置。java.lang.annotation.ElementType枚举类的常量与java.lang.annotation.Target元注解一起使用
- TYPE：类、接口（包括注解接口）、枚举或记录声明。
- FIELD：字段声明（包括枚举常量）。
- METHOD：方法声明。
- PARAMETER：形式参数声明。
- CONSTRUCTOR：构造函数声明。
- LOCAL_VARIABLE：局部变量声明。
- ANNOTATION_TYPE：注解接口声明（以前称为注解类型）。
- PACKAGE：包声明。
- TYPE_PARAMETER：类型参数声明（自Java8引入）。
- TYPE_USE：类型使用（自Java8引入）。可以出现在类和接口声明、类型参数声明以及表达式中使用的类型上。
- MODULE：模块声明（自Java9引入）。
- RECORD_COMPONENT：记录组件（自Java16引入）。

# @Retention与RetentionPolicy

```java
public enum RetentionPolicy {
    SOURCE,
    CLASS,
    RUNTIME
}
```

java.lang.annotation.RetentionPolicy枚举类定义了注解的保留策略，它描述了注解在不同情况下的保留方式。java.lang.annotation.RetentionPolicy枚举类的常量与java.lang.annotation.Retention元注解一起使用，用于指定注解的保留期限。
- SOURCE：注解仅保留在源代码中，在编译时被编译器丢弃。这意味着注解在编译后的字节码和运行时环境中不可用。
- CLASS：注解被编译器记录在类文件中，但在运行时环境中不需要保留。这是默认的保留策略。在编译后的字节码中可以使用反射读取注解信息，但在运行时无法通过反射获取注解。
- RUNTIME：注解被编译器记录在类文件中，并在运行时保留，因此可以通过反射机制读取注解信息。这意味着在运行时可以通过反射获取注解，并根据注解的信息做相应的处理。

# 本文总结

@Target和@Retention是Java中两个重要的元注解（用于注解其他注解的注解）。它们用于控制注解的应用范围和保留策略。

@Target用于指定注解可以应用的目标元素类型。通过在@Target注解的参数中指定不同的ElementType常量，可以限制注解的使用范围。例如，@Target(ElementType.FIELD)表示该注解只能应用于字段声明，而@Target(ElementType.METHOD)表示该注解只能应用于方法声明。通过合理地使用@Target注解，可以确保注解在合适的位置使用，避免错误的用法。

@Retention用于指定注解的保留策略，即注解在何时保留。通过在@Retention注解的参数中指定不同的RetentionPolicy常量，可以控制注解的生命周期。常用的保留策略包括：
- RetentionPolicy.SOURCE：注解仅在源代码中保留，编译后会被丢弃。
- RetentionPolicy.CLASS：注解被编译器保留在类文件中，但在运行时不可通过反射访问。
- RetentionPolicy.RUNTIME：注解被编译器保留在类文件中，并在运行时可通过反射访问。

@Target和@Retention可以一起使用，以控制注解的适用范围和生命周期。通过适当地使用这两个元注解，可以更加精确地定义注解的使用方式和持久性。

例如，@Override的实现是：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {
}
```
