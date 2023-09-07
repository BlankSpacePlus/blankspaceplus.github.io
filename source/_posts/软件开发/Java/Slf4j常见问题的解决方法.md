---
title: Slf4j常见问题的解决方法
date: 2023-09-07 22:36:00
summary: 本文分享Slf4j常见问题的解决方法。
tags:
- Java
- Slf4j
- 日志
categories:
- Java
---

# SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".

```
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
```

解决此问题的方法是，在Maven工程的pom.xml文件中引入新的依赖：
```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>${slf4j.version}</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>${slf4j.version}</version>
</dependency>
```

其中，slf4j的版本选用[最新版本](https://mvnrepository.com/artifact/org.slf4j/slf4j-api)即可。
