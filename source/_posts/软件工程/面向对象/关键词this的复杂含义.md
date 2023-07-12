---
title: 关键词this的复杂含义
date: 2019-09-28 10:07:00
summary: 本文浅析Java语言中神奇的this关键词，其他语言中与之类似的可能是self等关键词。
tags:
- 面向对象
- 软件工程
categories:
- 软件工程
---

# Java中的this

Java中，this的含义也不是固定不变的，它会随着执行环境的改变而改变。

下面的例子展示了this的两个功能：
- 构造器之间的调用。
- 区分局部变量和属性。

```java
public class ThisTest {
    
    private String str1;
    private String str2;
    
    public ThisTest() {
        System.out.println("0");
    }
    
    public ThisTest(String var1) {
        this();
        this.str1 = var1;
        System.out.println("1");
    }
    
    public ThisTest(String var1, String var2) {
        this(var1);
        this.str2 = var2;
        System.out.println("2");
    }
    
    public String getStr1() {
        return this.str1;
    }
    
    public String getStr2() {
        return this.str2;
    }
    
    public static void main(String[] args) {
        ThisTest tt = new ThisTest("cc", "cccc");
        System.out.println(tt.str1);
        System.out.println(tt.str2);
    }

}
```

this还有一个作用，是区分当前对象是谁。

下面是博主在某个JFrame构造器里写过的部分代码：

```java
JButton button = new JButton("返回");
button.addMouseListener(new MouseAdapter() {
    @Override
    public void mouseClicked(MouseEvent e) {
        DoctorFrame.this.dispose();
        new SignInFrame();
    }
});
button.setFont(new Font("黑体", Font.PLAIN, 25));
button.setBounds(57, 323, 160, 37);
```

mouse好像还好，但是普通的actionlistener似乎不适用XXFrame.this.XXXX是不可以的

通过Doctor.this，我们“告诉”编译器我们要当前要执行的是当前的JFrame。


# JavaScript中的this

JavaScript中，this的含义也不是固定不变的，它会随着执行环境的改变而改变。
- 在方法中，this表示该方法所属的对象。
- 如果单独使用，this表示全局对象。
- 在函数中，this表示全局对象。
- 在函数中，在严格模式下，this是未定义的(undefined)。
- 在事件中，this表示接收事件的元素。
- 类似call()和apply()方法可以将this引用到任何对象。

# 对this加锁的弊病

以C#为例，锁住this或字符串都算不是好的选择。

先看锁this：

```csharp
lock (this) {
    this.name = "info";
    this.update();
    // ...
}
```

这其实不好，因为锁的对象最好是代码控制的资源，因为它们是类的私有数据。
一旦资源是公有的，那么其他代码也能对资源上锁，从而造成死锁。

锁住一个对象的引用会组织其他线程对相同引用上锁，但没有其他影响，对象仍然可以访问，属性值也可以修改。

所以，这个锁的真正作用是锁住质量字符串文本的引用，而这个引用可能正在被很多代码所共享，甚至包括应用程序域之外的代码。把该字符串对象锁住也会导致其他代码无法使用该对象，原因与锁住this类似。
