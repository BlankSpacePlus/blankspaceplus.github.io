---
title: Matplotlib切割图片
date: 2020-02-13 14:37:55
summary: 本文提供一个Matplotlib切割图片的示例。
tags:
- Python
- Matplotlib
categories:
- Python
---

# 图像处理

从外部导入的图像通常是以图片的形式存在的，图片外观样式一般是矩形。

如果需要将矩形图片以其他样式在坐标轴上进行展示，那么这个需求就需要借助图片剪切、加载和展示等方法加以实现。

这里用圆形切了原图片，并隐去了坐标轴，只关注图案本身。

# 原图像

![](../../../images/软件开发/Python/Matplotlib切割图片/1.png)

# 实现代码

```python
import matplotlib.pyplot as plt
from matplotlib.cbook import get_sample_data
from matplotlib.patches import Circle

with get_sample_data("d:\PyCharm\data\pig.jpg", asfileobj=True) as imageFile:
    imageArray = plt.imread(imageFile)

fig, ax = plt.subplots(1, 1)
ai = ax.imshow(imageArray)
patch = Circle((125, 125), radius=125, transform=ax.transData)
ai.set_clip_path(patch)

ax.set_axis_off()

plt.show()
```

# 成品图

![](../../../images/软件开发/Python/Matplotlib切割图片/2.png)
