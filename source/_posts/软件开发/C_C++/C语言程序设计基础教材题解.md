---
title: C语言程序设计基础教材题解
date: 2020-10-21 11:07:22
summary: 本文是自编题解，教材为清华大学出版社高克宁等著程序设计基础(C语言)。
tags:
- C语言
categories:
- 开发技术
---

# 第一章 计算机及程序设计概述

1.略

2.略

3.略

4.代码如下：
```c
#include <stdio.h>

int main() {
    printf("请输入摄氏温度℃：");
    double temperature;
    scanf("%lf", &temperature);
    printf("对应的华氏温度是：%.2lf℉\n", 1.8*temperature+32);
    return 0;
}
```

5.代码如下：(注意这里使用了位运算优化，朴素算法是`num%2==0`)
```c
#include <stdio.h>

int main() {
    printf("请输入一个整数：");
    int num;
    scanf("%d", &num);
    printf("该整数%s一个偶数\n", ((num&1)==0?"是":"不是"));
    return 0;
}
```

6.代码如下(此代码没有考虑浮点误差)：
```c
#include <stdio.h>

int main() {
    printf("请输入待判断的三条边长：");
    double a, b, c;
    scanf("%lf %lf %lf", &a, &b, &c);
    printf("这三条边%s构成一个三角形\n", ((a+b>c&&a+c>b&&b+c>a)?"能":"不能"));
    return 0;
}
```

7.代码如下(没考虑浮点保留位数)：<br/>
(1)
```c
#include <stdio.h>

int main() {
    printf("请输入两个数值，以空格分隔：");
    double a, b;
    scanf("%lf %lf", &a, &b);
    printf("最大的数是：%lf\n", (a>=b?a:b));
    return 0;
}
```
(2)
```c
#include <stdio.h>

int main() {
    printf("请输入三个数值，以空格分隔：");
    double a, b, c;
    scanf("%lf %lf %lf", &a, &b, &c);
    printf("最大的数是：%lf\n", (a>=b&&a>=c?a:b>=a&&b>=c?b:c));
    return 0;
}
```
(3)(切记max初始值不能定义为0，否则就相当于全负数会WA掉)
```c
#include <stdio.h>

int main() {
    printf("请输入10个数值，以空格分隔：");
    // 注意不需要使用10个数值或者1个长度为10数组，毕竟我们只需要求出最大值而已
    double max, temp;
    scanf("%lf", &max);
    for (int i = 1; i < 10; i++) {
        scanf("%lf", &temp);
        if (temp > max) {
            max = temp;
        }
    }
    printf("最大的数是：%lf\n", max);
    return 0;
}
```
(4)自行补充：输入任意数量的数值，找出max(下面这个程序的不足是如果输入空格再回车会程序会RE掉)
```c
#include <stdio.h>

int main() {
    printf("请输入任意个数值，以空格分隔，以回车结束(回车前请不要留有空格)：");
    double max = 0, temp;
    while (1) {
        scanf("%lf", &temp);
        if (temp > max) {
            max = temp;
        }
        if (getchar() == '\n') {
            break;
        }
    }
    printf("最大的数是：%lf\n", max);
    return 0;
}
```

8.代码如下：
```c
#include <stdio.h>

int main() {
    printf("请输入10个数值，以空格分隔：");
    double sum = 0, temp;
    for (int i = 0; i < 10; i++) {
        scanf("%lf", &temp);
        sum += temp;
    }
    printf("这10个数的总和是：%lf\n", sum);
    return 0;
}
```

9.代码如下(引入了基本的范围检查)：
```c
#include <stdio.h>

int main() {
    printf("请输入一个三位整数：");
    int n, a, b, c;
    scanf("%d", &n);
    if (n < 100 || n > 999) {
        printf("输入错误！\n");
        return -1;
    }
    c = n;
    a = c / 100;
    c %= 100;
    b = c / 10;
    c %= 10;
    printf("三位数%d的百位数字是%d十位数字是%d个位数字是%d\n", n, a, b, c);
    return 0;
}
```

10.代码如下(引入了基本的范围检查)：
```c
#include <stdio.h>

int main() {
    printf("请输入一个年份：");
    int year;
    scanf("%d", &year);
    if (year < 0) {
        printf("输入年份错误！\n");
        return -1;
    }
    printf("%d年%s闰年\n", year, (year%400==0 || (year%100!=0 && year%4==0) ? "是" : "不是"));
    return 0;
}
```

# 第二章 信息编码与数据类型

1.略

2.略

3.略

4.略

5.略

6.略

7.答案如下：
(1)合法标识符：Long、int_a、sum、x001、computer、AGE、_print、nCount、fun_array、If、main、for_int、Float
(2)关键词：switch、while、struct
(3)其他不合法标识符：10_1010`(数字开头所以不对)`、1_abc`(数字开头所以不对)`、union age`(包含空格所以不对)`、"string"`(包含引号格所以不对)`

8.运行结果：`2147483647, -2147483549`
解读：int最大值为2^31-1，即2147483647，所以a就是MAX_INT，其二进制补码为`01111111111111111111111111111111`，加100(`00000000000000000000000001100100`)等于`10000000000000000000000001100011`，这是补码，反码为`10000000000000000000000001100010`，原码为`11111111111111111111111110011101`，即-(2147483647-64-32-2)=`-2147483549`。

9.运行结果：`2200000000, -2094967296`
解读：int最大值为2^31-1，即2147483647；unsigned int最大值为2^32-1，即4294967295。2147483647<2200000000<4294967295，其无符号二进制是`10000000001000010101011000000000`，转为int后`10000011001000010101011000000000`被认为是补码，其反码为`10000011001000010101010111111110`，对应原码为`11111100110111101010101000000001`，十进制为-(2147483647-33554432-16777216-2097152-65536-16384-4096-1024-256-128-64-32-16-8-4-2-1)=`-2094967296`。

10.解析如下：
(1)正确
(2)错误，类型不匹配
(3)错误，不同类型变量的声明不能用逗号运算符分隔
(4)错误，应该写成`int a = 10, b = 10; c = 10;`或者`int a,b,c; a=b=c=10;`
(5)错误，不能将字符串赋值给字符类型变量
(6)正确，写成l也行，但L更容易分辨
(7)正确
(8)错误，类型不匹配
(9)正确，只不过x并没有被赋值
(10)正确，这两种写法都是OK的

# 第三章 基本运算与顺序结构

1.++arg和arg++都能实现自增，直接将++arg赋值给其他变量得到的是arg+1，而将arg++赋值给其他变量得到的是arg(要记得这两个过程中arg自身还是自增1的)。具体细节与编译器有关，不好直接说，不建议深究(遇到那些脑残的++题就当我没说，毫无营养)。
最简单但不正确的理解是：++arg先执行自增再赋值而arg++先执行赋值再自增。

2.解析如下：
(1)int类型，值为24。原因：'\10'是八进制表示，所以其int值为8，ch*3结果为24。
(2)float类型，值为0.387500。原因：char自动转型为float，相当于3.1/8.0。
(3)double类型，值为8.900001(有浮点误差)。原因：自动转型为double，运算存在浮点数误差，精确值是8.9，默认保留6位小数是8.900001。另外，如果x不是float类型而是double类型，则结果会是8.9。
(4)long int类型，值为52。
(5)double类型，值为1.995000。
(6)int类型，值为3。原因：浮点数强转整数，这是一个截断取整的过程，所以截断小数部分得到3。
(7)char类型，值为'a'。注意：如果按照int来输出，则输出97；另外，如果ch='a'这个条件是if条件的布尔表达式，则得到是1(TRUE)。

