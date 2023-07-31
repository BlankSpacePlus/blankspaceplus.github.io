---
title: Java函数式接口
date: 2020-02-28 00:40:42
summary: 本文分享Java对函数式接口和函数式编程的支持。
tags:
- Java
categories:
- Java
---

# 函数式接口

推荐阅读：[接口与API](https://blankspace.blog.csdn.net/article/details/105441651)

函数式编程是一种编程范式，其核心思想是将计算过程看作是函数的应用，强调函数的纯粹性、不可变性和高阶函数的使用。

Java函数式接口是指只包含一个抽象方法的接口。这种接口可以看作是函数的契约，表示某种特定的操作或行为。函数式接口可以被Lambda表达式或方法引用所实现，从而可以以函数的形式被传递和使用。

# Java8以前的函数式接口

在Java8之前，并没有官方定义的函数式接口。然而，开发人员在编写代码时仍然可以使用函数式编程的概念，并通过自定义接口来模拟函数式接口的行为。

在Java8之前，通常会创建一个只包含一个抽象方法的接口，作为函数式接口的替代。例如，常见的函数式接口模拟包括java.lang.Runnable、java.util.Comparator、java.util.EventListener等。这些接口只包含一个抽象方法，可以通过匿名内部类、实现类或者通过方法引用等方式传递给其他方法使用。

Java8以前具有的函数式接口：
- **java.lang.Runnable**
- **java.util.concurrent.Callable**
- **java.security.PrivilegedAction**
- **java.util.Comparator**
- **java.io.FileFilter**
- **java.nio.file.PathMatcher**
- **java.lang.reflect.InvocationHandler**
- **java.beans.PropertyChangeListener**
- **java.awt.event.ActionListener**
- **javax.swing.event.ChangeListener**

# Java8支持的函数式接口

然而，Java8引入了java.util.function包，提供了一组标准的函数式接口，以简化函数式编程的使用。这些接口包括java.util.function.Function、java.util.function.Predicate、java.util.function.Consumer、java.util.function.Supplier等，它们用`@FunctionalInterface`修饰，可以直接在Lambda表达式和方法引用中使用，避免了手动创建接口的麻烦。

java.util.function包下的接口可分为四类：
- java.util.function.Consumer：传入一个对象，BiConsumer传入两个对象，实质都是对传入的T实体进行操作处理。
- java.util.function.Function：实际上是对类型T实体进行相应的操作并返回类型为R的实体。
- java.util.function.Predicate：确定实体T是否满足约束，返回boolean。
- java.util.function.Supplier：实际是创建了T实体并返回。

java.util.function内含43个函数式接口，如下：

|Interface|Description|
|:----:|:----:|
|**BiConsumer\<T,U>**|代表了一个接受两个输入参数的操作，并且不返回任何结果|
|**BiFunction\<T,U,R>**|代表了一个接受两个输入参数的方法，并且返回一个结果|
|**BinaryOperator\<T>**|代表了一个作用于于两个同类型操作符的操作，并且返回了操作符同类型的结果|
|**BiPredicate\<T,U>**|代表了一个两个参数的boolean值方法|
|**BooleanSupplier**|代表了boolean值结果的提供方|
|**Consumer\<T>**|代表了接受一个输入参数并且无返回的操作|
|**DoubleBinaryOperator**|代表了作用于两个double值操作符的操作，并且返回了一个double值的结果|
|**DoubleConsumer**|代表一个接受double值参数的操作，并且不返回结果|
|**DoubleFunction\<R>**|代表接受一个double值参数的方法，并且返回结果|
|**DoublePredicate**|代表一个拥有double值参数的boolean值方法|
|**DoubleSupplier**|代表一个double值结构的提供方|
|**DoubleToIntFunction**|接受一个double类型输入，返回一个int类型结果|
|**DoubleToLongFunction**|接受一个double类型输入，返回一个long类型结果|
|**DoubleUnaryOperator**|接受一个参数同为类型double,返回值类型也为double|
|**Function\<T,R>**|接受一个输入参数，返回一个结果|
|**IntBinaryOperator**|接受两个参数同为类型int,返回值类型也为int|
|**IntConsumer**|接受一个int类型的输入参数，无返回值|
|**IntFunction\<R>**|接受一个int类型输入参数，返回一个结果|
|**IntPredicate**|接受一个int输入参数，返回一个布尔值的结果|
|**IntSupplier**|无参数，返回一个int类型结果|
|**IntToDoubleFunction**|接受一个int类型输入，返回一个double类型结果|
|**IntToLongFunction**|接受一个int类型输入，返回一个long类型结果|
|**IntUnaryOperator**|接受一个参数同为类型int,返回值类型也为int|
|**LongBinaryOperator**|接受两个参数同为类型long,返回值类型也为long|
|**LongConsumer**|接受一个long类型的输入参数，无返回值|
|**LongFunction\<R>**|接受一个long类型输入参数，返回一个结果|
|**LongPredicate**|R接受一个long输入参数，返回一个布尔值类型结果|
|**LongSupplier**|无参数，返回一个结果long类型的值|
|**LongToDoubleFunction**|接受一个long类型输入，返回一个double类型结果|
|**LongToIntFunction**|接受一个long类型输入，返回一个int类型结果|
|**LongUnaryOperator**|接受一个参数同为类型long,返回值类型也为long|
|**ObjDoubleConsumer\<T>**|接受一个object类型和一个double类型的输入参数，无返回值|
|**ObjIntConsumer\<T>**|接受一个object类型和一个int类型的输入参数，无返回值|
|**ObjLongConsumer\<T>**|接受一个object类型和一个long类型的输入参数，无返回值|
|**Predicate\<T>**|接受一个输入参数，返回一个布尔值结果|
|**Supplier\<T>**|无参数，返回一个结果|
|**ToDoubleBiFunction\<T,U>**|接受两个输入参数，返回一个double类型结果|
|**ToDoubleFunction\<T>**|接受一个输入参数，返回一个double类型结果|
|**ToIntBiFunction\<T,U>**|接受两个输入参数，返回一个int类型结果|
|**ToIntFunction\<T>**|接受一个输入参数，返回一个int类型结果|
|**ToLongBiFunction\<T,U>**|接受两个输入参数，返回一个long类型结果|
|**ToLongFunction\<T>**|接受一个输入参数，返回一个long类型结果|
|**UnaryOperator\<T>**|接受一个参数为类型T,返回值类型也为T|
