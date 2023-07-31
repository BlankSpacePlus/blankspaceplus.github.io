---
title: Java常见注解
date: 2021-05-03 15:47:05
summary: 本文分享Java常见注解的相关内容。
tags:
- Java
categories:
- Java
---

# JDK提供的注解

JDK提供的public注解如下所示：

- java.io.Serial
- java.lang.Deprecated
- java.lang.FunctionalInterface
- java.lang.Override
- java.lang.SafeVarargs
- java.lang.SuppressWarnings
- java.lang.annotation.Documented
- java.lang.annotation.Inherited
- java.lang.annotation.Native
- java.lang.annotation.Repeatable
- java.lang.annotation.Retention
- java.lang.annotation.Target
- java.beans.BeanProperty
- java.beans.ConstructorProperties
- java.beans.JavaBean
- java.beans.Transient
- javax.annotation.processing.Generated
- javax.annotation.processing.SupportedAnnotationTypes
- javax.annotation.processing.SupportedOptions
- javax.annotation.processing.SupportedSourceVersion
- javax.management.ConstructorParameters
- javax.management.DescriptorKey
- javax.management.MXBean
- javax.swing.SwingContainer
- com.sun.tools.javac.api.ClientCodeWrapper.Trusted
- com.sun.tools.javac.util.DefinedBy
- jdk.internal.ValueBased
- jdk.internal.javac.NoPreview
- jdk.internal.javac.ParticipatesInPreview
- jdk.internal.javac.PreviewFeature
- jdk.internal.reflect.CallerSensitive
- jdk.internal.reflect.CallerSensitiveAdapter
- jdk.internal.util.random.RandomSupport.RandomGeneratorProperties
- jdk.internal.vm.annotation.ChangesCurrentThread
- jdk.internal.vm.annotation.Contended
- jdk.internal.vm.annotation.DontInline
- jdk.internal.vm.annotation.ForceInline
- jdk.internal.vm.annotation.Hidden
- jdk.internal.vm.annotation.IntrinsicCandidate
- jdk.internal.vm.annotation.JvmtiMountTransition
- jdk.internal.vm.annotation.ReservedStackAccess
- jdk.internal.vm.annotation.Stable
- jdk.jfr.BooleanFlag
- jdk.jfr.Category
- jdk.jfr.ContentType
- jdk.jfr.DataAmount
- jdk.jfr.Description
- jdk.jfr.Enabled
- jdk.jfr.Experimental
- jdk.jfr.Frequency
- jdk.jfr.Label
- jdk.jfr.MemoryAddress
- jdk.jfr.MetadataDefinition
- jdk.jfr.Name
- jdk.jfr.Percentage
- jdk.jfr.Period
- jdk.jfr.Registered
- jdk.jfr.Relational
- jdk.jfr.SettingDefinition
- jdk.jfr.StackTrace
- jdk.jfr.Threshold
- jdk.jfr.Timespan
- jdk.jfr.Timestamp
- jdk.jfr.TransitionFrom
- jdk.jfr.TransitionTo
- jdk.jfr.Unsigned
- jdk.jfr.events.CertificateId
- jdk.jfr.internal.Cutoff
- jdk.jfr.internal.MirrorEvent
- jdk.jfr.internal.Throttle
- jdk.jfr.snippets.Snippets.Temperature
- jdk.jfr.snippets.Snippets.Severity
- jdk.jfr.snippets.Snippets.TransactionId
- jdk.jfr.snippets.Snippets.OrderId
- jdk.vm.ci.common.NativeImageReinitialize

# 元注解

元注解是用于注解其他注解的特殊注解。

## @Documented

@Documented用于指示编译工具在生成文档时是否应该包含被标记的注解。

如果一个注解被@Documented注解标记，那么当生成API文档时，该注解的信息将会被包含在文档中，以便用户能够查看和了解该注解的用法和含义。@Documented注解本身并不会对注解的功能或行为产生直接影响，它只是一个用于指示文档生成工具的标记。

java.lang.annotation.Documented的定义如下：

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Documented {
}
```

## @Inherited

@Inherited用于指示一个注解是否可以被继承。当一个被@Inherited注解标记的注解被定义在基类上时，如果其派生类没有显式地重写该注解，那么子类将继承父类上的注解。

@Inherited提供了在继承关系中自动传递注解的功能，以便更方便地在类的继承结构中使用和管理注解。

@Inherited只对类的继承关系起作用，不适用于接口的实现关系。

@Inherited仅对被@Retention(RetentionPolicy.RUNTIME)标记的注解起作用，即只有在运行时可见的注解才能被继承。

java.lang.annotation.Inherited的定义如下：

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Inherited {
}
```

## @Repeatable

@Repeatable用于指示一个注解是否可以重复应用于同一元素，用于支持定义一个可重复的注解接口，而不会出现编译错误或语法冲突。

在Java8之前，每个注解在一个元素上只能应用一次。但是，通过使用@Repeatable注解，开发者可以定义一个可重复的注解，使其能够在同一元素上多次应用。@Repeatable使得开发者可以更灵活地组合和使用注解，以适应不同的情况和需求。同时，它也提高了代码的可读性和可维护性，使得注解的含义更加明确和一致。

