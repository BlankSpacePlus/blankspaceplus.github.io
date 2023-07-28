---
title: 接口与API
date: 2020-09-26 19:45:10
summary: 本文分享接口在软件开发中的普遍用法以及Java接口用法。
tags:
- 程序设计
categories:
- 程序设计
---

# Interface

接口（Interface）的概念在计算机科学和软件工程领域的许多上下文中使用，并具有不同的意义。
其实，以Java先入手的人可能在学习SE的基本理论的时候会觉得困惑，这也很正常，因为Interface很重要的一个意义就是Java-Interface，接下来对接口的四种常见含义做一下总结。

## GUI

GUI指的是**用户图形接口**，我们使用GUI编写在计算机的显示器上显示出来的可视化界面。

## API

API指的时**应用编程接口**，它是一套软件程序和开发工具，为应用程序提供函数调用，使得程序可以访问一些级别较低的模块所提供的服务（如操作系统、设备驱动程序、JVM）。

## 公共接口

公共接口是一项协议或一套公共可见的操作（方法），其他软件构件可以使用这些操作，来访问提供此接口的类所定义的支持函数。
公共接口的范围可以是单个类、一组类（如包或子系统）或整个应用程序。

## [UML/Java]-Interface

这是指具有属性（也许仅限于常数）和方法的语义类型的定义，但没有操作的声明（即没有实现）。UML/Java接口是一种定义公共接口的建模、编程方式。在这样的环境下，我们可以区分提供接口和依赖接口。

类是一种具体的实现结构。而接口定义了一种规范，它不关心实现类的内部数据，也不关心方法被实现时的实现细节，只规定实现类必须提供的方法。接口是从多个相似类中抽象出的规范，它不提供任何实现，体现了规范和实现分离的哲学，降低了软件系统组件间的耦合程度，提供了更高的可扩展性和可维护性。

由于接口定义的方法必须被实现，且用于被外部调用，因此接口声明的方法必须是public的。

Java接口的定义：
```java
[修饰符] interface <InterfaceName> extends <ParentInterfaceName1>, <ParentInterfaceName2> {
    // 零到多个常量定义
    // 零到多个抽象方法定义
    // 零到多个内部类、内部接口、内部枚举定义
    // 零到多个私有方法、默认方法或类方法定义
}
```

接口中定义默认方法必须明确采用default关键词，自Java8引入，其本质就是实例方法。

Java9开始支持接口定义私有方法，为默认方法或类方法提供支持。

除类方法、私有方法、默认方法以外，接口的所有方法都是`public`和`abstract`的，即便不定义这两个关键词也会默认采用这两个关键词。事实上，IDEA会推荐接口普通方法取消`public`和`abstract`的修饰，从而简化代码。

# Java函数式接口

Java的函数式接口用@FunctionalInterface注解标记。

```java
@FunctionalInterface
interface IService {
    void say(String message);
}

public class FunctionalInterfaceTest {
    public static void main(String[] args) {
        IService serviceObj = message -> System.out.println("Hello, " + message);
        serviceObj.say("Sam");
    }
}
```

输出结果：

```text
Hello, Sam
```

## Java8前已有的函数式接口

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

## Java8新增的java.util.function

内含**43个**函数式接口，如下：

