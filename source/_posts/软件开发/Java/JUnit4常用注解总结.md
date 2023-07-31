---
title: JUnit4常用注解总结
date: 2020-03-08 01:41:32
summary: 本文归纳总结JUnit4常用注解。
tags:
- Java
- JUnit
categories:
- Java
---

# 常用注解

JUnit4使用Java5中的注解（annotation），下面会列举一些JUnit4常用Annotation：
- <font color="orange">**@Before**</font>：初始化方法   对于每一个测试方法都要执行一次（注意与BeforeClass区别，后者是对于所有方法执行一次）
- <font color="orange">**@After**</font>：释放资源  对于每一个测试方法都要执行一次（注意与AfterClass区别，后者是对于所有方法执行一次）
- <font color="orange">**@Test**</font>：测试方法，在这里可以测试期望异常和超时时间 
- <font color="orange">**@Test(expected=ArithmeticException.class)**</font>：检查被测方法是否抛出ArithmeticException异常 
- <font color="orange">**@Ignore**</font>：忽略的测试方法 
- <font color="orange">**@BeforeClass**</font>：针对所有测试，只执行一次，且必须为static void 
- <font color="orange">**@AfterClass**</font>：针对所有测试，只执行一次，且必须为static void 

一个JUnit4的单元测试用例执行顺序为：
*<font color="red">**@BeforeClass → @Before → @Test → @After → @AfterClass**</font>*

每一个测试方法的调用顺序为： *<font color="red">**@Before → @Test → @After**</font>*

# 测试代码

```java
public class JUnit4Test {   

    @Before  
    public void before() {   
        System.out.println("@Before");   
    }   
    
    @Test  
     /**  
      *Mark your test cases with @Test annotations.   
      *You don’t need to prefix your test cases with “test”.  
      *tested class does not need to extend from “TestCase” class.  
      */  
    public void test() {   
        System.out.println("@Test");   
        assertEquals(5 + 5, 10);   
    }   
    
    @Ignore  
    @Test  
    public void testIgnore() {   
        System.out.println("@Ignore");   
    }   
    
    @Test(timeout = 50)   
    public void testTimeout() {   
        System.out.println("@Test(timeout = 50)");   
        assertEquals(5 + 5, 10);   
    }   
    
    @Test(expected = ArithmeticException.class)   
    public void testExpected() {   
        System.out.println("@Test(expected = Exception.class)");   
        throw new ArithmeticException();   
    }   
    
    @After  
    public void after() {   
        System.out.println("@After");   
    }   
    
    @BeforeClass  
    public static void beforeClass() {   
        System.out.println("@BeforeClass");   
    }
    
    @AfterClass  
    public static void afterClass() {   
        System.out.println("@AfterClass");   
    }
    
}
```

## 测试结果

```java
@BeforeClass 
@Before 
@Test(timeout = 50) 
@After 
@Before 
@Test(expected = Exception.class) 
@After 
@Before 
@Test 
@After 
@AfterClass 
```

# 辨析篇

|@BeforeClass and @AfterClass 	|@Before and @After|
|:----:|:----:|
|在一个类中只可以出现一次 	|在一个类中可以出现多次，即可以在多个方法的声明前加上这两个Annotaion标签，执行顺序不确定|
|方法名不做限制 	|方法名不做限制|
|在类中只运行一次 	|在每个测试方法之前或者之后都会运行一次|
|@BeforeClass父类中标识了该Annotation的方法将会先于当前类中标识了该Annotation的方法执行；@AfterClass 父类中标识了该Annotation的方法将会在当前类中标识了该Annotation的方法之后执行|@Before父类中标识了该Annotation的方法将会先于当前类中标识了该Annotation的方法执行；@After父类中标识了该Annotation的方法将会在当前类中标识了该Annotation的方法之后执行|
|必须声明为public static 	|必须声明为public 并且非static|
|所有标识为@AfterClass的方法都一定会被执行，即使在标识为@BeforeClass的方法抛出异常的的情况下也一样会。 	|所有标识为@After 的方法都一定会被执行，即使在标识为 @Before 或者 @Test 的方法抛出异常的的情况下也一样会。|

# 转载说明

转载用途：学习、分享
作者：fuzhihong0917
来源：[https://www.cnblogs.com/fuzhihong0917/p/6081004.html](https://www.cnblogs.com/fuzhihong0917/p/6081004.html)
