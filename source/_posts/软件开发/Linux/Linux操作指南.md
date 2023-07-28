---
title: Linux操作指南
date: 2022-10-04 23:12:04
summary: 本文分享一些Linux的使用心得。
tags:
- Linux
categories:
- Linux
---

# Linux

Linux，全称GNU/Linux，是一套免费使用和自由传播的类UNIX操作系统，是一个基于POSIX的多用户、多任务、支持多线程和多CPU的操作系统。

伴随着互联网的发展，Linux得到了来自全世界软件爱好者、组织、公司的支持。它除了在服务器方面保持着强劲的发展势头以外，在个人电脑、嵌入式系统上都有着长足的进步。使用者不仅可以直观地获取该操作系统的实现机制，而且可以根据自身的需要来修改完善Linux，使其最大化地适应用户的需要。

Linux不仅系统性能稳定，而且是开源软件。其核心防火墙组件性能高效、配置简单，保证了系统的安全。在很多企业网络中，为了追求速度和安全，Linux不仅仅是被网络运维人员当作服务器使用，甚至当作网络防火墙，这是Linux的一大亮点。

Linux具有开放源码、没有版权、技术社区用户多等特点，开放源码使得用户可以自由裁剪，灵活性高，功能强大，成本低。尤其系统中内嵌网络协议栈，经过适当的配置就可实现路由器的功能。这些特点使得Linux成为开发路由交换设备的理想开发平台。 

![](../../../images/软件开发/Linux/Linux操作指南/1.png)

# Linux安装配置

## Linux本地安装虚拟机

推荐阅读：[VMware安装CentOS7系统](https://blankspace.blog.csdn.net/article/details/104792128)

## Linux远程连接服务器

推荐阅读：[Linux服务器远程连接](https://blankspace.blog.csdn.net/article/details/127764676)

# Linux配置MySQL数据库

操作系统：Ubuntu 20.04 LTS

MySQL版本：8.x

## Linux安装MySQL8

1. 安装mysql-server：`sudo apt install mysql-server`
2. 初始化配置信息：`sudo mysql_secure_installation`
    1. VALIDATE PASSWORD COMPONENT.....：(使用密码强度校验组件) n
    2. New Password：(设置新密码，并重复一遍)
    3. Remove anonymous users：(删除匿名用户) n
    4. Disallow root login remotely：(拒绝远程root账号登录) n
    5. Remove test database and access to it：(移除test数据库) n
    6. Reload privilege tables now：(立即重新载入权限表) y
3. 登录数据库并配置远程访问
    1. 以root用户登录MySQL：`sudo mysql -u root -p`
    2. 配置root用户外网也可以连接并登录
        1. 进入mysql数据库：`use mysql`
        2. 配置root用户外网也可以连接并登录：`update user set Host='%' where User='root';`(这里插一句如果表中已经存在的话就会报错，请认真查看报错信息，已经设置的话就不需要再设置了)
        3. 为root用户赋予权限：`grant all on *.* to 'root'@'%';`
        4. 刷新用户权限：`flush privileges`

如果物理机连接不到虚拟机的MySQL：
1. 首先查看IP是否可以互相ping通
    - Linux：`ifconfig-a`
    - Windows：`ipconfig`
2. 查看端口状态：`sudo netstat -tupln` 或者 `sudo lsof -i:端口` 
3. 移除`bind-address = 127.0.0.1`：`sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf`，注释掉`bind-address = 127.0.0.1`，保存并退出
4. 重启MySQL服务：`sudo service mysql restart` 

## Linux卸载MySQL8

1. 查看MySQL依赖：`dpkg --list|grep mysql`
2. 卸载mysql-common：`sudo apt-get remove mysql-common`
3. 继续卸载：`sudo apt-get autoremove --purge mysql-server-8.0`
4. 清除残留数据：`dpkg -l|grep ^rc|awk '{print$2}'|sudo xargs dpkg -P`
5. 再次查看MySQL的剩余依赖项：`dpkg --list|grep mysql`(这里一般就没有输出了，如果有则执行下一步)
6. 继续删除剩余依赖项，如：`sudo apt-get autoremove --purge mysql-apt-config`

# Linux常见错误解决方法

推荐阅读：[Linux常见错误的解决方案](https://blankspace.blog.csdn.net/article/details/104958389)

