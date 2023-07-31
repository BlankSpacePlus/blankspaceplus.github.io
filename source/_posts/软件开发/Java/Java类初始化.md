---
title: Java类初始化
date: 2023-05-15 20:55:39
summary: 本文分享Java类初始化的顺序。
tags:
- Java
categories:
- Java
---

# 类初始化

在程序运行时，当类被首次访问或创建实例时，Java虚拟机会按照一定的规则来对类进行初始化。

类的初始化过程包括以下步骤：
1. 加载（Loading）：查找并加载类的二进制数据，这一步通常由类加载器完成。
2. 验证（Verification）：确保加载的类的正确性，比如检查文件格式、语法错误等。
3. 准备（Preparation）：为类的静态变量分配内存，并设置默认初始值。
4. 解析（Resolution）：将类中的符号引用转换为直接引用，比如将方法名转换为方法的指针。
5. 初始化（Initialization）：执行类的初始化方法，包括静态变量的显示赋值和静态代码块的执行等。

其中，类的初始化方法是由Java虚拟机在必要时自动调用的，它会保证线程安全和只调用一次。

# 类初始化顺序

Java类初始化顺序指的是在实例化一个类的对象时，类中的成员变量和代码块（包括静态和非静态）被初始化的顺序。类初始化顺序可以被分为两个阶段：类加载阶段和实例化阶段。

类加载阶段：
1. 首先加载静态成员变量和静态代码块，按照在代码中的顺序进行加载。
2. 如果有父类，先加载父类的静态成员变量和静态代码块。
3. 父类加载完成后，加载子类的非静态成员变量和非静态代码块，按照在代码中的顺序进行加载。
4. 加载子类的构造方法。

实例化阶段：
1. 实例化父类的非静态成员变量和非静态代码块，按照在代码中的顺序进行初始化。
2. 实例化父类的构造方法。
3. 实例化子类的非静态成员变量和非静态代码块，按照在代码中的顺序进行初始化。
4. 实例化子类的构造方法。

注意事项：
1. 在实例化过程中，如果子类中存在与父类中同名的成员变量，那么子类中的成员变量将会覆盖父类中的同名成员变量，而父类的成员变量则不会被初始化。
2. 如果一个类没有被初始化，那么它的静态变量和静态代码块也不会被执行。
3. 如果在静态成员变量和静态代码块中出现了对尚未被初始化的成员变量的引用，那么这些成员变量将会被初始化为其默认值，即0、false、null等。

下面，以一段代码验证这个过程：
```java
public class InitializationOrderDemo {
    private static class Parent {
        static {
            System.out.println("Parent static block");
        }

        {
            System.out.println("Parent instance block");
        }

        public Parent() {
            System.out.println("Parent constructor");
        }
    }

    private static class Child extends Parent {
        static {
            System.out.println("Child static block");
        }

        {
            System.out.println("Child instance block");
        }

        public Child() {
            System.out.println("Child constructor");
        }
    }

    public static void main(String[] args) {
        new Child();
    }
}
```

运行结果：
```
Parent static block
Child static block
Parent instance block
Parent constructor
Child instance block
Child constructor
```

可以看到，类的静态代码块在类加载时只会被执行一次，并且先于实例初始化代码块和构造函数执行。子类的静态代码块在父类的静态代码块之后执行，而子类的实例初始化代码块和构造函数在父类的实例初始化代码块和构造函数之后执行。

# 被动初始化

Java中还存在一种特殊的类初始化方式——被动初始化。当程序中只存在类的被动引用时，该类不会被初始化。被动引用包括以下几种情况：
1. 通过子类引用父类的静态字段，不会导致子类的初始化。
2. 定义对象数组，不会触发类的初始化。
3. 常量在编译期间会存入调用类的常量池中，本质上并没有直接引用定义常量的类，不会触发定义常量的类的初始化。
4. 通过类名获取Class对象，不会触发类的初始化。
5. Class.forName()方法加载类时，如果指定参数initialize为false时，也不会触发类的初始化。
