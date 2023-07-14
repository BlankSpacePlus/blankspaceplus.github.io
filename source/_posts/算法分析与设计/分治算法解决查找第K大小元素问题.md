---
title: 分治算法解决查找第K大小元素问题
date: 2020-09-26 21:21:03
summary: 本文基于分治算法解决查找第K大小元素问题，用Java和C++编程实现。
mathjax: true
tags:
- 算法
- Java
categories:
- 算法分析与设计
---

# 问题描述

就是给出一个随机序列，序列元素可比较，查出第K大元素或者第K小元素。
这是一个经典的算法题，之前也写过，这里总结一下思路。

# 思路介绍

## 思路一：先排序再直接取元素

对于一个随机序列，快排的性能应该是最好的啦（基础排序算法），稍加优化性能更佳。
我们先对序列用 <font color="red">数组/顺序</font> 表存储起来，再快排（如果懒得写，Java可用java.util.Arrays.sort()，C++可用STL的sort()）。
排完以后就利用其直接访问的特点取第K大/小元素即可。

该策略时间复杂度$O(n\log{n})$。

## 思路二：维护一个大小为K的乱序数组进行替换

我们可以先取下来随机序列前$K$个元素，放在一个乱序的数组中，每次都换掉其中最小/大的元素（前提是比这个元素大/小）。
这样就不需要完整地排序，时间复杂度$O(n×k)$。
当$k>\log{n}$的情况下，不如直接排序。

## 思路三：维护一个堆最后直接取堆顶元素

我们上面的算法时间复杂度之所以需要乘以$K$，是因为乱序，每次要找最小/大元素，那我们不如维护一个大小为$K$的堆。求第$K$大就建立小根堆，最后直接取堆顶；求第$K$小就建立大根堆，最后也是直接取堆顶。

具体操作就是先拿前$K$个元素建立二叉小根堆/大根堆，需要时间$O(k)$，然后每次调整也就是$O(\log{k})$，次数是$(n-k)$，所以是$O(k+\log{k}(n-k))$，如果说$K<<N$，就近似于$O(n\log{k})$，这就能实现很大程度上的优化了。

## 思路四：分治法

这个思路很秀，简单说一下。
怎么分治呢？大家还记得快排吧，其实很相似，我们利用了与其“划分”很类似的做法。
以第$K$小元素为例：
取一个中间元素放到最左边，比其小的换到左边，比其大的不动，完成划分，不必排序。
划分完成就看看选取的中间值的id与$K$的关系，最后当$K$与id吻合时，左边的元素就是比$K$小的元素，划分中值就是第$K$小元素。
该算法的时间复杂度甚至能达到$O(n)$。

# 编程实现

## 第K小元素-思路一-Java编程实现

[洛谷 P1138 第K小整数](https://www.luogu.com.cn/problem/P1138)

以下代码通过TreeSet实现：
```java
import java.util.Scanner;
import java.util.Set;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt(), k = scanner.nextInt();
        Set<Integer> set = new TreeSet<>();
        for (int i = 0; i < num; i++) {
            set.add(scanner.nextInt());
        }
        scanner.close();
        if (k > set.size()) {
            System.out.println("NO RESULT");
        } else {
            int counter = 0;
            for (int i : set) {
                counter++;
                if (counter == k) {
                    System.out.println(i);
                    break;
                }
            }
        }
    }
}
```

## 第K大元素-思路三-Java编程实现

```java
import java.util.Scanner;

public class Main {

    public static int findNumberK(int[] array, int k){
        // 用前k个元素构建小顶堆
        buildHeap(array, k);
        // 继续遍历数组，和堆顶比较
        for (int i=k; i<array.length;i++){
            if (array[i] > array[0]){
                array[0] = array[i];
                downAdjust(array, 0, k);
            }
        }
        // 返回堆顶元素
        return array[0];
    }

    private static void buildHeap(int[] array, int length) {
        // 从最后一个非叶子节点开始，依次下沉调整
        for (int i = (length- 2)/ 2; i >= 0; i--) {
            downAdjust(array, i, length);
        }
    }

    private static void downAdjust(int[] array, int index, int length) {
        // 保存父节点值，用于最后的赋值
        int temp = array[index];
        int childIndex = 2 * index + 1;
        while (childIndex < length) {
            // 如果有右孩子，且右孩子小于左孩子的值，则定位到右孩子
            if (childIndex + 1 < length && array[childIndex + 1] < array[childIndex]) {
                childIndex++;
            }
            // 如果父节点小于任何一个孩子的值，直接跳出
            if (temp <= array[childIndex]) {
                break;
            }
            // 无需真正交换，单向赋值即可
            array[index] = array[childIndex];
            index = childIndex;
            childIndex = 2 * childIndex + 1;
        }
        array[index] = temp;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt(), k = scanner.nextInt();
        int[] array = new int[num];
        for (int i = 0; i < num; i++) {
            array[i] = scanner.nextInt();
        }
        scanner.close();
        System.out.println(findNumberK(array, k));
    }

}
```

## 第K小元素-思路四-Java编程实现

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {

    private static int[] nums;

    private static int k, num;

    private static void swap(int left, int right) {
        int temp = nums[left];
        nums[left]  = nums[right];
        nums[right] = temp;
    }

    private static void sort(int left, int right) {
        int left_mid=left, right_mid=right, mid= nums[(left+right)/2];
        while (left_mid <= right_mid) {
            while (nums[right_mid] > mid) {
                right_mid--;
            }
            while (nums[left_mid] < mid) {
                left_mid++;
            }
            if (left_mid <= right_mid && right_mid < num) {
                swap(left_mid, right_mid);
                left_mid++;
                right_mid--;
            }
        }
        if (k <= right_mid) {
            sort(left, right_mid);
        } else if (left_mid <= k) {
            sort(left_mid, right);
        } else {
            System.out.println(nums[right_mid+1]);
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String[] line1 = reader.readLine().split("\\s+");
        num = Integer.parseInt(line1[0]);
        k = Integer.parseInt(line1[1]);
        nums = new int[num];
        String[] array = reader.readLine().split("\\s+");
        for (int i = 0; i < num; i++) {
            nums[i] = Integer.parseInt(array[i]);
        }
        reader.close();
        sort(0, num-1);
    }

}
```

## 第K小元素-思路四-C++编程实现

```cpp
#include <bits/stdc++.h>

using namespace std;

int nums[5000005], k, num;

void sort(int left, int right) {
    int left_mid = left, right_mid = right, mid = nums[(left + right) / 2];
    while (left_mid <= right_mid) {
        while (nums[right_mid] > mid) {
            right_mid--;
        }
        while (nums[left_mid] < mid) {
            left_mid++;
        }
        if (left_mid <= right_mid) {
            swap(nums[left_mid], nums[right_mid]);
            left_mid++;
            right_mid--;
        }
    }
    if (k <= right_mid) {
        sort(left, right_mid);
    } else if (left_mid <= k) {
        sort(left_mid, right);
    } else {
        cout << nums[right_mid + 1] << "\n";
        return;
    }
}

int main() {
    scanf("%d%d", &num, &k);
    for (int i = 0; i < num; i++) {
        scanf("%d", &nums[i]);
    }
    sort(0, num - 1);
    return 0;
}
```

## 第K小元素-C++内置函数调用

```cpp
#include<bits/stdc++.h>

using namespace std;

long long num, k, nums[5000010];

int main() {
    scanf("%d%d", &num, &k);
    for(int i=0; i < num; i++) {
        scanf("%d", &nums[i]);
    }
    nth_element(nums, nums + k, nums + num);
    printf("%d", nums[k]);
}
```
