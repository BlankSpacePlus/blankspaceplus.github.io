---
title: OpenCV图像处理
date: 2023-10-21 17:59:14
summary: 本文分享一些基于OpenCV处理图像的经典案例。
tags:
- Python
- OpenCV
categories:
- Python
---

# 图像加载

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

# 把图像导入为灰度图
image = cv2.imread("plane.jpg", cv2.IMREAD_GRAYSCALE)

# 使用matplotlib显示图像
plt.imshow(image, cmap="gray"), plt.axis("off")
plt.show()

# 查看图像数据类型
print(type(image))

# 查看图像数据
print(image)

# 显示图像矩阵维度
print(image.shape)

# 显示第一个像素点的像素值
print(image[0, 0])

# 以彩色模式加载图像
image_bgr = cv2.imread("plane.jpg", cv2.IMREAD_COLOR)
# 显示像素值
print(image_bgr[0, 0])

# 转换为RGB格式
image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
# 显示图像
plt.imshow(image_rgb), plt.axis("off")
plt.show()
```

# 图像保存

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

# 以灰度图的格式导入图像
image = cv2.imread("plane.jpg", cv2.IMREAD_GRAYSCALE)

# 保存图像(有覆盖效果)
cv2.imwrite("plane_new.jpg", image)
```

# 图像缩放

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

# 以灰度图格式导入图像
image = cv2.imread("plane_256x256.jpg", cv2.IMREAD_GRAYSCALE)

# 将图片尺寸调整为50x50像素(机器学习常用的图像规格有：32x32、64x64、96x96、256x256)
image50x50 = cv2.resize(image, (50, 50))

# 查看图像
plt.imshow(image50x50, cmap="gray"), plt.axis("off")
plt.show()
```

# 图像剪裁

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

# 以灰度图格式导入图像
image = cv2.imread("plane_256x256.jpg", cv2.IMREAD_GRAYSCALE)

# 选择所有的行和前128列
image_cropped = image[:, :128]

# 显示图像
plt.imshow(image_cropped, cmap="gray"), plt.axis("off")
plt.show()
```

# 图像二值化

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

image_gray = cv2.imread("plane_256x256.jpg", cv2.IMREAD_GRAYSCALE)

# 应用自适应阈值处理(阈值处理的主要优点之一是图像去噪)
max_output_value = 255
neighborhood_size = 99
subtract_from_mean = 10
image_binarized = cv2.adaptiveThreshold(image_gray, max_output_value, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,
                                        neighborhood_size, subtract_from_mean)

plt.imshow(image_binarized, cmap="gray"), plt.axis("off")
plt.show()

# 使用 cv2.ADAPTIVE_THRESH_MEAN_C
image_mean_threhold = cv2.adaptiveThreshold(image_gray, max_output_value, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY,
                                            neighborhood_size, subtract_from_mean)
plt.imshow(image_mean_threhold, cmap="gray"), plt.axis("off")
plt.show()
```

# 图像锐化

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

image = cv2.imread("plane_256x256.jpg", cv2.IMREAD_GRAYSCALE)

# 创建核
kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])

# 锐化图像
image_shape = cv2.filter2D(image, -1, kernel)

plt.imshow(image_shape, cmap="gray"), plt.axis("off")
plt.show()
```

# 图像平滑处理

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

# 以灰度图格式导入图像
image = cv2.imread("plane_256x256.jpg", cv2.IMREAD_GRAYSCALE)

# 平滑处理图像
image_blurry = cv2.blur(image, (5, 5))
plt.imshow(image_blurry, cmap="gray"), plt.axis("off")
plt.show()

image_very_blurry = cv2.blur(image, (100, 100))
plt.imshow(image_very_blurry, cmap="gray"), plt.xticks([]), plt.yticks([])
plt.show()

# 创建核(我们使用的平滑核)
kernel = np.ones((5, 5)) / 25.0
print(kernel)

# 应用核
image_kernel = cv2.filter2D(image, -1, kernel)
plt.imshow(image_kernel, cmap="gray"), plt.xticks([]), plt.yticks([])
plt.show()
```

# 图像对比度处理

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

image = cv2.imread("plane_256x256.jpg", cv2.IMREAD_GRAYSCALE)

# 增强图像
image_enhanced = cv2.equalizeHist(image)

plt.imshow(image_enhanced, cmap="gray"), plt.axis("off")
plt.show()

# 加载图像
image_bgr = cv2.imread("plane.jpg")

# 转换成YUV格式(Y代表亮度，U和V代表颜色)
image_yuv = cv2.cvtColor(image_bgr, cv2.COLOR_YUV2BGR)

plt.imshow(image_yuv), plt.axis("off")
plt.show()
```

# 图像背景清除

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

