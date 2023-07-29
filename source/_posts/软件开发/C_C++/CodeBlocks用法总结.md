---
title: Code::Blocks用法总结
date: 2023-03-09 00:35:33
summary: 本文总结使用Code::Blocks的使用经验。
tags:
- C语言
- C++
- Code::Blocks
categories:
- 开发技术
---

# Code::Blocks

Code::Blocks 是一款免费、开源、跨平台的 C、C++ 和 Fortran IDE，旨在满足其用户最苛刻的需求。它被设计成非常可扩展和完全可配置的。

Code::Blocks 是一款功能齐全的 IDE，具有跨平台一致的外观、感觉和操作，旨在使个人开发人员（和开发团队）在一个良好的编程环境中工作，提供他/他们从此类程序中需要的一切。

Code::Blocks 围绕插件框架构建，可以使用插件进行扩展。开发者可以通过安装/编码插件来添加任何类型的功能。

Code::Blocks由纯粹的C++语言开发完成，它使用了著名的图形界面库wxWidgets(2.6.2 unicode)版。

推荐阅读：[开源软件](https://blankspace.blog.csdn.net/article/details/129073143)

推荐阅读：[集成开发环境](https://blankspace.blog.csdn.net/article/details/129351285)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/1.png)

# Code::Blocks下载安装

前往[官网](http://www.codeblocks.org/downloads/)下载：

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/2.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/3.png)

前往[SourceForge](https://sourceforge.net/projects/codeblocks/files/Binaries/20.03/Windows/codeblocks-20.03-setup.exe/download)下载exe文件：
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/4.png)

点击Download即可下载。

下载后开始安装。

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/5.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/6.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/7.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/8.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/9.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/10.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/11.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/12.png)

![](../../../images/软件开发/C_C++/CodeBlocks用法总结/13.png)

至此，安装完成。

# Code::Blocks开发流程

1. 创建新工程`New `$→$`Project`。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/14.png)
2. 选择控制台应用程序`Console Application`工程。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/15.png)
3. 选择`Next`，继续完成`Console Application`工程创建。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/16.png)
4. 选择编程语言是C还是C++。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/17.png)
5. 填写工程基本信息。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/18.png)
6. 配置工程编译器信息，一般选择默认即可。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/19.png)
7. 创建完成，查看工程结构。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/20.png)
8. 双击`main.c`查看C源文件代码。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/21.png)
9. 选择`Build and run`，构建并执行程序。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/22.png)
10. 弹出CMD窗体输出运行结果，程序结束，按任意键退出窗体。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/23.png)

# Code::Blocks的核心功能

1. 工程的创建、打开、保存、导出、关闭等功能。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/24.png)
2. 选择不同语言的代码高亮设置。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/25.png)
3. 可视化窗体组件的选择配置。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/26.png)
4. 代码构建与运行的选项，主要是`Build`、`Run`、`Build and run`、`Rebuild`。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/27.png)
5. Code::Blocks插件选择与配置。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/28.png)
6. Code::Blocks设置，例如开发环境设置、代码编辑器设置、编译器设置、调试器设置。
![](../../../images/软件开发/C_C++/CodeBlocks用法总结/29.png)