3.首先考虑到加减运算的较低优先级，将整个表达式分成三部分：`(float)(a+b)/2`、`(int)x%(int)y`、`x/a`。
第一个子表达式得到7.0/2=3.5，第二个子表达式得到7%2=1，第三个子表达式得到7.5/2=3.75，所以结果是8.25。

4.所谓的`n%=n+=n-=n*n`，其实就是`n%=(n+=(n-=(n*n)))`，`n*n`有最高的优先级，但不管怎么算`n*n`是没有赋值给任何变量的，所以仍然是`n-=n`得到0(n=0)，然后`n+=0`也是得到0，最后`n%=0`得到0

5.答案是0。理由：&&优先级和()优先级都高于=，所以b==a输出0，由于短路与所以输出0（事实上a+b!=20输出1），直接赋值给c。

6.程序如下：
```c
#include <stdio.h>

int main() {
    int var1 = 55555;
    unsigned int var2 = 55555;
    int var3 = 1234;
    unsigned int var4 = 1234;
    double var5 = -1.2345, var6 = 12345.12345, var7 = 1234567.1234567;
    int var8 = 0123, var9 = 0x123;
    char var10 = 'a';
    printf("%-8d\n", var1);
    printf("%8u\n", var2);
    printf("%10.6d", var1);
    printf("%-8d\n", var3);
    printf("%-8u\n", var4);
    printf("%010lf", var5);
    printf("%-14.2f", var6);
    printf("%14.4f\n", var7);
    printf("%o\n", var8);
    printf("%x\n", var9);
    printf("%04c\n", var10);
    return 0;
}
```

7.程序如下：
```c
#include <stdio.h>

int main() {
    int a, b, c, hour, minute, second;
    char ch;
    long int e;
    double f;
    // (1) 12,34,56
    scanf("%d,%d,%d", &a, &b, &c);
    printf("%d,%d,%d\n", a, b, c);
    // (2) 123456789
    scanf("%3d%3d%3d", &a, &b, &c);
    printf("%d,%d,%d\n", a, b, c);
    // (3) 123c
    scanf("%d%c", &a, &ch);
    printf("%d,%c\n", a, ch);
    // (4) 11:11:11
    scanf("%d:%d:%d", &hour, &minute, &second);
    printf("%d,%d,%d\n", hour, minute, second);
    // (5) 赋给了e和f 55555,55555.555555
    scanf("%ld,%lf", &e, &f);
    printf("%ld,%lf\n", e, f);
    // (6) 123,123
    scanf("%o,%x", &a, &b);
    printf("%o,%x\n", a, b);
    return 0;
}
```

8.代码如下：
```c
#include <stdio.h>

int main() {
    printf("请输入一个字母：");
    char c;
    c = getchar();
    switch (c) {
        case 'a':
        case 'A':
            printf("没有前置字母\n后置字母为%c", c+1);
            break;
        case 'z':
        case 'Z':
            printf("前置字母为%c\n没有后置字母", c-1);
            break;
        default:
            printf("前置字母为%c\n后置字母为%c", c-1, c+1);
            break;
    }
    return 0;
}
```

9.代码如下：
```c
#include <stdio.h>
#include <math.h>

int main() {
    printf("请输入圆的半径：");
    double r;
    scanf("%lf", &r);
    printf("圆的周长为：%.2lf\n圆的面积为%.2lf\n", 2*M_PI*r, M_PI*r*r);
    return 0;
}
```

10.代码如下：
```c
#include <stdio.h>
#include <math.h>

int main() {
    double x = 0.5;
    printf("%.2lf", sin(x));
    return 0;
}
```

# 第四章 逻辑判断与选择结构

1.(逻辑运算符优先级：非>与>或)
(1)`!a||a`：1(TRUE)
(2)`a&&!a`：0(FALSE)
(3)`!a||(a&&1)`：1(TRUE)
(4)`a&&(!a||1)`：1(TRUE)

2.语句如下：
(1)`x<z ^ y<z`
(2)`x<0&&y<0&&z>=0 || x<0&&y>=0&&z<0 || z>=0&&y<0&&z<0`
(3)`!(x&1)`

3.代码如下：
```c
#include <stdio.h>

int main() {
    int n;
    printf("请输入后推天数N：");
    scanf("%d", &n);
    char* str;
    switch ((n+5)%7) {
        case 0:
            str = "星期一";
            break;
        case 1:
            str = "星期二";
            break;
        case 2:
            str = "星期三";
            break;
        case 3:
            str = "星期四";
            break;
        case 4:
            str = "星期五";
            break;
        case 5:
            str = "星期六";
            break;
        default:
            str = "星期日";
            break;
    }
    printf("%s", str);
    return 0;
}
```

4.代码如下(暴力求解)：
```c
#include <stdio.h>
#include <stdlib.h>

// 从大到小
int cmpFunc (const void *a, const void *b) {
    return -(*(int*)a - *(int*)b);
}

int main() {
    int values[4];
    for (int i = 0; i < 4; i++) {
        scanf("%d", &values[i]);
    }
    qsort(values, 4, sizeof(int), cmpFunc);
    for (int i = 0; i < 4; i++) {
        printf("%d ", values[i]);
    }
    printf("\n");
    return 0;
}
```

5.代码如下：
```c
#include <stdio.h>
#include <math.h>

int main() {
    double x, result;
    printf("请输入函数自变量x：");
    scanf("%lf", &x);
    if (x <= 0) {
        result = 0;
    } else if (x <= 10) {
        result = x;
    } else {
        result = 0.5 + sin(x);
    }
    printf("%.2f", result);
    return 0;
}
```

6.代码如下：
```c
#include <stdio.h>
#include <ctype.h>

int main() {
    char c;
    char *result;
    printf("请输入一个字符：");
    scanf("%c", &c);
    if (isupper(c)) {
        result = "大写字母";
    } else if (islower(c)) {
        result = "小写字母";
    } else if (isdigit(c)){
        result = "数字";
    } else {
        result = "其他";
    }
    printf("%c是%s字符", c, result);
    return 0;
}
```

7.代码如下：
```c
#include <stdio.h>
#include <ctype.h>

int main() {
    double profit = 0, reward = 0;
    printf("请输入当月利润：");
    scanf("%lf", &profit);
    if (profit < 50000) {
        reward = 0;
    } else if (profit < 100000) {
        reward = 0.1 * profit;
    } else if (profit < 200000){
        reward = 0.075 * profit;
    } else if (profit < 300000){
        reward = 0.05 * profit;
    } else {
        reward = 0.02 * profit;
    }
    printf("奖金总额是：%.2lf元", reward);
    return 0;
}
```

8.代码如下：
```c
#include <stdio.h>

int main() {
    int num, a, b;
    printf("请输入一个不大于三位数的正整数：");
    scanf("%d", &num);
    a = num / 100;
    num %= 100;
    b = num / 10;
    num %= 10;
    printf("%d", a+b+num);
    return 0;
}
```

9.代码如下：
```c
#include <stdio.h>

int main() {
    int num, a, b;
    printf("请输入一个两位的正整数：");
    scanf("%d", &num);
    if (num < 10 || num > 99) {
        printf("输入数据不合法");
        return -1;
    }
    a = num / 10;
    b = num % 10;
    printf("%d", (a > b ? a+b*10 : num));
    return 0;
}
```

