---
title: Java模块化
date: 2019-10-05 14:58:18
summary: 本文介绍Java9引入的模块化以及常见的Java模块。
tags:
- Java
categories:
- Java
---

# Java模块化

Java模块化是Java9中引入的一项功能，它允许将代码划分为互相独立的模块，从而提高代码的可维护性和可重用性。在Java9之前，Java代码是按照包的方式进行组织和管理的，但这种方式有时候存在一些问题，例如包之间的依赖性问题。

Java模块化的主要目的是将代码划分为互相独立的模块，从而使得代码更加清晰易懂，同时也能够更好地控制代码之间的依赖关系。每个模块都有自己的名称、版本号和依赖关系，这些信息都包含在模块描述文件中。

Java模块化提供了一些新的关键字和工具，例如：
- module：用于定义模块。
- requires：用于声明模块之间的依赖关系。
- exports：用于指定模块对外暴露的API。
- opens：用于指定模块对外开放的包，但同时也需要指定对该包的反射访问权限。
- uses：用于声明一个服务接口，并将其注册到服务提供者接口。
- provides：用于声明一个服务接口的实现，并将其注册到服务提供者接口。

Java模块化还提供了一些新的工具，例如：
- jlink：用于将模块化应用程序打包成一个自包含的运行时映像。
- jdeps：用于分析模块之间的依赖关系。

Java模块化的优点包括：
- 更好的代码组织结构：Java模块化使得代码更加清晰易懂，更易于维护和重用。
- 更好的依赖关系管理：Java模块化使得模块之间的依赖关系更加明确和可控。
- 更好的安全性：Java模块化通过封装模块之间的API，提高了应用程序的安全性。
- 更小的应用程序大小：Java模块化使得应用程序只包含必要的模块，从而减小了应用程序的大小。

需要注意的是，Java模块化是Java9中引入的新功能，因此在之前的Java版本中无法使用。如果要使用Java模块化，需要升级到Java9或更高版本。

# Java主要模块

- java.base：定义了 Java SE 平台的基础 API。
- java.compiler：定义语言模型、注解处理、Java编译器API。
- java.datatransfer：定义应用程序之间和应用程序内部传输数据的API。
- java.desktop：定义 AWT 和 Swing 用户界面工具包，以及可访问性、音频、图像、打印和 JavaBeans 的 API。
- java.instrument：定义允许代理检测在 JVM 上运行的程序的服务。
- java.logging：定义Java Logging API。
- java.management：定义Java管理扩展（JMX）API。
- java.management.rmi：为 Java 管理扩展 (JMX) 远程 API 定义 RMI 连接器。
- java.naming：定义 Java 命名和目录接口 (JNDI) API。
- java.net.http：定义HTTP Client和WebSocket API。
- java.prefs：定义首选项API。
- java.rmi：定义远程方法调用（RMI）API。
- java.scripting：定义脚本API。
- java.se：定义了Java SE平台的API。
- java.security.jgss：定义IETF通用安全服务API（GSS-API）的Java绑定。
- java.security.sasl：定义Java对IETF简单认证和安全层（SASL）的支持。
- java.smartcardio：定义Java智能卡I/O API。
- java.sql：定义JDBC API。
- java.sql.rowset：定义JDBC RowSet API。
- java.transaction.xa：定义了JDBC中支持分布式事务的API。
- java.xml：定义了 Java API for XML Processing (JAXP)、Streaming API for XML (StAX)、Simple API for XML (SAX) 和 W3C Document Object Model (DOM) API。
- java.xml.crypto：定义了XML加密的API。
- jdk.accessibility：定义辅助技术的实现者使用的 JDK 实用程序类。
- jdk.attach：定义附加API。
- jdk.charsets：提供- java.base中没有的charsets（多为双字节和IBM charsets）。
- jdk.compiler：定义系统Java编译器及其等效命令行javac的实现。
- jdk.crypto.cryptoki：提供SunPKCS11安全提供者的实现。
- jdk.crypto.ec：提供SunEC安全提供者的实现。
- jdk.dynalink：定义了对象高层操作动态链接的API。
- jdk.editpad：提供- jdk.jshell使用的编辑板服务的实现。
- jdk.hotspot.agent：定义了HotSpot Serviceability Agent的实现。
- jdk.httpserver：定义了JDK特有的HTTP服务器API，提供了jwebserver工具来运行一个最小的HTTP服务器。
- jdk.incubator.concurrent：定义并发编程的非最终API。
- jdk.incubator.vector：定义了一个 API，用于表达可以在运行时可靠地编译成 SIMD 指令的计算，例如 x64 上的 AVX 指令和 AArch64 上的 NEON 指令。
- jdk.jartool：定义了操作Java Archive (JAR) 文件的工具，包括jar 和jarsigner 工具。
- jdk.javadoc：定义了系统文档工具及其等效命令行javadoc的实现。
- jdk.jcmd：定义用于诊断和排除JVM故障的工具，例如jcmd、jps、jstat工具。
- jdk.jconsole：定义JMX图形工具jconsole，用于监控和管理正在运行的应用程序。
- jdk.jdeps：定义了分析Java库和程序中依赖关系的工具，包括jdeps、javap和jdeprscan工具。
- jdk.jdi：定义Java调试接口。
- jdk.jdwp.agent：提供Java Debug Wire Protocol (JDWP)代理的实现。
- jdk.jfr：定义了JDK Flight Recorder的API。
- jdk.jlink：定义用于创建运行时映像的jlink 工具、用于创建和操作JMOD 文件的jmod 工具以及用于检查类和资源的JDK 实现特定容器文件的jimage 工具。
- jdk.jpackage：定义Java打包工具jpackage。
- jdk.jshell：提供用于评估Java代码片段的jshell工具，并定义了JDK特定的API，用于建模和执行片段。
- jdk.jsobject：定义JavaScript对象的API。
- jdk.jstatd：定义jstatd工具，为jstat工具启动一个守护进程，远程监控JVM统计信息。
- jdk.localedata：提供非美国地区的地区数据。
- jdk.management：为JVM定义JDK特定的管理接口。
- jdk.management.agent：定义JMX管理代理。
- jdk.management.jfr：定义了JDK Flight Recorder的管理接口。
- jdk.naming.dns：提供DNS Java Naming provider的实现。
- jdk.naming.rmi：提供RMI Java Naming provider的实现。
- jdk.net：定义了 JDK 特定的网络 API。
- jdk.nio.mapmode：定义JDK特有的文件映射模式。
- jdk.sctp：为SCTP定义了JDK特定的API。
- jdk.security.auth：提供- javax.security.auth.*接口和各种认证模块的实现。
- jdk.security.jgss：定义了JDK对GSS-API的扩展和SASL GSSAPI机制的实现。
- jdk.xml.dom：定义不属于 Java SE API 的 W3C 文档对象模型 (DOM) API 的子集。
- jdk.zipfs：提供Zip文件系统提供者的实现。
