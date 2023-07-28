---
title: YAML与Properties配置文件
date: 2023-03-25 14:01:30
summary: 本文介绍编程常见的配置文件YAML和Properties。
tags:
- YAML
- Properties
categories:
- 程序设计
---

# YAML

YAML（YAML Ain't Markup Language）是一种可读性高、易于使用的数据序列化格式。它的语法简单、灵活，支持标量、序列、映射等数据结构，并允许使用缩进表示层级关系，使得文件结构清晰、易于理解。YAML最初由Clark Evans在2001年设计，目的是成为一种更加人性化的数据交换格式。

YAML的语法可以分为三个部分：标量、序列和映射。

标量（Scalar）是YAML中的最基本数据类型，包括字符串、整数、浮点数、布尔值和null值等。字符串可以使用单引号或双引号括起来，也可以不使用引号，其中单引号保留所有字符的字面值，而双引号则支持转义字符和变量替换等特性。例如：
- 字符串
    - `name: John Smith`
    - `message: "Hello, World!"`
    - `quote: 'I said "Hello, World!"'`
- 数字
    - `age: 30`
    - `price: 9.99`
- 布尔值
    - `active: true`
    - `deleted: false`
- null
    - `reviewed: null`

序列（Sequence）是一组有序的标量，使用中括号括起来，各个元素使用破折号表示。例如：
```yaml
# 序列
fruits:
  - apple
  - orange
  - banana
```

映射（Mapping）是一组无序的键值对，使用冒号分隔键和值，多个键值对使用缩进表示层级关系。例如：
```yaml
# 映射
person:
  name: John Smith
  age: 30
  address:
    city: New York
    state: NY
```

YAML还支持使用引用、锚点和别名等特性，可以使得文件更加简洁和易于维护。例如：

```yaml
# 引用和别名
person1: &person
  name: John Smith
  age: 30
person2:
  <<: *person
  address:
    city: New York
    state: NY
```

在上面的代码中，person1定义了一个名为person的映射，并使用&person定义了一个锚点。person2则使用了别名*person，表示它是对锚点person的引用，并添加了一个address键值对。

YAML广泛用于配置文件、数据序列化、数据交换等场景。它不仅易于阅读和编写，而且可以被多种编程语言解析和生成，包括Java、Python、Ruby、JavaScript等。在实际应用中，YAML的语法和特性可以根据具体需求进行灵活配置，使得数据格式更加清晰、易于管理。

# Properties

Properties文件是一种文本文件，用于存储Java应用程序的配置信息。它通常被用于存储应用程序的一些基本配置，例如数据库连接信息、邮件服务器信息、日志配置等。Properties文件的格式非常简单，使用键值对的形式存储配置信息。

Properties文件的扩展名通常为.properties。文件内容可以使用任何文本编辑器编辑，并且可以在Java应用程序中轻松地读取和写入。Properties文件中的每行都表示一个键值对，其中键和值之间使用等号`=`或冒号`:`进行分隔。例如：

```python
database.url=jdbc:mysql://localhost:3306/mydb
database.username=root
database.password=123456
```

在Java应用程序中，可以使用Java.util.Properties类来读取和写入Properties文件。Properties类提供了一系列方法来读取和写入属性值，例如getProperty()方法和setProperty()方法等。例如：
```java
// 加载Properties文件
Properties props = new Properties();
InputStream in = new FileInputStream("config.properties");
props.load(in);
in.close();

// 读取属性值
String url = props.getProperty("database.url");
String username = props.getProperty("database.username");
String password = props.getProperty("database.password");

// 设置属性值
props.setProperty("database.password", "123456");
OutputStream out = new FileOutputStream("config.properties");
props.store(out, "Update database password");
out.close();
```

在上面的代码中，首先通过FileInputStream类加载了config.properties文件，然后通过Properties类的load()方法读取了文件中的配置信息。接下来使用getProperty()方法读取了三个属性的值，并使用setProperty()方法更新了其中一个属性的值。最后使用Properties类的store()方法将修改后的属性值写入到config.properties文件中。

Properties文件的格式非常简单、易于使用，因此在Java应用程序中被广泛使用。它不仅可以存储基本的配置信息，还可以用于存储本地化字符串等数据。此外，Properties文件还可以被多种开发工具和框架使用，例如Maven、Spring等。但是需要注意的是，Properties文件的缺点是不支持复杂的数据结构，例如数组、对象等，因此在存储复杂数据时可能需要将其拆分成多个属性。

# YAML与Properties的对比

Properties和YAML都是用于存储配置信息的文件格式，但它们之间存在一些区别。
1. 文件格式：Properties文件使用简单的键值对的形式存储数据，每个属性都由一个键和一个值组成，中间使用等号或冒号进行分隔。而YAML文件则使用更加灵活的层次结构来表示数据。它使用缩进来表示数据之间的层次关系，使用冒号来分隔键和值。YAML文件的格式更加清晰、易读，可以更好地表示复杂的数据结构，例如嵌套的对象、数组等。
2. 数据类型。Properties文件中存储的值都是字符串类型，因此在读取属性值时需要进行类型转换。而YAML文件则支持多种数据类型，例如字符串、数字、布尔、日期等，因此在读取属性值时不需要进行类型转换。
3. 注释。Properties文件支持使用`#`符号来添加注释，而YAML文件则支持使用`#`和`//`两种符号来添加注释。在YAML文件中，还可以使用`---`和`...`两种符号来分别表示文档的开始和结束。
4. 引用。YAML文件支持使用“&”和“*”两种符号来表示引用，可以将相同的数据在文件中进行复用。

虽然Properties文件和YAML文件都可以用于存储配置信息，但是它们的使用场景和特点不同。如果需要存储简单的键值对数据，可以使用Properties文件；如果需要存储复杂的数据结构或者需要支持多种数据类型，可以使用YAML文件。
