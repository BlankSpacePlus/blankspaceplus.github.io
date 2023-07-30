---
title: java.lang.Object
date: 2020-03-07 11:22:34
summary: 本文分享java.lang.Object的相关知识。
tags:
- Java
categories:
- Java
---

# java.lang.Object核心要点

- Object类是<font color="red">所有类的基类</font>，是Java中唯一一个没有基类的类。 
- 一个类可以不是Object类的直接派生类，但一定是Object类的派生类， Java中的每一个类都是从Object扩展来的。  
- 在Object类中定义的方法，在所有类中都可以使用。 
- java.lang.Object属于java.base模块，其API文档(以19为例)可以[点此查看](https://download.java.net/java/early_access/panama/docs/api/java.base/java/lang/Object.html)

# java.lang.Object重要方法

- `public final native Class<?> getClass()`：返回当前运行时对象的Class对象
    - native意味着该方法用本地语言（比如C或C++）实现。
    - final意味着该方法不允许派生类重写。
- `public native int hashCode()`：返回对象的哈希码。
    - native意味着该方法用本地语言（比如C或C++）实现。
    - 哈希码是一个代表对象的十六进制整数，好比对象的“身份证号”。在程序运行期间，每次调用同一个对象的hashCode()返回的哈希码必定相同，但是多次执行同一个程序，程序的一次执行和下一次执行期间同一个对象的哈希码不一定相同。实际上默认的哈希码是将对象的内存地址通过某种转换得到的，所以不同对象会有不同的哈希码。
    - hashCode规则：
        - 每当在Java应用程序的执行期间对同一对象多次调用该方法时，若用于equals比较对象的信息没有被修改，则hashCode方法必须始终返回相同的整数。从一个应用程序的一次执行到同一应用程序的另一次执行，该整数不需要保持一致。
        - 如果根据该方法两个对象equals方法判断相等，则它们调用hashCode方法必须产生相同的整数结果。
        - equals方法判断不相等的对象的hashCode值不必相等，hashCode值相等的两个对象equals方法不必返回相等。但是，为不相等的对象生成不同的整数结果有助于提高哈希表的性能。
- `public boolean equals(Object obj)`：返回某个其他对象是否“等于”这个对象（推荐阅读：[相等判定](https://blankspace.blog.csdn.net/article/details/129696778)）。
    - 该方法实际比较两个对象的内存地址是否相等，java.lang.Integer、java.lang.String等类都重写了该方法。
    - 为了避免java.lang.NullPointerException，在判断x.equals(y)前应该先判断x是否为null。对于字符串，判断空串的最佳实践是：`"".equals(str)`。
    - equals方法在非空对象引用上实现等价关系（推荐阅读：[等价关系](https://blankspace.blog.csdn.net/article/details/113792569)）：
        - 自反性：对于任何非空引用值x，`x.equals(x)`都应该返回true。
        - 对称性：对于任何非空引用值x和y，`x.equals(y)`返回true当且仅当`y.equals(x)`返回true。
        - 传递性：对于任何非空引用值 x、y和z，如果`x.equals(y`返回true且`y.equals(z)`返回true，则`x.equals(z)`应该返回true。
        - 一致性：对于任何非空引用值x和y，若用于equals比较对象的信息没有被修改，则多次调用`x.equals(y)`一致返回true或一致返回false。
    - 实现源码：
        ```java
        public boolean equals(Object obj) {
            return (this == obj);
        }
        ```
- `protected native Object clone() throws CloneNotSupportedException`：创建并返回当前对象的一份拷贝。
    - native意味着该方法用本地语言（比如C或C++）实现。
    - 推荐阅读：[浅拷贝与深拷贝](https://blankspace.blog.csdn.net/article/details/130355884)
- `public String toString()`：返回类的名字实例的哈希码的十六进制的字符串（`类名@hashcode十六进制数值`）。
    - Java建议Object所有的子类都重写这个方法。
    - 实现源码：
        ```java
        public String toString() {
            return getClass().getName() + "@" + Integer.toHexString(hashCode());
        }
        ```
- `public final native void notify()`：唤醒在此对象的监视器上等待的单个线程。如果有多个线程正在等待该对象，则选择唤醒其中一个线程。
    - native意味着该方法用本地语言（比如C或C++）实现。
    - final意味着该方法不允许派生类重写。
    - 唤醒选择选择是任意的，由具体实现决定。线程通过调用wait方法在对象的监视器上等待。
    - 唤醒的线程直到当前线程放弃对该对象的锁定才可能获得锁。即便当前线程放弃对该对象的锁定，被唤醒的线程也要与正在积极竞争同步该对象的任何其他线程进行竞争锁。
    - 此方法只能由作为此对象监视器所有者的线程调用，一次只有一个线程可以拥有一个对象的监视器。线程通过以下三种方式之一成为对象监视器的所有者：
        - 通过执行该对象的同步实例方法。
        - 通过执行在对象上同步的synchronized语句的主体。
        - 对于Class类型的对象，通过执行该类的静态同步方法。
- `public final native void notifyAll()`：唤醒在此对象的监视器上等待的所有线程。
    - native意味着该方法用本地语言（比如C或C++）实现。
    - final意味着该方法不允许派生类重写。
    - 线程通过调用wait方法在对象的监视器上等待。
    - 唤醒的线程直到当前线程放弃对该对象的锁定才可能获得锁。即便当前线程放弃对该对象的锁定，被唤醒的线程也要与正在积极竞争同步该对象的任何其他线程进行竞争锁。
    - 此方法只能由作为此对象监视器所有者的线程调用，一次只有一个线程可以拥有一个对象的监视器。线程通过以下三种方式之一成为对象监视器的所有者：
        - 通过执行该对象的同步实例方法。
        - 通过执行在对象上同步的synchronized语句的主体。
        - 对于Class类型的对象，通过执行该类的静态同步方法。
- `public final void wait() throws InterruptedException`：让当前线程等待直到它被唤醒（notified或interrupted）。
    - final意味着该方法不允许派生类重写。
    - 实现源码：
        ```java
         public final void wait() throws InterruptedException {
             wait(0L);
        }
        ```
- `public final void wait(long timeoutMillis) throws InterruptedException`：让当前线程等待直到它被唤醒（notified或interrupted或超时）。
    - final意味着该方法不允许派生类重写。
    - sleep方法没有释放锁，而wait方法释放了锁。
    - 实现源码：
        ```java
        public final void wait(long timeoutMillis) throws InterruptedException {
            long comp = Blocker.begin();
            try {
                wait0(timeoutMillis);
            } catch (InterruptedException e) {
                Thread thread = Thread.currentThread();
                if (thread.isVirtual())
                    thread.getAndClearInterrupt();
                throw e;
            } finally {
                Blocker.end(comp);
            }
        }
        ```
    - 调用的wait0方法定义为`private final native void wait0(long timeoutMillis) throws InterruptedException`。
- `public final void wait(long timeout, int nanos) throws InterruptedException`：让当前线程等待直到它被唤醒（notified或interrupted或超时）。
    - final意味着该方法不允许派生类重写。
    - sleep方法没有释放锁，而wait方法释放了锁。
    - 当前线程将自身置于此对象的等待队列中，然后放弃对此对象的所有同步声明。请注意，只有此对象上的锁被放弃；当前线程可能同步的任何其他对象在线程等待时保持锁定状态。
    - 一个线程可以在没有被通知、中断或超时的情况下被唤醒，这就是所谓的虚假唤醒。虽然这在实践中很少发生，但应用程序必须通过测试应该导致线程被唤醒的条件来防止它，如果条件不满足则继续等待。
    - 实现源码：
        ```java
        public final void wait(long timeoutMillis, int nanos) throws InterruptedException {
            if (timeoutMillis < 0) {
                throw new IllegalArgumentException("timeoutMillis value is negative");
            }
            if (nanos < 0 || nanos > 999999) {
                throw new IllegalArgumentException("nanosecond timeout value out of range");
            }
            if (nanos > 0 && timeoutMillis < Long.MAX_VALUE) {
                timeoutMillis++;
            }
            wait(timeoutMillis);
        }
        ```
- `protected void finalize() throws Throwable`：当垃圾收集确定不再有对该对象的引用时，由垃圾收集器对该对象调用。
    - 子类重写finalize方法以处理系统资源或执行其他清理。
    - Deprecated修饰，从Java9开始判定为过时。
    - 推荐阅读：[final、finally、finalize](https://blankspace.blog.csdn.net/article/details/130036796)
