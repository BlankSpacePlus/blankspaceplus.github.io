---
title: C语言查询MySQL数据库
date: 2022-05-04 03:58:18
summary: 本文提供C语言连接MySQL并查询数据的Demo。
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
    const char *passwd = "..."; // 自己填
    const char *db = "card";
    unsigned int port = 3306;
    const char *unix_socket = NULL;    // Windows是NULL
    unsigned long client_flag = 0;
    const char *query_users = "select * from `user`";
    MYSQL_RES *result;
    MYSQL_ROW row;
    // 初始化
    mysql_init(&mysql);
    // 连接 MySQL
    if ((sock = mysql_real_connect(&mysql, host, user, passwd, db,
                                   port, unix_socket, client_flag)) == NULL){
        printf("连接MySQL失败，原因是: \n");
        fprintf(stderr, " %s\n", mysql_error(&mysql));
        exit(1);
    } else {
        fprintf(stderr, "连接MySQL成功！\n");
    }
    // 执行 MySQL 查询
    if (mysql_query(&mysql, query_users) != 0) {
        fprintf(stderr, "查询失败！\n");
        exit(1);
    } else {
        if ((result = mysql_store_result(&mysql)) == NULL) {
            fprintf(stderr, "保存结果集失败！\n");
            exit(1);
        } else {
            // 读取结果集中的数据，返回的是下一行（因为保存结果集时，当前的游标在第一行之前）
            while ((row = mysql_fetch_row(result)) != NULL) {
                printf("用户ID：%s\t", row[0]);
                printf("用户姓名：%s\t\n", row[1]);
            }
        }
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
