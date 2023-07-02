---
title: VMware安装CentOS7系统
date: 2020-03-11 11:45:35
summary: 本文分享如何在Windows10上安装VMware，并在VMware上安装CentOS7。
tags:
- Linux
- VMware
categories:
- 计算机科学基础
---

# 安装VMware

前往VMware官网下载安装[VMware Workstation Player](https://www.vmware.com/products/workstation-player.html)或[VMware Workstation](https://www.vmware.com/products/workstation-pro.html)。

VMware Workstation Player免费可用，VMware Workstation如何安装此处不介绍。

考虑到潜在的风险，博主尤其不建议公司随意使用特殊方法，其实也有VMware的替代品。

VMware的.wmx文件等内容可以设置安装到非C盘(系统盘)，节约系统盘空间。

# 下载CentOS.iso镜像文件

操作系统的iso镜像文件比较大，最好是用国内的镜像站点。这里推荐[阿里云镜像](http://mirrors.aliyun.com/centos/7/isos/x86_64/)，可以更快下载。

![](../../images/计算机科学基础/VMware安装CentOS7系统/1.png)

也可以选择[官方网站](http://isoredirect.centos.org/centos/7/isos/x86_64/)，查看更多镜像：

![](../../images/计算机科学基础/VMware安装CentOS7系统/2.png)

下载后放进文件夹保存好，此文件今后也可复用。

# BIOS配置Intel VT-x

多数个人计算机是没有配开启虚拟化配置，因此无法启用虚拟机：
<font color="red">虚拟机此主机支持 Intel VT-x，但 Intel VT-x 处于禁用状态.....</font>

虚拟化技术，缩写是VT。Intel VT就是指Intel的虚拟化技术。这种技术简单来说就是让可以让一个CPU工作起来就像多个CPU并行运行，从而使得在一台电脑内可以同时运行多个操作系统。

英特尔(Intel)和AMD的大部分CPU均支持此技术，名称分别为VT-x、AMD-V。VT-x开启之后对VMware虚拟机的性能有非常大的提高。

BIOS，Basic Input Output System，基本输入输出系统。BIOS是一组固化到计算机内主板上一个ROM芯片上的程序，它保存着计算机最重要的基本输入输出的程序、开机后自检程序和系统自启动程序，它可从CMOS中读写系统设置的具体信息。 其主要功能是为计算机提供最底层的、最直接的硬件设置和控制。

进入BIOS的方法：
- 组装机以主板分，华硕用F8键、Intel用F12键，其他品牌用ESC键或F11键或F12键。
- 笔记本以品牌分，联想ThinkPad系列用F1键，其他品牌用F2键。
- 台式机按品牌分， 戴尔按ESC键，其他用F12键。
- 如果仍然不能进入BIOS，找找电脑(主板)说明书或者参考BIOS设置怎么进入图解教程。

另一种方法：
开始菜单选择电源，按住Shift点击重启，蓝色页面中选择"疑难解答"，新页面选择"高级选项"，新页面选择"启动设置"，新页面选择"UEFI固件设置"。

还有一种方法：
开始菜单选择设置，选择更新和安全，选择恢复，选择"高级启动"中的"立即重启"。

重启后的设置问题推荐参考：[WIN10如何进入BIOS设置开启VT](https://www.kafan.cn/A/1nkpwwjz3k.html)，剩余操作摘录如下：

1. Phoenix BIOS机型
    1. 进入BIOS，选择Configuration选项，选择Intel Virtual Technology并回车。注意：若无VT选项或不可更改，则表示你的电脑不支持VT技术。
    2. 将光标移动至Enabled处，并回车确定。
    3. 此时该选项将变为Enabled，最后按F10热键保存并退出即可开启VT功能。

![](../../images/计算机科学基础/VMware安装CentOS7系统/3.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/4.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/5.png)

2. Insyde BIOS机型
    1. 进入BIOS，选择Configuration选项，选择Intel Virtual Technology并回车。
    2. 将光标移动至Enabled处，并回车确定。
    3. 此时该选项将变为Enabled，最后按F10热键保存并退出即可开启VT功能。

![](../../images/计算机科学基础/VMware安装CentOS7系统/6.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/7.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/8.png)

# VMware安装配置CentOS

安装配置步骤：
1. 打开VMware选择文件，选择新建虚拟机。
2. 选择稍后安装操作系统。
3. 选择要安装的操作系统，选择Linux，选择CentOS 7 64位。
4. 给操作系统分配磁盘大小，选择默认20G(最好给起码50GB)，选择将虚拟磁盘存储为单个文件。
5. 选择Centos7镜像路径(前面提到的保存好的文件夹)。
6. 选择安装的自然语言。
7. 设置日期和时间。
8. 选择需要安装的软件。
9. 选择Server with GUI，点击Done。
10. 选择安装位置，进行磁盘划分。
11. 选择I wil configure partitioning，点击Done。
12. 点击加号，选择/boot，给/boot分区分配空间，点击Add。
13. 类似于11步骤，给其他分区分配好空间，点击Done。
14. 查看弹出的摘要信息，点击Accept Changes。
15. 设置主机名与网卡信息。
16. 打开网卡，然后查看是否能获取到IP地址，更改主机名，点击Done。
17. 点击Begin Installation。
18. 设置root密码(很重要，一定要记住)。
19. 点击USER CREATION以创建管理员用户。
20. 等待系统安装完毕，重启系统。

![](../../images/计算机科学基础/VMware安装CentOS7系统/9.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/10.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/11.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/12.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/13.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/14.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/15.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/16.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/17.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/18.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/19.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/20.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/21.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/22.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/23.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/24.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/25.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/26.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/27.png)
![](../../images/计算机科学基础/VMware安装CentOS7系统/28.png)

# 其他问题

## 初次登录
如果没登录过Linux系统，输入密码的时候要知道不会出现`*****`，正常输入，回车确认即可。

## VMX文件损坏
VMX文件损坏，如果无法修复，最简单有效的方法就是移除并重装。

## 重装VMware
卸载VMware不影响已安装的.vmx文件，等重新安装以后还可以重新导入.vmx文件。

## 安装VMwareTools

官方教程：[安装 VMware Tools](https://docs.vmware.com/cn/VMware-Workstation-Player-for-Windows/15.0/com.vmware.player.win.using.doc/GUID-D8892B15-73A5-4FCE-AB7D-56C2C90BD951.html)

# 学习Linux
[菜鸟教程 - Linux教程](https://www.runoob.com/linux/linux-command-manual.html)