10.代码如下：
```c
#include <stdio.h>

int main() {
    // Monday Tuesday Wednesday Thursday Friday Saturday Sunday
    char tempChar;
    char *day;
    printf("请输入代表星期几的字符：");
    tempChar = getchar();
    switch (tempChar) {
        case 'm':
        case 'M':
            day = "星期一";
            break;
        case 'w':
        case 'W':
            day = "星期三";
            break;
        case 'f':
        case 'F':
            day = "星期五";
            break;
        case 't':
        case 'T':
            tempChar = getchar();
            if (tempChar == 'u') {
                day = "星期二";
            } else if (tempChar == 'h') {
                day = "星期四";
            } else {
                printf("输入错误！");
                return -1;
            }
            break;
        case 's':
        case 'S':
            tempChar = getchar();
            if (tempChar == 'a') {
                day = "星期六";
            } else if (tempChar == 'u') {
                day = "星期日";
            } else {
                printf("输入错误！");
                return -1;
            }
            break;
        default:
            printf("输入错误！");
            return -1;
    }
    printf("你输入的是%s", day);
    return 0;
}
```

# 第五章 迭代计算与循环结构

1.代码如下：
```c
#include <stdio.h>

int main() {
    double sum = 0, prev = 1, next = 2, temp;
    for (int i = 0; i < 10; i++) {
        sum += (next / prev);
        temp = next;
        next = prev + next;
        prev = temp;
    }
    printf("和为%.2lf", sum);
    return 0;
}
```

2.代码如下：
```c
#include <stdio.h>

int main() {
    int num;
    printf("请输入n的值：");
    scanf("%d", &num);
    long long sum = 1, temp = 0;
    for (int i = 1; i <= num; i++) {
        temp += i;
        printf("第%d项的值是%ld\n", i, temp);
        sum *= temp;
    }
    printf("各项之积为：%ld\n", sum);
    return 0;
}
```

3.代码如下：
```c
#include <stdio.h>

int main() {
    int max = 0, min = 0, num;
    while (1) {
        scanf("%d", &num);
        if (!num) {
            break;
        } else if (num < 0) {
            continue;
        }
        if (max == 0 && min == 0) {
            max = num;
            min = num;
        }
        if (max < num) {
            max = num;
        }
        if (min > num) {
            min = num;
        }
    }
    if (max == 0 && min == 0) {
        printf("没有输入正整数！\n");
    }
    printf("输入的正整数中，最大的是%d，最小的数是%d\n", max, min);
    return 0;
}
```

4.代码如下：
```c
#include <stdio.h>

int gcd(int m, int n) {
    int temp;
    while (n > 0) {
        temp = m % n;
        m = n;
        n = temp;
    }
    return m;
}

int main() {
    int m, n;
    printf("请输入两个数，空格分隔：");
    scanf("%d %d", &m, &n);
    int gcdResult = gcd(m, n);
    printf("最大公约数为：%d\n最小公倍数为：%d\n", gcdResult, m*n/gcdResult);
    return 0;
}
```

5.代码如下：
```c
#include <stdio.h>

int main() {
    int a, b, c;
    for (int i = 100; i < 1000; i++) {
        c = i;
        a = c / 100;
        c %= 100;
        b = c / 10;
        c %= 10;
        if (i == a * a * a + b * b * b + c * c * c) {
            printf("%d是水仙花数\n", i);
        }
    }
    return 0;
}
```

6.代码如下(暴力求解)：
```c
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 1000; i++) {
        for (int j = 1; j < i; j++) {
            if (i % j == 0) {
                sum += j;
            }
        }
        if (i == sum) {
            printf("%d是完数\n", i);
        }
        sum = 0;
    }
    return 0;
}
```

7.代码如下(使用了欧拉筛)：
```c
#include <stdio.h>
#include <string.h>

int n = 1000, pointer = 0;

// 欧拉筛
void euler(int *nums, int *primes) {
    for (int i = 2; i < n; i++) {
        if (!nums[i]) {
            primes[pointer++] = i;
        }
        for (int j = 0; j < pointer && i*primes[j] < n; j++) {
            nums[i*primes[j]] = 1;
            if (!i % primes[j]) {
                break;
            }
        }
    }
}

int main() {
    int nums[n+1], primes[n];
    memset(nums, 0, sizeof(nums));
    euler(nums, primes);
    printf("请输入一个1000以内的正偶数(大于4)：");
    int num;
    scanf("%d", &num);
    if (num <= 4 || num >= 1000 || (num&1)) {
        printf("输入数据不合法！");
        return -1;
    }
    for (int i = 0; i < pointer; i++) {
        for (int j = 0; j < pointer; j++) {
            if (primes[i] + primes[j] == num) {
                printf("%d = %d + %d", num, primes[i], primes[j]);
                return 0;
            }
        }
    }
    return 0;
}
```

8.代码如下(暴力算法)：
```c
#include <stdio.h>

int main() {
    int counter = 0;
    for (int i = 1; i <= 4; i++) {
        for (int j = 1; j <= 4; j++) {
            if (j == i) {
                continue;
            }
            for (int k = 1; k <= 4; k++) {
                if (k == i || k == j) {
                    continue;
                }
                for (int l = 1; l <= 4; l++) {
                    if (l == i || l == j || l == k) {
                        continue;
                    }
                    printf("%d%d%d%d\n", i, j, k, l);
                    counter++;
                }
            }
        }
    }
    printf("一共%d个\n", counter);
    return 0;
}
```

9.代码如下：
```c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            for (int k = 0; k <= 9; k++) {
                if (i*100+j*10+k+j*100+k*10+k == 532) {
                    printf("xyz+yzz=532中，x=%d, y=%d, c=%d\n", i, j, k);
                    break;
                }
            }
        }
    }
    return 0;
}
```

10.代码如下：
```c
#include <stdio.h>
#include <time.h>
#include <stdlib.h>

int main() {
    srand(time(0));
    printf("猜数字游戏开始！\n");
    int times = 1, result, answer;
    char choice[1024];
    while (1) {
        printf("这是第%d次游戏\n", times);
        result = rand();
        for (int i = 1; i <= 10; i++) {
            printf("你的第%d次猜测：", i);
            scanf("%d", &answer);
            if (answer == result) {
                printf("你猜对啦！\n");
                break;
            } else if (answer < result) {
                printf("你猜低了！\n");
            } else {
                printf("你猜高了！\n");
            }
            if (i < 10) {
                printf("请继续猜！\n");
            } else {
                printf("游戏失败！答案是：%d\n", result);
            }
        }
        printf("是否继续猜数字(Y/N)？");
        scanf("%s", &choice);
        while (choice[0] != 'N' && choice[0] != 'n' && choice[0] != 'Y' && choice[0] != 'y') {
            printf("输入数据不合法！\n");
            printf("是否继续猜数字(Y/N)？");
            scanf("%s", &choice);
        }
        if (choice[0] == 'N' || choice[0] == 'n') {
            break;
        }
        times++;
    }
    printf("游戏结束！\n");
    return 0;
}
```

# 第六章 集合数据与数组

1.不相同。
a[10]里的a是一维数组，而a[2][5]中的a是二维数组。

2.代码如下：
```c
#include <stdio.h>

int main() {
    printf("请输入输入整数的个数N：");
    int n, k, m;
    scanf("%d", &n);
    int nums[n];
    printf("请输入整数序列：");
    for (int i = 0; i < n; i++) {
        scanf("%d", &nums[i]);
    }
    printf("请输入待插入的整数K：");
    scanf("%d", &k);
    // 插入位置按照从0开始算
    printf("请输入待插入位置：");
    scanf("%d", &m);
    int b[n+1];
    for (int i = 0; i < m; i++) {
        b[i] = nums[i];
    }
    printf("%d\n", m);
    b[m] = k;
    for (int i = m+1; i < n+1; i++) {
        b[i] = nums[i-1];
    }
    // 打印数组
    for (int i = 0; i < n+1; i++) {
        printf("%d ", b[i]);
    }
    return 0;
}
```

