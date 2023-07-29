---
title: String、java.util.Date、java.sql.Date的类型转换
date: 2020-03-04 21:17:47
summary: 本文分享java.lang.String、java.util.Date、java.sql.Date的互相转化方法。
tags:
- Java
categories:
- 开发技术
---

# java.lang.String

推荐阅读：[java.lang.String](https://blankspace.blog.csdn.net/article/details/130395138)

# java.util.Date

java.util.Date是Java中用于表示日期和时间的类。它从1.0版本就出现在Java标准库中，是最早的日期和时间类之一。

java.util.Date表示一个特定的日期和时间，精确到毫秒级别。它存储了从1970年1月1日00:00:00GMT（格林尼治标准时间）开始经过的毫秒数。通过使用java.util.Date类的构造函数、set方法或者解析字符串的方式，可以创建一个特定的日期和时间对象。java.util.Date表示的是一个与时区无关的时刻，格式化或解析日期时才会考虑到时区信息。

此外，java.util.Date提供了一些方法，用于操作日期和时间对象。例如，可以获取年、月、日、小时、分钟、秒等信息，还可以进行日期和时间的比较、格式化等操作。

然而，java.util.Date在设计上存在一些问题和限制。其中一个主要问题是它的可变性，即 Date 对象可以通过一些方法进行修改。这可能导致线程安全性的问题。另外，java.util.Date类的大部分方法已经被标记为Deprecated，推荐使用java.time包中的新日期和时间 API。

# java.sql.Date

java.sql.Date是Java中用于表示 SQL DATE 数据类型的类，它是java.util.Date的派生类。java.sql.Date继承了java.util.Date的大部分方法，同时添加了一些特定于数据库操作的功能。与java.util.Date不同的是，java.sql.Date对象的时间部分被忽略，只保留日期部分。具体地说，它的时间部分被设置为00:00:00。

java.sql.Date提供了一些额外的方法，用于处理日期和SQL数据类型之间的转换。例如，它可以将java.sql.Date对象转换为字符串表示形式，也可以将字符串解析为java.sql.Date对象。

在使用JDBC进行数据库操作时，可以直接使用java.sql.Date类来表示SQL中的日期，并且可以直接传递给PreparedStatement或者从ResultSet中获取。与java.util.Date 一样，java.sql.Date也存在一些设计上的缺陷，推荐使用Java8引入的新的日期和时间 API (java.time 包)。

# java.lang.String → java.util.Date

将java.lang.String转换为java.util.Date需要使用日期格式化的过程，即将字符串按照特定的日期格式解析为java.util.Date对象。

首先，创建一个java.text.SimpleDateFormat对象，并指定要解析的日期格式。
然后，调用java.text.SimpleDateFormat对象的parse方法，将字符串作为参数传递进去，返回一个解析后的java.util.Date对象。

推荐阅读：[数据格式化](https://blankspace.blog.csdn.net/article/details/104714306)

推荐阅读：[SimpleDateFormat与DateTimeFormatter](https://blankspace.blog.csdn.net/article/details/130446727)

```java
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
String dateString = "2023-05-01";
try {
    Date date = dateFormat.parse(dateString);
    // 此时date中保存了解析后的日期对象
} catch (ParseException e) {
    // 解析失败，处理异常情况
}
```

# java.util.Date → java.lang.String

将java.util.Date转换为java.lang.String需要使用日期格式化的过程，即将java.util.Date对象格式化为指定的字符串表示。

首先，创建一个java.text.SimpleDateFormat对象，并指定要格式化的日期格式。
然后，调用java.text.SimpleDateFormat对象的 format 方法，将java.util.Date对象作为参数传递进去，返回一个格式化后的字符串。

```java
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
Date date = new Date();
String dateString = dateFormat.format(date);
// 此时 dateString 中保存了格式化后的日期字符串
```

在进行转换时，需要确保指定的日期格式与所需的字符串格式相匹配，否则可能会得到不符合预期的结果。

# java.util.Date → java.sql.Date

使用 java.sql.Date 的构造函数：java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
使用 valueOf 方法：java.sql.Date sqlDate = java.sql.Date.valueOf(utilDate.toString());

```java
java.util.Date utilDate = new java.util.Date();
java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
```

# java.sql.Date → java.util.Date

使用 java.util.Date 的构造函数：java.util.Date utilDate = new java.util.Date(sqlDate.getTime());
使用 toLocalDate 方法（需要 Java 8 及以上版本）：java.util.Date utilDate = java.sql.Date.valueOf(sqlDate.toLocalDate());
需要注意的是，java.sql.Date 类继承自 java.util.Date，但是它具有更精确的时间表示，只保留日期部分，将时间部分设置为午夜（00:00:00）。因此，当进行类型转换时，时间部分可能会丢失。

```java
java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());
java.util.Date utilDate = (java.util.Date)sqlDate;
```

# java.lang.String → java.sql.Date

标准`yyyy-mm-dd`格式下，可以直接用valueOf()方法进行转化。格式不规范将抛出java.lang.IllegalArgumentException。

```java
String time = "2020-3-4";
java.sql.Date sqlDate = java.sql.Date.valueOf(time);
```

非标准`yyyy-mm-dd`格式下，需要通过一个java.util.Date对象来构造。

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String time = "2020-3-4 21:12:10";
try {
    java.util.Date utilDate = sdf.parse(time);
    java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
} catch (ParseException e) {
    e.printStackTrace();
}
```

# java.sql.Date → java.lang.String

与java.util.Date类似。

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());
String time = sdf.format(sqlDate);
```
