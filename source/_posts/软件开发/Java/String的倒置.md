---
title: String的倒置
date: 2020-02-10 18:06:13
summary: 本文分享七种java.lang.String的倒置方法。
tags:
- Java
categories:
- 开发技术
---

# 字符串倒置

字符串倒置指的是将一个字符串中的字符顺序翻转过来，例如将字符串 "hello" 转置为 "olleh"。字符串倒置是字符串处理中的基本操作之一，在很多算法和编程题目中都有应用。

下面的代码段定义了下文用到的字符串和字符数组：

```java
String string = "ADFGJINJOOKC";
int length = string.length();
char[] chars0 = string.toCharArray();
```

# 方法1：倒转char[]

倒转char[]其实就是新生成一个char[]，正向遍历原char[]，把char数据逆向复制到新char[]中。

```java
char[] chars1 = new char[length];
for (int i = 0; i < length; i++) {
    chars1[i] = chars0[length-i-1];
}
System.out.println(new String(chars1));
```

# 方法2：利用StringBuilder的reverse()

虽然String没有reverse()，但可以利用String对象生成StringBuilder对象，再reverse()，打印就直接调toString()了，方便简洁。

```java
System.out.println(new StringBuilder(string).reverse());
```

# 方法3：直接拼接

所谓直接拼接，其实就是new一个StringBuilder对象，倒着遍历char[]，把char一个一个append()到StringBuilder对象上。

```java
StringBuilder reverse3 = new StringBuilder();
for (int i = length-1; i >= 0; i--) {
    reverse3.append(chars0[i]);
}
System.out.println(reverse3);
```

这不是一个很好的方法。

# 方法4：倒序输出

倒着遍历，直接打印。由于需要大量的IO，所以这种方法慢，不推荐。

```java
for (int i = length-1; i >= 0; i--) {
    System.out.print(chars0[i]);
}
System.out.println();
```

# 方法5：利用charAt(i)来拼接

String确实有charAt(i)，但为什么摆着现成的随机访问index不用呢？何必何必，感觉还不如方法三。

```java
StringBuilder reverse5 = new StringBuilder();
for (int i = length-1; i >= 0; i--) {
    reverse5.append(string.charAt(i));
}
System.out.println(reverse5);
```

# 方法6：使用栈来拼接

栈自然是可以的，LIFO，但单独拿出来而不利用数组的随机访问，大可不必。

何况是Java的java.util.Stack，效率很低（LinkedList等集合容器可以替代）。

```java
Stack<Character> stack = new Stack<>();
for (char c : chars0) {
    stack.push(c);
}
StringBuilder reverse6 = new StringBuilder();
while (!stack.isEmpty()) {
    reverse6.append(stack.pop());
}
System.out.println(reverse6);
```

# 方法7：两侧向中间交换

这个思想就是swap()，经典的交换算法。


```java
char[] chars7 = chars0;
for (int i = 0; i < length/2; i++) {
    char temp = chars7[i];
    chars7[i] = chars7[length-i-1];
    chars7[length-i-1] = temp;
}
System.out.println(new String(chars7));
```

该方法可以用位运算优化。

先写swap()：

```java
private static void swap(char a, char b) {
    if (a != b) {
        a ^= b;
        b ^= a;
        a ^= b;
    }
}
```

再写具体的交换：（毕竟引用传递嘛，隐去了指针，不需使用&）

```java
char[] chars8 = chars0;
for (int i = 0; i < length/2; i++) {
    swap(chars8[i], chars8[length-i-1]);
}
System.out.println(new String(chars8));
```

# 完整代码

```java
import java.util.Stack;

public class StringReverseTest {

    private static void swap(char a, char b) {
        if (a != b) {
            a ^= b;
            b ^= a;
            a ^= b;
        }
    }

    public static void main(String[] args) {
        String string = "ADFGJINJOOKC";
        int length = string.length();
        char[] chars0 = string.toCharArray();
        //方法一：倒转char[]
        char[] chars1 = new char[length];
        for (int i = 0; i < length; i++) {
            chars1[i] = chars0[length-i-1];
        }
        System.out.println(new String(chars1));
        //方法二：利用StringBuilder的reverse()
        System.out.println(new StringBuilder(string).reverse());
        //方法三：直接拼接
        StringBuilder reverse3 = new StringBuilder();
        for (int i = length-1; i >= 0; i--) {
            reverse3.append(chars0[i]);
        }
        System.out.println(reverse3);
        //方法四：直接倒着打印
        for (int i = length-1; i >= 0; i--) {
            System.out.print(chars0[i]);
        }
        System.out.println();
        //方法五：利用charAt(i)来拼接
        StringBuilder reverse5 = new StringBuilder();
        for (int i = length-1; i >= 0; i--) {
            reverse5.append(string.charAt(i));
        }
        System.out.println(reverse5);
        //方法六：使用栈来拼接
        Stack<Character> stack = new Stack<>();
        for (char c : chars0) {
            stack.push(c);
        }
        StringBuilder reverse6 = new StringBuilder();
        while (!stack.isEmpty()) {
            reverse6.append(stack.pop());
        }
        System.out.println(reverse6);
        //方法七：两侧向中间交换
        char[] chars7 = chars0;
        for (int i = 0; i < length/2; i++) {
            char temp = chars7[i];
            chars7[i] = chars7[length-i-1];
            chars7[length-i-1] = temp;
        }
        System.out.println(new String(chars7));
        //swap()
        char[] chars8 = chars0;
        for (int i = 0; i < length/2; i++) {
            swap(chars8[i], chars8[length-i-1]);
        }
        System.out.println(new String(chars8));
    }

}
```
