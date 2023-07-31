---
title: IntelliJ_IDEA项目关联Git
date: 2022-01-29 22:37:06
summary: 本文分享IntelliJ_IDEA项目关联Git的操作方法。
tags:
- Git
- IntelliJ_IDEA
categories:
- 开发技术
---

# 情况描述

我们可能会想要把在做的项目提交到GitHub上，但苦于必须每次把项目导出，commit并push到Git远程服务器上，这很麻烦，那我们能不能直接利用IDEA与Git关联起来，进而便捷地提交呢？

# 解决方案

推荐阅读：[《idea中将已有项目转变为git项目，并提交到git服务器上 》](https://www.cnblogs.com/grey-wolf/p/11796387.html)，这文章写的很好，我暂时也没什么可以补充的，想学就去读读吧！

注意在遇到`Push rejected: Push to origin/master was rejected`错误的时候，打开 git bash，输入`git pull`和`git pull origin master`，等待完成后重新在idea中push一下！

我在pull之后，项目中出现了重复的部分，这可能需要自己调整一下。

补充说明，想知道是不是绑定成功，可以先打开项目文件夹，打开隐藏的文件，看看有没有隐藏的.git文件夹，有就OK！
