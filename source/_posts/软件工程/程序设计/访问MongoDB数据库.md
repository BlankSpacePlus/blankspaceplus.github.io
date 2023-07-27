---
title: 访问MongoDB数据库
date: 2023-03-04 15:23:43
summary: 本文提供Java、Python访问MongoDB数据库的操作案例。
tags:
- 程序设计
- MongoDB
categories:
- 程序设计
---

# MongoDB

MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。它支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是它支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

![](../../../images/软件工程/程序设计/访问MongoDB数据库/1.png)

MongoDB支持一对一、一对多、多对多的关系：
- 一对一
    ```json
    Order={
        "_id": "2934f",
        "salesDate": "2022-05-02",
        "customer":{
            "name": "Jack Beanstalk",
            "gender": "M",
            "rewardsMember": "True"
        }
    }
    ```
- 一对多
    - 嵌套式一对多
        ```json
        Order={
            "_id": "2934f",
            "salesDate": "2022-05-02",
            "customer":{
                "name": "Jack Beanstalk",
                "gender": "M",
                "rewardsMember": "True"
            },
            "items": [ {
                "name": "Monstera",
                "price":{
                    "$numberdecimal": "8.00"
                },
                "quantity":{
                    "\$numberInt": "1"
                }
            },
            {
                "name": "Pothos",
                "price":{
                    "\$numberdecimal": "8.00"
                },
                "quantity":{
                    "\$numberInt": "2"
                }
            } ]
        }
        ```
    - 引用式一对多
        ```json
        Order={
            "_id": "2934f",
            "salesDate": "2022-05-02",
            "customer": {
                "name": "Jack Beanstalk",
                "gender": "M",
                "rewardsMember": "True"
            },
            "items": [ "12", "35", "86"]
        }
        ```
- 多对多
    ```json
    Order={
        "_id": "2934f",
        "salesDate": "2022-05-02",
        "customer":{
            "name": "Jack Beanstalk",
            "gender": "M",
            "rewardsMember": "True"
        },
        "items": [ "12", "35", "86"]
    }
    Item={
        "_id": "12",
        "name": "Pothos",
        "price":{
            "$numberDecimal": "8.00"
        },
        "orders": [ "2934f", "1b2df", "43de9"]
    }
    ```

# Java操作MongoDB

## 依赖引入

首先，引入Maven依赖[mongodb-driver](https://mvnrepository.com/artifact/org.mongodb/mongodb-driver)：
```xml
<!-- https://mvnrepository.com/artifact/org.mongodb/mongodb-driver -->
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver</artifactId>
    <version>3.12.11</version>
</dependency>
```

引入Maven依赖[jackson-databind](https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind)：
```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.14.1</version>
</dependency>
```

## 类的导入

import org.bson.Document;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

## 问题解决

创建MongoClient的时候可能遇到以下错误：
<font color="red">'MongoClient' is abstract; cannot be instantiated</font>

根据[Stack Overflow](https://stackoverflow.com/questions/54426018/mongoclient-is-abstract-cannot-be-instantiated)的解决方法：`MongoClient mongoClient = MongoClients.create();`改成`MongoClient mongoClient = MongoClients.create(url);`。

## 操作流程

插入数据的主要过程：
1. 拼接连接串：`"mongodb://" + MONGO_HOST + ":" + MONGO_PORT`，例如`mongodb://127.0.0.1:27017`。
2. 连接到数据库：`MongoDatabase mongoDatabase = mongoClient.getDatabase(MONGO_DB);`
3. 创建Collection(如果没创建)：`mongoDatabase.createCollection(MONGO_DB);`
4. 获取Collection(已有Collection)：`MongoCollection<Document> collection = mongoDatabase.getCollection(MONGO_DB);`
5. 拼接Document对象。
6. 将Document对象插入Collection。

## 完整代码

```java
String url = "mongodb://" + MONGO_HOST + ":" + MONGO_PORT;
// 连接到 mongodb 服务
try (MongoClient mongoClient = MongoClients.create(url)) {
    // 连接到数据库
    MongoDatabase mongoDatabase = mongoClient.getDatabase(MONGO_DB);
    System.out.println("Connect to database successfully.");
    // 创建Collection
    mongoDatabase.createCollection(MONGO_DB);
    System.out.println("Create collection successfully.");
    // 获取collection
    MongoCollection<Document> collection = mongoDatabase.getCollection(MONGO_DB);
    int tempId = 1;
    // 插入document
    for (JavaClass classObj : javaClassList) {
        Document methodDocument = new Document();
        for (JavaMethod method : classObj.getMethodList()) {
            Map<String, Object> methodObjMap = new ObjectMapper().convertValue(method, new TypeReference<Map<String, Object>>() {});
            methodDocument.append(method.getMethodTitle(), methodObjMap);
            System.out.println(method);
        }
        Document classDocument = new Document("id", tempId)
                .append("className", classObj.getClassName())
                .append("classURL", classObj.getClassURL())
                .append("method", methodDocument);
        System.out.println(classObj);
        collection.insertOne(classDocument);
    }
    // 统计Document条数
    System.out.println(collection.countDocuments());
} catch (Exception e) {
    e.printStackTrace();
}
```

# Python操作MongoDB

推荐阅读：[Python操作MongoDB](https://www.runoob.com/python3/python-mongodb.html)