@Repeatable需要一个参数value()，用于指定包含重复注解的容器注解接口。每次应用注解时，实际上是在容器注解中创建一个注解实例，并将其添加到容器中。通过使用@Repeatable注解，开发者可以更方便地在同一元素上多次应用相同的注解，而不需要手动创建一个容器类或使用数组方式进行注解的嵌套。

为了创建一个可重复的注解，开发者需要完成以下两个步骤：
1. 创建一个包含该注解的容器注解：这个容器注解需要使用@Repeatable注解进行标记，并指定该容器注解可以重复应用的目标注解。
2. 在目标注解上使用容器注解：在目标注解上使用你创建的容器注解，并通过数组的方式指定多个注解实例。

java.lang.annotation.Repeatable的定义如下：

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Repeatable {
    Class<? extends Annotation> value();
}
```

## @Retention

@Retention用于指定被注解的注解在运行时的保留策略，以决定注解的生命周期和可访问性。它具有一个参数RetentionPolicy，用于指定保留策略。

RetentionPolicy定义了三种保留策略：源代码级别（SOURCE）、字节码级别（CLASS）、运行时级别（RUNTIME）。通常情况下，注解的保留策略都是RetentionPolicy.RUNTIME，因为我们希望在运行时能够通过反射获取注解的信息并进行相应的处理。但也有些注解只需要在编译期间进行静态检查或生成文档，因此可以选择使用RetentionPolicy.SOURCE或RetentionPolicy.CLASS。

注解的保留策略是在编写自定义注解时指定的，并且不同的保留策略对应的注解的处理方式是不同的。因此，在使用自定义注解时，需要了解该注解的保留策略以及相应的处理方式。

java.lang.annotation.Retention的定义如下：

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Retention {
    RetentionPolicy value();
}
```

## @Target

@Target用于指定被注解的注解可以应用于哪些元素（类、方法、字段等），以限制注解的使用范围和适用场景。它具有一个参数ElementType[]，用于指定适用的目标元素类型。

通过在自定义注解上添加@Target注解并指定适用的目标元素类型，可以限制该注解仅能应用于指定的元素上。这有助于确保注解的正确使用，避免误用或错误的使用场景。

需要注意的是，注解的目标元素类型是在编写自定义注解时指定的，并且不同的目标元素类型对应的注解的处理方式是不同的。因此，在使用自定义注解时，需要了解该注解适用的目标元素类型以及相应的处理方式。

java.lang.annotation.Target的定义如下：

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Target {
    ElementType[] value();
}
```

# 内置注解

## @Serial

@Serial是Java4新增的注解，用于标记实现了 Java 对象序列化机制的方法或字段，旨在提供编译时检查序列化相关声明正确性的功能。

在可序列化的类中，使用@Serial注解可以帮助编译器检查序列化相关的字段和方法是否被正确声明。这些错误声明可能很难检测到，所以@Serial的作用是在编译时对序列化相关的方法和字段进行验证，并通过发出警告来提醒开发人员。

具体来说，@Serial注解应该应用于声明为java.io.Serializable的类中与序列化相关的方法和字段上。序列化相关的方法包括writeObject、readObject、readObjectNoData、writeReplace、readResolve。序列化相关的字段包括serialPersistentFields和serialVersionUID。

需要注意的是，将@Serial注解应用于其他字段或方法是错误的，包括非Serializable类中的字段或方法，以及在适当的结构声明中但在该类型中无效的字段或方法（例如，枚举类型的serialVersionUID被定义为0L，所以在枚举类型中声明的serialVersionUID字段将被忽略）。对于实现了java.io.Externalizable接口的类，也有一些字段和方法不适用于可外部化的类。

需要注意的是，虽然在可序列化的类中，某些字段和方法可能看起来没有被使用，但序列化机制会通过反射访问它们。因此，这些字段和方法仍然是相关的，并且可以通过@Serial注解进行检查。

java.io.Serial的定义如下：

```java
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.SOURCE)
public @interface Serial {
}
```

## @Deprecated

@Deprecated用于标记已过时的代码元素，比如类、方法、字段等。@Deprecated可以帮助开发人员识别出应该避免使用的旧代码，并在编译时或使用IDE时发出警告或错误信息。

使用@Deprecated注解的目的是为了提醒开发人员，某个特定的代码元素已经不建议使用，可能存在更好的替代方案或是因为安全性或其他原因不推荐使用。通过标记过时的代码元素，可以帮助开发人员编写更可靠、可维护和可读的代码。

使用@Deprecated注解时，通常会提供一些附加的说明信息，以解释为什么该代码元素被标记为过时，以及建议使用哪些替代方案。这些说明信息可以帮助其他开发人员理解并遵循建议，以减少对过时代码的依赖。

java.lang.Deprecated的定义如下：

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, MODULE, PARAMETER, TYPE})
public @interface Deprecated {
    String since() default "";
    boolean forRemoval() default false;
}
```

## @FunctionalInterface

