---
title: C语言不使用分号输出HelloWorld
date: 2020-10-28 23:35:42
summary: 本文采用C语言以三种方式不使用分号输出HelloWorld。
tags:
- C语言
categories:
- 开发技术
---

方法一：使用if

```c
#include <stdio.h>

int main() {
    if(printf("HelloWorld")){}
    return 0;
}
```

方法二：使用switch

这一条的思路和上一条差不多，毕竟都是选择结构。所谓不用分号，不过是将分号前的语句放在了括号里当做布尔条件罢了。

```c
#include <stdio.h>

int main() {
    switch(printf("HelloWorld")){}
    return 0;
}
```

第三个方法是使用循环结构，这里是while循环，其他循环类似。为了不陷入死循环，必须设置成!（非逻辑）。

```c
#include <stdio.h>

int main() {
    while(!printf("HelloWorld")){}
    return 0;
}
```
