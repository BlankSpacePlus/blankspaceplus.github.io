---
title: Java程序设计基础语法
date: 2019-11-22 11:44:29
summary: 本文分享一些Java程序设计基础语法。
tags:
- Java
categories:
- Java
---

# Java程序设计

1. Java设计团队设计Java考虑的关键术语
    - Simple（简单）：Java有一系列简洁、统一的功能，使其易于学习和使用。
    - Secure（安全）：Java提供了创建Internet程序的安全方法。
    - Portable（可移植）：Java程序可以在任何具有Java运行时系统的环境（JRE）中执行。
    - Object-Orient（面向对象）：Java代表了现代的面向对象编程理念。
    - Robust（健壮）：Java通过进行严格的输入和执行运行时错误检查，提倡无错程序设计。
    - Multithreaded（多线程）：Java提供对多线程程序设计的集成支持。
    - Architecture-Neutral（体系结构中立）：Java并不局限于特定的计算机或者操作系统体系结构。
    - Interpreted（解释型）：通过支持Java字节码，Java支持跨平台代码。
    - High Performance（高性能）：Java字节码的执行速度被高度优化。
    - Distributed（分布式）：Java被特意设计用在Internet的分布式环境中使用。
    - Dynamic（动态）：Java程序带有大量在运行时用于检查和解决对象访问的运行时类型信息。
2. Java源代码格式：
    - 格式A：
        ```java
        public class Demo {
            // 空四格    不要混用Tab和Space，除非你改了IDE设置
        }
        ```
    - 格式B：
        ```java
        public class Demo
        {
            // 空四格    不要混用Tab和Space，除非你改了IDE设置
        }
        ```
3. Java变量的作用域。
    - 作用域内声明的变量对于作用域之外的代码是不可见（不可访问）的。因此，在声明一个变量的时候，就将这个变量局部化了，并且防止它受到未授权的访问或修改。
    - 实际上，正是这种作用域规则提供了封装的基础。
    - 代码块中声明的变量被称为局部变量。
    - 作用域可以嵌套。
    - 在代码段末尾声明一个变量是没有意义的，因为没有变量可以访问它。
    - 变量在进入作用域时创建，离开作用域时被销毁。这意味着：变量一旦离开作用域就不会存储原来的值。因此，方法调用期间，方法中声明的变量值是无法保存其值的，而且在代码块中声明的变量在离开此代码块中也会失去它的值。因此，变量的生命周期被限制在作用域内。
4. Java基本类型的变量支持自动类型转换的条件：
    - 两种类型兼容。
    - 目标类型比源类型大。
5. Java表达式可以使用适当的空格来提升可读性。
6. Java中，整数`123456789`可以写为`123_456_789`，这提升了代码的可读性。
7. `System.in.read()`也可以获得Java获取键盘输入。
    ```java
    import java.io.IOException;
    
    public class Test {
        public static void main(String[] args) {
            System.out.println("请输入一个数字");
            try {
                int num = (int) System.in.read();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    ```
8. 能用`if...else if...else...`却不能用`switch...case`的情况：
    - 变量类型不同。
    - 变量/对象类型不被switch支持。
    - 变量的值是连续的而不是离散的。
9. Java中的switch语句支持的数据类型：
    - byte
    - short
    - int (**long不可以**)
    - char
    - enum
    - String(JDK7+)
10. for循环结构只有`for(;;)`结构不能缺。
11. `for (;;) {}`等效于`while(true) {}`，都是死循环。
12. Java保留了goto关键词，但不支持goto语法，这可以防止那种“意大利面条”式的代码片段。
13. Java10引入了形似动态语言的var语法：
    ```java
    // a是浮点，默认double
    var a = 1.0;
    // b是整型，默认int
    var b = 100;
    // c是字符串，默认String
    var c = "Hello";
    ```
    var语法是有限制的：
    - 每次只能声明一个变量。
    - 初始化时不能使用null。
    - 初始化器表达式不能使用正在声明的变量。
    - 虽然可以使用var声明数组类型，但不能将var与数组初始化器一起使用。`var arr = new int[10];`是符合要求的，而`var arr = {1, 2, 3};`是不符合要求的。
    - var虽然不是官方的关键词，但var不能做类名、其他引用类型的名称（包括接口、注解、枚举等都算），用作变量名也不推荐。
    - 局部变量类型推断不能用于catch捕获的异常类型。
    - 在lambda表达式和方法引用不能用作初始化器。
14. Java的静态变量不能访问非静态变量。
    - Java必须先初始化类，再初始化对象。然而做个比较极端的例子：对象没初始化而类初始化的时候怎能随意允许类的成员访问对象的成员？
    - static称为“静态”纯粹因为翻译的缘故，其实Java里static表示这个成员只属于类而不专属于某个对象。
