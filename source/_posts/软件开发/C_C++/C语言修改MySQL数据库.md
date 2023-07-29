---
title: C语言修改MySQL数据库
date: 2022-08-13 21:14:00
summary: 本文提供C语言连接MySQL并修改数据的Demo。
tags:
- C语言
- MySQL
categories:
- 开发技术
---

SQL脚本：

```sql
DROP DATABASE IF EXISTS `card`;
CREATE DATABASE `card`;

USE `card`;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT '用户ID',
  `name` varchar(255) NOT NULL COMMENT '用户姓名',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'tom', 'tom');
INSERT INTO `user` VALUES ('2', 'root', 'root');
INSERT INTO `user` VALUES ('3', 'bob', 'bob');
```

CMakeLists.txt的配置至关重要：

```c
cmake_minimum_required(VERSION 3.21)
project(c_mysql_connection C)

set(CMAKE_C_STANDARD 99)

# 主要配置，写绝对路径
include_directories(D:\\MySQL\\include)
link_directories(D:\\MySQL\\lib)

add_executable(c_mysql_connection main.c)

# 加了环境变量PATH
target_link_libraries(c_mysql_connection libmysql)
```

C语言代码：

```c
#include <stdio.h>
#include <mysql.h>

// 声明 MySQL 的句柄
MYSQL mysql, *sock;

int main() {
    const char *host = "127.0.0.1";
    const char *user = "...";  // 自己填
    const char *password = "...";  // 自己填
    const char *db_name = "card";
    unsigned int port = 3306;
    const char *unix_socket = NULL;    // Windows是NULL
    unsigned long client_flag = 0;
    const char *add_users = "insert into `user` values (4, 'candy', 'can_can_need')";
    MYSQL_RES *result;
    MYSQL_ROW row;
    // 初始化
    mysql_init(&mysql);
    // 连接MySQL
    if ((sock = mysql_real_connect(&mysql, host, user, password, db_name,
                                   port, unix_socket, client_flag)) == NULL){
        printf("连接MySQL失败，原因是: \n");
        fprintf(stderr, " %s\n", mysql_error(&mysql));
        exit(1);
    } else {
        fprintf(stderr, "连接MySQL成功！\n");
    }
    // 插入新的数据实例
    if (mysql_query(&mysql, add_users) != 0) {
        fprintf(stderr, "插入MySQL失败！\n");
        exit(1);
    } else {
        fprintf(stdout, "插入MySQL成功！\n");
    }
    // 释放结果集
    mysql_free_result(result);
    // 断开连接
    mysql_close(sock);
    // 退出系统
    exit(EXIT_SUCCESS);
}
```

注意！初始化的时候注意必须是：

```c
MYSQL mysql;
mysql_init(&mysql);
```

附上`mysql.h`常用函数和变量：

```c
// 连接句柄
MYSQL *mysql;
 
// 初始化
MYSQL *mysql_init(MYSQL *mysql);
 
// 设置连接选项
int mysql_options(MYSQL *mysql, enum mysql_option option, const char *arg);
 
// 打开连接
MYSQL *mysql_real_connect(MYSQL *mysql, const char *host, const char *user, const char *passwd, const char *db, unsigned int port, const char *unix_socket, unsigned long client_flag);
 
// 执行SQL语句
int mysql_real_query(MYSQL *mysql, const char *query, unsigned long length);
// 如果C风格SQL语句
int mysql_query(MYSQL *mysql, const char *query);
 
// SQL语句一般只能是一条语句，如果想在一个函数调用中执行多个SQL语句，需要以;隔开，并且设置在打开连接时设置属性CLIENT_MULTI_STATEMENTS
// 可以对已经打开的连接进行以下函数调用设置，其中mysql为MYSQL的指针
mysql_set_server_option(mysql,MYSQL_OPTION_MULTI_STATEMENTS_ON);
 
// 执行一个有返回结果的语句，只是初始化MYSQL_RES结构体，并不真正从服务器获取结果
MYSQL_RES *mysql_use_result(MYSQL *mysql);
// 执行一个有返回结果的语句，直接将全部数据读取到客户端
MYSQL_RES *mysql_store_result(MYSQL *mysql);

// 用MYSQL_RES结构体获得数据，返回的MYSQL_ROW类型实际为char**类型，通过下标操作可以取得每一列的值
MYSQL_ROW mysql_fetch_row(MYSQL_RES *result);
 
// 获得结果集的列数
unsigned int mysql_field_count(MYSQL *mysql);
unsigned int mysql_num_fields(MYSQL_RES *result);
// 获得结果集的行数
my_ulonglong mysql_num_rows(MYSQL_RES *result);
 
// 使用完结果集后一定要记得释放
void mysql_free_result(MYSQL_RES *result);
 
// 如果执行的SQL语句是无返回结果的，比如DELETE、INSERT等，可以使用以下函数获取影响行数
my_ulonglong mysql_affected_rows(MYSQL *mysql);
 
// 用完连接后需要释放
void mysql_close(MYSQL *mysql);

// MYSQL的函数基本都遵循C语言的编程习惯，当返回值为整数时，0代表成功，非0代表失败，当返回指针时，NULL代表失败
// 如果函数执行失败，获取错误代号
unsigned int mysql_errno(MYSQL *mysql);
// 如果函数执行失败，获取英文错误信息
const char *mysql_error(MYSQL *mysql);
```
