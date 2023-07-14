---
title: 分治算法解决Gray码问题
date: 2021-02-15 21:23:41
summary: 本文基于分治算法解决格雷码问题，用Java编程实现。
mathjax: true
tags:
- 算法
- Java
categories:
- 算法分析与设计
---

# 问题描述

**Gray码**是一个长度为$2n$的序列。序列中无相同的元素，每个元素都是长度为$n$位的串，相邻元素恰好只有一位不同。用分治策略设计一个算法对任意的$n$构造相应的Gray码。  

# 编程任务

利用分治策略试设计一个算法对任意的$n$构造相应的Gray码。

# 数据输入

由文件**input.txt**提供输入数据$n$。

# 结果输出

程序运行结束时，将得到的所有编码输出到文件**output.txt**中。

# 求解思路

把原问题分解为两个子问题，分别对两个子问题的每个数组后一位加$0$和$1$。

# 自定义输入文件示例

```txt
3
```

# 编程实现

```java
import java.io.*;

public class Solution2 {

    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("src/dc/input2.txt"));
             BufferedWriter writer = new BufferedWriter(new FileWriter("src/dc/output2.txt"))){
            int bitNum = Integer.parseInt(reader.readLine());
            for(int i = 0; i < (int)Math.pow(2, bitNum); i++){
                int num = (i >> 1) ^ i;
                StringBuilder result = new StringBuilder();
                for(int j = bitNum-1; j >= 0; j--){
                    result.append((num >> j) & 1);
                }
                result.append('\n');
                System.out.print(result);
                writer.write(result.toString());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
```

# 输出结果

```txt
000
001
011
010
110
111
101
100
```
