---
title: Spacy运行错误的解决方法
date: 2022-08-21 00:23:19
summary: 本文分享Spacy运行错误的解决方法。
tags:
- Python
- Spacy
- 异常修复
categories:
- Python
---

# TypeError: Plain typing.NoReturn is not valid as type argument

新建虚拟环境运行Spacy，先看如下代码：

```python
import spacy

print(spacy.__version__)
```

上述代码运行出现一串错误，最后一行将错误定义为：`TypeError: Plain typing.NoReturn is not valid as type argument`。

这个问题其实很好解决，不需要`sudo`或者什么`conda install -c conda-forge spacy`，只需要降低Spacy版本即可。博主的虚拟环境使用Python3.7，猜想是Spacy新版本不支持，于是降低版本回原来的`2.2.1`，执行`pip install spacy==2.2.1`，即可解决问题。

