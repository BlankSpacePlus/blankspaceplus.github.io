---
title: Java构造方法
date: 2019-12-11 01:17:07
summary: 本文分享一些Java构造方法的相关问题，可以应对面试。
tags:
- Java
categories:
- Java
---

# 构造方法

在Java中，构造方法是一种特殊的方法，用于创建和初始化对象。它的名称必须与类名相同，没有返回类型（甚至不能是void），并且通常用于设置对象的初始状态。

Java构造方法具有以下特征：
- Java支持构造方法，但不支持析构方法。
- 构造方法可以有任意数量的参数，也可以没有参数。
- 构造方法可以是public、private、protected或者默认的（没有修饰符）。
- 如果一个类没有定义任何构造方法，Java编译器会自动为该类生成一个默认的无参构造方法。因此，一个类至少存在一个构造方法。
- 构造方法可以重载，也就是说同一个类可以有多个构造方法，只要它们的参数列表不同。类的一个构造方法可以通过this关键字调用其他构造方法。理论上，一个类的构造方法数量是不受限制的。
- 构造方法不能被继承，但可以通过super关键字调用基类构造方法。
- 由于构造方法不能被继承，因此它也不能被重写。派生类可以通过调用基类的构造方法来初始化继承来的成员变量，但无法覆盖父类的构造方法。在子类中定义与父类构造方法相同的方法名是一种常见的错误，编译器会将其视为一个普通的方法（且由于无返回值，会报错）。如果需要在子类中自定义初始化操作，可以在子类中定义一个新的构造方法，通过调用父类的构造方法来初始化继承来的成员变量，并执行子类特有的初始化操作。

在Java中，构造方法通常用于以下操作：
- 分配对象的内存空间。
- 初始化对象的成员变量。
- 执行其他必要的初始化操作。

# 构造方法的参数问题

## 采用默认无参数构造方法

下面的代码中，DefaultConstructorTest.java没有明确地定义构造方法，但Java编译器会为其增加一个默认的无参数构造方法以供调用。

```java
public class DefaultConstructorTest {

    public static void main(String[] args) {
        DefaultConstructorTest obj = new DefaultConstructorTest();
    }

}
```

Lombok的@NoArgsConstructor可以提供一个无参数构造方法。

## 采用全属性参数构造方法

有时候，我们期待构造方法必须传入所有属性的初始化值，此时可以定义一个采用全属性参数的构造方法。

```java
import java.io.Serializable;

/**
 * 医生类
 */
public class Doctor implements Serializable {

    /**
     * 默认序列化UID
     */
    private static final long serialVersionUID = 1L;

    /**
     * 医生ID
     */
    private Integer doctorId;

    /**
     * 医生登录名
     */
    private String userName;

    /**
     * 医生账户密码
     */
    private String password;

    /**
     * 医生真实姓名
     */
    private String name;

    /**
     * 医生所在科室
     */
    private String department;

    /**
     * 医生职称信息（主任医师、副主任医师、主治医师、住院医师）
     */
    private String title; 

    /**
     * 是否参与排班
     */
    private Boolean isOnline;

    public Doctor(Integer doctorId, String userName, String password, String name, String department, String title,
            Boolean isOnline) {
        super();
        this.doctorId = doctorId;
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.department = department;
        this.title = title;
        this.isOnline = isOnline;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getIsOnline() {
        return isOnline;
    }

    public void setIsOnLine(Boolean isOnline) {
        this.isOnline = isOnline;
    }
    
}
```

Lombok的@AllArgsConstrutor可以提供一个全属性参数构造方法。

## 私有构造方法

私有构造方法存在的意义就是不让外界通过此构造方法创建当前类的实例。常应用于工具类、单例类、工厂类等。

推荐阅读：[单例模式](https://blankspace.blog.csdn.net/article/details/105337542)

```java
public class DoubleCheckSingleton {

    private volatile static DoubleCheckSingleton instance;

    private DoubleCheckSingleton() {
        System.out.println("Double Check Singleton has been created!");
    }

    public static DoubleCheckSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckSingleton();
                }
            }
        }
        return instance;
    }

}
```

对于工具类、常量类等，既不适合也没必要生成实例。

```java
public class Constant {

    /**
     * 不允许被实例化
     */
    private Constant() {}

    //...
    public static final ...;
    
}
```

下面的ResultGenerator.java类是一个返回统一Result实例的工厂类。

```java
public class ResultGenerator {
    
    private static final String DEFAULT_SUCCESS_MESSAGE = "SUCCESS";

    private ResultGenerator() {}

    public static Result genSuccessResult() {
        return new Result()
                .setCode(ResultCode.SUCCESS)
                .setMessage(DEFAULT_SUCCESS_MESSAGE);
    }

    public static Result genSuccessResult(Object data) {
        return new Result()
                .setCode(ResultCode.SUCCESS)
                .setMessage(DEFAULT_SUCCESS_MESSAGE)
                .setData(data);
    }

    public static Result genFailResult(String message) {
        return new Result()
                .setCode(ResultCode.FAIL)
                .setMessage(message);
    }

}
```
