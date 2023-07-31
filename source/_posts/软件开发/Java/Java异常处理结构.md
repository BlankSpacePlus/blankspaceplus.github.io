---
title: Java异常处理结构
date: 2019-09-24 21:11:40
summary: 本文分享异常处理结构，例如try-catch-finally结构、try-with-resources结构、throw语句、throws声明。
tags:
- Java
categories:
- Java
---

# try-catch-finally结构

try-catch-finally结构是Java中用于处理异常的一种语法结构。它允许我们编写代码来捕获和处理可能发生的异常，并在处理完成后执行一些清理工作。

对于try-catch-finally结构：
- try语句块：try语句块是包含可能引发异常的代码块。在try语句块中，我们编写可能会引发异常的代码。
- catch语句块：catch语句块用于捕获并处理异常。它紧随在try语句块之后，并指定要捕获的异常类型。当在try语句块中的代码引发了指定类型的异常时，控制流将转移到相应的catch语句块中，并执行其中的代码。可以有多个catch语句块，每个catch语句块可以捕获不同类型的异常。异常类型可以是具体的异常类，也可以是它们的父类或接口。
- finally语句块：finally语句块是可选的，它紧随在catch语句块之后。无论是否发生异常，finally语句块中的代码始终会被执行。通常在finally语句块中编写清理资源或释放资源的代码，以确保无论异常是否发生，资源都会被正确释放。

下面的代码用到了try-catch-finally结构：

```java
try {
    // 可能引发异常的代码
    int result = divide(10, 0); // 假设 divide() 方法会抛出 java.lang.ArithmeticException
    System.out.println("Result: " + result); // 这行代码不会执行
} catch (ArithmeticException e) {
    // 捕获并处理异常
    System.out.println("Error: " + e.getMessage()); // 输出异常信息
} finally {
    // 清理工作，无论异常是否发生都会执行
    System.out.println("Finally block executed.");
}
```

请注意，finally语句块中的代码会在try语句块或catch语句块中的return语句之前执行。这意味着，即使在try语句块或catch语句块中执行了return语句，finally语句块中的代码也会在方法返回之前执行（finally中的return语句会覆盖前面的return语句内容）。

# try-with-resources结构

try-with-resources结构是Java7引入的一种语法结构，用于简化资源管理和自动关闭资源的代码。它提供了一种优雅且可靠的方式来处理需要关闭的资源，例如文件、网络连接、数据库连接等。

使用try-with-resources结构可以替代传统的try-catch-finally结构，在代码编写和可读性方面更为简洁。它能够自动关闭实现了java.lang.AutoCloseable接口的资源，无需显式地在finally语句块中关闭资源。

try-with-resources语法结构如下所示：

```java
try (ResourceType resource1 = initialization1; ResourceType resource2 = initialization2; ...) {
    // 使用资源的代码
} catch (ExceptionType e) {
    // 异常处理代码
}
```

- ResourceType：ResourceType是需要在try-with-resources结构中使用的资源类型。它必须实现java.lang.AutoCloseable接口或其子接口，以便能够自动关闭资源。
- initialization：initialization是资源的初始化语句，用于创建和初始化资源对象。这可以是变量声明和赋值的语句，或者是调用返回资源对象的方法。
- 使用资源的代码：在try语句块中，可以使用资源对象进行操作。无论代码块是否引发异常，当代码块结束时，资源会自动关闭。
- 异常处理：可以在catch语句块中处理可能发生的异常。如果在try语句块和资源关闭过程中都发生了异常，则会在资源关闭之前处理catch语句块中的异常。

try-with-resources 结构可以同时管理多个资源，只需要在一对括号中使用分号`;`分隔每个资源的初始化语句。

下面的代码用到了try-with-resources结构：

```java
try (FileInputStream input = new FileInputStream("file.txt");
     FileOutputStream output = new FileOutputStream("output.txt")) {
    // 使用资源的代码
    int data;
    while ((data = input.read()) != -1) {
        output.write(data);
    }
} catch (IOException e) {
    // 异常处理代码
    e.printStackTrace();
}
```

try-with-resources结构能够确保资源的正确关闭，即使在使用资源的过程中发生了异常。它可以有效地简化代码，并提高资源管理的可靠性和可读性。

# throw语句与throws声明

throw关键字用于在代码中显式地抛出异常。它用于创建并抛出一个特定的异常对象，使程序在遇到异常情况时能够提前终止并抛出异常。

throw语法结构如下所示：

```java
throw exception;
```

在上述语法中，`exception`是要抛出的异常对象，它必须是java.lang.Throwable类或其子类的实例。通过throw关键字，我们可以在代码中的任何地方抛出异常。一旦抛出异常，当前方法的执行立即停止，并且控制权将传递给调用方或上层的异常处理机制。

下面的代码用到了throw语句：

```java
public void divide(int dividend, int divisor) {
    if (divisor == 0) {
        throw new ArithmeticException("Division by zero");
    }
    int result = dividend / divisor;
    System.out.println("Result: " + result);
}
```

throws关键字用于声明方法可能抛出的异常类型。它通常用于方法的声明部分，在方法名后的括号内指定可能抛出的异常类型，以便调用方知道该方法可能会引发哪些异常，并采取相应的处理措施。

throws语法结构如下所示：

```java
returnType methodName(parameters) throws exceptionType1, exceptionType2, ...
```

在上述语法中，`exceptionType1, exceptionType2, ...`是方法可能抛出的异常类型列表。当方法的执行过程中出现这些异常时，方法会将异常传递给调用方处理，或者将异常继续传递给上层的异常处理机制。

下面的代码用到了throws声明：

```java
public void readFile(String fileName) throws FileNotFoundException, IOException {
    // 读取文件的代码
}
```

throws关键字只是声明可能抛出的异常类型，并不实际引发异常。方法内部仍然需要通过throw关键字抛出具体的异常对象。