3.代码如下：
```c
#include <stdio.h>

int main() {
    int n = 10, pointer = 0, flag = 1;
    printf("原数组：");
    int a[] = {1, 2, 1, 2, 3, 5, 3, 3, 6, 4};
    for (int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
    int b[n];
    b[pointer++] = a[0];
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < pointer; j++) {
            if (b[j] == a[i]) {
                flag = 0;
            }
        }
        if (flag) {
            b[pointer++] = a[i];
        } else {
            flag = 1;
        }
    }
    printf("\n去重以后的数组：");
    for (int i = 0; i < pointer; i++) {
        printf("%d ", b[i]);
    }
    return 0;
}
```

4.代码如下：
```c
#include <stdio.h>

int main() {
    int a[10] = {1, 3, 5, 6, 9, 133, 155, 199, 2333, 777777};
    int b[5] = {0, 4, 1000, 10000, 1000000};
    int c[15];
    int i = 0, j = 0;
    while (1) {
        if (i == 10) {
            if (j == 5) {
                break;
            }
            c[i+j] = b[j];
            j++;
        } else if (j == 5) {
            c[i+j] = a[i];
            i++;
        } else {
            if (a[i] <= b[j]) {
                c[i+j] = a[i];
                i++;
            } else {
                c[i+j] = b[j];
                j++;
            }
        }
    }
    printf("数组a：");
    for (i = 0; i < 10; i++) {
        printf("%d ", a[i]);
    }
    printf("\n数组b：");
    for (i = 0; i < 5; i++) {
        printf("%d ", b[i]);
    }
    printf("\n合并后的数组c：");
    for (i = 0; i < 15; i++) {
        printf("%d ", c[i]);
    }
    return 0;
}
```

5.代码如下：
```c
#include <stdio.h>

int main() {
    int a[4][4] = {{1, 2, 3, 4}, {2, 3, 4, 5}, {3, 4, 5, 6}, {4, 5, 6, 7}};
    printf("原始矩阵：\n");
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%d ", a[i][j]);
        }
        printf("\n");
    }
    int sum = 0;
    for (int i = 0; i < 4; i++) {
        sum += a[i][i];
        sum += a[3-i][i];
    }
    printf("两对角线元素之和：%d", sum);
    return 0;
}
```

6.代码如下：
```c
#include <stdio.h>

int main() {
    int a[4][5] = {{1, 2, 3, 4, 5}, {2, 3, 4, 5, 6}, {3, 4, 5, 6, 7}, {4, 5, 6, 7, 8}};
    int max_i = 0, max_j = 0, min_i = 0, min_j = 0, max = a[0][0], min = a[0][0];
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 5; j++) {
            if (a[i][j] > max) {
                max = a[i][j];
                max_i = i;
                max_j = j;
            }
            if (a[i][j] < min) {
                min = a[i][j];
                min_i = i;
                min_j = j;
            }
        }
    }
    printf("矩阵元素最大值是：%d，它位于第%d行第%d列\n矩阵元素最小值是：%d，它位于第%d行第%d列\n", max, max_i, max_j, min, min_i, min_j);
    return 0;
}
```

7.代码如下：
```c
#include <stdio.h>

int main() {
    int n = 3, flag = 1;
    int a[3][3] = {{4, 9, 2}, {3, 5, 7}, {8, 1, 6}};
    int store[n*n], store_ptr = 0, store_temp;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            store_temp = a[i][j];
            for (int k = 0; k < store_ptr; k++) {
                if (store[k] == store_temp) {
                    flag = 0;
                    goto RES;
                }
            }
            store[store_ptr] = store_temp;
            store_ptr++;
        }
    }
    int sum = 0, temp = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i][0];
    }
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < n; j++) {
            temp += a[i][j];
        }
        if (temp != sum) {
            flag = 0;
            goto RES;
        }
        temp = 0;
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            temp += a[j][i];
        }
        if (temp != sum) {
            flag = 0;
            goto RES;
        }
        temp = 0;
    }
    for (int i = 0; i < n; i++) {
        temp += a[i][i];
    }
    if (temp != sum) {
        flag = 0;
        goto RES;
    }
    temp = 0;
    for (int i = 0; i < n; i++) {
        temp += a[n-1-i][i];
    }
    if (temp != sum) {
        flag = 0;
    }
    RES:
    printf("此矩阵%s幻方\n", (flag ? "是" : "不是"));
    return 0;
}
```

8.代码如下：
```c
#include <stdio.h>

int main() {
    char str[] = "scnasionsanalgnlkdangklgnlk";
    char ch = 'l';
    printf("原字符串为：%s\n", str);
    char temp[30];
    int pointer = 0;
    char c = str[0];
    for (int i = 0; c != '\0'; i++) {
        c = str[i];
        if (str[i] != ch) {
            temp[pointer] = str[i];
            pointer++;
        }
    }
    printf("新字符串为：%s\n", temp);
    return 0;
}
```

9.代码如下：
```c
#include <stdio.h>

int main() {
    char str[] = "abcdefghijklmnopqrstuvwxyz";
    char append[] = "123456";
    printf("原字符串为：%s\n待插入字符串为：%s\n", str, append);
    char result[50];
    int append_index = 10;
    for (int i = 0; i < append_index; i++) {
        result[i] = str[i];
    }
    char c = append[0];
    int pointer = append_index;
    for (int i = 0; c != '\0'; i++) {
        c = append[i];
        result[pointer] = append[i];
        pointer++;
    }
    // 多加了一次=>补偿一次
    pointer--;
    c = str[append_index];
    for (int i = append_index; c != '\0'; i++) {
        c = str[i];
        result[pointer] = c;
        pointer++;
    }
    printf("新字符串为：%s\n", result);
    return 0;
}
```

10.代码如下(可以优化的地方是关于(s)这里是去括号还是整个删去的细节，不过题目中似乎并没有强调这一点)：
```c
#include <stdio.h>

int main() {
    char str[] = "0011111100010100000111";
    int counter = 1;
    char temp = str[0], c = str[0];
    for (int i = 1; c != '\0'; i++) {
        c = str[i];
        if (c == temp) {
            counter++;
        } else {
            printf("Emit %c for %d time unit(s)\n", temp, counter);
            temp = c;
            counter = 1;
        }
    }
    if (counter > 1) {
        printf("Emit %c for %d time unit(s)\n", temp, counter);
    }
    return 0;
}
```

# 第七章 模块化与函数

1.略

2.代码如下：
```c
#include <stdio.h>
#include <ctype.h>

int isChar(char c) {
    if (isalpha(c) || isdigit(c)) {
        return c;
    }
    return 0;
}

int main() {
    printf("请输入一个字符：");
    char c;
    scanf("%c", &c);
    printf("%d", isChar(c));
    return 0;
}
```

3.代码如下：
```c
#include <stdio.h>

int isPrime(int n) {
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            return 0;
        }
    }
    return 1;
}

int main() {
    printf("请输入两个整数：");
    int m, n;
    scanf("%d %d", &m, &n);
    for (int i = m; i <= n; i++) {
        if (isPrime(i)) {
            printf("%d ", i);
        }
    }
    return 0;
}
```

4.代码如下(对题意稍有调整)：
```c
#include <stdio.h>

double fun(int x, int n) {
    double result = 1, temp = 1;
    int num = 1;
    for (int i = 1; i <= n; i++) {
        num *= i;
        temp *= x;
        result += (temp / num);
    }
    return result;
}

int main() {
    printf("请分别输入n和x：");
    int n, x;
    scanf("%d %d", &n, &x);
    printf("%lf", fun(x, n));
    return 0;
}
```

5.代码如下：
```c
#include <stdio.h>

int max_fun(int a, int b) {
    int temp;
    while (b > 0) {
        temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}

int min_fun(int a, int b) {
    return a * b / max_fun(a, b);
}

int main() {
    printf("请输入两个正整数：");
    int a, b;
    scanf("%d %d", &a, &b);
    printf("最大公约数为：%d\n最小公倍数为：%d\n", max_fun(a, b), min_fun(a, b));
    return 0;
}
```