|Interface|Description|
|:----:|:----:|
|**BiConsumer<T,U>**|代表了一个接受两个输入参数的操作，并且不返回任何结果|
|**BiFunction<T,U,R>**|代表了一个接受两个输入参数的方法，并且返回一个结果|
|**BinaryOperator<T>**|代表了一个作用于于两个同类型操作符的操作，并且返回了操作符同类型的结果|
|**BiPredicate<T,U>**|代表了一个两个参数的boolean值方法|
|**BooleanSupplier**|代表了boolean值结果的提供方|
|**Consumer<T>**|代表了接受一个输入参数并且无返回的操作|
|**DoubleBinaryOperator**|代表了作用于两个double值操作符的操作，并且返回了一个double值的结果|
|**DoubleConsumer**|代表一个接受double值参数的操作，并且不返回结果|
|**DoubleFunction<R>**|代表接受一个double值参数的方法，并且返回结果|
|**DoublePredicate**|代表一个拥有double值参数的boolean值方法|
|**DoubleSupplier**|代表一个double值结构的提供方|
|**DoubleToIntFunction**|接受一个double类型输入，返回一个int类型结果|
|**DoubleToLongFunction**|接受一个double类型输入，返回一个long类型结果|
|**DoubleUnaryOperator**|接受一个参数同为类型double,返回值类型也为double|
|**Function<T,R>**|接受一个输入参数，返回一个结果|
|**IntBinaryOperator**|接受两个参数同为类型int,返回值类型也为int|
|**IntConsumer**|接受一个int类型的输入参数，无返回值|
|**IntFunction<R>**|接受一个int类型输入参数，返回一个结果|
|**IntPredicate**|接受一个int输入参数，返回一个布尔值的结果|
|**IntSupplier**|无参数，返回一个int类型结果|
|**IntToDoubleFunction**|接受一个int类型输入，返回一个double类型结果|
|**IntToLongFunction**|接受一个int类型输入，返回一个long类型结果|
|**IntUnaryOperator**|接受一个参数同为类型int,返回值类型也为int|
|**LongBinaryOperator**|接受两个参数同为类型long,返回值类型也为long|
|**LongConsumer**|接受一个long类型的输入参数，无返回值|
|**LongFunction<R>**|接受一个long类型输入参数，返回一个结果|
|**LongPredicate**|R接受一个long输入参数，返回一个布尔值类型结果|
|**LongSupplier**|无参数，返回一个结果long类型的值|
|**LongToDoubleFunction**|接受一个long类型输入，返回一个double类型结果|
|**LongToIntFunction**|接受一个long类型输入，返回一个int类型结果|
|**LongUnaryOperator**|接受一个参数同为类型long,返回值类型也为long|
|**ObjDoubleConsumer<T>**|接受一个object类型和一个double类型的输入参数，无返回值|
|**ObjIntConsumer<T>**|接受一个object类型和一个int类型的输入参数，无返回值|
|**ObjLongConsumer<T>**|接受一个object类型和一个long类型的输入参数，无返回值|
|**Predicate<T>**|接受一个输入参数，返回一个布尔值结果|
|**Supplier<T>**|无参数，返回一个结果|
|**ToDoubleBiFunction<T,U>**|接受两个输入参数，返回一个double类型结果|
|**ToDoubleFunction<T>**|接受一个输入参数，返回一个double类型结果|
|**ToIntBiFunction<T,U>**|接受两个输入参数，返回一个int类型结果|
|**ToIntFunction<T>**|接受一个输入参数，返回一个int类型结果|
|**ToLongBiFunction<T,U>**|接受两个输入参数，返回一个long类型结果|
|**ToLongFunction<T>**|接受一个输入参数，返回一个long类型结果|
|**UnaryOperator<T>**|接受一个参数为类型T,返回值类型也为T|

## 函数式接口用法

### Consumer

```java
import java.util.function.BiConsumer;
import java.util.function.Consumer;

/**
 * Consumer传入一个对象，BiConsumer传入两个对象，实质都是对传入的T实体进行操作处理
 */
public class ConsumerDemo {

    public static void main(String[] args) {
        Consumer<String> consumer = System.out::println;
        consumer.accept("hello");
        BiConsumer<Integer, Integer> biConsumer = (a, b) -> System.out.println(a + "+" + b + "=" + (a + b));
        biConsumer.accept(3, 4);
    }

}
```

### Function

```java
import java.util.function.Function;

/**
 * Function实际上是对类型T实体进行相应的操作并返回类型为R的实体
 */
public class FunctionDemo {

    private static class OrderItem {
        double unitPrice;
        int count;

        public OrderItem(double unitPrice, int count) {
            this.unitPrice = unitPrice;
            this.count = count;
        }

        public double getPrice() {
            return unitPrice * count;
        }
    }

    public static void main(String[] args) {
        Function<OrderItem, Double> function = OrderItem::getPrice;
        OrderItem orderItem = new OrderItem(12.0, 5);
        System.out.printf("%.2f", function.apply(orderItem));
    }

}
```

### Predicate

```java
/**
 * Predicate确定实体T是否满足约束，返回boolean
 */
public class PredicateDemo {

    public static void main(String[] args) {
        Predicate<String> predicate = s -> s.length() < 20;
        System.out.println(predicate.test("123456"));
        System.out.println(predicate.test("1234567890123456789012"));
    }

}
```

### Supplier

```java
import java.util.function.Supplier;

/**
 * Supplier实际是创建了T实体并返回
 */
public class SupplierDemo {

    private static class Student {
        int id;
        String name;

        Student() {
            this.id = 0;
            this.name = "";
        }

        Student(int id, String name) {
            this.id = id;
            this.name = name;
        }

        @Override
        public String toString() {
            return "Student{" + "id=" + id + ", name='" + name + '\'' + '}';
        }
    }

    public static void main(String[] args) {
        Supplier<Student> supplier1 = Student::new;
        System.out.println(supplier1.get());
        Supplier<Student> supplier2 = () -> new Student(123, "Sam");
        System.out.println(supplier2.get());
    }

}
```