@FunctionalInterface用于注解接口，它用于指示被注解的接口是一个函数式接口。

函数式接口是指只包含一个抽象方法的接口。Java8引入了函数式编程的概念，并且支持使用Lambda表达式和方法引用来创建函数式接口的实例。为了确保接口的函数式特性，可以使用@FunctionalInterface注解来显式声明。

推荐阅读：[函数式接口](https://blankspace.blog.csdn.net/article/details/104548347)

@FunctionalInterface注解起到如下作用：
- 明确接口的设计意图：通过使用@FunctionalInterface注解，我们可以清晰地表明该接口是用于函数式编程的，其目的是为了支持Lambda表达式的使用。
- 提供编译时检查：编译器会检查被@FunctionalInterface注解修饰的接口是否符合函数式接口的定义。如果接口中包含多于一个的抽象方法，编译器会报错。
- 完善文档说明：使用@FunctionalInterface注解可以提供更好的文档说明，告诉其他开发者该接口的设计意图，并且鼓励他们使用Lambda表达式来实现该接口。

java.lang.FunctionalInterface的定义如下：

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface FunctionalInterface {
}
```

## @Override

@Override用于注解方法，它用于指示被注解的方法重写了基类中的方法或实现了接口中定义的方法。

当开发者使用@Override注解修饰一个方法时，编译器会进行语法检查，确保被注解的方法与父类中的方法具有相同的方法名、参数列表和返回类型。如果被注解的方法与父类中的方法签名不匹配，编译器会产生编译错误。

@Override注解起到如下作用：
- 提供编译时检查：通过使用@Override注解，编译器可以帮助我们发现一些潜在的错误，例如拼写错误、方法签名错误等。
- 提高代码可读性：使用@Override注解可以清晰地表明该方法是重写父类方法或实现接口方法，提高了代码的可读性和可维护性。
- 防止意外重写：如果某个方法被意外地重写，使用@Override注解可以让编译器提醒我们，避免出现错误的行为。

java.lang.Override的定义如下：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {
}
```

## @SafeVarargs

@SafeVarargs 是一个注解，用于标记可变参数方法或构造函数，并告知编译器这个方法或构造函数是类型安全的。

推荐阅读：[可变参数](https://blankspace.blog.csdn.net/article/details/123169198)

然而，在使用可变参数时，会存在类型安全的隐患。这是因为可变参数是通过数组来实现的，在泛型类型中，数组和可变参数之间存在类型擦除的差异。

@SafeVarargs 注解的作用是在编译器中抑制关于可变参数方法或构造函数的警告，以表明开发者已经确保该方法或构造函数在使用可变参数时不会引发类型安全问题。通过使用 @SafeVarargs 注解，开发者承诺不会在方法或构造函数中进行不安全的操作，从而避免了编译器警告的产生。

需要注意的是，@SafeVarargs 注解仅适用于静态绑定的方法（statically bound methods），即非 final 方法和非私有方法。它不能应用于抽象方法、接口方法或构造函数。

使用 @SafeVarargs 注解时应当谨慎，确保可变参数方法或构造函数的实现不会引发类型安全问题，并仔细考虑其在具体情况下的适用性。

java.lang.SafeVarargs的定义如下：

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD})
public @interface SafeVarargs {
}
```

## @SuppressWarnings

@SuppressWarnings用于注解类、方法、字段或局部变量，它用于抑制编译器产生的警告信息。通过使用@SuppressWarnings注解，开发者可以告诉编译器忽略特定的警告，从而避免编译器在这些警告上产生编译错误或警告信息。

@SuppressWarnings可以接受一个或多个参数，用于指定要忽略的特定警告类型。

@SuppressWarnings常用的警告类型：
- `"unchecked"`：忽略未经检查的类型转换警告。
- `"deprecation"`：忽略使用已过时的方法、类或字段的警告。
- `"rawtypes"`：忽略使用原始类型的警告。
- `"unused"`：忽略未使用变量或未调用方法的警告。

@SuppressWarnings并不能解决潜在的问题。因此，在使用@SuppressWarnings时，应当谨慎考虑，并确保了解忽略的警告类型所带来的潜在风险。

java.lang.SuppressWarnings的定义如下：

```java
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    String[] value();
}
```

## @Native

@Native用于注解字段，它用于指示一个定义了常量值的字段可以被本地代码引用。

@Native可以作为一个提示，被生成本地头文件的工具使用，以确定是否需要生成头文件，以及头文件应该包含哪些声明。

@Native注解的使用可以增加代码的可读性和可维护性，特别是当涉及到与本地代码的交互时。通过使用这个注解，开发人员可以清晰地标记哪些字段可以被本地代码访问，并提供给相关工具生成必要的本地代码。

@Native注解的保留策略是RetentionPolicy.SOURCE，意味着它只在源代码中存在，不会被编译进最终的字节码文件。这个注解主要用于工具和编译时的静态分析，而不会影响程序运行时的行为。

java.lang.annotation.Native的定义如下：

```java
@Documented
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.SOURCE)
public @interface Native {
}
```
