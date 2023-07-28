---
title: MySQL基础理论学习笔记
date: 2021-03-25 01:41:37
summary: 本文分享MySQL基础理论学习笔记。
tags:
- MySQL
categories:
- MySQL
---

1. 修改配置文件请去mysql的路径下找`\conf\my.ini`。
2. 租赁数据服务器时，数据库名通常是确定好的，所以并不是在所有情况下都需要创建数据库或者可以给数据库随便取名字。
3. [MySQL登陆与退出](https://blankspace.blog.csdn.net/article/details/103172249)
4. `mysql test -u root -p`可以直接启动mysql的时候进入选择数据库进入。
5. 数据库名、表名、列名可以用反引号\`\`括起来使用，字符串值则需要用单引号''或双引号""括起来。
6. 从一个数据库访问另一个数据库的表：`SELECT * FROM dbname2.tablename;`。
7. 登录mysql时提醒的`Welcome to the MySQL monitor.  Commands end with ; or \g.`就已经告诉我们，一条mysql命令必须以`;`或`\g`结尾。
8. `SHOW`命令是mysql相较于其他RDBMS特有的命令，可查数据库名、表名、表的结构以及字符编码设置等信息。
9. CMD中使用$\downarrow$或$\uparrow$查看mysql历史命令记录。
10. [MySQL自带的几个数据库](https://blankspace.blog.csdn.net/article/details/105368479) 
11. [命令行遇到 '> 而无法结束语句编辑的解决方案](https://blankspace.blog.csdn.net/article/details/104920081)
12. [MySQL系统命令+基础查询总结](https://blankspace.blog.csdn.net/article/details/104836553)
13. [MySQL命令行测试基础SQL](https://blankspace.blog.csdn.net/article/details/104615308)
14. [基于MySQL的SQL核心语法实战演练（一）](https://blankspace.blog.csdn.net/article/details/104910692)
15. [基于MySQL的SQL核心语法实战演练（二）](https://blankspace.blog.csdn.net/article/details/104919171)
16. [基于MySQL的SQL核心语法实战演练（三）](https://blankspace.blog.csdn.net/article/details/104928553)
17. 虽然较长的SQL语句也可以在中间换行输入，但是`VALUES`等关键词如果不在一行，就会发生错误。此外，数据中间也不能换行。
18. 正常的提示符文本是`mysql>`，可以用`prompt`设置作为提示符的文本：`prompt text`。
19. 主键必须不重且非空。
20. `ALTER`用于修改表中列的结构：
    1. 修改列的定义：`ALTER TABLE ... MODIFY ...`
    2. 添加列：`ALTER TABLE ... ADD ...`
    3. 修改列名和定义：`ALTER TABLE ... CHANGEY ...`
    4. 删除列：`ALTER TABLE ... DROP ...`
21. 4.0之前的版本，`VARCHAR`和`CHAR`的位数单位是字节，之后是字符。
22. 设置列自动编号的三个条件：
    1. 列元素数据类型为int等整数类型
    2. 加上`AUTO_INCREMENT`关键词标识声明连续编号
    3. 设置主键使列具有唯一性
23. 设置自动编号初始值为1：`AUTO_INCREMENT=1`
24. MySQL自带数据库：
    - **information-schema**：提供了访问数据库元数据的方式
    - **mysql**：mysql核心数据库
    - **performance_schema**：主要用于收集数据库服务器性能参数（研究性能调优要用到）
    - **sys**：系统数据库
    - **test**：mysql创建的测试数据库（我不记得是不是自动创建的了，反正这里的是我自己建立的，随便作）
25. MySQL监视器无法启动（输入`mysql -u username -ppassword`但不能登录并显示`Welcome...`的信息提示）的可能情况：
    1. 用户名或密码录入错误：这没啥好说的，用户名或密码打错了呗；要是真记不住了就破解一下重新改密码。
    2. 没有设置密码，但指定了`-p`：设置免密的话，直接执行`mysql -u username`即可。
    3. 路径设置不正确：环境变量之类的问题，建议改目录或者环境变量。
    4. **`-p`和密码之间设置了空格**：注意`-p`和密码之间无空格，要么你也可以直接换行输入`*`遮盖的密码，新手确实是可能带空格的。
    5. 单词之间的空格是全角空格：这就挺离谱的，一般正常输入的都是半角空格，另说MySQL只支持半角字符。
    6. `-u`或`-p`大写了：这个纯属操作失误吧，小心点就好了。
26. 输入命令如`drop view grade_view'`多一个`'`而卡住时，可输入`'\c`即可终止此语句，可输入`'\q`退出MySQL。
