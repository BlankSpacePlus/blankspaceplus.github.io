---
title: Sklearn创建三种仿真数据集
date: 2020-02-27 14:20:44
summary: 本文分享Sklearn创建三种仿真数据集的方法。
tags:
- Python
- Scikit-Learn
categories:
- Python
---

# 生成用于线性回归的仿真数据集

```python
from sklearn.datasets import make_regression


# 生成特征矩阵、目标向量以及模型的系数
features, target, coefficients = make_regression(n_samples=100, n_features=3, n_informative=3, n_targets=1, noise=0.0, coef=True, random_state=1)

# 查看特征矩阵和目标向量
print('Feature Matrix\n', features[:3])
print('Target Vector\n', target[:3])
```

## 生成结果

```python
Feature Matrix
 [[ 1.29322588 -0.61736206 -0.11044703]
 [-2.793085    0.36633201  1.93752881]
 [ 0.80186103 -0.18656977  0.0465673 ]]
Target Vector
 [-10.37865986  25.5124503   19.67705609]
```

# 生成用于分类的仿真数据集

```python
from sklearn.datasets import make_classification

# 生成特征矩阵、目标向量以及模型的系数
features, target = make_classification(n_samples=100, n_features=3, n_informative=3, n_redundant=0, n_classes=2, weights=[.25, .75], random_state=1)

# 查看特征矩阵和目标向量
print('Feature Matrix\n', features[:3])
print('Target Vector\n', target[:3])
```

## 生成结果

```python
Feature Matrix
 [[ 1.06354768 -1.42632219  1.02163151]
 [ 0.23156977  1.49535261  0.33251578]
 [ 0.15972951  0.83533515 -0.40869554]]
Target Vector
 [1 0 0]
```

# 生成用于聚类的仿真数据集

```python
from sklearn.datasets import make_blobs

# 生成特征矩阵、目标向量以及模型的系数
features, target = make_blobs(n_samples=100, n_features=2, centers=3, cluster_std=0.5, shuffle=True, random_state=1)

# 查看特征矩阵和目标向量
print('Feature Matrix\n', features[:3])
print('Target Vector\n', target[:3])
```

## 生成结果

```python
Feature Matrix
 [[ -1.22685609   3.25572052]
 [ -9.57463218  -4.38310652]
 [-10.71976941  -4.20558148]]
Target Vector
 [0 1 1]
```

# 总结

- make_regression返回一个浮点数的特征矩阵和一个浮点数的目标向量
- make_classification和make_blobs返回的是一个浮点数的特征矩阵和一个代表分类的的整数目标矩阵
