---
title: FatJAR和ThinJAR
date: 2023-09-27 14:52:34
summary: 本文比较FatJAR和ThinJAR的区别。
tags:
- Java
categories:
- Java
---

# FatJAR

FatJAR，也称为UberJAR，是一种特殊类型的JAR文件，它包含了一个应用程序的所有依赖项和代码，使其成为一个自包含的可执行JAR文件。这意味着开发者可以通过运行`java -jar`命令来启动应用程序，而不需要手动设置类路径或安装其他依赖项。

FatJAR的优点：
- FatJAR包含了应用程序的所有依赖项库，包括第三方库和自定义库。这些依赖项通常以可执行JAR的一部分打包，因此开发者不需要单独安装或配置它们。
- FatJAR的部署流程非常简单，只需将单个JAR文件复制到目标计算机上，并运行它即可。这简化了应用程序的分发和安装过程。
- 由于所有依赖项都被打包到一个JAR中，并且通常会被重命名以避免冲突，因此FatJAR不会出现依赖项之间的冲突问题，这使得构建和维护应用程序更加容易。
- FatJAR可以很容易地在不同的环境中运行，而无需担心环境配置或依赖项问题。这增强了应用程序的独立性和可移植性。
- FatJAR通常包含一个main()方法，使其成为可执行的Java应用程序。开发者可以通过在命令行中运行`java -jar`来启动它。

FatJAR的缺点：
- FatJAR的大小可能会很大，因为它包含了所有依赖项的库。对于规模较大的应用程序，这可能导致较长的下载和部署时间。

构建的SpringBoot应用程序FatJAR内部结构示例如下所示：
```shell
├── BOOT-INF
│   ├── classes
│   │   ├── application.properties
│   │   └── com
│   │       └── sf
│   │           └── demo
│   │               └── DemoApplication.class
│   └── lib
│       ├── javax.annotation-api-1.3.2.jar
│       ├── jul-to-slf4j-1.7.25.jar
│       ├── log4j-api-2.11.2.jar
│       ├── log4j-to-slf4j-2.11.2.jar
│       ├── logback-classic-1.2.3.jar
│       ├── logback-core-1.2.3.jar
│       ├── slf4j-api-1.7.25.jar
│       ├── snakeyaml-1.23.jar
│       ├── spring-aop-5.1.5.RELEASE.jar
│       ├── spring-beans-5.1.5.RELEASE.jar
│       ├── spring-boot-2.1.3.RELEASE.jar
│       ├── spring-boot-autoconfigure-2.1.3.RELEASE.jar
│       ├── spring-boot-starter-2.1.3.RELEASE.jar
│       ├── spring-boot-starter-logging-2.1.3.RELEASE.jar
│       ├── spring-context-5.1.5.RELEASE.jar
│       ├── spring-core-5.1.5.RELEASE.jar
│       ├── spring-expression-5.1.5.RELEASE.jar
│       └── spring-jcl-5.1.5.RELEASE.jar
├── META-INF
│   ├── MANIFEST.MF
│   └── maven
│       └── com.sf
│           └── demo
│               ├── pom.properties
│               └── pom.xml
└── org
    └── springframework
        └── boot
            └── loader
                ├── ExecutableArchiveLauncher.class
                ├── JarLauncher.class
                ├── LaunchedURLClassLoader$UseFastConnectionExceptionsEnumeration.class
                ├── LaunchedURLClassLoader.class
                ├── Launcher.class
                ├── MainMethodRunner.class
                ├── PropertiesLauncher$1.class
                ├── PropertiesLauncher$ArchiveEntryFilter.class
                ├── PropertiesLauncher$PrefixMatchingArchiveFilter.class
                ├── PropertiesLauncher.class
                ├── WarLauncher.class
                ├── archive
                │   ├── Archive$Entry.class
                │   ├── Archive$EntryFilter.class
                │   ├── Archive.class
                │   ├── ExplodedArchive$1.class
                │   ├── ExplodedArchive$FileEntry.class
                │   ├── ExplodedArchive$FileEntryIterator$EntryComparator.class
                │   ├── ExplodedArchive$FileEntryIterator.class
                │   ├── ExplodedArchive.class
                │   ├── JarFileArchive$EntryIterator.class
                │   ├── JarFileArchive$JarFileEntry.class
                │   └── JarFileArchive.class
                ├── data
                │   ├── RandomAccessData.class
                │   ├── RandomAccessDataFile$1.class
                │   ├── RandomAccessDataFile$DataInputStream.class
                │   ├── RandomAccessDataFile$FileAccess.class
                │   └── RandomAccessDataFile.class
                ├── jar
                │   ├── AsciiBytes.class
                │   ├── Bytes.class
                │   ├── CentralDirectoryEndRecord.class
                │   ├── CentralDirectoryFileHeader.class
                │   ├── CentralDirectoryParser.class
                │   ├── CentralDirectoryVisitor.class
                │   ├── FileHeader.class
                │   ├── Handler.class
                │   ├── JarEntry.class
                │   ├── JarEntryFilter.class
                │   ├── JarFile$1.class
                │   ├── JarFile$2.class
                │   ├── JarFile$JarFileType.class
                │   ├── JarFile.class
                │   ├── JarFileEntries$1.class
                │   ├── JarFileEntries$EntryIterator.class
                │   ├── JarFileEntries.class
                │   ├── JarURLConnection$1.class
                │   ├── JarURLConnection$JarEntryName.class
                │   ├── JarURLConnection.class
                │   ├── StringSequence.class
                │   └── ZipInflaterInputStream.class
                └── util
                    └── SystemPropertyUtils.class
```

推荐阅读：[Java 打包 FatJar 方法小结](https://zhuanlan.zhihu.com/p/43238220)

# ThinJAR

ThinJAR只包含应用程序的代码，而不包括依赖项的库。依赖项通常由构建工具（如Maven、Gradle）从远程存储库中下载，并在运行时由类加载器加载。

ThinJAR的优点：
- 只包含了应用程序的核心代码，而不包含所有依赖项的库，因此比FatJAR的文件大小更小、更轻量级，可以更快地传输和部署。
- ThinJAR的依赖项通常由构建工具管理，例如Maven、Gradle。开发者可以在构建配置文件中明确定义应用程序所需的依赖项及其版本，构建工具会负责下载并构建类路径，开发者可以更灵活地管理和更新依赖项。
- 在FatJAR中，相同的依赖项可能被多次打包，增加了JAR文件的大小。而在ThinJAR中，每个依赖项只需下载一次，减少了冗余。
- ThinJAR可以更容易地支持Java9及更高版本中的模块化。开发者可以将应用程序和其依赖项组织成不同的模块，以提高代码的可维护性和可扩展性。
- ThinJAR的依赖项在构建工具中明确定义，开发者可以更轻松地更新、切换或删除依赖项，而无需重新打包整个应用程序。

ThinJAR的缺点：
- ThinJAR需要额外的配置和依赖管理工作，需要确保在部署时依赖项的库是可用的，并设置正确的类路径。

# 总结

选择使用FatJAR还是ThinJAR取决于开发者的项目需求和部署场景。ThinJAR更适合需要更多控制和灵活性的情况，而FatJAR可能更适合简单的部署和小型应用程序。
