---
title: while(scanner.hasNext()){}引发死循环的处理方法
date: 2019-10-13 10:11:52
summary: 本文分享while(scanner.hasNext()){}引发“死循环”的处理方法。
tags:
- Java
categories:
- Java
---

```java
Scanner scanner = new Scanner(System.in);
while (scanner.hasNext()) {
    System.out.println(scanner.next());
}
```
只要你写得出这种样式的代码，那么恭喜你，RE已是必然。

我们自己测试一下（没有打印语句）：
![](../../../images/软件开发/Java/while(scanner.hasNext()){}引发死循环的处理方法/1.png)

一直在那里等着输入，看着就让人头秃……
最早学Java写命令行程序的时候真的愁人，我不惜一切代价的规避这种代码段 ~~（，现在更是）~~ 。

原因是什么呢？
hasNext()这个方法是如果此扫描器的输入中有另一个标记，则返回 true。
在等待要扫描的输入时，此方法可能阻塞。
扫描器将不执行任何输入。所以循环会一直下去。

下面是一个讲线程的：

> https://my.oschina.net/goldenshaw/blog/705397

解决方案：

1.从在键盘上按Ctrl+Z。这样输入会读取到EOF，表示读取结束。
![](../../../images/软件开发/Java/while(scanner.hasNext()){}引发死循环的处理方法/2.png)
![](../../../images/软件开发/Java/while(scanner.hasNext()){}引发死循环的处理方法/3.png)

这个操作不是System.exit(0)那种操作，他只是让scanner读到EOF而已。
但是对于OJ显然没有用，而且你肯定不能指望着用户输入Ctrl+Z。

2.可以设置一个终止符，调用hasNext()的重载方法hasNext(String patten)：如果下一个标记与从指定字符串构造的模式匹配，则返回 true。扫描器不执行任何输入。

参考了：

> https://developer.aliyun.com/ask/74287?spm=a2c6h.13159736

```java
Scanner scanner = new Scanner(System.in);
while (!scanner.hasNext("0")) {
    System.out.println(scanner.next());
}
```
你也不能指望着用户/OJ单独做一个模式匹配给你。

3.避免使用这个方法
比如他给你这样的数据：

```java
4
4 3 2 1 
```
那你就可以用for循环限制读取次数：

```java
Scanner scanner = new Scanner(System.in);
int num = Integer.parseInt(scanner.nextLine());
int[] arrInt = new int[num];
for (int i = 0; i < num; i++) {
    arrInt[i] = scanner.nextInt();
}
```

反正个人建议是用不好的话，能别用尽量别用。