6.代码如下：
```c
#include <stdio.h>

void fun(int a[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (a[i] != x) {
            printf("%d ", a[i]);
        }
    }
}

int main() {
    int a[5] = {1, 2, 3, 4, 5};
    fun(a, 5, 3);
    return 0;
}
```

7.代码如下：
```c
#include <stdio.h>

int max_a(int a[], int n) {
    int max = a[0];
    for (int i = 0; i < n; i++) {
        if (a[i] > max) {
            max = a[i];
        }
    }
    return max;
}

int min_a(int a[], int n) {
    int min = a[0];
    for (int i = 0; i < n; i++) {
        if (a[i] < min) {
            min = a[i];
        }
    }
    return min;
}

int ave_a(int a[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    return sum / n;
}

int main() {
    int a[10] = {3, 1, -3, 10000, 4, 333, -300, 2, 6, 10};
    printf("最大值为：%d\n最小值为：%d\n平均值为：%d\n", max_a(a, 10), min_a(a, 10), ave_a(a, 10));
    return 0;
}
```

8.代码如下：
```c
#include <stdio.h>

// 加密
int encrypt(int num) {
    int a, b, c, d = num;
    a = d / 1000;
    d %= 1000;
    b = d / 100;
    d %= 100;
    c = d / 10;
    d %= 10;
    a = (a+5)%10;
    b = (b+5)%10;
    c = (c+5)%10;
    d = (d+5)%10;
    return d*1000+c*100+b*10+a;
}

int main() {
    int num = 1234;
    int cipher = encrypt(num);
    printf("加密后的密文是：%d\n", cipher);
    // 加密算法和解密算法完全一样
    printf("解密后的明文是：%d\n", encrypt(cipher));
    return 0;
}
```

9.代码如下(没做越界检查)：
```c
#include <stdio.h>

/**
 * 复制子串
 * @param str1
 * @param m 从0开始
 * @param n 复制的长度
 * @param str2
 */
void str_mid(char str1[], int m, int n, char str2[]) {
    for (int i = 0; i < n; i++) {
        str2[i] = str1[m+i];
    }
}

int str_len(char s[]) {
    int counter = 0;
    char c = s[0];
    while (c != '\0') {
        c = s[++counter];
    }
    return counter;
}

int main() {
    char str1[] = "goodmorning", str2[10];
    int m = 1, n = 3;
    str_mid(str1, m, n, str2);
    printf("原字符串为：%s，长度为%d\n", str1, str_len(str1));
    printf("复制后的子串为：%s，长度为%d\n", str2, str_len(str2));
    return 0;
}
```

10.代码如下(非递归)：
```c
#include <stdio.h>

int fib(int n) {
    int prev = 0, next = 1, temp;
    if (n == 0) {
        return prev;
    } else if (n == 1) {
        return next;
    }
    for (int i = 2; i <= n; i++) {
        temp = prev + next;
        prev = next;
        next = temp;
    }
    return next;
}

int main() {
    int n = 10;
    printf("第%d个斐波那契数是%d", n, fib(n));
    return 0;
}
```

# 第八章 地址操作与指针

## 读书笔记

以`*p=&a;`为例。

1.&和*互为逆运算：
- `&*p=&(*p)=&a=p`
- `*&a=*(&a)=*p=a`

2.++/--运算：
- `(*p)++` => `a++`
- `p++` => `p指向a的下一个地址`
- `c = *p++` => `c = *p; *p++`
- `d = *--p` => `d=*--p` => `--p; d = *p;`

3.void指针是一种特殊的指针，void指针无需类型转换即可指向任意类型指针，任何类型的指针也都可以指向void指针，但需要强制类型转换。

4.指针p++合理；数组a++不合理，只能用索引。

5.字符数组与字符指针的区别：
- 存储方式不同。定义字符数组后，系统为其分配一段连续的存储单元；而定义字符型指针变量后，系统只为其分配一个用于存放地址的存储区域。
- 运算方式不同。虽然s和p都代表字符串的首地址，但是s是数组名，相当于一个指针常量，而p是一个指针变量。p++合理，s++不合理。
- 赋值方式不同。s可以进行初始化，不能使用赋值语句进行整体赋值。

6.实参形参的搭配(数组/指针)：
- 实参数组 + 形参数组
- 实参数组 + 形参指针
- 实参指针 + 形参数组
- 实参指针 + 形参指针

7.当主调函数向被调函数传递大量数据时，值传递会将这些数据复制一份给被调函数的形参变量，复制过程占用系统时间。将这些数据组织为数组(或结构体)形式，只需传递一个起始地址给被调函数的形参指针，可以提高执行效率。

8.函数指针多用于指向不同的函数，从而利用指针变量调用这些函数。在多个函数功能各不相同，但返回值和形参列表的个数和数据类型相同的情况下，可以构造一个通用函数，将函数指针作为函数参数，通过函数指针实现多种函数的调用，有利于程序的模块化设计。

9.volatile用于告知编译器，该变量除可被自身程序改变以外，还可被其他程序改变。

10.restrict用于告知编译器，该变量已经被指针所引用，不能通过除该指针外所有其他直接或间接的方式修改该对象的内容。

11.C程序运行时，OS会按照要求为程序中的变量分配内存。可用来存储程序变量的内存有三种：
- 全局(静态)存储区：存放全局变量和静态变量。程序运行结束时该区变量自动释放，未初始化的全局变量和静态变量默认初始值为0。
- 栈：存放函数调用中的各种参数、局部变量、返回值以及函数返回地址。栈由编译器进行管理，自动分配和释放，初始大小与编译器有关。
- 堆：用于程序动态申请和释放空间。

12.函数表达式同样可以是一个指针类型，表示可以通过return语句返回一个地址值，该地址值是指向类型变量的地址。

## 例题训练
【例1】
```c
#include <stdio.h>

int main() {
    int *p, m;
    p = &m;
    scanf("%d", p);
    printf("%d, %d\n", *p, m);
    *p = 15;
    printf("%d, %d\n", *p, m);
    return 0;
}
```

【例2】
```c
#include <stdio.h>

int main() {
    int *p, a[10] = {21, 32, 3, 14, 5, 25, 39, 51, 8, 21};
    int count = 0;
    for (p = a; count < 10; p++, count++) {
        if (*p < 5) {
            printf("%d\t", *p);
        }
    }
    return 0;
}
```

【例3】
```c
#include <stdio.h>

int main() {
    int a[20], i, nLen, nEvenCount = 0, nOddCount = 0, *p = a;
    printf("请输入整数的个数：");
    scanf("%d", &nLen);
    printf("请输入%d个整数：", nLen);
    for (i = 0; i < nLen; i++) {
        scanf("%d", p+i);
    }
    for (i = 0; i < nLen; i++, p++) {
        if (*p % 2 == 0) {
            nEvenCount++;
        } else {
            nOddCount++;
        }
    }
    printf("这组数据中包含%d个偶数，%d个奇数\n", nEvenCount, nOddCount);
    return 0;
}
```

【例4】
```c
#include <stdio.h>

int main() {
    char s1[40], s2[20], *p1, *p2;
    p1 = s1;
    p2 = s2;
    printf("请输入字符串1：");
    gets(s1);
    printf("请输入字符串2：");
    gets(s2);
    while (*p1) {
        p1++;
    }
    while (*p1++=*p2++);
    printf("连接后结果：%s\n", s1);
    return 0;
}
```

