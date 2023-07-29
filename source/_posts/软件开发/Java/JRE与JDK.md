---
title: JRE与JDK
date: 2023-04-07 22:41:50
summary: 本文分享JRE与JDK的相关内容，并解析JDK的目录结构。
tags:
- Java
categories:
- 开发技术
---

# JRE

JRE（Java Runtime Environment）是Java运行时环境，是Java程序运行的必要组件，其中包括Java虚拟机（JVM）和Java类库。JRE提供了Java应用程序的运行环境，而不需要程序员自己安装和配置JVM和Java类库。

# JDK

JDK（Java Development Kit）是Java开发工具包，是Java编程所必须的软件开发工具，其中包括Java编译器、Java虚拟机、Java API库以及其他的工具和文档。JDK可以让程序员编写Java应用程序、Java小应用程序和Java Applet等，并且可以进行Java程序的编译、调试和执行。

相比之下，JDK更加全面，它包括了JRE，还包括了Java开发所必须的工具和文档，而JRE只包括了Java虚拟机和Java类库。因此，如果只需要运行Java程序而不需要开发，那么只需要安装JRE即可。

## JDK的发展变更

在Java的漫长发展历程中，JDK经历了多个版本的更新和升级。

以下是JDK的一些版本变更的简要介绍：
- JDK 1.0：1996年发布，Java的第一个稳定版本，包含Java编译器、运行时环境和类库等。
- JDK 1.1：1997年发布，增加了内部类、JavaBeans、RMI和JDBC等功能。
- JDK 1.2：1998年发布，添加了Swing GUI库、Java IDL（CORBA）、JDBC 2.0和Java 2D等功能。
- JDK 1.3：2000年发布，引入了Java Sound API、Java Naming and Directory Interface（JNDI）、Java Platform Debugger Architecture（JPDA）和JavaServer Pages（JSP）等功能。
- JDK 1.4：2002年发布，增加了Java Web Start、Java Management Extensions（JMX）、Java Logging API、XML解析器和XSLT处理器等功能。
- JDK 5：2004年发布，增加了自动装箱/拆箱、枚举、注释、泛型和可变参数等功能。
- JDK 6：2006年发布，引入了JDBC 4.0、JAX-WS、Scripting API和Java Compiler API等功能。
- JDK 7：2011年发布，增加了动态语言支持、新的I/O API、Fork/Join框架和多个语言级别的改进等。
- JDK 8：2014年发布，增加了Lambda表达式、Stream API、Date/Time API和重要的安全性和性能增强等功能。
- JDK 9：2017年发布，包含Java平台模块系统、JShell、HTTP/2客户端和多个性能和安全性改进等功能。
- JDK 10：2018年发布，增加了局部变量类型推断、容器化和垃圾回收改进等功能。
- JDK 11：2018年发布，是一个长期支持（LTS）版本，包含了HTTP客户端API、本地变量类型推断、ZGC（实验性的低延迟垃圾回收器）和Epsilon垃圾收集器等新功能。
- JDK 12、13、14、15、16、17：这些版本均包含了一些小的改进和增强，如Switch表达式、文本块、Pattern Matching for instanceof等。

目前的JDK已经更新至20，并将继续以半年一更版本、三年一更LTS的进度持续迭代更新下去。

JDK的版本变化可以使得Java语言更加强大和灵活，同时也可以提高Java应用程序的性能和安全性。每个版本都会在原有功能的基础上添加新的特性和改进，从而使Java语言能够更好地适应不断变化的实际需求。

## JDK的目录结构

JDK目录结构随着版本变更而有所变化，下面介绍的目录结构主要参考JDK11和JDK17。

- bin目录：包含Java编译器、Java虚拟机、Java文档生成器等Java开发和运行的命令行工具。
    - java：运行Java程序的命令行工具。
    - javac：编译Java源代码文件的命令行工具。
    - javap：反编译class文件的命令行工具。
    - jar：Java归档工具，用于创建、查看和提取JAR文件。
    - jps：Java进程状态工具，用于列出当前正在运行的Java进程。
    - jstat：Java统计信息监视工具，用于监视Java应用程序的运行状态。
    - jstack：Java堆栈跟踪工具，用于打印Java应用程序线程的堆栈信息。
    - jcmd：Java命令工具，用于发送诊断命令到Java进程。
    - jmap：Java内存映像工具，用于生成Java堆的内存快照。
    - jinfo：Java配置信息工具，用于打印Java进程的配置信息。
    - jrunscript：Java脚本命令行工具，用于运行JavaScript、Groovy、Python和Ruby脚本。
- conf目录：包含Java安全策略文件和其他Java配置文件。
    - management目录：这个目录包含了JDK的JMX（Java Management Extensions）管理API的配置文件，可以配置JMX服务的相关属性。
    - security目录：这个目录包含了JDK的安全管理相关的配置文件，包括Java安全策略文件和加密算法的配置文件。
    - logging.properties：这个文件是JDK日志记录工具的配置文件，可以通过该文件配置日志记录器和处理器的行为和属性。
    - net.properties：该文件包含了JDK网络库的配置信息，可以配置网络协议的实现类和默认属性。
    - sound.properties：这个文件包含了JDK音频库的配置信息，可以配置音频格式、编码、解码器等属性。
- include目录：包含用于本地编译和链接Java应用程序和本机方法库（native libraries）的头文件。
- jmods目录：包含Java模块化系统的模块文件，这些文件为Java模块化应用程序的编译和运行提供了必要的模块化支持，与JDK模块一一对应。
- legal目录：包含Java使用的开源软件许可证和版权信息，子文件夹与JDK模块一一对应。
- lib目录：包含Java开发所需的库文件。
    - jvm.cfg：这是一个JVM配置文件，它包含了不同平台下所支持的JVM实现。当Java应用程序启动时，它会在此文件中查找可用的JVM实现，以便在此基础上启动Java虚拟机。
    - jawt.lib：这是一个JNI库文件，用于实现Java AWT（Abstract Window Toolkit）的本地接口，使Java应用程序可以与本地窗口系统进行交互。
    - jvm.lib：这是一个Windows平台特有的JNI库文件，用于在Java应用程序中调用C/C++函数。它提供了与Windows API的接口，使Java应用程序可以直接调用Windows平台下的系统函数。
    - modules：这是一个包含所有Java模块的目录，这些模块包括了JDK自带的标准模块和可选模块。这些模块可以通过Java模块系统进行加载和使用。
    - src.zip：这是一个包含了JDK源代码的压缩文件，包含了Java API的源代码和一些其他的JDK组件的源代码。可以通过解压这个文件来查看和理解Java API的实现。
