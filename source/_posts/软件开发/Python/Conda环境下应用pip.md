---
title: Conda环境下应用pip
date: 2023-09-06 01:45:35
summary: 本文介绍将pip应用在conda环境下的注意事项。
tags:
- Python
- Anaconda
categories:
- Python
---

["Using Pip in a Conda Environment"](https://www.anaconda.com/blog/using-pip-in-a-conda-environment)一文讨论了在创建Python环境时使用conda和pip工具时可能出现的问题以及如何避免这些问题。
- 问题的根本原因：
    - 问题的根本原因在于conda和pip是两个不同的包管理工具，它们有时在一起使用可能会引发一些问题。
    - conda和其他包管理器一样，对于自己没有安装的包的控制能力有限。
    - 当在pip之后运行conda时，conda可能会覆盖或破坏通过pip安装的包，反之亦然。
- 避免问题的方法：
    - 最可靠的方法是尽可能只使用conda包。如果需要的软件不是conda包的一部分，可以使用`conda build`创建这些软件的包。
    - 对于在PyPI上可用的项目，`conda build`的一部分，即`conda skeleton`命令，通常会生成一个可以用来创建conda包的recipe，几乎不需要或只需要少量修改。
    - 如果必须在conda之后使用pip，最安全的做法是在所有其他要求都通过conda安装后才使用pip。此外，应该使用`--upgrade-strategy only-if-needed`参数来运行pip，以防止不必要地升级通过conda安装的包。
- 使用conda环境的重要性：
    - 为了保护其他环境免受pip可能造成的修改，建议将pip安装的软件安装到专门创建的conda环境中。
    - conda环境是相互隔离的，允许安装不同版本的包。它们在可能的情况下使用硬链接而不是复制文件以节省空间。
    - 创建单独的conda环境允许您轻松删除和重新创建环境，而不会危及核心的conda功能。
- 建议的工作流程：
    - 如果使用pip在conda环境中安装软件，建议首先创建一个包含所有conda要求的新环境，然后再运行pip。在删除旧环境之前，可以测试新环境。
    - 更可靠的方法是避免在pip之后运行conda，而是创建一个包含所有要求的新环境。
- 使用文本文件存储要求：
    - 对于需要经常重新创建的环境，建议将conda和pip的包要求存储在文本文件中。
    - 可以通过`--file`参数将包要求提供给conda，通过`-r`或`--requirement`参数提供给pip。
    - 这两种方法的好处是可以将描述环境的文件上传到版本控制系统并与其他人共享。

此文给出了作者建议的最佳实践清单：
1. 仅在使用conda后再使用pip
    - 尽可能使用conda安装尽可能多的要求，然后再使用pip
    - 应该使用`–upgrade-strategy only-if-needed`（默认选项）来运行pip
    - 不要使用pip的`–user`参数，避免所有“用户”安装
2. 使用conda环境进行隔离
    - 创建一个conda环境以隔离pip所做的任何更改
    - 环境占用很少的空间，因为使用硬链接
    - 要小心避免在root环境中运行pip
3. 如果需要更改，重新创建环境
    - 一旦使用pip后，conda将不知道所做的更改
    - 要安装额外的conda包，最好重新创建环境
4. 将conda和pip要求存储在文本文件中
    - 可以通过`–file`参数将包要求传递给conda
    - pip接受一个包含Python包列表的文件，使用`-r`或`–requirements`
    - `conda env`可以根据包含conda和pip要求的文件导出或创建环境