【例5】
```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[100], *p;
    int i, nCount = 0;
    p = str;
    printf("请输入英文语句：\n");
    gets(str);
    while (*p != '\0') {
        if (*p == ' ') {
            p++;
            continue;
        } else {
            nCount++;
            i = 0;
            while (*(p+i) != ' ' && *(p+i) != '\0') {
                i++;
            }
            p += i;
        }
    }
    printf("该句子包含%d个单词\n", nCount);
    return 0;
}
```

【例6】(说明：swap()返回值应该改成void而不是int)
```c
#include <stdio.h>

void swap(int *p1, int *p2) {
    int temp;
    temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}

int main() {
    int a = 5, b = 9, *pa = &a, *pb = &b;
    printf("交换前：a=%d, b=%d\n", a, b);
    swap(pa, pb);
    printf("交换后：a=%d, b=%d\n", a, b);
    return 0;
}
```

【例7】(#include没写<stdio.h>)
```c
#include <stdio.h>
#include <math.h>

void process(float f1, float f2, float f3, float *p1, float *p2) {
    float s;
    s = (f1 + f2 + f3) / 2;
    *p1 = sqrt(s*(s-f1)*(s-f2)*(s-f3));
    *p2 = f1 + f2 +f3;
}

int main() {
    float a, b, c, fArea, fPerimeter;
    printf("请输入三角形的三边：");
    scanf("%f %f %f", &a, &b, &c);
    process(a, b, c, &fArea, &fPerimeter);
    printf("Area=%f, Perimeter=%f", fArea, fPerimeter);
    return 0;
}
```

【例8】
```c
#include <stdio.h>

void inv1(int b[], int n) {
    int temp, i, j, m=(n-1)/2;
    for (i = 0; i <= m; i++) {
        j = n - 1 - i;
        temp = b[i];
        b[i] = b[j];
        b[j] = temp;
    }
}

int main() {
    int i, a[6] = {1, 3, 4, 6, 7, 9};
    printf("折半交换前：");
    for (i = 0; i < 6; i++) {
        printf("%3d", a[i]);
    }
    inv1(a, 6);
    printf("\n折半交换后：");
    for (i = 0; i < 6; i++) {
        printf("%3d", a[i]);
    }
    printf("\n");
    return 0;
}
```

【例9】
```c
#include <stdio.h>

int myStrLen(char *s);

void myStrCpy(char *s1, char *s2);

void myStrUpr(char *p);

int main() {
    char s1[50], s[50];
    int length;
    printf("请输入一个字符串：");
    gets(s1);
    length = myStrLen(s1);
    myStrCpy(s1, s);
    myStrUpr(s);
    printf("字符串长度：%d\n", length);
    printf("字符串复制并大写前后分别是：%s, %s\n", s1, s);
    return 0;
}

int myStrLen(char *s) {
    int i = 0;
    while (*s != '\0') {
        i++;
        s++;
    }
    return i;
}

void myStrCpy(char *s1, char *s2) {
    while (*s1 != '\0') {
        *s2 = *s1;
        s1++;
        s2++;
    }
    *s2 = '\0';
}

void myStrUpr(char *p) {
    while (*p != 0) {
        if (*p >= 'a' && *p <= 'z') {
            *p -= 32;
        }
        p++;
    }
}
```

【例10】
```c
#include <stdio.h>
#include <string.h>

#define SIZE 100

char buf[SIZE];

char *p = buf;

char *alloc(int n) {
    char *begin;
    if (p + n <= buf + SIZE) {
        begin = p;
        p += n;
        return begin;
    }
    return NULL;
}

int main() {
    char *p1, *p2;
    int i;
    p1 = alloc(4);
    strcpy(p1, "123");
    p2 = alloc(5);
    strcpy(p2, "abcd");
    printf("buf = %p\n", buf);
    printf("p1 = %p\n", p1);
    printf("p2 = %p\n", p2);
    puts(p1);
    puts(p2);
    for (i = 0; i < 9; i++) {
        printf("%c", buf[i]);
    }
    return 0;
}
```

【例11】
```c
#include <stdio.h>
#include <math.h>

float f1 (float x) {
    return x * x + 2 * x +1;
}

float f2 (float x) {
    return 2 * sin(x);
}

float f3 (float x) {
    return 2 * x +1;
}

/**
 * @param p *p为指向函数的指针
 * @param fPos1 左区间的值
 * @param fPos2 右区间的值
 * @return
 */
float getMin(float (*p)(float), float fPos1, float fPos2) {
    float f, t, fMin, fStep=0.01;
    fMin = (*p)(fPos1);
    for (f = fPos1; f <= fPos2; f+=fStep) {
        t = (*p)(f);
        if (t < fMin) {
            fMin = t;
        }
    }
    return fMin;
}

int main() {
    printf("f1函数最小值：%f\n", getMin(f1, -1, 1));
    printf("f2函数最小值：%f\n", getMin(f2, 1, 3));
    printf("f3函数最小值：%f\n", getMin(f3, -1, 1));
    return 0;
}
```

【例12】
```c
#include <stdio.h>

int main() {
    char *pSeason[4] = {"Spring", "Summer", "Autumn", "Winter"};
    int month;
    printf("请输入月份(1~12)：");
    scanf("%d", &month);
    switch (month) {
        case 12:
        case 1:
        case 2:
            printf("%s", pSeason[0]);
            break;
        case 3:
        case 4:
        case 5:
            printf("%s", pSeason[1]);
            break;
        case 6:
        case 7:
        case 8:
            printf("%s", pSeason[2]);
            break;
        case 9:
        case 10:
        case 11:
            printf("%s", pSeason[3]);
            break;
        default:
            printf("输入错误！");
    }
    return 0;
}
```

【例13】
```c
#include <stdio.h>
#include <string.h>

void sortString(int n, char * str[]) {
    char *c;
    int i, j;
    for (i = 0; i <= n-2; i++) {
        for (j = 0; j <= n-2-i; j++) {
            if (strcmp(str[j], str[j+1]) > 0) {
                c = str[j];
                str[j] = str[j+1];
                str[j+1] = c;
            }
        }
    }
}

int main() {
    int i;
    char * lan[] = {"China", "France", "Arab"};
    sortString(3, lan);
    for (i = 0; i < 3; i++) {
        printf("%s\n", lan[i]);
    }
    return 0;
}
```

【例14】
```c
#include <stdio.h>

int main(int argc, char * argv[]) {
    int i;
    printf("所有的命令行参数：\n");
    for (i = 0; i < argc; i++) {
        printf("\n参数%d = %s", i+1, argv[i]);
    }
    return 0;
}
```

【例15】
```c
#include <stdio.h>

int main() {
    int a[3][4] = {{11, 21, 33, 42}, {15, 22, 32, 13}, {41, 32, 24, 16}};
    int (*p)[4], i, j;
    p = a;
    for (i = 0; i < 3; i++) {
        for (j = 0; j <4; j++) {
            printf("%2d ", *(*(p+i)+j));
        }
        printf("\n");
    }
    return 0;
}
```

【例16】
```c
#include <stdio.h>

int main() {
    int i;
    char *pArray[] = {"One", "Two", "Three"};
    char **p;
    p = pArray;
    for (i = 0; i < 3; i++, p++) {
        printf("%s\n", *p);
    }
    return 0;
}
```

## 课后习题

1.解析：
```c
#include <stdio.h>

int f1 (int p) {
    return p++;
}

int f2 (int *p) {
    return *(p++);
}

int f3 (int *p) {
    return (*p)++;
}

int *f4 (int *p) {
    return p++;
}

int main() {
    int n = 4;
    int *p = &n;
    printf("%d\n", f1(n)); // 4
    printf("%d\n", n); // 4
    printf("%d\n", f2(p)); // 4
    printf("%d\n", n); // 4
    printf("%d\n", f3(p)); // 4
    printf("%d\n", n); // 5
    printf("%d\n", *f4(p)); // 5
    printf("%d\n", n); // 5
    return 0;
}
```
说明如下：
- (1) 值传递，改变的作用域在函数内部
- (2) 地址++但不会返回，返回的是原地址，原值也不变
- (3) 引用传递，值++且会直接改到地址里
- (4) 指针++然后返回指针其实没有作用

2.代码如下：
```c
#include <stdio.h>

int main() {
    int a = 1, b = 2;
    int *pa = &a, *pb = &b;
    printf("%d, %d\n", *pa, *pb);
    printf("%d + %d = %d\n", *pa, *pb, *pa + *pb);
    printf("%d - %d = %d\n", *pa, *pb, *pa - *pb);
    printf("%d * %d = %d\n", *pa, *pb, *pa * *pb);
    printf("%d / %d = %d\n", *pa, *pb, *pa / *pb);
    return 0;
}
```

3.代码如下：
```c
#include <stdio.h>

void multiplyArray(int *a, int m) {
    for (int i = 0; i < 10; i++) {
        *(a+i) *= m;
    }
}

int main() {
    int a[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    multiplyArray(a, 5);
    for (int i = 0; i < 10; i++) {
        printf("%d ", a[i]);
    }
    return 0;
}
```

4.代码如下：
```c
#include <stdio.h>

void getData(int *a, int num);

void reverse(int *a, int num);

void showData(int *a, int num);

int main() {
    int a[10];
    getData(a, 10);
    reverse(a, 10);
    showData(a, 10);
    return 0;
}

void getData(int *a, int num) {
    for (int i = 0; i < num; i++) {
        scanf("%d", a+i);
    }
}

void reverse(int *a, int num) {
    for (int i = 0; i < num/2; i++) {
        int temp = *(a+i);
        *(a+i) = *(a+9-i);
        *(a+9-i) = temp;
    }
}

void showData(int *a, int num) {
    for (int i = 0; i < num; i++) {
        printf("%d ", *(a+i));
    }
}
```

5.代码如下：
```c
#include <stdio.h>

int max(int a[], int n, int *p) {
    int max = a[0], i;
    for (i = 0; i < n; i++) {
        if (a[i] > max) {
            max = a[i];
            *p = i;
        }
    }
    return max;
}

int min(int a[], int n, int *p) {
    int min = a[0], i;
    for (i = 0; i < n; i++) {
        if (a[i] < min) {
            min = a[i];
            *p = i;
        }
    }
    return min;
}

int main() {
    int a[10] = {1, 22, 3, 4, 155, -6, 7, 8888, 9, 1}, index = 0;
    int *p = &index;
    int max_num = max(a, 10, p);
    printf("最大值的值是：%d，位置是：%d\n", max_num, *p);
    int min_num = min(a, 10, p);
    printf("最小值的值是：%d，位置是：%d\n", min_num, *p);
    return 0;
}
```

6.代码如下：
```c
#include <stdio.h>

void myitoa(int n, char *str) {
    int i = 0;
    while (n != 0) {
        str[i] = (char)(n / 10 + '0');
        n /= 10;
        i++;
    }
}

int main() {
    int n = 10;
    // 考虑到int上限
    char str[15];
    myitoa(n, str);
    printf("%s", str);
    return 0;
}
```

7.代码如下：
```c
#include <stdio.h>

void rotateArray(int *a, int m, int n) {
    // 这里是一个细节，要小心n大于m
    n %= m;
    int temp[m];
    for (int i = 0; i < n; i++) {
        temp[i] = a[m-n+i];
    }
    // 一定要倒着来
    for (int i = m-n-1; i >= 0; i--) {
        a[n+i] = a[i];
    }
    for (int i = 0; i < n; i++) {
        a[i] = temp[i];
    }
}

int main() {
    int n = 10;
    int a[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
    for (int i = 0; i < 10; i++) {
        printf("%d ", a[i]);
    }
    rotateArray(a, 10, 3);
    printf("\n");
    for (int i = 0; i < 10; i++) {
        printf("%d ", a[i]);
    }
    return 0;
}
```

8.代码如下(题目要求的int[][]形参是不符合要求的，应该传指针)：
```c
#include <stdio.h>

void fun(int *a, int n, int m, int *odd, int *even) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (*(a+i*m+j) % 2 == 0) {
                (*even)++;
            } else {
                (*odd)++;
            }
        }
    }
}

int main() {
    int n = 4, m = 3, odd = 0, even = 0, *odd_ptr = &odd, *even_ptr = &even;
    int a[4][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}, {10, 11, 15}};
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            printf("%d ", a[i][j]);
        }
    }
    fun(a, n, m, odd_ptr, even_ptr);
    printf("\n偶数个数为%d，奇数个数为%d\n", even, odd);
    return 0;
}
```

9.代码如下：
```c
#include <stdio.h>
#include <string.h>

int strCount(char *str1, char *str2) {
    int counter = 0;
    int len1 = strlen(str1), len2 = strlen(str2), flag = 1, i, j;
    for (i = 0; i <= len1-len2; i++) {
        flag = 1;
        for (j = 0; j < len2; j++) {
            if (str1[i+j] != str2[j]) {
                flag = 0;
                break;
            }
        }
        if (flag) {
            counter++;
        }
    }
    return counter;
}

int main() {
    char str1[] = "howareyouareGGGare", str2[] = "are";
    printf("\"%s\"在\"%s\"内出现的次数是%d", str2, str1, strCount(str1, str2));
    return 0;
}
```

10.代码如下：
```c
#include <stdio.h>
#include <string.h>

char *strToS(char *str) {
    int length = strlen(str), newLength = 0, i = 0, j = 0;
    char result[length], firstChar, tempChar, *ptr;
    for (i = 0; i < length; i++) {
        tempChar = str[i];
        if (tempChar == ' ') {
            if (j > 3) {
                result[newLength] = firstChar > 'a' ? firstChar-('a'-'A') : firstChar;
                newLength++;
            }
            j = 0;
        } else {
            if (j == 0) {
                firstChar = tempChar;
            }
            j++;
        }
    }
    if (j > 3) {
        result[newLength] = firstChar > 'a' ? firstChar-('a'-'A') : firstChar;
        newLength++;
    }
    if (newLength == 0) {
        return "null";
    }
    ptr = result;
    return ptr;
}

int main() {
    char str[] = "I love you very much", *result = strToS(str);
    if (strcmp(result, "null") == 0) {
        printf("%s找不到合适的缩写字符串", str);
    } else {
        printf("%s的缩写字符串是：%s", str, result);
    }
    return 0;
}
```

# 第九章 复杂数据类型与结构体

1.略

2.略

3.略

4.代码如下：
```c
#include <stdio.h>

struct teacher {
    int card_id;
    char name[20];
    char sex[10];
    int birthYear;
    int birthMonth;
    union {
        // 1->未婚, 2->已婚, 3->离异
        int stateNum;
        char state[10];
    } married;
    char company[50];
};

int main() {
    struct teacher t1 = {123, "Sam", "男", 1990, 11, 2, "THU"};
    printf("工资卡号：%d\n", t1.card_id);
    printf("姓名：%s\n", t1.name);
    printf("性别：%s\n", t1.sex);
    printf("出生年份：%d\n", t1.birthYear);
    printf("出生月份：%d\n", t1.birthMonth);
    printf("婚姻状态：%s\n", (t1.married.stateNum == 1 ? "未婚" : t1.married.stateNum == 2 ? "已婚" : "离异"));
    printf("工作部门：%s\n", t1.company);
    return 0;
}
```

5.代码如下：
```c
#include <stdio.h>

struct date {
    int year;
    int month;
    int day;
};

int main() {
    struct date d1 = {2020, 11, 11}, d2 = {1990, 12, 5};
    printf("年份差值：%d\n", d1.year-d2.year);
    printf("月份差值：%d\n", d1.month-d2.month);
    printf("日期差值：%d\n", d1.day-d2.day);
    return 0;
}
```

6.代码如下：
```c
#include <stdio.h>

struct student {
    int id;
    char name[20];
    int grade;
};

int main() {
    struct student s1 = {101, "Sam", 90}, s2 = {102, "Bob", 60},
            s3 = {103, "Amy", 100}, s4 = {104, "Tim", 97},
            s5 = {105, "Jessica", 95};
    double average = (s1.grade + s2.grade + s3.grade + s4.grade + s5.grade) / 5.0;
    if (s1.grade > average) {
        printf("学生ID：%d，学生姓名：%s，学生成绩：%d\n", s1.id, s1.name, s1.grade);
    }
    if (s2.grade > average) {
        printf("学生ID：%d，学生姓名：%s，学生成绩：%d\n", s2.id, s2.name, s2.grade);
    }
    if (s3.grade > average) {
        printf("学生ID：%d，学生姓名：%s，学生成绩：%d\n", s3.id, s3.name, s3.grade);
    }
    if (s4.grade > average) {
        printf("学生ID：%d，学生姓名：%s，学生成绩：%d\n", s4.id, s4.name, s4.grade);
    }
    if (s5.grade > average) {
        printf("学生ID：%d，学生姓名：%s，学生成绩：%d\n", s5.id, s5.name, s5.grade);
    }
    return 0;
}
```

7.代码如下：
```c
#include <stdio.h>
#include <stdlib.h>

struct student {
    int id;
    char name[20];
    int math;
    int english;
    int program;
};

int cmpFunc (const void *a, const void *b) {
    struct student *p1 = (struct student*)a, *p2 = (struct student*)b;
    return -((p1->math + p1->english + p1->program) - (p2->math + p2->english + p2->program));
}

int main() {
    struct student s1 = {101, "Sam", 20, 30, 40},
            s2 = {102, "Bob", 60, 60, 60},
            s3 = {103, "Amy", 70, 70, 70},
            s4 = {104, "Tim", 97, 98, 99},
            s5 = {105, "Jessica", 95, 90, 98},
            s6 = {106, "Robin", 60, 60, 34},
            s7 = {107, "Rust", 100, 100, 100},
            s8 = {108, "Python", 97, 99, 95},
            s9 = {109, "Java", 95, 99, 80},
            s10 = {110, "Swift", 95, 77, 66};
    struct student list[] = {s1, s2, s3, s4, s5, s6, s7, s8, s9, s10}, temp;
    qsort(list, 10, sizeof(struct student), cmpFunc);
    for (int i = 0; i < 10; i++) {
        temp = list[i];
        printf("学生%d的个人信息：\n学号：%d\t姓名：%s\t数学成绩：%d\t英语成绩：%d\t编程成绩：%d\n",
                i+1, temp.id, temp.name, temp.math, temp.english, temp.program);
    }
    return 0;
}
```

8.代码如下(用了随机数来模拟)：
```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

struct player {
    int id;
    char name[30];
    char nationality[30];
    double avg_point;
};

int cmpFunc (const void *a, const void *b) {
    struct player *p1 = (struct player*)a, *p2 = (struct player*)b;
    double temp = p1->avg_point - p2->avg_point;
    return temp > 0 ? -1 : temp == 0 ? 0 : 1;
}

int main() {
    srand(time(0));
    double grades[10][7], avg_arr[10],temp, max, min;
    int i, j;
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 7; j++) {
            grades[i][j] = (int)rand() % 11;
        }
    }
    for (i = 0; i < 10; i++) {
        temp = 0;
        max = grades[i][0];
        min = max;
        for (j = 0; j < 7; j++) {
            temp += grades[i][j];
            if (grades[i][j] > max) {
                max = grades[i][j];
            }
            if (grades[i][j] < min) {
                min = grades[i][j];
            }
        }
        temp -= max;
        temp -= min;
        avg_arr[i] = temp / 5;
    }
    struct player
            p1 = {101, "Sam", "中国", avg_arr[0]},
            p2 = {102, "Bob", "美国", avg_arr[1]},
            p3 = {103, "Amy", "英国", avg_arr[2]},
            p4 = {104, "Tim", "法国", avg_arr[3]},
            p5 = {105, "Jessica", "德国", avg_arr[4]},
            p6 = {106, "Robin", "韩国", avg_arr[5]},
            p7 = {107, "Rust", "日本", avg_arr[6]},
            p8 = {108, "Python", "苏俄", avg_arr[7]},
            p9 = {109, "Java", "古巴", avg_arr[8]},
            p10 = {110, "Swift", "尤里", avg_arr[9]};
    struct player list[] = {p1, p2, p3, p4, p5, p6, p7, p8, p9, p10}, temp_p;
    qsort(list, 10, sizeof(struct player), cmpFunc);
    for (i = 0; i < 10; i++) {
        temp_p = list[i];
        printf("选手%d的个人信息：\n编号：%d\t姓名：%s\t国籍：%s\t总评：%lf\n",
                i+1, temp_p.id, temp_p.name, temp_p.nationality, temp_p.avg_point);
    }
    return 0;
}
```

9.代码如下(忽略键盘输入的过程)：
```c
#include <stdio.h>
#include <stdlib.h>

struct student {
    int id;
    char name[20];
    int grade;
};

int *defineArray(int n) {
    return (int *)malloc(sizeof(int) * n);
}

void freeArray(int *p) {
    free(p);
}

int main() {
    int n = 5;
    struct student
            s1 = {101, "Sam", 90},
            s2 = {102, "Bob", 60},
            s3 = {103, "Amy", 100},
            s4 = {104, "Tim", 97},
            s5 = {105, "Jessica", 95};
    struct student list[] = {s1, s2, s3, s4, s5}, temp;
    int *grades = defineArray(n), sum = 0;
    for (int i = 0; i < n; i++) {
        grades[i] = list[i].grade;
    }
    for (int i = 0; i < n; i++) {
        sum += grades[i];
    }
    double avg = (double)sum / n;
    freeArray(grades);
    printf("平均成绩：%.2lf\n", avg);
    return 0;
}
```

10.代码如下：
```c
#include <stdio.h>

struct people {
    int id;
    char name[30];
    struct people *next;
};

int main() {
    struct people
            p1  = {1,  "Sam"},
            p2  = {2,  "Bob"},
            p3  = {3,  "Amy"},
            p4  = {4,  "Tim"},
            p5  = {5,  "Jessica"},
            p6  = {6,  "Robin"},
            p7  = {7,  "Rust"},
            p8  = {8,  "Python"},
            p9  = {9,  "Java"},
            p10 = {10, "Swift"};
    p1.next  = &p2;
    p2.next  = &p3;
    p3.next  = &p4;
    p4.next  = &p5;
    p5.next  = &p6;
    p6.next  = &p7;
    p7.next  = &p8;
    p8.next  = &p9;
    p9.next  = &p10;
    p10.next = &p1;
    struct people list[] = {p1, p2, p3, p4, p5, p6, p7, p8, p9, p10}, *temp_p = &p1, *prev_p = &p10;
    int n = 10, m = 3, i;
    m %= n;
    while (temp_p->next != NULL && temp_p->next->id != temp_p->id) {
        for (i = 1; i < m; i++) {
            prev_p = temp_p;
            temp_p = temp_p->next;
        }
        printf("报数：%d\n", temp_p->id);
        temp_p = temp_p->next;
        prev_p->next = temp_p;
    }
    printf("报数：%d\n", temp_p->id);
    return 0;
}
```
