---
title: null与optional
date: 2023-03-23 20:43:50
summary: 本文讨论编程语言中常见的null，还着重讨论了空指针异常与optional机制。
tags:
- 程序设计
categories:
- 程序设计
---

# null

编程语言支持null的方式可能有所不同，但通常都会提供一个特殊的null值，表示一个变量或对象不引用任何内容。

## Java/C#的null

由于Java和C#过于相似，所以把它们放在一起讨论。Java和C#都提供了对空指针抛出异常的处理，不会容忍C/C++那样的非法空指针访问。

Java使用null表示一个对象引用不指向任何对象，可以用于初始化对象、方法返回值、方法参数等。遇到空指针访问时，Java会抛出`java.lang.NullPointerException`异常。一个未赋初值的Java引用变量会默认赋初值null。

```java
String str = null;  // str 变量被初始化为 null
```

C#也使用null表示一个对象引用不指向任何对象，与Java类似。遇到空指针访问时，C#会抛出`System.NullReferenceException`异常。

```csharp
string str = null;  // str 变量被初始化为 null
```
## C/C++的NULL和nullptr

C和C++中也支持null，但与其他语言略有不同。在C和C++中，null通常是通过定义一个预处理器宏来实现的，该宏被定义为一个指向空地址的指针常量。

在C中，null定义为宏NULL，通常被包含在标准头文件中（如`<stdio.h>`、`<stdlib.h>`等），代码中可以直接使用该宏。

```c
#include <stdio.h>

int main() {
    // ptr 变量被初始化为 null
    int* ptr = NULL;
    if (ptr == NULL) {
        printf("ptr is null\n");
    }
    return 0;
}
```

NULL指针是不指向任何内存区域的指针。NULL可以赋值给一个指针，用于表示那个指针并不指向任何值。对NULL指针执行间接访问操作的后果因编译器而异，两个常见的后果分别是返回内存位置零的值以及终止程序。指针常量只有NULL一种，因为无法预测编译器会把变量放在内存中的什么位置。

推荐阅读：[指针与引用](https://blankspace.blog.csdn.net/article/details/128910562)

在C++中，null定义为宏nullptr，通常被包含在头文件`<cstdlib>`中。代码中也可以直接使用该宏。

```cpp
#include <iostream>

int main() {
    // ptr 变量被初始化为 null
    int* ptr = nullptr;
    if (ptr == nullptr) {
        std::cout << "ptr is null" << std::endl;
    }
    return 0;
}
```

需要注意的是，C和C++中使用null时要更加小心处理，避免出现空指针异常等问题。在访问null指针时，程序可能会崩溃或产生未定义行为，因此在使用null时需要仔细检查其是否为空，并避免对其进行非法操作。

## Python的None

Python同样支持null，但不用null表示，而是None。Python中使用None表示一个变量不引用任何对象。

```python
x = None  # x 被初始化为 None
```

当Python程序访问None变量时，会抛出AttributeError。

## JavaScript的null和undefined

JavaScript中也使用null表示一个变量不引用任何对象。

```java
var obj = null;  // obj 变量被初始化为 null
```

当JavaScript程序访问null变量时，会抛出TypeError。

与其他编程语言不同的是，JavaScript除了null还提供了undefined，而且undefined不是null，用于表示未初始化的变量等。
JavaScript 中，null用于对象，undefined用于变量、属性和方法。

如果我们想测试对象是否存在，在对象还没定义时将会抛出错误：
```javascript
if (myObj !== null && typeof myObj !== "undefined") {
    // TODO
}
```
正确的方式是我们需要先使用typeof来检测对象是否已定义：
```javascript
if (typeof myObj !== "undefined" && myObj !== null) {
    // TODO
}
```

## SQL的null

SQL语句引入null，主要赋予null两种语义：
- 值不存在
- 值未知

值不存在的情况是普遍存在的，就比如小区人员信息的表中有居民邮箱这个属性，小A没有邮箱，那他的邮箱属性对应的值就没办法描述，这时就该使用null。

值未知的情况也是普遍存在的，就比如企业雇员信息的表中有雇员住址这个属性，有的雇员的地址已更改，并且其新地址为未知的地址，这时就该使用null。

当然，null给数据库的访问和更新带来很多困难，因此应该尽量避免使用null（实际仍然会大量存在null）。

有时，我们可以使用为表添加 not null 约束，这可能是好的，也可能影响了实际的语义表达。

# Optional

面对空指针的威胁，很多编程语言都为null提供了抛出空指针异常的机制。尽管空指针异常的存在避免了空指针访问，但它也让开发者不胜其扰。为了更好地解决空指针问题，许多编程语言提供了Optional机制。

Optional是一种表示值可能存在也可能不存在的类型，不同的编程语言可能提供不同的Optional实现方式。

## Java的Optional支持

Java8引入了Optional类，可以用来包装可能为空的对象。使用Optional类可以避免null指针异常的问题。

```java
Optional<String> opt = Optional.ofNullable(str);  // opt 表示 str 可能为空
if (opt.isPresent()) {
    String value = opt.get();  // 如果 str 不为空，可以通过 get() 方法获取其值
} else {
    // 如果 str 为空，可以进行相应的处理
}
```

## C#的Optional支持

C#引入了Nullable类型，可以用来表示值类型的值可能为空。使用Nullable类型也可以避免null指针异常的问题。

```csharp
int? num = null;  // num 表示一个可能为空的整数
if (num.HasValue) {
    int value = num.Value;  // 如果 num 不为空，可以通过 Value 属性获取其值
} else {
    // 如果 num 为空，可以进行相应的处理
}
```

## Swift的Optional支持

Swift中使用Optional类型表示一个值可能存在也可能不存在。使用Optional类型可以避免nil指针异常的问题。

```java
var str: String? = nil  // str 表示一个可能为空的字符串
if let value = str {
    // 如果 str 不为空，可以通过 if let 语句中的 value 常量获取其值
} else {
    // 如果 str 为空，可以进行相应的处理
}
```

## Kotlin的Optional支持

Kotlin中使用可空类型（Nullable Type）表示一个值可能为空。使用可空类型可以避免空指针异常的问题。

```kotlin
var str: String? = null  // str 表示一个可能为空的字符串
if (str != null) {
    // 如果 str 不为空，可以通过 if 语句中的 str 常量获取其值
} else {
    // 如果 str 为空，可以进行相应的处理
}
```
