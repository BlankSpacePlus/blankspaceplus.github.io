---
title: C语言常用函数库
date: 2019-10-22 16:05:54
summary: 本文分享几种C语言常用的函数库。
tags:
- C语言
categories:
- 开发技术
---

# C函数库

| C函数库头文件 | 描述 |
|:----:|:----:|
| stdio.h | 标准输入、输出库。包括向屏幕或者文件输出的或从键盘或者文件读的函数(printf、fprintf和scanf、fscanf)，以及打开和关闭文件的函数(fopen、fclose)。 |
| stdlib.h | 标准库。包括随机数生成函数(rand和srand)、动态分配和释放内存函数(malloc、free)、提前终止程序函数(exit)，以及字符串和数字之间的转换函数(atoi、atol、atof)等函数 |
| math.h | 数学库。包括标准数学函数，如sin、cos、asin、acos、sqrt、log、log10、exp、floor和ceil等 |
| string.h | 字符串库。包括比较、复制、连接和确定字符串长度等函数。 |

## stdio.h

```c
#include <stdio.h>
```
- `printf()`：向屏幕输出。
- `scanf()`：从键盘获取输入。
- `fscanf()`：从文件读取。（必须先用fopen()打开文件）
- `fprintf()`：向文件写入。（必须先用fopen()打开文件）

fopen()将文件名和输出模式作为参数。返回一个FILE*类型的文件指针。如果打不开，返回NULL。
最后要用fclose()关闭文件。

“模式”：
- “w”：写入文件。如果文件已存在，将会被覆写。
- "r"：读取文件。
- "a"：添加在原文件末尾。如果该文件不存在则创建它。

其他stdio函数：

 - `sprintf()`：将字符输出为字符串。
 - `sscanf()`：从字符串读取变量。
 - `fgetc()`：从文件中获取一个字符。
 - `fgets()`：将一整行读入一个字符串。

## stdlib.h

```c
#include <stdlib.h>
```

 - `rand()`：返回一个伪随机数。
 - `srand()`：以种子作为输入参数来生成伪随机数。
 - `exit()`：提前退出程序。将返回参数交个OS，表明终止原因。exit(0)表示正常完成，非零则提交错误条件。
 - `atoi()`：将ASCII字符串转换成整数。
 - `atol()`：将ASCII字符串转换成长整数。
 - `atof()`：将ASCII字符串转换成双精度浮点数。

## math.h

```c
#include <math.h>
```

就是数学运算，上面表格已经介绍了很多函数，就不赘述了。

## string.h

```c
#include <string.h>
```
 - `char *strcpy(char *dst, char *src)`：将src复制到dst中并返回dst。
 - `char *strcat(char *dst, char *src)`：将src添加到dst末尾并返回dst。
 - `int strcmp(char *s1, char *s2)`：比较字符串s1、s2，相等返回0，否则返回非0数。
 - `int strlen(char *str)`：返回str长度，不包括终止符。
