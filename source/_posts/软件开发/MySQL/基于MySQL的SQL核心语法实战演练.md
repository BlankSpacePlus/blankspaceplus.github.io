---
title: 基于MySQL的SQL核心语法实战演练
date: 2020-04-29 20:02:56
summary: 本文分享基于MySQL的SQL核心语法实战演练教程。
tags:
- MySQL
- 数据库系统
categories:
- 开发技术
---

# 基于MySQL的SQL核心语法实战演练

此前比较简单的一个训练过程是：[SQL入门+存储过程练习](../../../mysql-stored-procedure)。

[![](../../../images/软件开发/MySQL/基于MySQL的SQL核心语法实战演练/1.jpg)](https://www.mysql.com)

准备面试期间曾刷过一遍[牛客网的SQL基础题](https://www.nowcoder.com/ta/sql-quick-study)，其中比较好的有：[T19](nowcoder/sql19.sql)、[T20](nowcoder/sql20.sql)、[T22](nowcoder/sql22.sql)、[T23](nowcoder/sql23.sql)、[T29](nowcoder/sql29.sql)、[T32](nowcoder/sql32.sql)、[T33](nowcoder/sql33.sql)、[T34](nowcoder/sql34.sql)、[T35](nowcoder/sql35.sql)、[T39](nowcoder/sql39.sql)。

## MySQL优质可视化工具

- [Navicat](http://www.navicat.com.cn)
- [DataGrip](https://www.jetbrains.com.cn/datagrip)

![](../../../images/软件开发/MySQL/基于MySQL的SQL核心语法实战演练/2.jpg)

## MySQL实战

### 说明

用命令行能增强初学者编写SQL的准确度和熟练度，一旦发现输错了，输入英文分号，直接会命令报错从而重新输入。

## 下载

[MySQL下载页面](https://dev.mysql.com/downloads)

![](../../../images/软件开发/MySQL/基于MySQL的SQL核心语法实战演练/3.png)

![](../../../images/软件开发/MySQL/基于MySQL的SQL核心语法实战演练/4.png)

点击Archive可以选择历史版本。

下载得到.zip，解压后配置环境变量即可。

### 安装

管理员身份启动CMD，切到mysql的bin目录下。
```shell
# MySQL服务随操作系统启动
mysqld --install
# 初始化MySQL，产生一个密码(需要牢记)
mysqld --initialize --console
# 开启MySQL服务
net start mysql
# 登录MySQL的root用户
mysql -u root -p
# 修改root用户的密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'new_password';
```

### 基础命令

5.5.19版本的MySQL的系统命令：
1. 启动MySQL：
    ```sql
    mysqladmin start
    /ect/init.d/mysql start
    ```
2. 重启MySQL：
    ```sql
    mysqladmin restart
    /ect/init.d/mysql restart
    ```
3. 关闭MySQL：
    ```sql
    mysqladmin shutdown
    /ect/init.d/mysql shutdown
    ```
4. 连接本机上的MySQL：<br/>进入本机目录mysql\bin，键入命令mysql -u root -p，回车以后显示输入密码。使用exit退出MySQL。
5. 修改MySQL的密码：
    ```sql
    mysqladmin -u 用户名 -p password 新密码
    ```
6. 进入MySQL命令行后设置密码：
    ```sql
    set password for root=password("root");
    ```
7. 增加新用户：
    ```sql
    grant select on 数据库.* to 用户名@登陆主机 identified by "密码";
    ```
8. 刷新MySQL的系统权限相关列表：
    ```sql
    flush privileges
    ```
    新设置用户或更改密码后必须刷新MySQL系统权限相关列表。

# 登录

需要密码的话，输入如下命令：
```shell
mysql -u root -p
```

MySQL会让你输入密码：

```shell
Enter your password:
```

### 登录

输入用户名和密码即可登录（免密除外）
```sql
mysql -u (your username such as 'root') -p
Enter password: ***************(your password)
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.16 MySQL Community Server - GPL

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

### 查所有的库

查所有的数据库。
```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| jindu              |
| mysql              |
| performance_schema |
| sys                |
| test               |
+--------------------+
6 rows in set (0.75 sec)
```

### 删库

由于我们需要重新使用test这个数据库，而里面确实乏善可陈，所以删了重建。

```sql
mysql> drop database test;
Query OK, 0 rows affected (0.21 sec)
```
接下来重新查库，发现少了test库。
```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| jindu              |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```

### 建库

删库是为了重建，那就建一下：
```sql
mysql> create database test;
Query OK, 1 row affected (0.17 sec)
```
再查库，发现test库出现了。
```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| jindu              |
| mysql              |
| performance_schema |
| sys                |
| test               |
+--------------------+
6 rows in set (0.00 sec)
```

### 进入test数据库

mysql使用use命令可以进入指定数据库。

```sql
mysql> use test;
Database changed
```

接下来的操作就在test库中展开啦！

### 查库中所有的表

新库显然无表，查到空集。
```sql
mysql> show tables;
Empty set (0.00 sec)
```

### 库中建表

没有表，就建立一个表呗，使用create可以建表，名为stu_info，因为接下来的数据是学生信息。

```sql
mysql> create table stu_info
    -> (id int primary key not null,
    -> name varchar(10) not null,
    -> age int not null,
    -> email varchar(20),
    -> country varchar(10),
    -> gpa float(4) not null);
Query OK, 0 rows affected (0.93 sec)
```

再查表，发现有了stu_info这张表。

```sql
mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| stu_info       |
+----------------+
1 row in set (0.41 sec)
```

### 全表查询

select * 虽说在高级应用中是低效的，但对于初学者也是必须掌握的，可查全表信息并返回。
由于我们刚建的表是空表，所以返回空集。
```sql
mysql> select * from stu_info;
Empty set (0.36 sec)
```

### 表中插入一行

在表中插入一行信息（一个元组）

```sql
mysql> insert into stu_info
    -> values('1', 'XiaoMing', '19', '123456789@qq.com', 'China', '3.5945');
Query OK, 1 row affected (0.41 sec)
```
我们查一下全表：

```sql
mysql> select * from stu_info;
+----+----------+-----+------------------+---------+--------+
| id | name     | age | email            | country | gpa    |
+----+----------+-----+------------------+---------+--------+
|  1 | XiaoMing |  19 | 123456789@qq.com | China   | 3.5945 |
+----+----------+-----+------------------+---------+--------+
1 row in set (0.00 sec)
```

确实有一行数据。接下来再插入四行：

```sql
mysql> insert into stu_info
    -> values('2', 'Bob', '20', 'bobbob@gmail.com', 'USA', '3.9047');
Query OK, 1 row affected (0.41 sec)

mysql> insert into stu_info
    -> values('3', 'Steven', '21', 'steven521@gmail.com', 'UK', '2.5633');
Query OK, 1 row affected (0.41 sec)

mysql> insert into stu_info
    -> values('4', 'LiHua', '20', 'lihua@thu.stu.com', 'China', '4.9999');
Query OK, 1 row affected (0.44 sec)

mysql> insert into stu_info
    -> values('5', 'Amy', '19', '20205205@163.com', 'China', '4.1000');
Query OK, 1 row affected (0.40 sec)
```
我们查一下全表：

```sql
mysql> select * from stu_info;
+----+----------+-----+---------------------+---------+--------+
| id | name     | age | email               | country | gpa    |
+----+----------+-----+---------------------+---------+--------+
|  1 | XiaoMing |  19 | 123456789@qq.com    | China   | 3.5945 |
|  2 | Bob      |  20 | bobbob@gmail.com    | USA     | 3.9047 |
|  3 | Steven   |  21 | steven521@gmail.com | UK      | 2.5633 |
|  4 | LiHua    |  20 | lihua@thu.stu.com   | China   | 4.9999 |
|  5 | Amy      |  19 | 20205205@163.com    | China   |    4.1 |
+----+----------+-----+---------------------+---------+--------+
5 rows in set (0.00 sec)
```
OK，五行信息插入完了。

### 更改表中一条记录的信息

使用update可以改表中的记录：
```sql
mysql> update stu_info
    -> set gpa='1.8888'
    -> where name='Steven';
Query OK, 1 row affected (0.44 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```
我们查一下全表：
```sql
mysql> select * from stu_info;
+----+----------+-----+---------------------+---------+--------+
| id | name     | age | email               | country | gpa    |
+----+----------+-----+---------------------+---------+--------+
|  1 | XiaoMing |  19 | 123456789@qq.com    | China   | 3.5945 |
|  2 | Bob      |  20 | bobbob@gmail.com    | USA     | 3.9047 |
|  3 | Steven   |  21 | steven521@gmail.com | UK      | 1.8888 |
|  4 | LiHua    |  20 | lihua@thu.stu.com   | China   | 4.9999 |
|  5 | Amy      |  19 | 20205205@163.com    | China   |    4.1 |
+----+----------+-----+---------------------+---------+--------+
5 rows in set (0.00 sec)
```
可怜的Steven啊，他的GPA降到1.8888了，太惨了orz

### 查询结果排序

使用 order by，查询结果排序可以是升序或者降序，默认是升序（升序是指从上到下依次增大，降序反是）：

```sql
mysql> select * from stu_info
    -> order by gpa;
+----+----------+-----+---------------------+---------+--------+
| id | name     | age | email               | country | gpa    |
+----+----------+-----+---------------------+---------+--------+
|  3 | Steven   |  21 | steven521@gmail.com | UK      | 1.8888 |
|  1 | XiaoMing |  19 | 123456789@qq.com    | China   | 3.5945 |
|  2 | Bob      |  20 | bobbob@gmail.com    | USA     | 3.9047 |
|  5 | Amy      |  19 | 20205205@163.com    | China   |    4.1 |
|  4 | LiHua    |  20 | lihua@thu.stu.com   | China   | 4.9999 |
+----+----------+-----+---------------------+---------+--------+
5 rows in set (0.00 sec)
```

加上desc，结果呈现降序：

```sql
mysql> select * from stu_info
    -> order by gpa desc;
+----+----------+-----+---------------------+---------+--------+
| id | name     | age | email               | country | gpa    |
+----+----------+-----+---------------------+---------+--------+
|  4 | LiHua    |  20 | lihua@thu.stu.com   | China   | 4.9999 |
|  5 | Amy      |  19 | 20205205@163.com    | China   |    4.1 |
|  2 | Bob      |  20 | bobbob@gmail.com    | USA     | 3.9047 |
|  1 | XiaoMing |  19 | 123456789@qq.com    | China   | 3.5945 |
|  3 | Steven   |  21 | steven521@gmail.com | UK      | 1.8888 |
+----+----------+-----+---------------------+---------+--------+
5 rows in set (0.00 sec)
```

### 查询结果只返回部分属性

把 select * 的 “*”换成指定的属性，可以有很多并用逗号分隔，这里还加了排序：
```sql
mysql> select id, name, gpa from stu_info
    -> order by gpa desc;
+----+----------+--------+
| id | name     | gpa    |
+----+----------+--------+
|  4 | LiHua    | 4.9999 |
|  5 | Amy      |    4.1 |
|  2 | Bob      | 3.9047 |
|  1 | XiaoMing | 3.5945 |
|  3 | Steven   | 1.8888 |
+----+----------+--------+
5 rows in set (0.00 sec)
```

### 使用where查询符合指定条件的数据

```sql
mysql> select id, name, gpa from stu_info
    -> where gpa>3.5
    -> order by gpa desc;
+----+----------+--------+
| id | name     | gpa    |
+----+----------+--------+
|  4 | LiHua    | 4.9999 |
|  5 | Amy      |    4.1 |
|  2 | Bob      | 3.9047 |
|  1 | XiaoMing | 3.5945 |
+----+----------+--------+
4 rows in set (0.00 sec)
```

where条件相当于编程语言中的boolean值，可使用and表示且、or表示或。

下面的条件是且，查询结果会少一些：

```sql
mysql> select id, name, gpa from stu_info
    -> where gpa>3.5 and id>2
    -> order by gpa desc;
+----+-------+--------+
| id | name  | gpa    |
+----+-------+--------+
|  4 | LiHua | 4.9999 |
|  5 | Amy   |    4.1 |
+----+-------+--------+
2 rows in set (0.00 sec)
```

下面是或，查询结果会多一些：

```sql
mysql> select id, name, gpa from stu_info
    -> where gpa>3.5 or id>2
    -> order by gpa desc;
+----+----------+--------+
| id | name     | gpa    |
+----+----------+--------+
|  4 | LiHua    | 4.9999 |
|  5 | Amy      |    4.1 |
|  2 | Bob      | 3.9047 |
|  1 | XiaoMing | 3.5945 |
|  3 | Steven   | 1.8888 |
+----+----------+--------+
5 rows in set (0.00 sec)
```

### 查询结果去重

select后加上distinct，可以实现查询去重。

这里简单的选择了country一个属性，数据库所有的country属性只有China、USA、UK三种，China是有重复的，使用distinct可以做到查询结果去重：
```sql
mysql> select distinct country from stu_info;
+---------+
| country |
+---------+
| China   |
| USA     |
| UK      |
+---------+
3 rows in set (0.00 sec)
```

### 从表中删除一行

delete可以删一行数据，这里指定的where条件是id=3（别忘了使用引号），可删除id=3的一行数据：
```sql
mysql> delete from stu_info
    -> where id='3';
Query OK, 1 row affected (0.41 sec)
```

```sql
mysql> select * from stu_info;
+----+----------+-----+-------------------+---------+--------+
| id | name     | age | email             | country | gpa    |
+----+----------+-----+-------------------+---------+--------+
|  1 | XiaoMing |  19 | 123456789@qq.com  | China   | 3.5945 |
|  2 | Bob      |  20 | bobbob@gmail.com  | USA     | 3.9047 |
|  4 | LiHua    |  20 | lihua@thu.stu.com | China   | 4.9999 |
|  5 | Amy      |  19 | 20205205@163.com  | China   |    4.1 |
+----+----------+-----+-------------------+---------+--------+
4 rows in set (0.00 sec)
```

### 清空数据表

如果不用where做限定，就会把整个表的数据全删了，但表的结构还保留。<br/>
因为表在建立之初就定好了结构，所以表还在，哪怕是空的，也还保留了结构。<br/>
delete * 是不合语法规范的，至少不合mysql的规范，既不能清表也不能删表：

```sql
mysql> delete * from stu_info;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '* from stu_info' at line 1
```
真想删就别加*：

```sql
mysql> delete from stu_info;
Query OK, 4 rows affected (0.43 sec)
```
删完了可以查全表，真的空了：

```sql
mysql> select * from stu_info;
Empty set (0.00 sec)
```

### 删表

看一眼库中所有的表，果然这个表只是空了，表本身还在：

```sql
mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| stu_info       |
+----------------+
1 row in set (0.00 sec)
```

接下来这个表没啥用了，删掉吧，反正只是一个实验罢了，drop才是正解：

```sql
mysql> drop table stu_info;
Query OK, 0 rows affected (0.53 sec)
```

重新查库中全表：

```sql
mysql> show tables;
Empty set (0.00 sec)
```

确实空了，表删没了。

### 再删库

查一下，六个库：

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| jindu              |
| mysql              |
| performance_schema |
| sys                |
| test               |
+--------------------+
6 rows in set (0.00 sec)
```

使用drop把test库删掉：

```sql
mysql> drop database test;
Query OK, 0 rows affected (0.41 sec)
```

再查查所有的库：

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| jindu              |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```

OK删掉了。

### 建表

打算设计一个学生成绩表，只有语数英三门学科，另有总分。<br/>
学生则有自己的id和name，name不允许为空，id不允许为空且设为唯一的主键。
```sql
mysql> create table stu_grade
    -> (id int primary key not null,
    -> name varchar(10) not null,
    -> chinese int default 0,
    -> math int default 0,
    -> english int default 0,
    -> grade int default 0);
Query OK, 0 rows affected (0.92 sec)
```
我们查询test数据库中的所有数据表，能够找到新创建的表。
```sql
mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| stu_grade      |
+----------------+
1 row in set (0.00 sec)
```
全表查询，表元素集合为空：
```sql
mysql> select * from stu_grade;
Empty set (0.01 sec)
```

### 多行插入

上一次我们选择了一行一行的插入，但这样很麻烦也很低效，所以我们这里选择一次性插入六个数据元组，完成表内容的初始化：
```sql
mysql> insert into stu_grade values
    -> ('1', 'Sam', '120', '145', '145', '410'),
    -> ('2', 'Bob', '88', '98', '95', '278'),
    -> ('3', 'Steven', '130', '108', '135', '373'),
    -> ('4', 'Amy', '120', '120', '120', '360'),
    -> ('5', 'Eleven', '130', '130', '140', '400'),
    -> ('6', 'Miffy', '125', '145', '135', '405');
Query OK, 6 rows affected (0.39 sec)
Records: 6  Duplicates: 0  Warnings: 0
```
全表查询，可以看到我们初始化后的数据：
```sql
mysql> select * from stu_grade;
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  2 | Bob    |      88 |   98 |      95 |   278 |
|  3 | Steven |     130 |  108 |     135 |   373 |
|  4 | Amy    |     120 |  120 |     120 |   360 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
|  6 | Miffy  |     125 |  145 |     135 |   405 |
+----+--------+---------+------+---------+-------+
6 rows in set (0.00 sec)
```

### LIMIT语句

SELECT TOP、LIMIT、ROWNUM 三种SQL语法都能实现查询部分数据，它们使用效果基本相同，但实际上是不同数据库的查询语句。下面以 SELECT TOP 语句为例，先讲解语法本身再分别说明。

SELECT TOP 子句用于规定要返回的记录的数目，对于拥有数千+条记录的大型表来说，是非常有用的。
- SQL Server 支持 SELECT TOP 语法。
  ```sql
  SELECT TOP number|percent column_name(s)
  FROM table_name;
  ```
- MySQL 不支持 SELECT TOP 语句，但支持 LIMIT 语句来选取指定的条数数据。
  ```sql
  SELECT column_name(s)
  FROM table_name
  LIMIT number;
  ```
- Oracle 不支持 SELECT TOP 语句，但支持 ROWNUM 语句来选取指定的条数数据。
  ```sql
  SELECT column_name(s)
  FROM table_name
  WHERE ROWNUM <= number;
  ```

我们使用MySQL的LIMIT语句查询上面的数据表，只查前5条数据：

```sql
mysql> select * from stu_grade limit 5;
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  2 | Bob    |      88 |   98 |      95 |   278 |
|  3 | Steven |     130 |  108 |     135 |   373 |
|  4 | Amy    |     120 |  120 |     120 |   360 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
+----+--------+---------+------+---------+-------+
5 rows in set (0.00 sec)
```

### 创建新表

我们建立一张新的表，用于表示学生的个人信息，为后面的演示做准备。

```sql
mysql> create table stu_info
    -> (id int primary key not null,
    -> name varchar(10) not null,
    -> age int not null,
    -> email varchar(20),
    -> country varchar(10));
Query OK, 0 rows affected (0.70 sec)

mysql> select * from stu_info;
Empty set (0.00 sec)

mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| stu_grade      |
| stu_info       |
+----------------+
2 rows in set (0.00 sec)
```
完成表数据的初始化，这部分的数据有在参考原先的第一张表，做到了学生id、name这两个同名属性二者一一对应（人工完成）：
```sql
mysql> insert into stu_info
    -> values('1', 'Sam', '19', '123456789@qq.com', 'China'),
    -> ('2', 'Bob', '20', 'bobbob@gmail.com', 'USA'),
    -> ('3', 'Steven', '21', 'steven521@gmail.com', 'UK'),
    -> ('4', 'Amy', '19', 'amy20205205@163.com', 'China'),
    -> ('5', 'Eleven', '20', '11more11@163.com', 'China'),
    -> ('6', 'Miffy', '24', 'miffy521@126.com', 'Japan');
Query OK, 6 rows affected (0.43 sec)
Records: 6  Duplicates: 0  Warnings: 0
```
使用全表查询做检验：
```sql
mysql> select * from stu_info;
+----+----------+-----+---------------------+---------+
| id | name     | age | email               | country |
+----+----------+-----+---------------------+---------+
|  1 | Sam      |  19 | 123456789@qq.com    | China   |
|  2 | Bob      |  20 | bobbob@gmail.com    | USA     |
|  3 | Steven   |  21 | steven521@gmail.com | UK      |
|  4 | Amy      |  19 | amy20205205@163.com | China   |
|  5 | Eleven   |  20 | 11more11@163.com    | China   |
|  6 | Miffy    |  24 | miffy521@126.com    | Japan   |
+----+----------+-----+---------------------+---------+
6 rows in set (0.00 sec)
```

### LIKE操作符

LIKE 操作符用于在 WHERE 子句中搜索列中的指定模式。<br/>
如果你学过 Visual Basic 那种语法诡异的语言，应该就了解过LIKE，这个LIKE有一些正则匹配的感觉，使用LIKE的SQL查询被称为“模糊查询”。

基本语法格式：

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name LIKE pattern;
```
所以我们就可以使用LIKE语句对stu_info表中的email属性进行匹配，下面匹配的是含有gmail的串：
```sql
mysql> select * from stu_info
    -> where email like '%gmail%';
+----+--------+-----+---------------------+---------+
| id | name   | age | email               | country |
+----+--------+-----+---------------------+---------+
|  2 | Bob    |  20 | bobbob@gmail.com    | USA     |
|  3 | Steven |  21 | steven521@gmail.com | UK      |
+----+--------+-----+---------------------+---------+
2 rows in set (0.00 sec)
```
有LIKE，自然就有NOT LIKE，下面匹配了不符合“左@右”结构（右可以为空，左必须含有'o'）的email，查询结果为符合要求的整个元组：
```sql
mysql> select * from stu_info
    -> where email not like '%o%@%';
+----+----------+-----+---------------------+---------+
| id | name     | age | email               | country |
+----+----------+-----+---------------------+---------+
|  1 | Sam      |  19 | 123456789@qq.com    | China   |
|  3 | Steven   |  21 | steven521@gmail.com | UK      |
|  4 | Amy      |  19 | amy20205205@163.com | China   |
|  6 | Miffy    |  24 | miffy521@126.com    | Japan   |
+----+----------+-----+---------------------+---------+
4 rows in set (0.00 sec)
```
学过正则表达式的我们都知道，正则都是由通配符的，LIKE自然也有。这里的通配符可用于替代字符串中的任何**其他**字符（注意是其他，如果只是自身需要用'\\'反斜杠进行转义）。

SQL支持如下通配符：

|通配符 |	匹配对象|
|:---:|:---:|
|% 	|0 个或多个字符|
|_ 	|任一单个字符|
|[charlist] 	|指定字符列表中的任一**单个**字符|
|[\^charlist] or [!charlist] 	|**不在**指定字符列表中的任一**单个**字符|

注意`[charlist]`里面不必使用逗号等分隔符分隔，例如`[AbC]`即可。

### IN操作符

我们可以在 WHERE 子句中使用 IN 操作符规定多个值作为选择范围。<br/>
IN操作符后面跟的是一个元组，这个括号并非代表范围，而是一种枚举得到的元组，所有取值都在其中。
如果你学过Java的enum，和Python的tuple，那就不难理解了。

下面的语句查询条件要求学生年龄是19岁或者21岁：

```sql
mysql> select * from stu_info
    -> where age in(19, 21);
+----+----------+-----+---------------------+---------+
| id | name     | age | email               | country |
+----+----------+-----+---------------------+---------+
|  1 | Sam      |  19 | 123456789@qq.com    | China   |
|  3 | Steven   |  21 | steven521@gmail.com | UK      |
|  4 | Amy      |  19 | amy20205205@163.com | China   |
+----+----------+-----+---------------------+---------+
3 rows in set (0.00 sec)
```
既然都说是或了，in括号里面的值也是可以穷举的，那就可以换成or，没毛病：
```sql
mysql> select * from stu_info
    -> where age=19 or age=21;
+----+----------+-----+---------------------+---------+
| id | name     | age | email               | country |
+----+----------+-----+---------------------+---------+
|  1 | Sam      |  19 | 123456789@qq.com    | China   |
|  3 | Steven   |  21 | steven521@gmail.com | UK      |
|  4 | Amy      |  19 | amy20205205@163.com | China   |
+----+----------+-----+---------------------+---------+
3 rows in set (0.00 sec)
```

### BETWEEN操作符

BETWEEN 操作符用于选取介于两个值之间的数据范围内的值，这些值可以是数值、文本或者日期。

注意，特别是对于数值类型，between A and B 结构成立起码要求 A<=B。

基本语法格式：

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

在不同的数据库中，BETWEEN 会选取不同的区间，对区间端点的舍入有差别：
- 在某些数据库中，BETWEEN 选取开区间。
- 在某些数据库中，BETWEEN 选取闭区间。
- 在某些数据库中，BETWEEN 选取[左闭右开区间](https://blog.csdn.net/weixin_43896318/article/details/99618264)。

其实标准SQL要求是开区间，但要记得MySQL是闭区间（两端点都取）。

于是，我们选取年龄在[19, 20]范围内的学生，也就是19 or 20，也就是in (19, 20)：

```sql
mysql> select * from stu_info
    -> where age between 19 and 20;
+----+----------+-----+---------------------+---------+
| id | name     | age | email               | country |
+----+----------+-----+---------------------+---------+
|  1 | Sam      |  19 | 123456789@qq.com    | China   |
|  2 | Bob      |  20 | bobbob@gmail.com    | USA     |
|  4 | Amy      |  19 | amy20205205@163.com | China   |
|  5 | Eleven   |  20 | 11more11@163.com    | China   |
+----+----------+-----+---------------------+---------+
4 rows in set (0.00 sec)
```

BETWEEN可以与IN组合，也支持AND、OR，还可以使用NOT BETWEEN，这里就不举例了。

### AS操作符
学习形式化逻辑查询语句的时候，我们就该知道，更名适用于表、属性等等很多很多东西。

使用AS可以完成更名，AS语句往往能降低编写SQL语句的编写复杂度和冗余度，也增强了可读性（可能吧）。
看下面的SQL语句就能知道，如果写的是stu_info.id, stu_info.name, ... 这样的话，就太麻烦了，更名很方便的。（其实多表联合的时候，如果这个属性名只存在于某张表里，可以不使用'.'）

表级AS语法：
```sql
SELECT column_name(s)
FROM table_name AS alias_name;
```

列级AS语法：

```sql
SELECT column_name AS alias_name
FROM table_name;
```

注意在有些情况下，基于AS使用更名规则生成别名很有用：
- 在查询中涉及超过一个表
- 在查询中使用了函数
- 列名称很长或者可读性差
- 需要把两个列或者多个列结合在一起

下面以一个简单的多表查询做AS操作符的例子：
```sql
mysql> select i.id, i.name, i.email, g.chinese, g.math, g.english, g.grade
    -> from stu_info as i, stu_grade as g
    -> where i.id=g.id and i.name=g.name;
+----+--------+---------------------+---------+------+---------+-------+
| id | name   | email               | chinese | math | english | grade |
+----+--------+---------------------+---------+------+---------+-------+
|  1 | Sam    | 123456789@qq.com    |     120 |  145 |     145 |   410 |
|  2 | Bob    | bobbob@gmail.com    |      88 |   98 |      95 |   278 |
|  3 | Steven | steven521@gmail.com |     130 |  108 |     135 |   373 |
|  4 | Amy    | amy20205205@163.com |     120 |  120 |     120 |   360 |
|  5 | Eleven | 11more11@163.com    |     130 |  130 |     140 |   400 |
|  6 | Miffy  | miffy521@126.com    |     125 |  145 |     135 |   405 |
+----+--------+---------------------+---------+------+---------+-------+
6 rows in set (0.00 sec)
```

### INSERT INTO SELECT语句
INSERT INTO 语句可以从一个表复制信息到另一个表。

标准的SQL语法格式是这样的：

```sql
SELECT *
INTO newtable [IN externaldb]
FROM table1;
```
下面的是有选择性的复制到新表中：
```sql
SELECT column_name(s)
INTO newtable [IN externaldb]
FROM table1;
```

可惜，MySQL 并不支持 SELECT INTO 语句，但支持 INSERT INTO SELECT，这个语法要求插入已存在的表中。

这种语法是这样的：

```sql
INSERT INTO table2
SELECT * FROM table1;
```
下面的是有选择性的复制到已存在的新表中：
```sql
 INSERT INTO table2
(column_name(s))
SELECT column_name(s)
FROM table1;

```

其实MySQL貌似还可以这么搞：

```sql
CREATE TABLE new_table 
AS 
SELECT * FROM original_table
```
为了复制，我们需要创建一个简单的原表：
```sql
mysql> create table stu_best_friend (
    -> id int primary key,
    -> name varchar(10) not null,
    -> friend_name varchar(10) not null);
Query OK, 0 rows affected (1.01 sec)
```
为其赋初值：
```sql
mysql> insert into stu_best_friend values
    -> ('1', 'Sam', 'Tim'),
    -> ('2', 'Bob', 'Sam'),
    -> ('7', 'Kitty', 'Miffy');
Query OK, 3 rows affected (0.42 sec)
Records: 3  Duplicates: 0  Warnings: 0

mysql> insert into stu_best_friend values
    -> ('3', 'Haris', 'Rookie');
Query OK, 1 row affected (0.41 sec)
```
先尝试手动创建表，再复制：
```sql
mysql> create table stu_best_friend_2 (
    -> id int primary key,
    -> name varchar(10) not null,
    -> friend_name varchar(10) not null);
Query OK, 0 rows affected (0.91 sec)

mysql> insert into stu_best_friend_2
    -> select * from stu_best_friend;
Query OK, 4 rows affected (0.44 sec)
Records: 4  Duplicates: 0  Warnings: 0
```
查查看：
```sql
mysql> select * from stu_best_friend_2;
+----+-------+-------------+
| id | name  | friend_name |
+----+-------+-------------+
|  1 | Sam   | Tim         |
|  2 | Bob   | Sam         |
|  3 | Haris | Rookie      |
|  7 | Kitty | Miffy       |
+----+-------+-------------+
4 rows in set (0.00 sec)
```

我们删了这个表，再试试在表不存的时候的样子：

```sql
mysql> drop table stu_best_friend_2;
Query OK, 0 rows affected (0.55 sec)

mysql> insert into stu_best_friend_2
    -> select * from stu_best_friend;
ERROR 1146 (42S02): Table 'test.stu_best_friend_2' doesn't exist
```

确实不行哇！


### JOIN语句

JOIN 语句用于把来自两个或多个表的行结合起来，基于这些表之间的共同字段。

可以使用四种不同的JOIN语句：
- INNER JOIN：如果表中有至少一个匹配，则返回行
- LEFT JOIN：即使右表中没有匹配，也从左表返回所有的行
- RIGHT JOIN：即使左表中没有匹配，也从右表返回所有的行
- FULL JOIN：只要其中一个表中存在匹配，则返回行

得到的结果数：
- INNER JOIN <= MIN(LEFT JOIN, RIGHT JOIN)
- FULL JOIN >= MAX(LEFT JOIN, RIGHT JOIN)
- 当 INNER JOIN < MIN(LEFT JOIN, RIGHT JOIN) 时， FULL JOIN > MAX(LEFT JOIN, RIGHT JOIN)

这里还会涉及一个ON和WHERE的问题（使用JOIN时）：
- ON 条件是在生成临时表时使用的条件，它不管 ON 中的条件是否为真，都会返回左边表中的记录。
- WHERE 条件是在临时表生成好后，再对临时表进行过滤的条件。这时已经没有 LEFT JOIN 的含义（必须返回左边表的记录）了，条件不为真的就全部过滤掉。

#### INNER JOIN
INNER JOIN 是最简单的JOIN语句。其实吧，INNER JOIN 与 JOIN 没啥区别，都是会从多个表中返回满足 JOIN 条件的所有行。

![](../../../images/软件开发/MySQL/基于MySQL的SQL核心语法实战演练/5.png)

标准的SQL语法格式是这样的：
```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name=table2.column_name;
```
或者是：
```sql
SELECT column_name(s)
FROM table1
JOIN table2
ON table1.column_name=table2.column_name;
```

下面是一个不加限制条件的 INNER JOIN：

```sql
mysql> select i.id, i.name, i.email,  bf.id, bf.name, bf.friend_name
    -> from stu_info as i
    -> inner join stu_best_friend as bf;
+----+--------+---------------------+----+-------+-------------+
| id | name   | email               | id | name  | friend_name |
+----+--------+---------------------+----+-------+-------------+
|  1 | Sam    | 123456789@qq.com    |  1 | Sam   | Tim         |
|  1 | Sam    | 123456789@qq.com    |  2 | Bob   | Sam         |
|  1 | Sam    | 123456789@qq.com    |  3 | Haris | Rookie      |
|  1 | Sam    | 123456789@qq.com    |  7 | Kitty | Miffy       |
|  2 | Bob    | bobbob@gmail.com    |  1 | Sam   | Tim         |
|  2 | Bob    | bobbob@gmail.com    |  2 | Bob   | Sam         |
|  2 | Bob    | bobbob@gmail.com    |  3 | Haris | Rookie      |
|  2 | Bob    | bobbob@gmail.com    |  7 | Kitty | Miffy       |
|  3 | Steven | steven521@gmail.com |  1 | Sam   | Tim         |
|  3 | Steven | steven521@gmail.com |  2 | Bob   | Sam         |
|  3 | Steven | steven521@gmail.com |  3 | Haris | Rookie      |
|  3 | Steven | steven521@gmail.com |  7 | Kitty | Miffy       |
|  4 | Amy    | amy20205205@163.com |  1 | Sam   | Tim         |
|  4 | Amy    | amy20205205@163.com |  2 | Bob   | Sam         |
|  4 | Amy    | amy20205205@163.com |  3 | Haris | Rookie      |
|  4 | Amy    | amy20205205@163.com |  7 | Kitty | Miffy       |
|  5 | Eleven | 11more11@163.com    |  1 | Sam   | Tim         |
|  5 | Eleven | 11more11@163.com    |  2 | Bob   | Sam         |
|  5 | Eleven | 11more11@163.com    |  3 | Haris | Rookie      |
|  5 | Eleven | 11more11@163.com    |  7 | Kitty | Miffy       |
|  6 | Miffy  | miffy521@126.com    |  1 | Sam   | Tim         |
|  6 | Miffy  | miffy521@126.com    |  2 | Bob   | Sam         |
|  6 | Miffy  | miffy521@126.com    |  3 | Haris | Rookie      |
|  6 | Miffy  | miffy521@126.com    |  7 | Kitty | Miffy       |
+----+--------+---------------------+----+-------+-------------+
24 rows in set (0.00 sec)
```
使用ON条件加以约束：
```sql
mysql> select i.id, i.name, i.email,  bf.id, bf.name, bf.friend_name
    -> from stu_info as i
    -> inner join stu_best_friend as bf
    -> on i.id=bf.id and i.name=bf.name;
+----+------+------------------+----+------+-------------+
| id | name | email            | id | name | friend_name |
+----+------+------------------+----+------+-------------+
|  1 | Sam  | 123456789@qq.com |  1 | Sam  | Tim         |
|  2 | Bob  | bobbob@gmail.com |  2 | Bob  | Sam         |
+----+------+------------------+----+------+-------------+
2 rows in set (0.00 sec)
```

#### LEFT JOIN
LEFT JOIN 语句会从左表（table1）返回所有的行，即使右表（table2）中没有匹配。如果右表中没有匹配，则结果为 NULL。

![](../../../images/软件开发/MySQL/基于MySQL的SQL核心语法实战演练/6.png)

标准的SQL语法格式是这样的：
```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name=table2.column_name;
```
或者是：
```sql
SELECT column_name(s)
FROM table1
LEFT OUTER JOIN table2
ON table1.column_name=table2.column_name;
```
我们改做左合并查询：
```sql
mysql> select i.id, i.name, i.email,  bf.id, bf.name, bf.friend_name
    -> from stu_info as i
    -> left outer join stu_best_friend as bf
    -> on i.id=bf.id and i.name=bf.name;
+----+--------+---------------------+------+------+-------------+
| id | name   | email               | id   | name | friend_name |
+----+--------+---------------------+------+------+-------------+
|  1 | Sam    | 123456789@qq.com    |    1 | Sam  | Tim         |
|  2 | Bob    | bobbob@gmail.com    |    2 | Bob  | Sam         |
|  3 | Steven | steven521@gmail.com | NULL | NULL | NULL        |
|  4 | Amy    | amy20205205@163.com | NULL | NULL | NULL        |
|  5 | Eleven | 11more11@163.com    | NULL | NULL | NULL        |
|  6 | Miffy  | miffy521@126.com    | NULL | NULL | NULL        |
+----+--------+---------------------+------+------+-------------+
6 rows in set (0.00 sec)
```
#### RIGHT JOIN

RIGHT JOIN 语句从右表（table2）返回所有的行，即使左表（table1）中没有匹配。如果左表中没有匹配，则结果为 NULL。

![](../../../images/软件开发/MySQL/基于MySQL的SQL核心语法实战演练/7.png)

标准的SQL语法格式是这样的：
```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name=table2.column_name;
```
或者是：
```sql
SELECT column_name(s)
FROM table1
RIGHT OUTER JOIN table2
ON table1.column_name=table2.column_name;
```
我们改做右合并查询：
```sql
mysql> select i.id, i.name, i.email,  bf.id, bf.name, bf.friend_name
    -> from stu_info as i
    -> right outer join stu_best_friend as bf
    -> on i.id=bf.id and i.name=bf.name;
+------+------+------------------+----+-------+-------------+
| id   | name | email            | id | name  | friend_name |
+------+------+------------------+----+-------+-------------+
|    1 | Sam  | 123456789@qq.com |  1 | Sam   | Tim         |
|    2 | Bob  | bobbob@gmail.com |  2 | Bob   | Sam         |
| NULL | NULL | NULL             |  3 | Haris | Rookie      |
| NULL | NULL | NULL             |  7 | Kitty | Miffy       |
+------+------+------------------+----+-------+-------------+
4 rows in set (0.00 sec)
```
#### FULL JOIN

FULL OUTER JOIN 语句只要左表（table1）和右表（table2）其中一个表中存在匹配，则返回行.

FULL OUTER JOIN 语句相当于结合了 LEFT JOIN 和 RIGHT JOIN 的结果，也相当于LEFT OUTER JOIN +  UNION + RIGHT OUTER JOIN。

虽说Oracle支持，但MySQL是不支持FULL OUTER JOIN的，但仍然可以同过LEFT OUTER JOIN +  UNION + RIGHT OUTER JOIN实现。

![](../../../images/软件开发/MySQL/基于MySQL的SQL核心语法实战演练/8.png)

标准的SQL语法格式是这样的：
```sql
SELECT column_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.column_name=table2.column_name;
```

我们使用MySQL尝试使用FULL OUTER JOIN，失败：
```sql
mysql> select i.id, i.name, i.email,  bf.id, bf.name, bf.friend_name
    -> from stu_info as i
    -> full outer join stu_best_friend as bf
    -> on i.id=bf.id and i.name=bf.name;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'full outer join stu_best_friend as bf
on i.id=bf.id and i.name=bf.name' at line 3
```
### UNION操作符
UNION 操作符用于合并两个或多个 SELECT 语句的结果集。

注意，UNION 内部的每个 SELECT 语句必须拥有相同数量的列，这些列也必须拥有相似的数据类型，对应多个SELECT语句的列顺序要相同（不能有任何不同）。

下面我们就做一个测试，这个语句查了语文过125或者数学过130的学生（其实也就相当于用了个OR）：

```sql
mysql> select * from stu_grade
    -> where chinese > 125
    -> union
    -> select * from stu_grade
    -> where math > 130;
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  3 | Steven |     130 |  108 |     135 |   373 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  6 | Miffy  |     125 |  145 |     135 |   405 |
+----+--------+---------+------+---------+-------+
4 rows in set (0.35 sec)
```

不难发现，上面数据顺序都乱了，我们可能希望它是有序的。<br/>
而使用UNION的查询结果自然可以使用ORDER BY进行排序了，只是有些问题要注意：
- 只有在所有查询结果都合并在一起之后，才能使用一次ORDER BY。不能使用两次，必须在最后用。
- 使用ORDER BY排序时，使用别名会很方便，但必须要使得两个结果的别名保持一致。
- 不一定非要用别名，其实甚至还使用列号。

下面就基于grade属性给一个降序排列：
```sql
mysql> select * from stu_grade
    -> where chinese > 125
    -> union
    -> select * from stu_grade
    -> where math > 130
    -> order by grade desc;
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  6 | Miffy  |     125 |  145 |     135 |   405 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
|  3 | Steven |     130 |  108 |     135 |   373 |
+----+--------+---------+------+---------+-------+
4 rows in set (0.00 sec)
```
### 约束相关
约束用于规定表中的数据规则，违反约束的增删改查不能成立。

SQL约束主可能在两种情况下被加入：
- 建表时随着CREATE TABLE语句被附加（可以看我前面建表用的primary key、not null这些，其实就是建表加入的约束）。
- 建表之后随时使用ALTER TABLE语句修改表的结构（后面专门会演示这个）。

SQL约束的去除你可以随时进行，要使用ALTER TABLE语句+DROP语句。

SQL中主要的六种约束：
- NOT NULL：指示某列不能存储 NULL 值（挺好使的，我前面也用过）。
- UNIQUE：保证某列的每行必须有唯一的值，不能重复，一般适用于ID这种（不过ID很可能是主键，就不必UNIQUE）。
- PRIMARY KEY：指定主键，唯一性，不能指定两个。这个玩意相当于NOT NULL + UNIQUE。它能确保某列（或两个列多个列的结合）有唯一标识，有助于更容易更快速地找到表中的一个特定的记录。不过要记得这个和索引不一样啊！
- FOREIGN KEY：是外键，保证一个表中的数据匹配另一个表中的值的参照完整性。
- CHECK：保证列中的值符合指定的条件（这个条件就是相当于布尔表达式）。
- DEFAULT：规定没有给列赋值时的默认值（比如0啊）。

标准的SQL语法格式是这样的：
```sql
CREATE TABLE table_name
(
column_name1 data_type(size) constraint_name,
column_name2 data_type(size) constraint_name,
column_name3 data_type(size) constraint_name,
....
);
```

我们由于事先没指定外键，所以为stu_grade的id属性指定一个外键，参照stu_info的id：
```sql
mysql> alter table stu_grade
    -> add foreign key(id)
    -> references stu_info(id);
Query OK, 6 rows affected (1.28 sec)
Records: 6  Duplicates: 0  Warnings: 0
```
去除刚才加的外键，我们发现不能使用id删：
```sql
mysql> alter table stu_grade
    -> drop foreign key id;
ERROR 1091 (42000): Can't DROP 'id'; check that column/key exists
```
这可怎么办呢？<br/>
答案是：查一下表的结构：
```sql
mysql> show create table stu_grade;
+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                                                                                                                                                                                 |
+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_grade | CREATE TABLE `stu_grade` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `chinese` int(11) DEFAULT '0',
  `math` int(11) DEFAULT '0',
  `english` int(11) DEFAULT '0',
  `grade` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `stu_grade_ibfk_1` FOREIGN KEY (`id`) REFERENCES `stu_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
看到`CONSTRAINT \`stu_grade_ibfk_1\` FOREIGN KEY (\`id\`) REFERENCES \`stu_info\` (\`id\`)`了吗？<br/>
我们固然可以不指定标识的值，但MySQL会自动地帮我们定一个值，需要用它来删除：
```sql
mysql> alter table stu_grade
    -> drop foreign key stu_grade_ibfk_1;
Query OK, 0 rows affected (0.49 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
我们不妨再查一下：
```sql
mysql> show create table stu_grade;
+-----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                                                                                                |
+-----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_grade | CREATE TABLE `stu_grade` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `chinese` int(11) DEFAULT '0',
  `math` int(11) DEFAULT '0',
  `english` int(11) DEFAULT '0',
  `grade` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
哦，这个外键约束没啦！

接下来我们要尝试自己顶一个约束名称，并尝试一下传说中的CHECK约束：

```sql
mysql> alter table stu_grade
    -> add constraint cc check(id>0);
Query OK, 6 rows affected (1.14 sec)
Records: 6  Duplicates: 0  Warnings: 0
```
查查表结构：
```sql
mysql> show create table stu_grade;
+-----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                                                                                                                                      |
+-----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_grade | CREATE TABLE `stu_grade` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `chinese` int(11) DEFAULT '0',
  `math` int(11) DEFAULT '0',
  `english` int(11) DEFAULT '0',
  `grade` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `cc` CHECK ((`id` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
顺利加入！

再删除：
```sql
mysql> alter table stu_grade
    -> drop check cc;
Query OK, 0 rows affected (0.43 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
删除后，查询表结构确认：

```sql
mysql> show create table stu_grade;
+-----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                                                                                                |
+-----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_grade | CREATE TABLE `stu_grade` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `chinese` int(11) DEFAULT '0',
  `math` int(11) DEFAULT '0',
  `english` int(11) DEFAULT '0',
  `grade` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

### CREATE INDEX语句

CREATE INDEX语句就是用来创建索引的！<br/>
在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据，不需要扫描全表（注意select*是经典的全表扫描，在数据量大的时候很慢）。<br/>
MySQL的索引基于B+树实现，这些我们在这里就先不细说了。

标准SQL语法允许创建两种索引：
- 简单的、允许重复值的索引：
  ```sql
  CREATE INDEX index_name
  ON table_name (column_name)
  ```
- 唯一索引
  ```sql
  CREATE UNIQUE INDEX index_name
  ON table_name (column_name)
  ```


我们做一下建立索引的简单尝试：
```sql
mysql> create unique index index_id
    -> on stu_info(id);
Query OK, 0 rows affected (0.70 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
也可以使用DROP语句删除索引：
```sql
mysql> drop index index_id on stu_info;
Query OK, 0 rows affected (0.61 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

### 熟悉上述出现过的表

这篇文章只用这两张表，建议熟悉一下。
```sql
mysql> select * from stu_grade;
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  2 | Bob    |      88 |   98 |      95 |   278 |
|  3 | Steven |     130 |  108 |     135 |   373 |
|  4 | Amy    |     120 |  120 |     120 |   360 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
|  6 | Miffy  |     125 |  145 |     135 |   405 |
|  7 | Smith  |     100 |  100 |     100 |   300 |
+----+--------+---------+------+---------+-------+
7 rows in set (0.00 sec)
```
```sql
mysql> select * from stu_info;
+----+--------+-----+---------------------+---------------------+---------+
| id | name   | age | birthday            | email               | country |
+----+--------+-----+---------------------+---------------------+---------+
|  1 | Sam    |  21 | 1999-05-04 08:00:00 | 123456789@qq.com    | China   |
|  2 | Bob    |  35 | 1985-12-03 09:34:20 | bobbob@gmail.com    | USA     |
|  3 | Steven |  25 | 1995-03-03 06:17:30 | steven521@gmail.com | UK      |
|  4 | Amy    |  20 | 2000-01-01 13:00:00 | amy20205205@163.com | China   |
|  5 | Eleven |  19 | 2001-07-02 21:30:00 | 11more11@163.com    | China   |
|  6 | Miffy  |  20 | 2000-08-10 12:00:00 | miffy521@126.com    | Japan   |
+----+--------+-----+---------------------+---------------------+---------+
6 rows in set (0.00 sec)
```

### EXISTS 运算符

EXISTS 运算符用于判断查询子句是否有记录，如果有一条或多条记录存在返回 True，否则返回 False。

标准SQL语法：
```sql
SELECT column_name(s)
FROM table_name
WHERE EXISTS
(SELECT column_name FROM table_name WHERE condition);
```

我们据此查询一下，要求是当语文成绩存在140+的学生时，执行全表查询：
```sql
mysql> select *
    -> from stu_grade
    -> where exists(
    -> select id from stu_grade
    -> where chinese>140);
Empty set (0.00 sec)
```
由于语文成绩没有140+的，所以查询结果为空集。

我们再查询一下，要求是当语文成绩存在100-的学生时，执行全表查询：
```sql
mysql> select *
    -> from stu_grade
    -> where exists(
    -> select id from stu_grade
    -> where chinese<100);
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  2 | Bob    |      88 |   98 |      95 |   278 |
|  3 | Steven |     130 |  108 |     135 |   373 |
|  4 | Amy    |     120 |  120 |     120 |   360 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
|  6 | Miffy  |     125 |  145 |     135 |   405 |
|  7 | Smith  |     100 |  100 |     100 |   300 |
+----+--------+---------+------+---------+-------+
7 rows in set (0.00 sec)
```
全部数据都被查出来了。

### Aggregate Functions

重要的聚集函数：

|函数|功能|MySQL是否直接支持|
|:---:|:---:|:---:|
|AVG()|返回平均值| √
|COUNT()|返回行数|√
|FIRST()|返回第一个记录的值|×
|LAST()|返回最后一个记录的值|×
|MAX()|返回最大值|√
|MIN()|返回最小值|√
|SUM()|返回总和|√

想给大家纠正的一个错误认识。<br/>
可能有的人会认为，我们可以指定grade属性的值是SUM(chinese, math, english)，这样可太不对了。<br/>
首先，从SUM()的参数来看，应该是单参数，绝不是多参数。<br/>
当然这只是小问题，大问题是：这些聚集函数作用的是一个列而不是一行。

认识清楚了以后，想来大家对聚集函数应该有新的认识了吧。没错，聚的就是该字段，聚的就是选中的所有。

#### AVG()

下面的SQL语句用于测试AVG()，分别取chinese、math、english、grade的平均值。

别在意那个浮点对不上（追求高精的话要小心这里，可能是个Bug），浮点误差本就存在。

```sql
mysql> select avg(chinese) as chinese_avg, avg(math) as math_avg, avg(english) as english_avg, avg(grade) as grade_avg
    -> from stu_grade;
+-------------+----------+-------------+-----------+
| chinese_avg | math_avg | english_avg | grade_avg |
+-------------+----------+-------------+-----------+
|    116.1429 | 120.8571 |    124.2857 |  360.8571 |
+-------------+----------+-------------+-----------+
1 row in set (0.00 sec)
```

下面的SQL语句实现了查询所有语文分数高于平均分的学生成绩，注意是怎么写的：
```sql
mysql> select * from stu_grade
    -> where chinese>(select avg(chinese) from stu_grade);
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  3 | Steven |     130 |  108 |     135 |   373 |
|  4 | Amy    |     120 |  120 |     120 |   360 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
|  6 | Miffy  |     125 |  145 |     135 |   405 |
+----+--------+---------+------+---------+-------+
5 rows in set (0.00 sec)
```
我们让这个SQL语句再复杂一些吧，查询语文、英语高于平均成绩但数学低于平均成绩的学生成绩：
```sql
mysql> select * from stu_grade
    -> where chinese>(select avg(chinese) from stu_grade)
    -> and math<(select avg(math) from stu_grade)
    -> and english>(select avg(english) from stu_grade);
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  3 | Steven |     130 |  108 |     135 |   373 |
+----+--------+---------+------+---------+-------+
1 row in set (0.00 sec)
```

#### COUNT()

下面的SQL语句使用COUNT(*)完成了表的行计数：
```sql
mysql> select count(*) as count from stu_grade;
+-------+
| count |
+-------+
|     7 |
+-------+
1 row in set (0.00 sec)
```
下面的SQL语句使用COUNT()和DISTINCT统计了所有学生来自多少个国家：
```sql
mysql> select count(distinct country) as count
    -> from stu_info;
+-------+
| count |
+-------+
|     4 |
+-------+
1 row in set (0.36 sec)
```

#### FIRST()

怎么理解这个“第一个”呢？其实就是最小的。<br/>
神奇的是Oracle、SQL Server、MySQL都不支持，但也都能等价替换。

MySQL不支持这东西，但可以等价替换一下：
```sql
SELECT column_name FROM table_name
ORDER BY column_name ASC
LIMIT 1;
```

使用ORDER BY+LIMIT确实也能做到。

下面的SQL语句，就查询了语文成绩最低的学生成绩，相当于FIRST()：
```sql
mysql> select * from stu_grade
    -> order by chinese
    -> limit 1;
+----+-------+---------+------+---------+-------+
| id | name  | chinese | math | english | grade |
+----+-------+---------+------+---------+-------+
|  2 | Bob   |      88 |   98 |      95 |   278 |
+----+-------+---------+------+---------+-------+
3 rows in set (0.00 sec)
```

#### LAST()

怎么理解这个“最后一个”呢？其实就是最大的。<br/>
神奇的是Oracle、SQL Server、MySQL都不支持，但也都能等价替换。

MySQL不支持这东西，但可以等价替换一下：
```sql
SELECT column_name FROM table_name
ORDER BY column_name DESC
LIMIT 1;
```

使用ORDER BY+DESC+LIMIT确实也能做到。

下面的SQL语句，就查询了总成绩最高的学生成绩，相当于LAST()：

```sql
mysql> select * from stu_grade
    -> order by grade desc
    -> limit 1;
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
+----+--------+---------+------+---------+-------+
3 rows in set (0.00 sec)
```

#### MAX()

没什么可说的，这种东西大家肯定都很熟悉了。

下面的SQL语句，查询了所有学生的数学最高分：
```sql
mysql> select max(math) as math_top from stu_grade;
+----------+
| math_top |
+----------+
|      145 |
+----------+
1 row in set (0.00 sec)
```

#### MIN()

没什么可说的，这种东西大家肯定都很熟悉了。

下面的SQL语句，查询了所有学生的英语最低分：
```sql
mysql> select min(english) as english_bottom from stu_grade;
+----------------+
| english_bottom |
+----------------+
|             95 |
+----------------+
1 row in set (0.00 sec)
```

#### SUM()

没什么可说的，这种东西大家肯定都很熟悉了。

下面的SQL语句，查询了所有学生总成绩之和：
```sql
mysql> select sum(grade) as grade_sum from stu_grade;
+-----------+
| grade_sum |
+-----------+
|      2526 |
+-----------+
1 row in set (0.00 sec)
```

### 创建新表

在完成前面对聚集函数的学习之后，我们可以学习GROUP BY和HAVING。<br/>
但现有的表不适合做测试，所以新建一个表：
```sql
mysql> create table stu_login (
    -> id int not null  primary key auto_increment,
    -> stu_id int not null,
    -> web_url varchar(30) not null,
    -> count int not null default 0);
Query OK, 0 rows affected (0.72 sec)
```
初始化数据：
```sql
mysql> insert into stu_login(stu_id, web_url, count) values
    -> ('1', 'www.baidu.com', '25'),
    -> ('2', 'www.baidu.com', '100'),
    -> ('3', 'www.csdn.net', '40'),
    -> ('4', 'www.luogu.org.cn', '33'),
    -> ('1', 'www.baidu.com', '1'),
    -> ('2', 'www.csdn.net', '9'),
    -> ('6', 'www.jslint.com', '14'),
    -> ('3', 'www.baidu.com', '3');
Query OK, 8 rows affected (0.45 sec)
Records: 8  Duplicates: 0  Warnings: 0
```
全表查询验证：
```sql
mysql> select * from stu_login;
+----+--------+------------------+-------+
| id | stu_id | web_url          | count |
+----+--------+------------------+-------+
|  1 |      1 | www.baidu.com    |    25 |
|  2 |      2 | www.baidu.com    |   100 |
|  3 |      3 | www.csdn.net     |    40 |
|  4 |      4 | www.luogu.org.cn |    33 |
|  5 |      1 | www.baidu.com    |     1 |
|  6 |      2 | www.csdn.net     |     9 |
|  7 |      6 | www.jslint.com   |    14 |
|  8 |      3 | www.baidu.com    |     3 |
+----+--------+------------------+-------+
8 rows in set (0.00 sec)
```
URL去重查看：
```sql
mysql> select distinct web_url from stu_login;
+------------------+
| web_url          |
+------------------+
| www.baidu.com    |
| www.csdn.net     |
| www.luogu.org.cn |
| www.jslint.com   |
+------------------+
4 rows in set (0.00 sec)
```

准备完成，继续学习吧！

### GROUP BY语句

GROUP BY 语句用于结合聚合函数，根据一个或多个列对结果集进行分组。

标准SQL语法：
```sql
SELECT column_name, aggregate_function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name; 
```
下面的SQL语句聚合了不同URL的访问总量，是去重后的：
```sql
mysql> select web_url, sum(count) as num
    -> from stu_login
    -> group by web_url;
+------------------+------+
| web_url          | num  |
+------------------+------+
| www.baidu.com    |  129 |
| www.csdn.net     |   49 |
| www.luogu.org.cn |   33 |
| www.jslint.com   |   14 |
+------------------+------+
4 rows in set (0.00 sec)
```

### HAVING语句

WHERE 关键字无法与聚合函数一起使用，而我们可能需要筛选分组后的各组数据，所以需要 HAVING 语句。

标准SQL语法：
```sql
SELECT column_name, aggregate_function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name
HAVING aggregate_function(column_name) operator value;
```
下面的语句在GROUP BY部分的样例语句的基础上加了HAVING，筛选了总访问量大于35的网页URL：
```sql
mysql> select web_url, sum(count) as num
    -> from stu_login
    -> group by web_url
    -> having sum(count)>35;
+---------------+------+
| web_url       | num  |
+---------------+------+
| www.baidu.com |  129 |
| www.csdn.net  |   49 |
+---------------+------+
2 rows in set (0.00 sec)
```

### Scalar Functions

|函数|功能|MySQL是否直接支持|
|:---:|:---:|:---:|
|UCASE()|将某个字段转换为大写|√|
|LCASE()|将某个字段转换为小写|√|
|MID()|从某个文本字段提取字符|√|
|LEN()|返回某个文本字段的长度|√|
|ROUND()|对某个数值字段进行指定小数位数的四舍五入|√

#### UCASE()

就相当于toUpperCase()。

下面的SQL语句查询了所有学生姓名的大写表示：
```sql
mysql> select ucase(name) as upper_name
    -> from stu_info;
+------------+
| upper_name |
+------------+
| SAM        |
| BOB        |
| STEVEN     |
| AMY        |
| ELEVEN     |
| MIFFY      |
+------------+
6 rows in set (0.36 sec)
```

#### LCASE()

就相当于toLowerCase()。

下面的SQL语句查询了所有学生姓名的小写表示：
```sql
mysql> select lcase(name) as upper_name
    -> from stu_info;
+------------+
| upper_name |
+------------+
| sam        |
| bob        |
| steven     |
| amy        |
| eleven     |
| miffy      |
+------------+
6 rows in set (0.34 sec)
```

#### MID()

相当于SubString()，好像是MySQL才支持的吧。

MySQL的MID()语法：
```sql
SELECT MID(column_name,start[,length]) FROM table_name;
```
前两个参数是必选的，最后一个可选。<br/>
注意：**start参数是从1开始的，不是0！！！** 这个一定要清楚！<br/>
另外，如果不加length参数的话，就默认从start开始读到末尾。

下面的语句查询了所有学生邮箱的前10位（其实没啥实际意义）：
```sql
mysql> select mid(email, 1, 10) as email_cut
    -> from stu_info;
+------------+
| email_cut  |
+------------+
| 123456789@ |
| bobbob@gma |
| steven521@ |
| amy2020520 |
| 11more11@1 |
| miffy521@1 |
+------------+
6 rows in set (0.00 sec)
```

#### LEN()

就相当于length()，查查串的实际长度。

下面的SQL语句查询了所有学生的邮箱URL长度：
```sql
mysql> select length(email) as email_url_len
    -> from stu_info;
+---------------+
| email_url_len |
+---------------+
|            16 |
|            16 |
|            19 |
|            19 |
|            16 |
|            16 |
+---------------+
6 rows in set (0.00 sec)
```

#### ROUND()

四舍五入啊，默认AVG()是四位，我们这里把AVG()结果取到四舍五入两位：
```sql
mysql> select round(avg(grade), 2) as grade
    -> from stu_grade;
+--------+
| grade  |
+--------+
| 360.86 |
+--------+
1 row in set (0.01 sec)
```

### Date Functions

前面提过了。

### 全表查询

先查查stu_grade这个表有什么原始数据：
```sql
mysql> select * from stu_grade;
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  2 | Bob    |      88 |   98 |      95 |   278 |
|  3 | Steven |     130 |  108 |     135 |   373 |
|  4 | Amy    |     120 |  120 |     120 |   360 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
|  6 | Miffy  |     125 |  145 |     135 |   405 |
+----+--------+---------+------+---------+-------+
6 rows in set (0.00 sec)
```

### 全表结构查询

然后还需要查查表的结构，知道有哪些约束、属性、类型等等：
```sql
mysql> show create table stu_grade;
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                                                                                                 |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_grade | CREATE TABLE `stu_grade` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `chinese` int(11) DEFAULT '0',
  `math` int(11) DEFAULT '0',
  `english` int(11) DEFAULT '0',
  `grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

### ALTER TABLE 语句

ALTER TABLE 语句用于在**已有**的表中添加、删除或修改列。

“增”的标准SQL语法：
```sql
ALTER TABLE table_name
ADD column_name datatype
```
“删”的标准SQL语法：
```sql
ALTER TABLE table_name
DROP COLUMN column_name
```
而我们使用MySQL更改表中列的数据类型，应该这么写（Oracle也是，但SQL Server不同）：
```sql
ALTER TABLE table_name
MODIFY COLUMN column_name datatype
```
所以，我们试图把int类型的成绩属性换成varchar(10)类型的：
```sql
mysql> alter table stu_grade
    -> modify column grade varchar(10);
Query OK, 6 rows affected (1.76 sec)
Records: 6  Duplicates: 0  Warnings: 0
```
查看一下表的结构，发现grade属性变成了varchar(10)类型的：
```sql
mysql> show create table stu_grade;
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                                                                                                     |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_grade | CREATE TABLE `stu_grade` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `chinese` int(11) DEFAULT '0',
  `math` int(11) DEFAULT '0',
  `english` int(11) DEFAULT '0',
  `grade` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
既然改了，那我们总要改回来吧，于是同理可以换回来：
```sql
mysql> alter table stu_grade
    -> modify column grade int;
Query OK, 6 rows affected (1.20 sec)
Records: 6  Duplicates: 0  Warnings: 0
```
查看一下表的结构，发现grade属性恢复了int类型的：
```sql
mysql> show create table stu_grade;
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                                                                                                 |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_grade | CREATE TABLE `stu_grade` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `chinese` int(11) DEFAULT '0',
  `math` int(11) DEFAULT '0',
  `english` int(11) DEFAULT '0',
  `grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

### AUTO INCREMENT字段

AUTO_INCREMENT 会在新记录插入表中时生成一个唯一的数字，而不必非要自己指定。<br/>
AUTO_INCREMENT 字段在不同数据库中是不同的，我们这里只说MySQL。<br/>
在测试这个的时候，由于表结构已经存在，所以没玩明白，犯了不少错误。错误在此不一一列举了，防止误导大家。<br/>
我们可以直接使用 ALTER TABLE 重新指定需要改的列的全部约束（除了主键约束，你要是试图再补一下主键约束是会报错的呀）（另强调，默认的情况就是很简单的当前+1）：

```sql
mysql> alter table stu_grade change id id int not null auto_increment;
Query OK, 6 rows affected (1.00 sec)
Records: 6  Duplicates: 0  Warnings: 0
```
既然这玩意已经存在了，那我们不如插一条数据试试，只需要不指定id即可，但其他的我也不希望是NULL或者不能为NULL：
```sql
mysql> insert into stu_grade (name, chinese, math, english, grade) values
    -> ('Smith', '100', '100', '100', '300');
Query OK, 1 row affected (0.18 sec)
```
查表看看：
```sql
mysql> select * from stu_grade;
+----+--------+---------+------+---------+-------+
| id | name   | chinese | math | english | grade |
+----+--------+---------+------+---------+-------+
|  1 | Sam    |     120 |  145 |     145 |   410 |
|  2 | Bob    |      88 |   98 |      95 |   278 |
|  3 | Steven |     130 |  108 |     135 |   373 |
|  4 | Amy    |     120 |  120 |     120 |   360 |
|  5 | Eleven |     130 |  130 |     140 |   400 |
|  6 | Miffy  |     125 |  145 |     135 |   405 |
|  7 | Smith  |     100 |  100 |     100 |   300 |
+----+--------+---------+------+---------+-------+
7 rows in set (0.00 sec)
```
成功啦！

### 视图相关

这里只说一些最基本的视图相关，视图算得上是中级的SQL语法了，后面会再总结的。

创建视图的标准SQL语句：
```sql
CREATE VIEW view_name AS
SELECT column_name(s)
FROM table_name
WHERE condition
```
更新视图的标准SQL语句：
```sql
CREATE OR REPLACE VIEW view_name AS
SELECT column_name(s)
FROM table_name
WHERE condition
```
删除视图的标准SQL语句：
```sql
DROP VIEW view_name
```
那我们就自己创建一个视图看看，属性选id、name、grade：
```sql
mysql> create view grade_view as
    -> select id, name, grade
    -> from stu_grade;
Query OK, 0 rows affected (0.47 sec)
```
视图全图查询：
```sql
mysql> select * from grade_view;
+----+--------+-------+
| id | name   | grade |
+----+--------+-------+
|  1 | Sam    |   410 |
|  2 | Bob    |   278 |
|  3 | Steven |   373 |
|  4 | Amy    |   360 |
|  5 | Eleven |   400 |
|  6 | Miffy  |   405 |
|  7 | Smith  |   300 |
+----+--------+-------+
7 rows in set (0.01 sec)
```
删除视图：
```sql
mysql> drop view grade_view;
Query OK, 0 rows affected (0.45 sec)
```

这些操作很low的，以后再说高级的。

### NULL相关

NULL 值代表遗漏的未知数据。<br/>
说道这个NULL，不知你可想到那位（java.lang.NullPointerException），哈哈哈哈~<br/>
如果指定 NOT NULL约束，就不允许该属性出现未知空值；否则默认可以为空且不插入就为NULL。<br/>
也就是说，如果表中的某个列是可选且可以为NULL的，那么我们可以在不向该列添加值的情况下插入新记录或更新已有的记录。这意味着该字段将以 NULL 值保存。

关于NULL，要知道几件事：
- NULL 用作未知的或不适用的值的占位符。
- NULL 和 0 不等价，无法比较。
- NULL 值的处理方式与其他值不同。
- 比较重要且不该为空的数据建议使用NOT NULL约束。
- 判断NULL不需要引号，也不应该使用等号，而是应该使用 IS NULL or IS NOT NULL。

#### 表的NULL预处理

我们看一下都有什么表：
```sql
mysql> show tables;
+-----------------+
| Tables_in_test  |
+-----------------+
| stu_best_friend |
| stu_grade       |
| stu_info        |
+-----------------+
3 rows in set (0.01 sec)
```
对，看一下stu_best_friend这个表的结构：
```sql
mysql> show create table stu_best_friend;
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table           | Create Table                                                                                                                                                                             |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_best_friend | CREATE TABLE `stu_best_friend` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `friend_name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
然后就可以调整允许属性为NULL啦（撤销NOT NULL约束）：
```sql
mysql> alter table stu_best_friend
    -> modify friend_name varchar(10) null;
Query OK, 0 rows affected (1.32 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
重新查看表结构，发现修改成功：
```sql
mysql> show create table stu_best_friend;
+-----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table           | Create Table                                                                                                                                                                                 |
+-----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_best_friend | CREATE TABLE `stu_best_friend` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `friend_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

#### 插入NULL数据

我们先看看表里原来有什么数据：
```sql
mysql> select * from stu_best_friend;
+----+-------+-------------+
| id | name  | friend_name |
+----+-------+-------------+
|  1 | Sam   | Tim         |
|  2 | Bob   | Sam         |
|  3 | Haris | Rookie      |
|  7 | Kitty | Miffy       |
+----+-------+-------------+
4 rows in set (0.00 sec)
```
然后就插入一条记录，friend_name属性不赋值，默认为NULL：
```sql
mysql> insert into stu_best_friend (id, name) values
    -> ('8', 'Green');
Query OK, 1 row affected (0.42 sec)
```
查一下：
```sql
mysql> select * from stu_best_friend;
+----+-------+-------------+
| id | name  | friend_name |
+----+-------+-------------+
|  1 | Sam   | Tim         |
|  2 | Bob   | Sam         |
|  3 | Haris | Rookie      |
|  7 | Kitty | Miffy       |
|  8 | Green | NULL        |
+----+-------+-------------+
5 rows in set (0.00 sec)
```
成功的话，就多插入几条记录吧：
```sql
mysql> insert into stu_best_friend (id, name) values
    -> ('9', 'Oriana'),
    -> ('10', 'JiNitaimei');
Query OK, 2 rows affected (0.40 sec)
Records: 2  Duplicates: 0  Warnings: 0
```
验证一下：
```sql
mysql> select * from stu_best_friend;
+----+------------+-------------+
| id | name       | friend_name |
+----+------------+-------------+
|  1 | Sam        | Tim         |
|  2 | Bob        | Sam         |
|  3 | Haris      | Rookie      |
|  7 | Kitty      | Miffy       |
|  8 | Green      | NULL        |
|  9 | Oriana     | NULL        |
| 10 | JiNitaimei | NULL        |
+----+------------+-------------+
7 rows in set (0.00 sec)
```

#### 使用IS NULL筛选NULL

我们在WHERE子句中使用IS NULL判断friend_name空的人：
```sql
mysql> select * from stu_best_friend
    -> where friend_name is null;
+----+------------+-------------+
| id | name       | friend_name |
+----+------------+-------------+
|  8 | Green      | NULL        |
|  9 | Oriana     | NULL        |
| 10 | JiNitaimei | NULL        |
+----+------------+-------------+
3 rows in set (0.00 sec)
```
反过来，也可以使用IS NOT NULL筛选friend_name非空的人：
```sql
mysql> select * from stu_best_friend
    -> where friend_name is not null;
+----+-------+-------------+
| id | name  | friend_name |
+----+-------+-------------+
|  1 | Sam   | Tim         |
|  2 | Bob   | Sam         |
|  3 | Haris | Rookie      |
|  7 | Kitty | Miffy       |
+----+-------+-------------+
4 rows in set (0.00 sec)
```

#### MySQL支持的IFNULL()函数

我们在前面也说了，NULL 用作未知的或不适用的值的占位符，也就是说NULL也许不是我们想要的或者需要我们处理一下的。<br/>
幸运的是，MySQL支持的IFNULL()函数正好帮助我们去规定如何处理 NULL 值。<br/>
比如下面的代码，当friend_name时NULL的时候，查出来的是DK（Don't Know）：
```sql
mysql> select id, name, ifnull(friend_name, 'DK')
    -> from stu_best_friend;
+----+------------+---------------------------+
| id | name       | ifnull(friend_name, 'DK') |
+----+------------+---------------------------+
|  1 | Sam        | Tim                       |
|  2 | Bob        | Sam                       |
|  3 | Haris      | Rookie                    |
|  7 | Kitty      | Miffy                     |
|  8 | Green      | DK                        |
|  9 | Oriana     | DK                        |
| 10 | JiNitaimei | DK                        |
+----+------------+---------------------------+
7 rows in set (0.00 sec)
```

#### MySQL支持的COALESCE()函数

COALESCE()和IFNULL()感觉一样，这里体验感差不多：
```sql
mysql> select id, name, coalesce(friend_name, 'DK')
    -> from stu_best_friend;
+----+------------+-----------------------------+
| id | name       | coalesce(friend_name, 'DK') |
+----+------------+-----------------------------+
|  1 | Sam        | Tim                         |
|  2 | Bob        | Sam                         |
|  3 | Haris      | Rookie                      |
|  7 | Kitty      | Miffy                       |
|  8 | Green      | DK                          |
|  9 | Oriana     | DK                          |
| 10 | JiNitaimei | DK                          |
+----+------------+-----------------------------+
7 rows in set (0.00 sec)
```

### 再次改变表结构

改变表结构是为了后面的DATE相关测试。

先查看表的结构：
```sql
mysql> show create table stu_info;
+----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table    | Create Table                                                                                                                                                                                                                                    |
+----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stu_info | CREATE TABLE `stu_info` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  `country` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
接下来插入新的列，该列名为birthday，类型是date，非空，默认值是'2000-1-1'：
```sql
mysql> alter table stu_info
    -> add column birthday date
    -> not null
    -> default '2000-1-1';
Query OK, 0 rows affected (0.59 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
全表查询，发现插在了最后（但我们想要在age之后）：
```sql
mysql> select * from stu_info;
+----+--------+-----+---------------------+---------+------------+
| id | name   | age | email               | country | birthday   |
+----+--------+-----+---------------------+---------+------------+
|  1 | Sam    |  19 | 123456789@qq.com    | China   | 2000-01-01 |
|  2 | Bob    |  20 | bobbob@gmail.com    | USA     | 2000-01-01 |
|  3 | Steven |  21 | steven521@gmail.com | UK      | 2000-01-01 |
|  4 | Amy    |  19 | amy20205205@163.com | China   | 2000-01-01 |
|  5 | Eleven |  20 | 11more11@163.com    | China   | 2000-01-01 |
|  6 | Miffy  |  24 | miffy521@126.com    | Japan   | 2000-01-01 |
+----+--------+-----+---------------------+---------+------------+
6 rows in set (0.00 sec)
```
于是可以删掉该列：
```sql
mysql> alter table stu_info
    -> drop column birthday;
Query OK, 0 rows affected (1.10 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
确认删除：
```sql
mysql> select * from stu_info;
+----+--------+-----+---------------------+---------+
| id | name   | age | email               | country |
+----+--------+-----+---------------------+---------+
|  1 | Sam    |  19 | 123456789@qq.com    | China   |
|  2 | Bob    |  20 | bobbob@gmail.com    | USA     |
|  3 | Steven |  21 | steven521@gmail.com | UK      |
|  4 | Amy    |  19 | amy20205205@163.com | China   |
|  5 | Eleven |  20 | 11more11@163.com    | China   |
|  6 | Miffy  |  24 | miffy521@126.com    | Japan   |
+----+--------+-----+---------------------+---------+
6 rows in set (0.00 sec)
```
重新插入，使用after表明在age属性之后：
```sql
mysql> alter table stu_info
    -> add column birthday date
    -> not null
    -> default '2000-1-1'
    -> after age;
Query OK, 0 rows affected (1.13 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
全表查询，最终得到想要的插入顺序：
```sql
mysql> select * from stu_info;
+----+--------+-----+------------+---------------------+---------+
| id | name   | age | birthday   | email               | country |
+----+--------+-----+------------+---------------------+---------+
|  1 | Sam    |  19 | 2000-01-01 | 123456789@qq.com    | China   |
|  2 | Bob    |  20 | 2000-01-01 | bobbob@gmail.com    | USA     |
|  3 | Steven |  21 | 2000-01-01 | steven521@gmail.com | UK      |
|  4 | Amy    |  19 | 2000-01-01 | amy20205205@163.com | China   |
|  5 | Eleven |  20 | 2000-01-01 | 11more11@163.com    | China   |
|  6 | Miffy  |  24 | 2000-01-01 | miffy521@126.com    | Japan   |
+----+--------+-----+------------+---------------------+---------+
6 rows in set (0.00 sec)
```
但由于我们围绕20岁内置过年龄，这不匹配，所以强行改一下年龄（注意参考VB，<>表示!=，而这里并没有!=这种写法）：
```sql
mysql> update stu_info
    -> set age=20
    -> where age<>20;
Query OK, 4 rows affected (0.42 sec)
Rows matched: 4  Changed: 4  Warnings: 0
```
查一下，嘿嘿，全是千禧宝宝啦！
```sql
mysql> select * from stu_info;
+----+--------+-----+------------+---------------------+---------+
| id | name   | age | birthday   | email               | country |
+----+--------+-----+------------+---------------------+---------+
|  1 | Sam    |  20 | 2000-01-01 | 123456789@qq.com    | China   |
|  2 | Bob    |  20 | 2000-01-01 | bobbob@gmail.com    | USA     |
|  3 | Steven |  20 | 2000-01-01 | steven521@gmail.com | UK      |
|  4 | Amy    |  20 | 2000-01-01 | amy20205205@163.com | China   |
|  5 | Eleven |  20 | 2000-01-01 | 11more11@163.com    | China   |
|  6 | Miffy  |  20 | 2000-01-01 | miffy521@126.com    | Japan   |
+----+--------+-----+------------+---------------------+---------+
6 rows in set (0.00 sec)
```

### DATE相关

刚才把表的结构调整了一下，接下来就是真正的DATE部分了。

SQL的DATE比较特殊，其实比如说Java，就专门为JDBC设计了一个继承自java.util.Date类的java.sql.Date类，[有关于String、java.util.Date、java.sql.Date的互相转化请看这里](https://blog.csdn.net/weixin_43896318/article/details/104662730)。

好啦，回到正题。

#### MySQL支持的DATE类型

先说说MySQL不同的DATE类型吧。

不同数据库产品支持的是不一样的，这里我们只说MySQL的四种类型：
- YEAR：YYYY or YY
- DATE：YYYY-MM-DD
- DATETIME：YYYY-MM-DD HH:MM:SS
- TIMESTAMP：YYYY-MM-DD HH:MM:SS

在建表的时候，如果选了时间，就要指定四者之一。<br/>
我们在后面演示的时候，只用了其中的DATE和DATETIME两种。

#### MySQL支持的DATE相关函数

|函数 	|功能|
|:---:|:---:|
|NOW() 	|返回当前的日期和时间|
|CURDATE() 	|返回当前的日期|
|CURTIME() 	|返回当前的时间|
|DATE() 	|返回日期本身 or 日期+时间的日期|
|EXTRACT() 	|返回日期或者时间的某一类型，比如月份|
|DATE_ADD() 	|返回向后延伸指定时间间隔的时间|
|DATE_SUB() 	|返回向前回溯指定时间间隔的时间|
|DATEDIFF() 	|返回两个日期之间的天数|
|DATE_FORMAT() 	|返回自定义格式的日期和时间|

还需要补充一下，EXTRACT()、DATE_ADD()、DATE_SUB()需要指定“对谁动手”，可针对下面的几种“动手”：
- MICROSECOND
- SECOND
- MINUTE
- HOUR
- DAY
- WEEK
- MONTH
- QUARTER
- YEAR
- SECOND_MICROSECOND
- MINUTE_MICROSECOND
- MINUTE_SECOND
- HOUR_MICROSECOND
- HOUR_SECOND
- HOUR_MINUTE
- DAY_MICROSECOND
- DAY_SECOND
- DAY_MINUTE
- DAY_HOUR
- YEAR_MONTH

首先是NOW()、CURDATE()、CURTIME()的使用，这个不需要专门查表：
```sql
mysql> select now(), curdate(), curtime();
+---------------------+------------+-----------+
| now()               | curdate()  | curtime() |
+---------------------+------------+-----------+
| 2020-03-17 10:41:20 | 2020-03-17 | 10:41:20  |
+---------------------+------------+-----------+
1 row in set (0.36 sec)
```
比如NOW()吧，其实可以用作DEFAULT约束的呢。

我突然觉得不对啊，这个是不好，我想换成'YYYY-MM-DD HH:MM:SS'格式，于是改了一下：
```sql
mysql> update stu_info
    -> set birthday='2000-1-1 12:00:00';
Query OK, 0 rows affected, 6 warnings (0.11 sec)
Rows matched: 6  Changed: 0  Warnings: 6
```
Warnings: 6 ？？？<br/>
（别急，看下去）<br/>
于是我们查一下表，结果还是那样，并没有显示YYYY-MM-DD HH:MM:SS：
```sql
mysql> select * from stu_info;
+----+--------+-----+------------+---------------------+---------+
| id | name   | age | birthday   | email               | country |
+----+--------+-----+------------+---------------------+---------+
|  1 | Sam    |  20 | 2000-01-01 | 123456789@qq.com    | China   |
|  2 | Bob    |  20 | 2000-01-01 | bobbob@gmail.com    | USA     |
|  3 | Steven |  20 | 2000-01-01 | steven521@gmail.com | UK      |
|  4 | Amy    |  20 | 2000-01-01 | amy20205205@163.com | China   |
|  5 | Eleven |  20 | 2000-01-01 | 11more11@163.com    | China   |
|  6 | Miffy  |  20 | 2000-01-01 | miffy521@126.com    | Japan   |
+----+--------+-----+------------+---------------------+---------+
6 rows in set (0.00 sec)
```
那就先凑合着用吧，接下来测一测DATE()：
```sql
mysql> select id, name, date(birthday)
    -> from stu_info;
+----+--------+----------------+
| id | name   | date(birthday) |
+----+--------+----------------+
|  1 | Sam    | 2000-01-01     |
|  2 | Bob    | 2000-01-01     |
|  3 | Steven | 2000-01-01     |
|  4 | Amy    | 2000-01-01     |
|  5 | Eleven | 2000-01-01     |
|  6 | Miffy  | 2000-01-01     |
+----+--------+----------------+
6 rows in set (0.00 sec)
```
结果并不意外，因为本来就这样……

接下来可以测一测EXTRACT()了，只查年月日：
```sql
mysql> select id, name, extract(year from birthday) as year, extract(month from birthday) as month,
    -> extract(day from birthday) as day
    -> from stu_info;
+----+--------+------+-------+------+
| id | name   | year | month | day  |
+----+--------+------+-------+------+
|  1 | Sam    | 2000 |     1 |    1 |
|  2 | Bob    | 2000 |     1 |    1 |
|  3 | Steven | 2000 |     1 |    1 |
|  4 | Amy    | 2000 |     1 |    1 |
|  5 | Eleven | 2000 |     1 |    1 |
|  6 | Miffy  | 2000 |     1 |    1 |
+----+--------+------+-------+------+
6 rows in set (0.00 sec)
```
再查查年、月、日、时、分、秒：
```sql
mysql> select id, name, extract(year from birthday) as year, extract(month from birthday) as month,
    -> extract(day from birthday) as day, extract(hour from birthday) as hour, extract(minute from birthday) as minute,
    -> extract(second from birthday) as second
    -> from stu_info;
+----+--------+------+-------+------+------+--------+--------+
| id | name   | year | month | day  | hour | minute | second |
+----+--------+------+-------+------+------+--------+--------+
|  1 | Sam    | 2000 |     1 |    1 |    0 |      0 |      0 |
|  2 | Bob    | 2000 |     1 |    1 |    0 |      0 |      0 |
|  3 | Steven | 2000 |     1 |    1 |    0 |      0 |      0 |
|  4 | Amy    | 2000 |     1 |    1 |    0 |      0 |      0 |
|  5 | Eleven | 2000 |     1 |    1 |    0 |      0 |      0 |
|  6 | Miffy  | 2000 |     1 |    1 |    0 |      0 |      0 |
+----+--------+------+-------+------+------+--------+--------+
6 rows in set (0.00 sec)
```
突然，我们反应过来了，原来是选了DATE的锅啊，那只能换成DATETIME了：
```sql
mysql> alter table stu_info
    -> drop column birthday;
Query OK, 0 rows affected (1.36 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> alter table stu_info
    -> add column birthday datetime
    -> not null
    -> default '2000-1-1 13:00:00'
    -> after age;
Query OK, 0 rows affected (1.38 sec)
Records: 0  Duplicates: 0  Warnings: 0
```
验证一下：
```sql
mysql> select * from stu_info;
+----+--------+-----+---------------------+---------------------+---------+
| id | name   | age | birthday            | email               | country |
+----+--------+-----+---------------------+---------------------+---------+
|  1 | Sam    |  20 | 2000-01-01 13:00:00 | 123456789@qq.com    | China   |
|  2 | Bob    |  20 | 2000-01-01 13:00:00 | bobbob@gmail.com    | USA     |
|  3 | Steven |  20 | 2000-01-01 13:00:00 | steven521@gmail.com | UK      |
|  4 | Amy    |  20 | 2000-01-01 13:00:00 | amy20205205@163.com | China   |
|  5 | Eleven |  20 | 2000-01-01 13:00:00 | 11more11@163.com    | China   |
|  6 | Miffy  |  20 | 2000-01-01 13:00:00 | miffy521@126.com    | Japan   |
+----+--------+-----+---------------------+---------------------+---------+
6 rows in set (0.00 sec)
```
重复一下之前的查询：
```sql
mysql> select id, name, extract(year from birthday) as year, extract(month from birthday) as month,
    -> extract(day from birthday) as day, extract(hour from birthday) as hour, extract(minute from birthday) as minute,
    -> extract(second from birthday) as second
    -> from stu_info;
+----+--------+------+-------+------+------+--------+--------+
| id | name   | year | month | day  | hour | minute | second |
+----+--------+------+-------+------+------+--------+--------+
|  1 | Sam    | 2000 |     1 |    1 |    0 |      0 |      0 |
|  2 | Bob    | 2000 |     1 |    1 |    0 |      0 |      0 |
|  3 | Steven | 2000 |     1 |    1 |    0 |      0 |      0 |
|  4 | Amy    | 2000 |     1 |    1 |    0 |      0 |      0 |
|  5 | Eleven | 2000 |     1 |    1 |    0 |      0 |      0 |
|  6 | Miffy  | 2000 |     1 |    1 |    0 |      0 |      0 |
+----+--------+------+-------+------+------+--------+--------+
6 rows in set (0.00 sec)
```
只查三个属性：
```sql
mysql> select id, name, birthday
    -> from stu_info;
+----+--------+---------------------+
| id | name   | birthday            |
+----+--------+---------------------+
|  1 | Sam    | 2000-01-01 13:00:00 |
|  2 | Bob    | 2000-01-01 13:00:00 |
|  3 | Steven | 2000-01-01 13:00:00 |
|  4 | Amy    | 2000-01-01 13:00:00 |
|  5 | Eleven | 2000-01-01 13:00:00 |
|  6 | Miffy  | 2000-01-01 13:00:00 |
+----+--------+---------------------+
6 rows in set (0.00 sec)
```
对比上面的，这时才能看出DATE()的作用：
```sql
mysql> select id, name, date(birthday)
    -> from stu_info;
+----+--------+----------------+
| id | name   | date(birthday) |
+----+--------+----------------+
|  1 | Sam    | 2000-01-01     |
|  2 | Bob    | 2000-01-01     |
|  3 | Steven | 2000-01-01     |
|  4 | Amy    | 2000-01-01     |
|  5 | Eleven | 2000-01-01     |
|  6 | Miffy  | 2000-01-01     |
+----+--------+----------------+
6 rows in set (0.00 sec)
```
但我们还想要数据多样化一些，所以改一下年龄和生日：
```sql
mysql> update stu_info
    -> set age='21', birthday='1999-5-4 8:00:00'
    -> where id=1;
Query OK, 1 row affected (0.42 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update stu_info
    -> set age='35', birthday='1985-12-3 9:34:20'
    -> where id=2;
Query OK, 1 row affected (0.39 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update stu_info
    -> set age='25', birthday='1995-3-3 6:17:30'
    -> where id=3;
Query OK, 1 row affected (0.39 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update stu_info
    -> set age='19', birthday='2001-7-2 21:30:00'
    -> where id=5;
Query OK, 1 row affected (0.39 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update stu_info
    -> set age='20', birthday='2000-8-10 12:00:00'
    -> where id=6;
Query OK, 1 row affected (0.15 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```
重新查询，带上一个ORDER BY，**注意DATETIME的升序排列其实是age的降序排列**：
```sql
mysql> select id, name, age, birthday
    -> from stu_info
    -> order by birthday;
+----+--------+-----+---------------------+
| id | name   | age | birthday            |
+----+--------+-----+---------------------+
|  2 | Bob    |  35 | 1985-12-03 09:34:20 |
|  3 | Steven |  25 | 1995-03-03 06:17:30 |
|  1 | Sam    |  21 | 1999-05-04 08:00:00 |
|  4 | Amy    |  20 | 2000-01-01 13:00:00 |
|  6 | Miffy  |  20 | 2000-08-10 12:00:00 |
|  5 | Eleven |  19 | 2001-07-02 21:30:00 |
+----+--------+-----+---------------------+
6 rows in set (0.00 sec)
```
我们可以使用＞对birthday做一下筛选，但结果并不好：
```sql
mysql> select id, name, age, birthday
    -> from stu_info
    -> where birthday>'2000-01-01 00:00:00'
    -> order by birthday;
+----+--------+-----+---------------------+
| id | name   | age | birthday            |
+----+--------+-----+---------------------+
|  4 | Amy    |  20 | 2000-01-01 13:00:00 |
|  6 | Miffy  |  20 | 2000-08-10 12:00:00 |
|  5 | Eleven |  19 | 2001-07-02 21:30:00 |
+----+--------+-----+---------------------+
3 rows in set (0.35 sec)
```
上面这个时间的排序可能不那么令我们满意，因为取大于就应该取到上界，但反而得到了下界，这个不好，所以使用<更自然些：
```sql
mysql> select id, name, age, birthday
    -> from stu_info
    -> where birthday<'2000-01-01 00:00:00'
    -> order by birthday;
+----+--------+-----+---------------------+
| id | name   | age | birthday            |
+----+--------+-----+---------------------+
|  2 | Bob    |  35 | 1985-12-03 09:34:20 |
|  3 | Steven |  25 | 1995-03-03 06:17:30 |
|  1 | Sam    |  21 | 1999-05-04 08:00:00 |
+----+--------+-----+---------------------+
3 rows in set (0.00 sec)
```
再测测DATE_ADD()，它可以在指定时间上附加一段时间：
```sql
mysql> select id, name, age, date_add(birthday, interval 10 year) as ten_years_old
    -> from stu_info;
+----+--------+-----+---------------------+
| id | name   | age | ten_years_old       |
+----+--------+-----+---------------------+
|  1 | Sam    |  21 | 2009-05-04 08:00:00 |
|  2 | Bob    |  35 | 1995-12-03 09:34:20 |
|  3 | Steven |  25 | 2005-03-03 06:17:30 |
|  4 | Amy    |  20 | 2010-01-01 13:00:00 |
|  5 | Eleven |  19 | 2011-07-02 21:30:00 |
|  6 | Miffy  |  20 | 2010-08-10 12:00:00 |
+----+--------+-----+---------------------+
6 rows in set (0.36 sec)
```
不只是能加整数，还能加负数（相当于减）：
```sql
mysql> select id, name, age, date_add(birthday, interval -10 year) as ten_years_before
    -> from stu_info;
+----+--------+-----+---------------------+
| id | name   | age | ten_years_before    |
+----+--------+-----+---------------------+
|  1 | Sam    |  21 | 1989-05-04 08:00:00 |
|  2 | Bob    |  35 | 1975-12-03 09:34:20 |
|  3 | Steven |  25 | 1985-03-03 06:17:30 |
|  4 | Amy    |  20 | 1990-01-01 13:00:00 |
|  5 | Eleven |  19 | 1991-07-02 21:30:00 |
|  6 | Miffy  |  20 | 1990-08-10 12:00:00 |
+----+--------+-----+---------------------+
6 rows in set (0.36 sec)
```
有DATE_ADD()，自然有DATE_SUB()：
```sql
mysql> select id, name, age, date_sub(birthday, interval -10 year) as ten_years_old
    -> from stu_info;
+----+--------+-----+---------------------+
| id | name   | age | ten_years_old       |
+----+--------+-----+---------------------+
|  1 | Sam    |  21 | 2009-05-04 08:00:00 |
|  2 | Bob    |  35 | 1995-12-03 09:34:20 |
|  3 | Steven |  25 | 2005-03-03 06:17:30 |
|  4 | Amy    |  20 | 2010-01-01 13:00:00 |
|  5 | Eleven |  19 | 2011-07-02 21:30:00 |
|  6 | Miffy  |  20 | 2010-08-10 12:00:00 |
+----+--------+-----+---------------------+
6 rows in set (0.00 sec)
```
DATE_DIFF()也可一测，求的是两个时间之差：
```sql
mysql> select i1.name, i2.name, datediff(date(i1.birthday), date(i2.birthday))as diff
    -> from stu_info i1, stu_info i2;
+--------+--------+-------+
| name   | name   | diff  |
+--------+--------+-------+
| Sam    | Sam    |     0 |
| Bob    | Sam    | -4900 |
| Steven | Sam    | -1523 |
| Amy    | Sam    |   242 |
| Eleven | Sam    |   790 |
| Miffy  | Sam    |   464 |
| Sam    | Bob    |  4900 |
| Bob    | Bob    |     0 |
| Steven | Bob    |  3377 |
| Amy    | Bob    |  5142 |
| Eleven | Bob    |  5690 |
| Miffy  | Bob    |  5364 |
| Sam    | Steven |  1523 |
| Bob    | Steven | -3377 |
| Steven | Steven |     0 |
| Amy    | Steven |  1765 |
| Eleven | Steven |  2313 |
| Miffy  | Steven |  1987 |
| Sam    | Amy    |  -242 |
| Bob    | Amy    | -5142 |
| Steven | Amy    | -1765 |
| Amy    | Amy    |     0 |
| Eleven | Amy    |   548 |
| Miffy  | Amy    |   222 |
| Sam    | Eleven |  -790 |
| Bob    | Eleven | -5690 |
| Steven | Eleven | -2313 |
| Amy    | Eleven |  -548 |
| Eleven | Eleven |     0 |
| Miffy  | Eleven |  -326 |
| Sam    | Miffy  |  -464 |
| Bob    | Miffy  | -5364 |
| Steven | Miffy  | -1987 |
| Amy    | Miffy  |  -222 |
| Eleven | Miffy  |   326 |
| Miffy  | Miffy  |     0 |
+--------+--------+-------+
36 rows in set (0.38 sec)
```
最后试试格式化，即DATE_FORMAT()。

下面列举了一些主要的格式化符号：

|格式符| 	表示的意义|
|:---:|:---:|
|%a 	|缩写星期名|
|%b 	|缩写月名|
|%c 	|月，数值|
|%D 	|带有英文前缀的月中的天|
|%d 	|月的天，数值（00-31）|
|%e 	|月的天，数值（0-31）|
|%f 	|微秒|
|%H 	|小时（00-23）|
|%h 	|小时（01-12）|
|%I 	|小时（01-12）|
|%i 	|分钟，数值（00-59）|
|%j 	|年的天（001-366）|
|%k 	|小时（0-23）|
|%l 	|小时（1-12）|
|%M 	|月名|
|%m 	|月，数值（00-12）|
|%p 	|AM 或 PM|
|%r 	|时间，12-小时（hh:mm:ss AM 或 PM）|
|%S 	|秒（00-59）|
|%s 	|秒（00-59）|
|%T 	|时间, 24-小时（hh:mm:ss）|
|%U 	|周（00-53）星期日是一周的第一天|
|%u 	|周（00-53）星期一是一周的第一天|
|%V 	|周（01-53）星期日是一周的第一天，与 %X 使用|
|%v 	|周（01-53）星期一是一周的第一天，与 %x 使用|
|%W 	|星期名|
|%w 	|周的天（0=星期日, 6=星期六）|
|%X 	|年，其中的星期日是周的第一天，4 位，与 %V 使用|
|%x 	|年，其中的星期一是周的第一天，4 位，与 %v 使用|
|%Y 	|年，4 位|
|%y 	|年，2 位|

那我们就组合一下DATE()与DATE_FORMAT()吧：
```sql
mysql> select date_format(now(), '%b%d %Y') as format;
+------------+
| format     |
+------------+
| Mar17 2020 |
+------------+
1 row in set (0.00 sec)
```

### 完美退出

```sql
mysql> \q
Bye
```

或

```sql
mysql> exit
Bye
```

或

```sql
mysql> quit
Bye
```

## 感谢观看
