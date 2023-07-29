---
title: final、finally、finalize
date: 2023-04-27 15:36:55
summary: 本文分享Java基础语法中的final、finally、finalize的区别。
tags:
- Java
categories:
- 开发技术
---

# final、finally、finalize()

final、finally、finalize的含义和作用如下：
- final关键字用于声明一个不可变的变量、一个不可继承的类或者一个不可重写的方法。如果用final修饰一个变量，该变量的值不能再被修改；如果用final修饰一个类，则该类不能再被继承；如果用final修饰一个方法，则该方法不能再被重写。
- finally关键字用于定义一个代码块，无论是否有异常发生，该代码块中的语句都会被执行。通常用于释放资源或者关闭连接等必须执行的操作。
- finalize是Object类中定义的一个方法，用于在垃圾回收器回收对象之前执行清理操作。该方法不能被显式调用，而是由垃圾回收器在对象被回收之前自动调用。

## final

final可以修饰类、方法、变量：
- 修饰类：当用 final 修饰一个类时，表示该类是不可被继承的，即不能有子类。
    ```java
    final class FinalClass {
        // 类的定义
    }
    ```
- 修饰方法：当用 final 修饰一个方法时，表示该方法不能被子类重写（覆盖）。
    ```java
    class ParentClass {
        final void finalMethod() {
            // 方法的定义
        }
    }

    class ChildClass extends ParentClass {
        // 无法重写 finalMethod
    }
    ```
- 修饰变量：
    - 修饰成员变量：当用 final 修饰一个成员变量时，表示该变量的值不能被修改，即为常量。常量必须在声明时或构造方法中进行初始化，并且只能被赋值一次。
        ```java
        class MyClass {
            final int finalVariable = 10;
            void method() {
                // 无法修改 finalVariable 的值
            }
        }
        ```
    - 修饰局部变量：当用 final 修饰一个局部变量时，表示该变量的值不能被修改。局部变量必须在声明时进行初始化，并且只能被赋值一次。
        ```java
        void method() {
            final int finalVariable = 10;
            // 无法修改 finalVariable 的值
        }
        ```

    - 修饰形参变量：当用 final 修饰一个方法的参数时，表示该参数的值不能被修改。通常用于匿名内部类中，以确保参数在内部类中的可见性。
        ```java
        void method(final int finalParam) {
            Runnable runnable = new Runnable() {
                @Override
                public void run() {
                    // 使用 finalParam 的值
                }
            };
        }
        ```
    需要注意的是，final修饰的引用类型变量，其指向的对象本身是可以修改的，只是引用不可变。这意味着final修饰的引用类型变量可以指向不同的对象，但一旦指向了某个对象，就无法再指向其他对象。

final提供了代码安全性、性能优化和代码优化等方面的好处，能够使代码更加清晰、稳定和高效。

## finally

finally是Java中的关键字，用于定义一个代码块，在try-catch-finally结构中，无论是否发生异常，finally块中的代码都会被执行，以进行必要的清理操作或处理善后工作。

```java
public class FinallyDemo {
    public static int divide(int a, int b) {
        int result;
        try {
            result = a / b;
        } catch (ArithmeticException e) {
            System.out.println("Exception caught in divide method: " + e.getMessage());
            throw e; // rethrowing the exception
        } finally {
            System.out.println("Finally block in divide method executed");
        }
        return result;
    }

    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Exception: " + e.getMessage());
        } finally {
            System.out.println("Finally block executed");
        }
    }
}
```

在上述例子中，divide方法用于进行除法运算。在main方法中调用divide方法，由于除数为0，会发生java.lang.ArithmeticException异常。在try块中捕获到异常后，会执行catch块中的代码，打印出异常信息。然后不管是否发生异常，finally块中的代码都会被执行，打印出"Finally block executed"。

在finally语句块中，还可以进行一些资源的释放操作，例如关闭文件、关闭数据库连接等，以确保资源的正常释放，无论是否发生异常。这样可以防止资源泄露和确保代码的健壮性。

值得一提的是，finally语句块中的代码段不是必定执行。因为如果执行finally语句块之前虚拟机被终止运行的话，finally语句块中的代码就不会被执行。

另外，不应该在finally语句块中使用return语句。当try语句块和finally语句块中都有return语句时，try语句块中的return语句会被忽略。这是因为try语句块中的return返回值会先被暂存在一个本地变量中，当执行到finally语句块中的return之后，这个本地变量的值就变为了finally语句块中的return返回值。

## finalize()

finalize()方法是java.lang.Object中的一个特殊方法，用于对象的垃圾回收过程中进行自定义的清理操作。当对象即将被垃圾回收器回收时，如果该对象重写了finalize()方法，垃圾回收器会在回收对象之前调用该方法。

方法签名：
```java
protected void finalize() throws Throwable
```

方法作用：
- finalize()方法会在垃圾回收器确定对象不再被任何引用访问时调用。
- 子类可以重写finalize()方法来释放系统资源或执行其他清理操作，例如关闭文件、释放资源等。这样可以确保对象在被销毁之前执行必要的善后工作。

方法使用注意事项：
- finalize()方法在Java9中已被标记为Deprecated，并且在未来的版本中可能会被移除。这是因为它的使用方式容易导致资源泄露和不确定的行为。建议使用Cleaner和PhantomReference作为更安全的资源释放机制，或者添加一个close()方法并实现AutoCloseable接口以支持try-with-resources语句。
- finalize()方法的执行时机不确定，不能保证它一定会被调用。垃圾回收器的运行时间和行为是不可控的，可能会导致性能问题和垃圾回收延迟，因此不能依赖于finalize()方法来进行关键资源的清理释放。因此，建议使用显式的资源释放方法来代替finalize()方法。
- 如果运行在禁用或移除了finalization的Java虚拟机中，垃圾回收器将不会调用finalize()方法。在启用finalization的Java虚拟机中，垃圾回收器可能会在不确定的时间之后才调用finalize()方法。
- finalize()方法的一般约定是：在Java虚拟机确定没有任何线程可以访问该对象（除了由其他即将进行最终化的对象或类所采取的操作）时，将调用该方法。finalize()方法可以执行任何操作，包括将对象重新提供给其他线程。然而，通常情况下，finalize()方法的目的是在对象被彻底丢弃之前执行清理操作。
- Java不保证哪个线程会调用某个对象的finalize()方法，但保证在调用finalize()时，该线程不会持有任何用户可见的同步锁。如果finalize()方法抛出未捕获的异常，该异常将被忽略，并终止对象的最终化过程。
- 在调用对象的finalize()方法之后，除非Java虚拟机再次确定没有任何线程可以访问该对象，否则不会执行进一步的操作，包括可能由其他即将进行最终化的对象或类所采取的操作。在这种情况下，该对象可能会被丢弃。
- finalize()方法在一个Java虚拟机中对于某个对象只会被调用一次。
- finalize()方法抛出的任何异常都会导致对象的finalization被终止，但异常本身会被忽略。
- 对于嵌入非堆资源的类，有多种清理资源的选项。该类必须确保每个实例的生命周期比其嵌入的任何资源的生命周期长。可以用java.lang.ref.Reference.reachabilityFence来确保对象在嵌入的资源在使用时仍然可访问。
- 除非子类嵌入了必须在实例被收集之前清理的非堆资源，否则应避免重写finalize()方法。与构造方法不同，finalize()方法没有自动链式调用的机制。如果子类重写了finalize()方法，则必须显式调用父类的finalize()方法。为防止异常提前终止finalize链，子类应使用try-catch-finally块来确保始终调用super.finalize()方法。
