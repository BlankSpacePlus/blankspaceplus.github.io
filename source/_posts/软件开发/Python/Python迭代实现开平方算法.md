---
title: Python迭代实现开平方算法
date: 2019-10-07 11:25:14
summary: 本文以Python编程迭代实现开平方算法。
tags:
- Python
categories:
- Python
---

```python
# 核心函数
def findSquareRoot(x):
    if x < 0:
        print ('Sorry, imaginary numbers are out of scope!')
        return
    ans = 0
    while ans**2 < x:
        ans = ans + 1
    if ans**2 != x:
        print (x, 'is not a perfect square')
        print ('Square root of ' + str(x) + ' is close to ' + str(ans - 1))
    else:
        print ('Square root of ' + str(x) + ' is ' + str(ans))
    return


# 基于迭代查找在某个误差范围内找到平方根
def findSquareRootWithinError(x, epsilon, increment):
    if x < 0:
        print ('Sorry, imaginary numbers are out of scope!')
        return
    numGuesses = 0
    ans = 0.0
    while x - ans**2 > epsilon:
        ans += increment
        numGuesses += 1
    print ('numGuesses =', numGuesses)
    if abs(x - ans**2) > epsilon:
        print ('Failed on square root of', x)
    else:
        print (ans, 'is close to square root of', x)
    return


# 基于二分查找在某个误差范围内找到平方根
def bisectionSearchForSquareRoot(x, epsilon):
    if x < 0:
        print ('Sorry, imaginary numbers are out of scope!')
        return
    numGuesses = 0
    low = 0.0
    high = x
    ans = (high + low)/2.0
    while abs(ans**2 - x) >= epsilon:
        if ans**2 < x:
            low = ans
        else:
            high = ans
        ans = (high + low)/2.0
        numGuesses += 1
        # print('low = ', low, 'high = ', high, 'guess = ', ans)
    print ('numGuesses =', numGuesses)
    print (ans, 'is close to square root of', x)
    return
```

测试代码：
```python
findSquareRoot(65536)
findSquareRootWithinError(65535, .01, .001)
findSquareRootWithinError(65535, .01, .0001)
findSquareRootWithinError(65535, .01, .00001)
bisectionSearchForSquareRoot(65535, .01)
```

运行结果：
```python
Square root of 65536 is 256
numGuesses = 255999
Failed on square root of 65535
numGuesses = 2559981
Failed on square root of 65535
numGuesses = 25599803
255.99803007005775 is close to square root of 65535
numGuesses = 24
255.99804684519768 is close to square root of 65535
```

首先第一个函数，是迭代查找，猜想并检查，得到的应该是相当于向下取整的结果了。
我们的测试数据是65536，得到256。
如果测试数据是65535，将得到255，然而结果显然更接近256，这就无奈了。

第二个函数修改了while循环，递增一个远小于1的数字，由用户决定误差和每次递增的数。
这样可能跳过结果或者导致运行过慢。
这个函数努力规避浮点数严格相等判定时精度的影响。

```python
print(0.1+0.2)
```
输出结果：

```python
0.30000000000000004
```

最后一个运用了二分查找（折半查找）的思想。
