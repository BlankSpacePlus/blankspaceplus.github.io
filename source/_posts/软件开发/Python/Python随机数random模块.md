---
title: Python随机数random模块
date: 2019-11-19 21:13:23
summary: 本文分享Python随机数random模块的应用方法。
tags:
- Python
categories:
- Python
---

# 样例代码

```python
import random

elements = ["放逐之刃", "刀锋舞者", "青钢影", "诡术妖姬", "虚空之女", "幻翎"]

# 随机选择一个元素
print(random.choice(elements))

# 随机选择n个元素
print(random.sample(elements, 2))

# 随机重排元素列表
random.shuffle(elements)
print(elements)

# 从1~5中选择一个整数（这个不是左闭右开）
print(random.randint(1, 5))

```
# 运行结果

结果是随机的，下面是其中一种：

```python
虚空之女
['刀锋舞者', '青钢影']
['放逐之刃', '幻翎', '刀锋舞者', '青钢影', '虚空之女', '诡术妖姬']
2
```

# 说明

1.对于random.sample(L, n)方法，n必须为不超过L长度的非负整数！
否则会这样被抛出异常：
```python
ValueError: Sample larger than population or is negative
```
如果n=0的话会打印空表[]
小数也是不行的啊，否则也会被抛出异常：

```python
TypeError: can't multiply sequence by non-int of type 'float'
```

2.对于random.randint(m, n)方法，m应该小于等于n，否则：

```python
TypeError: can't multiply sequence by non-int of type 'float'
```
如果输入小数参数，是不行的：
```python
ValueError: non-integer arg 1 for randrange()
```
对于上面说的小数，补充说明一点：1.0这样的小数是可以的。
如果输入(1.0, 5)，是可以正常运行的，看起来与(1, 5)无异。

# 写在最后

random在很多场合都会用到，一般的编程语言都会支持这个部分。
Python的random模块产生的随机数并不是纯粹的随机，而是伪随机数。它们通过固定的算法计算出来，使得看上去像随机一样。
系统时钟每秒钟可能变化数百万次，这通常会在随机数算法中用到。
随机数算法是一门学问啊！
