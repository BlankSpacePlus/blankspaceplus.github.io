---
title: Ubuntu 20.04 报错 curl_ (23) Failure writing output to destination 的解决方法
date: 2022-10-04 21:53:11
summary: 本文分享 Ubuntu 20.04 报错 curl_ (23) Failure writing output to destination 的解决方法。
tags:
- Linux
- 异常修复
categories:
- 软件工程
---

Linux执行`curl`命令报错：`curl: (23) Failure writing output to destination`

系统：Ubuntu 20.04 LTS

解决方法：`snap curl`没用，应该卸载并用`apt`重装：

```shell
sudo snap remove curl
sudo apt install curl
```

至此，问题解决。
