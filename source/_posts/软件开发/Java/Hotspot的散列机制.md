---
title: Hotspot的散列机制
date: 2023-06-04 01:51:21
summary: 本文分享Hotspot虚拟机的散列机制（hashCode计算方法）。
tags:
- Java
- JVM
- Hotspot
categories:
- Java
---

# hashCode()

hashCode()是Java中的关键方法，由java.lang.Object定义。

推荐阅读：[java.lang.Object](https://blankspace.blog.csdn.net/article/details/104711521)

```java
public class Object {
    // 其他内容
    @IntrinsicCandidate
    public native int hashCode();
    // 其他内容
}
```

native意味着该方法用本地语言（比如C或C++）实现。

Hotspot虚拟机对hash的实现位于[jdk/src/hotspot/share/runtime
/synchronizer.cpp](https://github.com/openjdk/jdk/blob/8f1ce78907f2765ac59aef23f25201353355e046/src/hotspot/share/runtime/synchronizer.cpp#L853)中。

```cpp
static inline intptr_t get_next_hash(Thread *current, oop obj) {
    intptr_t value = 0;
    if (hashCode == 0) {
        // This form uses global Park-Miller RNG.
        // On MP system we'll have lots of RW access to a global, so the
        // mechanism induces lots of coherency traffic.
        value = os::random();
    } else if (hashCode == 1) {
        // This variation has the property of being stable (idempotent)
        // between STW operations.  This can be useful in some of the 1-0
        // synchronization schemes.
        intptr_t addr_bits = cast_from_oop<intptr_t>(obj) >> 3;
        value = addr_bits ^ (addr_bits >> 5) ^ GVars.stw_random;
    } else if (hashCode == 2) {
        value = 1;            // for sensitivity testing
    } else if (hashCode == 3) {
        value = ++GVars.hc_sequence;
    } else if (hashCode == 4) {
        value = cast_from_oop<intptr_t>(obj);
    } else {
        // Marsaglia's xor-shift scheme with thread-specific state
        // This is probably the best overall implementation -- we'll
        // likely make this the default in future releases.
        unsigned t = current->_hashStateX;
        t ^= (t << 11);
        current->_hashStateX = current->_hashStateY;
        current->_hashStateY = current->_hashStateZ;
        current->_hashStateZ = current->_hashStateW;
        unsigned v = current->_hashStateW;
        v = (v ^ (v >> 19)) ^ (t ^ (t >> 8));
        current->_hashStateW = v;
        value = v;
    }
    value &= markWord::hash_mask;
    if (value == 0) value = 0xBAD;
    assert(value != markWord::no_hash, "invariant");
    return value;
}
```

`get_next_hash`是一个用于生成hashCode的函数。`get_next_hash`函数接收一个`Thread* current`和一个`oop obj`参数，并返回一个`intptr_t`类型的哈希码。

Thread类型定义于[jdk/src/hotspot/share/runtime/thread.hpp](https://github.com/openjdk/jdk/blob/8f1ce78907f2765ac59aef23f25201353355e046/src/hotspot/share/runtime/thread.hpp)中。

oop类型定义于[jdk/src/hotspot/share/oops/oopsHierarchy.hpp](https://github.com/openjdk/jdk/blob/8f1ce78907f2765ac59aef23f25201353355e046/src/hotspot/share/oops/oopsHierarchy.hpp)中。

`get_next_hash`函数使用了不同的方式来生成hashCode，具体根据hashCode变量的值进行不同的操作：
- 当hashCode等于0时，使用全局的Park-Miller随机数生成器生成随机数作为哈希码。
    - Park-Miller随机数生成器是一种线性同余生成器（LCG），由Stephen K. Park和Keith W. Miller在1988年提出。它是一种简单而高效的伪随机数生成算法，公式为`next = (previous * 48271) % 2147483647`。
    - LCG算法的基本思想是通过对先前生成的随机数进行一系列的线性操作（乘法、加法和模除）来生成下一个随机数。Park-Miller随机数生成器是LCG算法的一种特定实现。
    - Park-Miller随机数生成器的特点如下：
        - 周期性：使用合适的参数，Park-Miller随机数生成器的周期可以达到2147483646，几乎覆盖了所有可能的随机数。
        - 均匀性：生成的随机数在统计上具有良好的均匀性，即数字出现的频率接近相等。
        - 简单性：算法的实现非常简单，仅包含了简单的乘法、加法和模除操作。
        - 效率：算法的计算开销非常小，适用于大量随机数的快速生成。
- 当hashCode等于1时，使用对象的地址右移3位的值与其右移5位的值异或，再与全局的随机数GVars.stw_random异或，作为哈希码。
- 当hashCode等于2时，哈希码固定为1，用于敏感性测试。
- 当hashCode等于3时，使用全局的哈希码序列号`GVars.hc_sequence`加1作为哈希码。
- 当hashCode等于4时，直接将对象的地址转换为`intptr_t`类型作为哈希码。
- 其他情况下，使用Marsaglia的异或位移算法（xor-shift）结合线程特定的状态生成哈希码。
    - xor-shift算法是一种伪随机数生成算法，由计算机科学家George Marsaglia提出。它是一种简单且高效的位操作算法，用于生成伪随机数序列。该算法使用了一个内部状态变量，在每次生成伪随机数时，通过一系列的位移和异或操作对状态变量进行变换，从而得到下一个伪随机数。
    - xor-shift算法具有以下特点：
        - 简单性：算法的实现非常简单，仅使用了几个位操作（如左移、右移和异或）。
        - 高效性：算法的计算开销非常小，适合在计算资源有限的环境下使用。
        - 周期性：算法生成的伪随机数序列具有很长的周期，通常达到$2^{32}-1$或$2^{64}-1$，即几乎可以覆盖所有可能的值。
        - 均匀性：算法生成的伪随机数序列在统计上具有良好的均匀性，即数字出现的频率接近相等。
    - `get_next_hash`函数用到的xor-shift算法采用了32位版本，具体步骤如下：
        1. 从当前线程的状态变量`current->_hashStateX`中获取一个32位无符号整数t。
        2. 将`t`左移11位，并与`t`进行异或操作，将结果保存回`current->_hashStateX`。
        3. 将`current->_hashStateX`的值赋给`current->_hashStateY`。
        4. 将`current->_hashStateY`的值赋给`current->_hashStateZ`。
        5. 将`current->_hashStateZ`的值赋给`current->_hashStateW`。
        6. 从`current->_hashStateW`中获取一个32位无符号整数`v`。
        7. 将`v`右移19位，再与`v`右移8位进行异或操作，将结果保存回`current->_hashStateW`。
        8. 将`v`作为生成的伪随机数返回。
    - `get_next_hash`函数借助xor-shift算法，使用了线程特定的状态变量，因此在多线程环境下每个线程都会有自己的状态变量。通过不同的初始状态和不同的变换操作，每个线程可以生成独立的伪随机数序列。

无论使用哪种方式生成hashCode，最后都会将该hashCode与一个掩码进行按位与操作，以确保hashCode的位数符合要求。如果hashCode的值为0，则将其设置为`0xBAD`（表示错误的哈希码）。同时，`get_next_hash`函数还会进行一些断言检查以确保生成的哈希码满足某些不变性条件。

JVM参数`-XX:hashCode`可以配置hashCode的计算机制。例如`-XX:hashCode=4`意味着配置第五种hashCode机制。

# hashCode(Object o)

`java.util.Objects.hashCode(Object o)`对于null参数返回0，对非null参数返回真实的hashCode。

# identityHashCode(Object x)

`java.lang.System.identityHashCode(Object x)`对于null参数返回0，对非null参数返回与默认方法hashCode()返回的相同的哈希码（无论给定对象的类是否重写hashCode()）。

```java
public static int hashCode(Object o) {
    return o != null ? o.hashCode() : 0;
}
```
