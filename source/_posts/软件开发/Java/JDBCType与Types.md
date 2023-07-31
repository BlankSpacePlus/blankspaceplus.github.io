---
title: JDBCType与Types
date: 2023-05-10 00:51:59
summary: 本文分享java.sql.JDBCType与java.sql.Types的相关内容。
tags:
- Java
categories:
- Java
---

# java.sql.JDBCType

java.sql.JDBCType是一个枚举类。该类中定义了JDBC类型的常量，这些常量对应于SQL数据类型。每个常量都具有一个整数值，该值是在java.sql.Types中定义的JDBC数据类型代码。

枚举类java.sql.JDBCType实现了java.sql.SQLType接口，java.sql.SQLType是Java8新增的接口，用于表示SQL类型。该接口有两个方法：getName()用于获取类型名称，getVendor()用于获取供应商名称。由于java.sql.JDBCType是java.sql.SQLType的子类，因此它必须实现这两个方法。

该类中定义了java.sql.JDBCType枚举常量，这些常量包含了大多数常见的SQL数据类型，例如 BIT、TINYINT、SMALLINT、INTEGER、BIGINT、FLOAT、REAL、DOUBLE、NUMERIC、DECIMAL、CHAR、VARCHAR、LONGVARCHAR、DATE、TIME、TIMESTAMP、BINARY、VARBINARY、LONGVARBINARY、NULL、OTHER、JAVA_OBJECT、DISTINCT、STRUCT、ARRAY、BLOB、CLOB、REF、DATALINK、BOOLEAN。java.sql.JDBCType枚举还包括JDBC4.0（ROWID、NCHAR、NVARCHAR、LONGNVARCHAR、NCLOB、SQLXML）和JDBC4.2（REF_CURSOR、TIME_WITH_TIMEZONE、TIMESTAMP_WITH_TIMEZONE）中新增的一些数据类型。

在实际使用中，java.sql.JDBCType枚举类型可以用来指定参数或结果集列的SQL类型。例如，在调用java.sql.PreparedStatement的setNull方法时，可以指定参数的类型为JDBCType.NULL。在调用java.sql.ResultSet的getXXX方法时，可以指定列的类型为java.sql.JDBCType.XXX。java.sql.JDBCType的使用可以帮助开发人员编写更加清晰、易于维护的JDBC代码。

# java.sql.Types

java.sql.Types和java.sql.JDBCType都是Java中用于表示SQL类型的常量，但是java.sql.JDBCType是在Java8中引入的，是对java.sql.Types的增强。相比之下，java.sql.Types是更早期版本的Java提供的，它主要定义了SQL类型与Java类型之间的映射。

java.sql.Types定义了一些整型常量，每个常量代表了一个SQL类型。例如，java.sql.TTypes.INTEGER表示SQL的整型数据类型，它与 Java 的 int 类型对应。这些常量在 Java 中的类型都是 int，它们用于描述 SQL 类型，并与 JDBC API 中的方法一起使用，如 PreparedStatement 和 ResultSet。

java.sql.JDBCType是Java8中新加入的一个枚举类型，它也定义了一些常量，每个常量代表了一个SQL类型，枚举中的常量都是java.sql.JDBCType类型的实例。与java.sql.Types不同，java.sql.JDBCType常量是通过enum实现的，并且提供了更多的信息，例如SQL类型的名称和JDBC的类型代码。这些常量可以作为参数传递给JDBC提供的方法，以标识SQL数据类型。

在实际使用中，java.sql.JDBCType更加直观和方便，可以清楚地描述每个SQL类型，并提供了更多的信息。而java.sql.Types在一些老的代码中仍然被广泛使用。但是需要注意的是，它们的一些常量可能会有所不同，例如，Java8引入的新的SQL类型可能不在java.sql.Types中定义。
