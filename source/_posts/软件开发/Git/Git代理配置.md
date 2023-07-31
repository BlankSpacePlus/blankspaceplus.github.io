---
title: Git代理配置
date: 2022-01-29 22:37:06
summary: 本文分享Git代理配置方法。
tags:
- Git
categories:
- 开发技术
---

本地连接远程GitHub可能是非常慢的，`push`的时候也可能会报一些错，其中一种正常连接的方法是设置代理。

例如，本机代理的端口号为7079，则应该配置http.proxy和https.proxy为7079：

```shell
git config --global http.proxy http://127.0.0.1:7079
git config --global https.proxy https://127.0.0.1:7079
```

取消设置http.proxy和https.proxy的方法是：

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

代理从哪来，就不是能分享的了 :|
