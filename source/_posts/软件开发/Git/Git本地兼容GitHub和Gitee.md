---
title: Git本地兼容GitHub和Gitee
date: 2020-04-26 02:38:26
summary: 本文分享Git本地兼容GitHub和Gitee的方法。
tags:
- Git
categories:
- 开发技术
---

# 帮助文章指引

- [HTTP 413 curl 22 The requested URL returned error: 413 Request Entity Too Large.](https://www.cnblogs.com/lihaiping/p/6021813.html)
- [ERROR: Repository not found. fatal: Could not read from remote repository.](https://blog.csdn.net/meng_lemon/article/details/88963157)
- [Gitee、GitHub 同时配置 ssh key](https://my.oschina.net/u/3552749/blog/1678082)
  - 文中说到的“config文件”就是一个名为config不带后缀的文件，使用记事本直接创建的时候把“\*.txt”改成“config”就行了。
  - 对于文中说到的“id_rsa.github.pub”，如果你原先就配了名为“id_rsa.pub”GitHub，那就不必改GitHub这个了。
  - 测试的时候如果还是GitHub好使，Gitee不好使，可能是你在没在.ssh路径下设置。
  - .ssh路径在当前用户文件夹里（N年前的“我的文档”）
  - 注意一个格式：
`git remote set-url origin git@gitee.com:username/repository_name.git`
写不对的话在push的时候就会报错。
- [GH007: Your push would publish a private email address.](https://blog.csdn.net/qq_34359927/article/details/83860031)

# 额外说明

- 不要搞100MB+的单个文件，一次提交不要500MB+，自己注意点！
- ……（后续补充）
