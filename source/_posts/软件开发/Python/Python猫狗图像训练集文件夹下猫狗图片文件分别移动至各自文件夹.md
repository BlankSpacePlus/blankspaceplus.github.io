---
title: Python猫狗图像训练集文件夹下猫狗图片文件分别移动至各自文件夹
date: 2022-05-04 23:29:42
summary: 下载Kaggle的猫与狗图像分类数据集，解压后的train文件夹内存在cat.xx.jpg和dog.xx.jpg两类图片，先需要将其分别移动至train/cat和train/dog文件夹下，需要我们去编程自动化这个过程，本文提供Python实现方法。
tags:
- Python
categories:
- Python
---

这个标题有点拗口，下面描述一下这篇文章做了什么事情：

下载[Kaggle](https://www.kaggle.com/competitions/dogs-vs-cats-redux-kernels-edition/data)的猫与狗图像分类数据集，解压后的`train`文件夹内存在`cat.xx.jpg`和`dog.xx.jpg`两类图片，先需要将其分别移动至`train/cat`和`train/dog`文件夹下，需要我们去编程自动化这个过程。

下载后解压的目录结构是这样的：
- 📁test
    - 🗄️xxx.jpg
- 📁train
    - 🗄️cat.xxx.jpg
    - 🗄️dog.xxx.jpg
- 🗄️sample_submission.csv

`test`和`train`下都无文件夹，全是图片文件。

为了编码方便，我们需要把`train`下猫和狗的图片分别归类至自身的文件夹：
- 📁test
    - 🗄️xxx.jpg
- 📁train
    - 📁cat
        - 🗄️cat.xxx.jpg
    - 📁dog
        - 🗄️dog.xxx.jpg
- 🗄️sample_submission.csv

Python编码如下：
```python
import os
import shutil


# 没有文件夹则需要创建文件夹
cat_path: str = "./data/train/cat"
if not os.path.exists(cat_path):
    os.makedirs(cat_path)
dog_path: str = "./data/train/dog"
if not os.path.exists(dog_path):
    os.makedirs(dog_path)

# 遍历文件夹下文件并分别归类至对应的目录
image_path: str = "./data/train"
images: list = os.listdir(image_path)
for image in images:
    current_image_path: str = os.path.join(image_path, image)
    new_cat_path: str = os.path.join(cat_path, image)
    new_dog_path: str = os.path.join(dog_path, image)
    if "cat" in image and not os.path.isdir(current_image_path):
        shutil.move(current_image_path, new_cat_path)
    if "dog" in image and not os.path.isdir(current_image_path):
        shutil.move(current_image_path, new_dog_path)
```

文件移动的步骤，用的是`shutil`库：`shutil.move(source_path, target_path)`
