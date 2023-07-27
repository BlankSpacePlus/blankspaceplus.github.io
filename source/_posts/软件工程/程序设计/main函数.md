---
title: main函数
date: 2023-02-03 15:48:03
summary: 本文分析主流编程语言中main函数的用法细节，以Java、Python、C/C++为例。
tags:
- 程序设计
categories:
- 程序设计
---

# Java的main方法

Java语言的HelloWrold是这样的：

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

只需要照搬这个结构，初学者就可以写出可执行的Java程序，尽管并不理解。

下面笔者将通过对该程序的剖析介绍Java的基础知识。

Java是一门面向对象的语言，因此类和对象是Java的最核心内容。通常，一个普通的Java类有如下结构：

```java
[修饰符] class 类名 {
    // 零到多个类变量定义
    // 零到多个成员变量定义
    // 零到多个构造方法定义
    // 零到多个成员方法定义
    // 零到多个类方法定义
    // ...
}
```

修饰符可以是pubic、protected、private、abstract、final、static等，没有修饰符也可以。

定义方法的语法格式如下：

```java
[修饰符] 方法返回值类型 方法名(形参列表) {
    // 方法体
}
```

修饰符可以是pubic、protected、private、abstract、final、static、synchronized等，没有修饰符也可以，也可以按规范使用多个修饰符。

main方法必须是public，这是为了能让JVM访问main方法，否则会不能运行。

方法用static修饰表示方法属于类而不属于对象。作为程序的入口，main方法必须是static的。如果main允许是非静态的，那么在调用main方法时，JVM就得实例化这个类；而在实例化这个类时，又要调用类的构造方法，如果这个类的构造方法有参数，就会出现歧义。

方法返回值可以是Java允许的任何数据类型，包括基本类型和引用类型，这时必须有return语句；也可以没有返回值，则返回值处用void声明，不能空缺。这是约定，不能是任何其他类型。

主函数的方法名为main是语法规定的，Java区分大小写，所以必须是小写的main。

参数String[] args通常用不到，用于获取命令行参数。由于是形参，所以String[]类型不能改，但args作为形参名，是可改的，不过一般按约定俗成的名称来。

由于是void修饰，所以不需要返回语句return，因此方法体甚至可以是空的。

本部分原文首发于[掘金](https://juejin.cn/post/7083149931287937038)，为博主本人创作，修改后搬运至CSDN发表。

方法的调用者要负责为方法形参赋值。main方法由JVM调用，因此args形参应该由JVM调用，即args形参应该由JVM负责赋值。当运行Java程序时在类名后紧跟一个或多个空格分隔的字符串，JVM就会把这些字符串依次赋给args数组元素。当参数本身包括空格时，该参数应该用双引号括起来。

# C/C++的main函数

C/C++程序的入口也是main函数，标准的定义应该是这样的：

```c
int main()
{
    // TODO
    return 0;
}
```

或者：

```c
int main(int argc，char* argv[])
{
    // TODO
    return 0;
}
```

# Python的main函数

Python的man函数通过`if __name__ == "__main__":`来定义。

Python程序源文件可以当做脚本执行，不必须定义main函数。

定义`if __name__ == "__main__":`与不定义`if __name__ == "__main__":`的区别主要在于：当按模块导入Python文件时，不会运行main函数；当直接运行Python文件时，main函数才会执行。

```python
print("Hello, World!")

if __name__ == "__main__":
    print("Hello, Main!")

print("Bye Bye!")
```
