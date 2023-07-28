---
title: Gradle必知必会
date: 2023-07-28 20:34:55
summary: 本文分享一些Gradle基础知识。
tags:
- Gradle
categories:
- 开发技术
---

Gradle可以为Java项目提供以下功能：
- 通用的、标准化的项目目录结构
- 对jar文件进行依赖管理
- 统一的构建流程

Gradle项目中一些关键目录和文件：
- `src/main/`：此目录包含源代码和资源文件。
    - `src/main/java/`：此目录包含Java源代码。
    - `src/main/resourse/`：此目录包含源代码使用的资源文件（属性配置文件、JSON等数据文件）。
- `test/main/`：此目录包含测试代码和测试资源文件。
    - `test/main/java/`：此目录包含Java测试代码。
    - `test/main/resourse/`：此目录包含测试代码使用的资源文件（属性配置文件、JSON等数据文件）。
- `build/`：此目录包含编译源代码和测试代码后生成的.class文件。
    - `build/libs/`：此目录包含项目测试后生成的jar包和war包。
- `gradlew`：一个Gradle封装工具，允许以可执行JAR包的方式运行项目。
- `build.gradle`：此文件由`gradle init`命令生成，但其中的项目依赖需要手动添加。Gradle并没有使用XML，而是使用了一种基于Groovy的领域专用语言来编写其构建脚本。
- `build/`：此目录包含由`gradle build`和`gradle test`命令所生成的与构建相关的文件。

一些常用的Gradle任务，可以通过在命令行中执行`gradle tasks`来列举这些任务：
- `gradle build`：构建项目
- `gradle classes`：编译Java源代码
- `gradle clean`：删除build目录
- `gradle jar`：编译Java源代码，并将编译结果和资源文件一同打包为jar包
- `gradle javadoc`：根据Java源代码生成JavaDoc文档
- `gradle test`：编译Java源代码和测试代码，然后进行单元测试
- `gradle testClasses`：编译Java测试代码
