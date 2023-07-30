---
title: Python运行错误的解决方法
date: 2020-04-11 16:14:41
summary: 本文分享一些Python运行错误的解决方法。
tags:
- Python
categories:
- Python
---

# SyntaxError: Non-UTF-8 code starting with '\xe5' in file XXX.py on line XX, but no encoding declared;

在写Python爬虫的时候遇到了这个问题：

```python
SyntaxError: Non-UTF-8 code starting with '\xe5' in file XXX.py on line XX, but no encoding declared;
```

## 解决方案

在import上面、Python文件的最顶部加上下面的语句：

```python
# coding:utf-8
```

## 说明

如果解决不了，你要看看自己的编码，让二者匹配即可。
有的时候应该这么写：
```python
# coding:gbk
```