image_bgr = cv2.imread("plane_256x256.jpg", cv2.IMREAD_COLOR)
image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

# 矩形的值，左上角的x坐标，左上角的y坐标，宽，高
rectangle = (0, 56, 256, 150)

# 创建初始掩模
mask = np.zeros(image_rgb.shape[:2], np.uint8)

# 创建grabCut函数所需要的临时数组
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)

# 执行grabCut函数
cv2.grabCut(image_rgb, mask, rectangle, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)

# 创建一个掩模，将确定或很可能是背景的部分设置为0，其余部分设置为1
mask_2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')

# 将图像与掩模相乘除去背景
image_rgb_nobg = image_rgb * mask_2[:, :, np.newaxis]

# 显示图像
plt.imshow(image_rgb_nobg), plt.axis("off")
plt.show()

# 显示掩模
plt.imshow(mask, cmap='gray'), plt.axis("off")
plt.show()

plt.imshow(mask_2, cmap='gray'), plt.axis("off")
plt.show()
```

# 图像颜色分离

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

image_bgr = cv2.imread("plane_256x256.jpg")

# 将BGR格式转为HSV格式
image_hsv = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2HSV)

# 定义HSV格式中蓝色分量的区间
lower_blue = np.array([50, 100, 50])
upper_blue = np.array([130, 255, 255])

# 创建掩模
mask = cv2.inRange(image_hsv, lower_blue, upper_blue)

# 应用掩模
image_bgr_masked = cv2.bitwise_and(image_bgr, image_bgr, mask=mask)

# 从BGR格式转为RGB格式
image_rgb = cv2.cvtColor(image_bgr_masked, cv2.COLOR_BGR2RGB)

plt.imshow(image_rgb), plt.axis("off")
plt.show()

plt.imshow(mask, cmap='gray'), plt.axis("off")
plt.show()
```

# 图像颜色通道平均值特征编码

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

# 以BGR格式加载图像
image_bgr = cv2.imread("plane_256x256.jpg", cv2.IMREAD_COLOR)

# 计算每个通道的平均值
channels = cv2.mean(image_bgr)

# 交换红色通道和蓝色通道，将图像从BGR格式转换成RGB格式
observation = np.array([(channels[2], channels[1], channels[0])])

# 显示每个颜色通道的平均值
print(observation)

# 显示颜色图像
plt.imshow(observation), plt.axis("off")
plt.show()
```

# 图像边缘检测

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

# 以灰度格式加载图像
image_gray = cv2.imread("plane_256x256.jpg", cv2.IMREAD_GRAYSCALE)

# 计算像素强度的中位数
median_intensity = np.median(image_gray)

# 设置阈值
lower_threshold = int(max(0, (1.0 - 0.33) * median_intensity))
upper_threshold = int(min(255, (1.0 + 0.33) * median_intensity))

# 应用Canny边缘检测器
image_canny = cv2.Canny(image_gray, lower_threshold, upper_threshold)

# 显示图像
plt.imshow(image_canny, cmap="gray"), plt.axis("off")
plt.show()
```

# 图像角点检测

## 图像Harris角点检测方法

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

image_bgr = cv2.imread("plane_256x256.jpg")
image_gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
image_gray = np.float32(image_gray)

# 设置角点探测器的参数
block_size = 2
aperture = 29
free_parameter = 0.04

# 检测角点
detector_responses = cv2.cornerHarris(image_gray, block_size, aperture, free_parameter)

# 设置角点检测器参数
detector_responses = cv2.dilate(detector_responses, None)

# 只保留大于阈值的检测结果，并把它们标记成白色
threshold = 0.02
image_bgr[detector_responses > threshold * detector_responses.max()] = [255, 255, 255]

# 转换成灰度图
image_gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)

plt.imshow(image_gray, cmap="gray"), plt.axis("off")
plt.show()

# 画一张显示可能的角点的灰度图
plt.imshow(detector_responses, cmap="gray"), plt.axis("off")
plt.show()
```

## 图像ShiTomasi角点检测方法

```python
import numpy as np
from matplotlib import pyplot as plt
import cv2

image_bgr = cv2.imread("plane_256x256.jpg")
image_gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)

# 设置角点探测器的参数
corners_to_detect = 10
minimum_quality_score = 0.05
minimum_distance = 25

# 检测角点
corners = cv2.goodFeaturesToTrack(image_gray, corners_to_detect, minimum_quality_score, minimum_distance)
corners = np.float32(corners)

# 在每个角点上画白圈
for corner in corners:
    x, y = corner[0]
    cv2.circle(image_bgr, (x, y), 10, (255, 255, 255), -1)

# 转换成灰度图
image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)

plt.imshow(image_rgb, cmap="gray"), plt.axis("off")
plt.show()
```
