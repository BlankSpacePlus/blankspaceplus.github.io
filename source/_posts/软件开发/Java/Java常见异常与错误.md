---
title: Java常见异常与错误
date: 2023-04-27 01:34:26
summary: 本文分享Java常见的异常与错误，并尝试讨论其排查解决方法。
tags:
- Java
categories:
- Java
---

# 常见的异常与错误

在Java开发中，常遇到的 RuntimeException、非 RuntimeException 和 Error 包括以下几种：
- RuntimeException：是所有运行时异常的基类，包括java.lang.NullPointerException、java.lang.ClassCastException、java.lang.IllegalArgumentException、java.lang.IndexOutOfBoundsException、java.lang.NumberFormatException等等。这些异常都是在程序运行过程中抛出的，通常是由程序逻辑错误或者异常情况引起的。对于这类异常，程序员通常需要通过代码检查和测试，以避免其发生。
- 非RuntimeException：这类异常是指在编译期间就必须被处理的异常，如java.lang.ClassNotFoundException、java.io.IOException等等。这些异常是由外部环境（如 I/O 操作、数据库操作等）引起的，通常需要在程序中通过try-catch或者throws显式地进行处理。
- Error：这类异常通常是由 Java 虚拟机或底层操作系统抛出的，如java.lang.NoClassDefFoundError、java.lang.StackOverflowError、java.lang.OutOfMemoryError等等。这些异常一般是不可恢复的，通常需要程序员重启应用或者对应用进行重新部署等操作来解决问题。对于此类异常，通常需要在程序的设计和开发中考虑到其可能发生的情况，并采取相应的措施来避免其发生。

# java.lang.NullPointerException

java.lang.NullPointerException是Java中最常见的异常之一，它通常表示程序试图使用一个值为 null 的引用变量，而在语法上又不允许使用null的情况。以下是产生NullPointerException的常见原因：
- 访问或调用一个空对象的实例方法或实例变量。
- 调用一个空对象的类方法。
- 数组未初始化或数组中的元素为null。
- 尝试使用null作为对象锁（synchronized）。
- 尝试使用null引用类型的值作为函数的参数。
- 尝试在null对象上进行实例化、反射或断言。
- 调用未实例化的对象的方法或访问未实例化的对象的字段。

通常情况下，避免NullPointerException的最好方法是在代码中显式地检查空引用。可以使用条件语句或Java8中提供的Optional类型，以确保在使用引用之前进行非空检查。此外，建议在代码编写阶段，尽量避免使用null值，而是使用默认值或空对象。

# java.lang.ClassCastException
 
java.lang.ClassCastException是Java运行时异常之一，通常在类型转换时发生。产生该异常的原因主要有以下几种：
- 父类强制转换为子类：当一个父类对象强制转换为一个子类对象时，如果父类对象并不是一个子类对象，就会发生ClassCastException异常。

    ```java
    Object obj = new Object();
    String str = (String) obj; // 抛出ClassCastException异常
    ```
- 接口转换为实现类：当一个接口类型对象强制转换为一个实现类对象时，如果接口对象并不是该实现类的一个实例，也会发生ClassCastException异常。
    ```java
    List<String> list = new ArrayList<>();
    LinkedList<String> linkedList = (LinkedList<String>) list; // 抛出ClassCastException异常
    ```
- 泛型转换：当使用泛型时，如果类型参数不匹配，就会发生ClassCastException异常。
    ```java
    List<Object> list = new ArrayList<>();
    List<String> stringList = (List<String>) list; // 抛出ClassCastException异常
    ```
- 反射转换：当使用Java反射机制进行类型转换时，如果类型不匹配，也会发生ClassCastException异常。
    ```java
    Object obj = "Hello";
    Integer num = (Integer) obj; // 抛出ClassCastException异常
    ```

以上情况均会导致ClassCastException异常的发生。在进行类型转换时，应该避免出现类型不匹配的情况，可以通过instanceof运算符进行类型检查，或者使用Java的泛型机制来避免类型不匹配的问题。

# java.lang.IllegalArgumentException

java.lang.IllegalArgumentException 表示传递给方法的参数不合法，具体原因可能有以下几种：
- 参数类型不匹配：参数类型与方法参数类型不符或者参数值不在方法参数的合法范围内。
- 参数为null：当方法参数不允许为空时，传递了null值。
- 参数格式错误：当参数为字符串类型时，传入的字符串格式不符合要求。
- 参数数量不足或超出范围：传递的参数数量少于或超过方法参数的数量范围。

需要注意的是，java.lang.IllegalArgumentException继承自RuntimeException，表示在程序运行期间产生的异常，通常由于程序员的错误导致。在方法中对参数进行合法性检查可以有效避免此类异常的产生。

# java.lang.IndexOutOfBoundsException

java.lang.IndexOutOfBoundsException 表示索引超出范围异常，通常有以下几个原因：
- 访问数组或集合时，索引值超出了其范围。例如，访问数组时，索引值小于0或大于等于数组长度，或访问集合时，索引值超出了集合大小。
- 在使用字符串方法时，指定的索引值超出了字符串的长度。
- 在使用I/O操作时，读取或写入数据时，访问的位置超出了文件或流的大小。
- 在使用JDBC操作时，访问ResultSet中的某个列时，指定的列索引超出了ResultSet的列数。

