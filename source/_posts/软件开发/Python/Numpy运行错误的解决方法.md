---
title: Numpy运行错误的解决方法
date: 2022-05-03 23:53:54
summary: 本文分享一些Numpy常见运行错误的解决方法。
tags:
- Python
- Numpy
- 异常修复
categories:
- Python
---

# AttributeError: module 'numpy' has no attribute 'unit8'

Numpy开发遇到报错：<font color="red">AttributeError: module 'numpy' has no attribute 'unit8'</font>

经排查，下面的一行代码出了异常：

```python
mask2 = np.where((mask1 == 2) | (mask1 == 0), 0, 1).astype('unit8')
```

错误原因：把`uint8`写成了`unit8`。

# DeprecationWarning: 'np.float' is a deprecated alias for the builtin 'float'

以下是一段求解MSE的代码：

```python
import numpy as np


def mse_loss(_y_true: np.ndarray, _y_pred: np.ndarray) -> np.float:
    return ((_y_true - _y_pred) ** 2).mean()


y_true = np.array([1, 0, 0, 1])
y_pred = np.array([0, 0, 0, 0])

print(mse_loss(y_true, y_pred))
```

运行报错：

<font color="red">
DeprecationWarning: `np.float` is a deprecated alias for the builtin `float`. To silence this warning, use `float` by itself. Doing this will not modify any behavior and is safe. If you specifically wanted the numpy scalar type, use `np.float64` here.<br>
Deprecated in NumPy 1.20; for more details and guidance: https://numpy.org/devdocs/release/1.20.0-notes.html#deprecations
  after removing the cwd from sys.path.
</font>

解决方法：将`np.float`替换成`np.float64`。

补充说明：Python编码时明确指定参数类型和返回值类型是一个很好的习惯！
