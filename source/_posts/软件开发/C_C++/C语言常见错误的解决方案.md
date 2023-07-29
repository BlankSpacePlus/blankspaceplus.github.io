---
title: C语言常见错误的解决方案
date: 2022-11-13 17:08:09
summary: 本文归纳C语言常见错误的解决方案。
tags:
- C语言
- 异常修复
categories:
- 开发技术
---

# warning: implicit declaration of function 'xxx' [-Wimplicit-function-declaration]

Linux开发C语言应用程序，编译出现以下四条warning：

```
warning: implicit declaration of function ‘strcmp’ [-Wimplicit-function-declaration]
    17 |     if (argc != 3 || strcmp(argv[1], "--help") \=\= 0) {
         |                      \^\~\~\~\~\~
warning: implicit declaration of function ‘read’; did you mean ‘fread’? [-Wimplicit-function-declaration]
    33 |     while ((numRead = read(inputFd, buf, BUF_SIZE)) > 0) {
         |                       \^\~\~\~
         |                       fread
warning: implicit declaration of function ‘write’; did you mean ‘fwrite’? [-Wimplicit-function-declaration]
    34 |         if (write(outputFd, buf, numRead) !\= numRead) {
         |             \^\~\~\~\~
         |             fwrite
warning: implicit declaration of function ‘close’; did you mean ‘pclose’? [-Wimplicit-function-declaration]
    42 |     if (close(inputFd) \=\= -1) {
         |         \^\~\~\~\~
         |         pclose
```

当`xxx`是`strcmp`时，解决方法是：引入`#include <string.h>`。

当`xxx`是`read`/`write`/`close`时，解决方法是：引入`#include <fcntl.h>`和`#include <unistd.h>`。

当`xxx`是`usleep`时，解决方法是：引入`#include <unistd.h>`。
