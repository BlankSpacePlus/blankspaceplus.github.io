---
title: Linux安装glibc和make
date: 2023-09-12 21:02:15
summary: 本文介绍Linux系统下安装glibc和make的方法。
tags:
- Linux
- C语言
categories:
- 开发技术
---

# make的安装

查看make版本：
```shell
make -v
```

查看make版本列表：[http://ftp.gnu.org/gnu/make/](http://ftp.gnu.org/gnu/make/)

安装流程：
```shell
tar -xvf make-*.tar.gz
cd make-*
mkdir build
cd build
../configure  --prefix=/usr
sh build.sh
make install
```

# glibc的安装

查看本机存在的glibc版本：
```shell
strings /usr/lib64/libc.so.6 |grep GLIBC_
```

查看当前glibc版本：
```shell
ldd --version
```

查看glibc版本列表：[http://ftp.gnu.org/gnu/glibc/](http://ftp.gnu.org/gnu/glibc/)

安装流程：
```shell
tar -xvf glibc-*.tar.gz
cd glibc-*
mkdir build
cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make
make install
```
