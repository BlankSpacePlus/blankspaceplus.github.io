---
title: JVM终止
date: 2021-02-14 00:06:49
summary: 本文分享JVM终止的可能原因与过程，并介绍了相关的类java.lang.System、java.lang.Runtime、java.lang.Shutdown、java.lang.ShutdownHooks、jdk.internal.misc.VM。
tags:
- Java
- JVM
categories:
- Java
---

# JVM终止

Java虚拟机在线程中执行代码。线程可以是非守护线程、守护线程或关闭钩子。

开发者可以参考java.lang.Thread和java.lang.Runtime的API规范，了解线程如何获得守护状态，以及java.lang.ApplicationShutdownHooks如何注册的细节。

对于一个线程，如果其run()方法正常完成，或其run()方法突然完成并且相关的未捕获异常处理程序正常或突然完成，该线程将终止。由于没有剩余代码可运行，线程已完成执行，因此没有当前执行中的方法。

Java虚拟机终止的原因可能是：
- 线程调用了java.lang.System.exit()或java.lang.Runtime.exit()，因此由Java虚拟机启动的所有关闭钩子（如果有的话）都已终止。
- 一个线程调用了java.lang.Runtime.halt()，此时没启动java.lang.ApplicationShutdownHooks。
- Java虚拟机实现将外部事件识别为请求终止Java虚拟机，因此由Java虚拟机启动的所有关闭钩子（如果有的话）都已终止。事件的性质超出了JVM规范的范围，但Java虚拟机实现可以可靠地处理它。例如，从操作系统接收信号。
- 发生了Java虚拟机实现无法处理的外部事件，此时没启动java.lang.ApplicationShutdownHooks。事件的性质超出了JVM规范的范围，但它必然是Java虚拟机实现无法以任何方式识别或恢复的东西。 示例包括在运行实施的过程中发生的致命错误，或从运行实施的计算机中移除电源。

在Java虚拟机终止时，任何尚未终止的守护程序或非守护程序线程将不再执行Java代码。线程的当前方法未正常或突然完成。

如果Java虚拟机因为线程调用java.lang.Runtime.halt()而终止，而关闭钩子正在运行，那么除了守护进程和非守护线程之外，任何尚未终止的关闭钩子都不会执行进一步的Java代码。

本机应用程序可以使用JNI调用API以这样一种方式创建和销毁Java虚拟机，即在初始类的主要方法中开始执行的Java程序在其所有非守护程序执行时退出线程已终止。 当最后一个非守护线程终止时，Java虚拟机不会自动终止。

# exit()方法

java.lang.System.exit()调用了java.lang.Runtime.exit()。

```java
public static void exit(int status) {
    Runtime.getRuntime().exit(status);
}
```

java.lang.Runtime.exit()调用了java.lang.Shutdown.exit()。

```java
public void exit(int status) {
    @SuppressWarnings("removal")
    SecurityManager security = System.getSecurityManager();
    if (security != null) {
        security.checkExit(status);
    }
    Shutdown.exit(status);
}
```

java.lang.Shutdown实现了exit()所必需的方法。

```java
static void exit(int status) {
    logRuntimeExit(status);         // Log without holding the lock;
    synchronized (Shutdown.class) {
        // Synchronize on the class object, causing any other thread that attempts to initiate shutdown to stall indefinitely
        beforeHalt();
        runHooks();
        halt(status);
    }
}
```

java.lang.Shutdown.beforeHalt()被定义为native的，用于通知JVM该进行halt()了。

```java
static native void beforeHalt();
```

java.lang.Shutdown.runHooks()实现了Java虚拟机在退出时执行所有的系统ShutdownHook。这些ShutdownHook是通过java.lang.Runtime.addShutdownHook()方法添加的。

```java
private static void runHooks() {
    synchronized (lock) {
        // Guard against the possibility of a daemon thread invoking exit after DestroyJavaVM initiates the shutdown sequence
        if (VM.isShutdown()) return;
    }
    for (int i=0; i < MAX_SYSTEM_HOOKS; i++) {
        try {
            Runnable hook;
            synchronized (lock) {
                // acquire the lock to make sure the hook registered during shutdown is visible here.
                currentRunningHook = i;
                hook = hooks[i];
            }
            if (hook != null) hook.run();
        } catch (Throwable t) {
            // ignore
        }
    }
    // set shutdown state
    VM.shutdown();
}
```

java.lang.Shutdown.runHooks()方法使用synchronized锁定java.lang.Shutdown对象，以便其他调用java.lang.Runtime.exit()、java.lang.Runtime.halt()或 JNI DestroyJavaVM 的线程会一直阻塞直到所有ShutdownHook执行完毕。在synchronized块中，它还检查了jdk.internal.misc.VM是否已关闭。如果jdk.internal.misc.VM已经关闭，则返回，不执行ShutdownHook。

接下来，代码循环遍历一个常量数组hooks，这个数组中包含了所有添加的ShutdownHook。在synchronized块中，获取当前要运行的ShutdownHook，如果它不为null，则运行它。

如果在执行ShutdownHook期间发生异常，它会被忽略。在所有ShutdownHook运行完成后，调用jdk.internal.misc.VM.shutdown()方法来设置jdk.internal.misc.VM的状态为关闭。

# halt()方法

java.lang.Runtime.halt()方法用于强制终止Java虚拟机，并且该方法是同步的，使用了一个锁来避免在删除JVM退出时要删除的文件列表时出现数据损坏。

```java
static void halt(int status) {
    synchronized (haltLock) {
        halt0(status);
    }
}

static native void halt0(int status);
```

具体而言，java.lang.Runtime.halt()方法采用一个整型参数status作为其参数。halt()方法首先获取同步锁，然后调用java.lang.Runtime.halt0()方法。java.lang.Runtime.halt0()方法是一个native方法，用于终止Java虚拟机。由于这是一个native方法，因此它的实现取决于特定的平台和实现。

因为在JVM退出时有一些操作要执行，例如清理临时文件，所以使用同步锁来避免在删除JVM退出时要删除的文件列表时出现数据损坏。这确保了退出过程是正确的，并且不会在删除文件列表时发生竞争条件。
