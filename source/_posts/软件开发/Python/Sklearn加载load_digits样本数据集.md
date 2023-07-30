---
title: Sklearn加载load_digits样本数据集
date: 2020-02-27 13:53:16
summary: 本文分享Sklearn加载load_digits样本数据集的方法。
tags:
- Python
- Scikit-Learn
categories:
- Python
---

# load_digits数据集

该数据集是sklearn.datasets中内置的手写数字图片数据集，这是一个研究图像分类算法的优质数据集。

# 测试代码

```python
from sklearn import datasets

# 加载手写数字数据集
digits = datasets.load_digits()

# 创建特征矩阵
feature = digits.data

# 创建目标向量
target = digits.target

# 查看第一个样本数据
print(feature[0])
```

# 输出结果

```python
[ 0.  0.  5. 13.  9.  1.  0.  0.  0.  0. 13. 15. 10. 15.  5.  0.  0.  3.
 15.  2.  0. 11.  8.  0.  0.  4. 12.  0.  0.  8.  8.  0.  0.  5.  8.  0.
  0.  9.  8.  0.  0.  4. 11.  0.  1. 12.  7.  0.  0.  2. 14.  5. 10. 12.
  0.  0.  0.  0.  6. 13. 10.  0.  0.  0.]
```