当出现java.lang.IndexOutOfBoundsException异常时，需要检查所涉及的索引值是否正确，并确保不超出相应数据结构的范围。

# java.lang.NumberFormatException

java.lang.NumberFormatException是一种运行时异常，通常在字符串转换为数字类型时抛出。其产生原因通常包括以下几种情况：
- 字符串不符合数字格式，例如包含非数字字符、小数点等无效字符。
- 字符串表示的数字超出了数字类型的取值范围，例如超出了int类型的范围。
- 字符串为空或为null，无法进行转换。

针对这些情况，可以通过适当的检查和异常处理来避免或处理NumberFormatExpection的抛出。例如，使用try-catch块捕获异常并进行相应的处理，或使用工具类中提供的方法进行转换并对异常进行处理。

# java.lang.ClassNotFoundException

java.lang.ClassNotFoundException表示在尝试加载类时，无法找到类的定义。常见的产生原因有以下几种：
- 类的路径错误：当程序加载类时，如果类的路径不正确或者类不存在，就会抛出ClassNotFoundException。
- 类所依赖的 jar 包缺失：当类依赖的 jar 包缺失或者版本不正确时，也会抛出ClassNotFoundException。
- 没有将类的字节码文件编译为.class文件：在执行Java程序之前，必须将Java文件编译为字节码文件（.class 文件）。如果没有将Java文件编译为.class文件，或者.class文件不存在，也会抛出ClassNotFoundException。
- 类名拼写错误：如果类名拼写错误，也会抛出 ClassNotFoundException。
- 类加载器问题：Java 中的类加载器是负责加载 Java 类的重要组件，当类加载器出现问题时，也会导致 ClassNotFoundException 的出现。

# java.io.IOException

java.io.IOException是Java中用于表示输入/输出异常的类。通常，当发生I/O错误时，该异常将被抛出。

下面是一些可能导致java.io.IOException异常的情况：
- 读取或写入文件时，文件被另一个进程锁定或访问权限不足。
- 网络连接失败或超时。
- 写入磁盘时磁盘空间不足。
- 试图在关闭流之后进行读取或写入操作。
- 输入流被关闭或不可用。
- 输出流被关闭或不可用。
- 其他无法预测的I/O错误。

总的来说，IOException异常是Java程序中最常见的异常之一，因为大多数程序都涉及到I/O操作。在编写Java程序时，建议使用try-catch语句来捕获IOException异常，以避免程序意外终止或数据损坏。

# java.lang.NoClassDefFoundError

java.lang.NoClassDefFoundError表示无法找到定义在类路径中的类。它通常发生在运行时，而不是编译时，可能有以下几个原因：
- 类依赖的其他类找不到或无法访问。例如，程序依赖于某个库，但该库未被正确配置或添加到类路径中。
- 类所在的JAR包被更改，导致其中某些类无法找到。
- 在编译时使用的类和运行时使用的类不同，例如编译时使用的是JDK8中的类，但在运行时使用的是JDK7中的类。
- 类在加载时发生错误，例如类文件损坏或无法读取。

解决方法包括：
- 确保所有依赖项都正确配置或添加到类路径中。
- 检查所依赖的库或 JAR 文件是否已经更改或损坏，或者是否存在冲突。
- 检查是否使用了正确版本的类，特别是在使用不同的 JDK 版本时。
- 检查类文件是否存在，以及是否具有正确的访问权限。

# java.lang.StackOverflowError

java.lang.StackOverflowError通常是因为方法递归调用过深导致栈空间不足而引起的。在Java中，每个线程都有自己的虚拟机栈，每个方法在执行时都会在栈上创建一个栈帧。栈帧中保存了该方法的局部变量和操作数栈等信息。当一个方法调用另一个方法时，会创建一个新的栈帧并压入栈顶，方法执行完毕后将栈帧出栈，返回到上一个方法继续执行。

当方法递归调用过深时，每个方法的栈帧都会占用一定的栈空间，如果栈空间不足，就会抛出StackOverflowError异常。

# java.lang.OutOfMemoryError

java.lang.OutOfMemoryError是Java程序运行过程中常见的错误之一，表示Java虚拟机无法分配足够的内存空间，导致无法继续执行程序。它通常由以下几个方面的原因产生：
- 内存泄漏：程序中存在大量不必要的对象或内存未及时释放，导致内存耗尽。
- 数据量过大：程序处理的数据量过大，超出了Java虚拟机分配的内存空间，导致内存耗尽。
- 过多的线程：程序中创建了过多的线程，占用了大量的内存空间，导致内存耗尽。
- 代码逻辑问题：程序中存在逻辑错误，导致内存不断增加，最终耗尽内存。

解决方法包括但不限于以下几种：
- 优化代码：检查代码中是否存在内存泄漏或大对象未及时释放等问题，进行优化改进。
- 调整虚拟机参数：适当调整虚拟机参数，如-Xmx和-Xms等，增加Java虚拟机可用内存空间。
- 减少数据量：针对处理数据量过大的问题，可以考虑分批处理或分布式处理等方式，减少单个程序处理的数据量。
- 减少线程数量：针对过多的线程问题，可以考虑采用线程池等方式，限制线程数量，优化线程使用。
- 增加物理内存：若以上方法无法解决问题，可以考虑增加物理内存。
