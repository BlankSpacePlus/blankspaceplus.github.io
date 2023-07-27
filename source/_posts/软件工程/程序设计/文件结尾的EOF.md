---
title: 文件结尾的EOF
date: 2023-03-25 12:32:34
summary: 本文分享文件末尾的EOF的相关内容。
tags:
- 程序设计
categories:
- 程序设计
---

# EOF

EOF（End of File）指的是文件结束符号，是在计算机编程中用来表示文件末尾的标记。当程序在读取文件时，会一直读取文件直到读到EOF标记，此时程序会停止读取并结束。

EOF是计算机编程中一个非常重要的概念，它帮助程序员确定文件和数据传输的边界，从而更好地控制程序的行为。

在不同的操作系统中，EOF的实现方式可能略有不同。例如在Unix和Linux系统中，EOF通常通过输入Ctrl+D键来表示；而在Windows系统中，EOF则通过输入Ctrl+Z键来表示。

在编程语言中，EOF通常作为一个常量或预定义符号来使用，以便程序员能够在读取文件时检测文件是否已经结束。在C语言中，EOF常量的值通常为-1；而在Python中，EOF则被表示为None。

除了在文件读取中使用外，EOF在网络编程中也经常使用。例如，在TCP/IP协议中，当一个网络连接被关闭时，EOF标记会被发送到接收端以表示数据传输的结束。

# EOF应用示例

从文件中读取字符并输出：
```c
#include <stdio.h>

int main()
{
    char c;
    FILE *fp = fopen("file.txt", "r");
    while ((c = fgetc(fp)) != EOF)
    {
        putchar(c);
    }
    fclose(fp);
    return 0;
}
```

从标准输入中读取字符并输出：
```c
#include <stdio.h>

int main()
{
    char c;
    while ((c = getchar()) != EOF) {
        putchar(c);
    }
    return 0;
}
```

# EOFException

EOFException是Java编程语言中的一个异常类，它表示当尝试读取输入流中的数据时，已经到达了流的末尾，但是仍然尝试读取数据时抛出的异常。

EOFException通常发生在使用DataInputStream或ObjectInputStream等输入流类时。在读取完文件中的所有数据后，继续读取数据就会抛出EOFException异常。

在Java中，EOFException继承自IOException异常类，因此它也是一个检查异常。当程序发生EOFException异常时，通常需要对异常进行处理，例如捕获异常并关闭输入流以避免资源泄漏。

下面是一个使用DataInputStream读取文件至出现EOFException异常的示例：
```java
import java.io.DataInputStream;
import java.io.EOFException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class EOFTest {

    @Test
    public void eofExceptionTest() {
        Assertions.assertThrows(EOFException.class, () -> {
            DataInputStream inputStream = new DataInputStream(Files.newInputStream(Paths.get("README.md")));
            while (true) {
                int data = inputStream.readInt();
                System.out.println(data);
            }
        });
    }

}
```

在上面的代码中，程序使用DataInputStream类从文件中读取int类型的数据，如果已经到达文件末尾，就会抛出EOFException异常，程序将捕获该异常并输出"End of file reached."。
