---
title: Matplotlib绘制散点图
date: 2019-11-08 23:30:47
summary: 本文分享Matplotlib绘制散点图的过程。
tags:
- Python
- Matplotlib
categories:
- Python
---

```python
# -*- coding: utf-8 -*-

import numpy as np
import matplotlib.pyplot as plt
import matplotlib


matplotlib.rcParams['font.sans-serif'] = ['SimHei']
matplotlib.rcParams['axes.unicode_minus'] = False

x = np.arange(1, 10)
y = x

fig = plt.figure()
plt.title("散点图")
plt.xlabel('X')
plt.ylabel('Y')
plt.scatter(x, y, c='red', marker='o')
plt.legend('x')
plt.show()
```

![](../../../images/软件开发/Python/Matplotlib绘制散点图/1.png)

```python
# -*- coding: utf-8 -*-

import numpy as np
import matplotlib.pyplot as plt
import matplotlib


matplotlib.rcParams['font.sans-serif'] = ['SimHei']
matplotlib.rcParams['axes.unicode_minus'] = False

x = np.random.normal(0, 1, 1024)
y = np.random.normal(0, 1, 1024)

plt.figure(num=5, figsize=(8, 4))
plt.title("漂亮的散点图")
plt.xlim((-1.5, 1.5))
plt.ylim((-1.5, 1.5))
plt.xlabel('X')
plt.ylabel('Y')
plt.xticks(())
plt.yticks(())
plt.scatter(x, y, s=75, c="red", alpha=0.5)
plt.show()
```

![](../../../images/软件开发/Python/Matplotlib绘制散点图/2.png)
