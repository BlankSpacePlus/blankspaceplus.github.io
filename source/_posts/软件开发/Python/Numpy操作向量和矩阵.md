---
title: Numpy操作向量和矩阵
date: 2020-01-23 16:52:58
summary: 本文分享Python向量和矩阵运算库Numpy的用法。
tags:
- Python
- Numpy
categories:
- Python
---

# Numpy简介

Numpy是Python机器学习技术栈的基础。

Numpy可以对机器学习中常用的数据结构 向量(vector)、矩阵(matrice)、张量(tensor) 进行高效的操作。

Numpy是很多库的基础，比如Scipy、Matplotlib、OpenCV、Scikit-Learn等，非常重要。

# 目标1 创建一个向量

向量可以表示为**一维数组**。

```python
# 加载numpy库
import numpy as np

# 创建一个一维数组表示一个行向量
vector_row = np.array([1, 2, 3])

# 创建一个一维数组表示一个列向量
vector_column = np.array([[1], [2], [3]])
```

# 目标2 创建一个矩阵

矩阵可以表示为一个**二维数组**。

表示的时候注意`[[, ], [, ], [, ]]`这样的格式，不要漏外括号。

```python
# 加载numpy库
import numpy as np

# 创建一个二维数组表示一个矩阵
matrix1 = np.array([[1, 2], [1, 2], [1, 2]])
```
当然，在Numpy中，可以用专门的矩阵数据结构来表示矩阵。
但并不推荐这样用，原因是：
 - 数组才是Numpy标准的数据结构。
 - 绝大多数Numpy操作返回的是数组而不是矩阵对象。

```python
# 加载numpy库
import numpy as np

# 利用Numpy内置矩阵数据结构
matrix1_object = np.mat([[1, 2], [1, 2], [1, 2]])
```

# 目标3 创建一个稀疏矩阵

我们在学习数据结构时学习了稀疏矩阵的知识。

机器学习中，数据集十分庞大且其中大部分元素是0的情况很常见，如果正常存储十分浪费空间；但按照稀疏矩阵存储，能**节省空间**、**降低计算成本**。

总结：**稀疏矩阵能高效地表示只有零星非零值的数据**。

```python
# 加载numpy库
import numpy as np

# 加载scipy库的sparse
from scipy import sparse

# 创建一个新的矩阵
matrix2 = np.array([[0, 0], [0, 1], [3, 0]])

# 创建一个压缩的稀疏行(CSR)矩阵
matrix2_sparse = sparse.csc_matrix(matrix2)
```
我们可以查看稀疏矩阵：
```python
# 查看稀疏矩阵
print(matrix2_sparse)
```
我们再看一看更大的矩阵吧：
```python
# 创建一个更大的矩阵
matrix_large = np.array([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                         [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                         [3, 0, 0, 0, 0, 0, 0, 0, 0, 0]])

# 创建一个CSR矩阵
matrix_large_sparse = sparse.csr_matrix(matrix_large)

# 查看原先的稀疏矩阵
print(matrix2_sparse)

# 查看更大的稀疏矩阵
print(matrix_large_sparse)
```

稀疏矩阵的类型很多，比如，**压缩的稀疏列**、**表中表**以及**键值对字典**，我们应该学会在合适的场景运用合适的类型。

# 目标4 选择元素

我们可以利用**索引**，在向量或矩阵中选择一个或多个元素。

注意索引都是**从0开始**的呀！

另外，**负数索引**是倒着来的，这点也要注意哈！

```python
# 加载numpy库
import numpy as np

# 创建一个行向量
vector = np.array([1, 2, 3, 4, 5, 6])

# 创建矩阵
matrix_vector = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 选择向量的第三个元素
print(vector[2])

# 选择第二行第二列
print(matrix_vector[1, 1])
```

众所周知，Python的列表和元组就有**索引**和**切片**，那么这里其实也有的：

```python
# 选取一个向量的所有元素
print(vector[:])

# 选取从0开始一直到第3个（包含第3个）元素
print(vector[:3])

# 选取第3个元素之后的全部元素
print(vector[3:])

# 选取最后一个元素
print(vector[-1])

# 选取矩阵的第1行和第2行以及所有列
print(matrix_vector[:2, :])

# 选取所有行以及第2列
print(matrix_vector[:, 1:2])

# 选取所有行以及第2列并转换成一个新的行向量
print(matrix_vector[:, 1])
```

# 目标5 展示一个矩阵的属性

有时候，在某一步操作之前，我们可能想确认一下矩阵的形状、大小和维数，这可能是简单的，也可能很重要。

接下来我们分别利用shape查看矩阵的形状、利用size查看矩阵的大小、利用ndim查看矩阵的维数：

```python
# 加载numpy库
import numpy as np

# 创建新的矩阵
matrix3 = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])

# 查看行数和列数
print(matrix3.shape)

# 查看元素数量
print(matrix3.size)

# 查看维数
print(matrix3.ndim)
```

# 目标6 对多个元素同时应用某个操作

我们有时候可能想要对一个数组中的多个元素同时应用某个函数，而Numpy中的vertorize类可以将一个函数转成另一个函数，这个函数能把某个操作应用的数组的**全部元素或者一个切片**上。

需要明确的是，vertorize本质上是在对数组选中的所有元素循环的执行某种操作，所以**并不会提升性能**。

```python
# 加载numpy库
import numpy as np

# 创建矩阵
matrix_vector = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 创建一个匿名函数，返回输入值加上100以后的值
add_100 = lambda i: i+100

# 创建向量转化函数
vectorized_add_100 = np.vectorize(add_100)

# 对矩阵的所有元素应用这个函数
print(vectorized_add_100(matrix_vector))

# 用后矩阵本身不变
print(matrix_vector)

# 连续使用
print(vectorized_add_100(vectorized_add_100(matrix_vector)))
```

此外，使用Numpy的数组，我们可以对两个维度不同的数组执行操作（这是一种叫做**广播**的方法）：

```python
matrix_vector + 100
```

# 目标7 找到最大值和最小值

计算一个数组的最大值或者最小值可能是重要的。

```python
# 加载numpy库
import numpy as np

# 创建矩阵
matrix_vector = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 返回最大的元素
print(np.max(matrix_vector))

# 返回最小元素
print(np.min(matrix_vector))
```

如上所述，求一个数组或者一个数组的子集中元素的最大值和最小值是很常见的需求，使用max和min方法易于实现。而使用axis参数可以**对一个特定的坐标轴**应用此操作：

```python
# 找到每一列的最大元素
print(np.max(matrix_vector, axis=0))

# 找到每一行最大的元素
print(np.max(matrix_vector, axis=1))
```

# 目标8 计算平均值、方差和标准差

如果我们还记得学过的概率论与数理统计的内容的话，就会知道一些重要的描述性统计值，如**数学期望**、**方差**和**标准差**等，这里我们可以利用Numpy的mean、var和std求解：

```python
# 加载numpy库
import numpy as np

# 创建矩阵
matrix_vector = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 返回平均值
print(np.mean(matrix_vector))

# 返回方差
print(np.var(matrix_vector))

# 返回标准差
print(np.std(matrix_vector))
```
我们当然可以容易的求出整个矩阵或者其中一个坐标轴的描述性统计值：
```python
# 求每一列的平均值
print(np.mean(matrix_vector, axis=0))

# 求每一行的方差
print(np.var(matrix_vector, axis=1))
```

# 目标9 矩阵变形

有时候，我们可能会想在不改变元素值的前提下，改变一个数组的形状（行数和列数），Numpy的reshape可以实现这种要求。
reshape可以重构一个数组，维持该数组**原来的数据不变**，只改变行数和列数。但要求原矩阵和新矩阵包含的**元素个数必须相同**（大小相同）。比如，2 × 6 矩阵可以换成 3 × 4 矩阵，元素个数都是12个。

```python
# 加载numpy库
import numpy as np

# 创建新的矩阵
matrix3 = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])

# 将matrix3矩阵变为2×6矩阵
matrix4 = matrix3.reshape(2, 6)
print(matrix4)

# 上面的变形要求前后元素个数相同，且不会改变元素个数
print(matrix4.size)
```

reshape能传入参数-1，这时意味着**可以“根据需要填充元素”**。

```python
# reshape时传入参数-1意味着可以根据需要填充元素
print(matrix3.reshape(1, -1))
```
只提供一个整数作为参数也是可以的，会返回一个长度为该整数的一维数组：
```python
# reshape如果提供一个整数，那么reshape会返回一个长度为该整数值的一维数组
print(matrix3.reshape(12))
```

# 目标10 转置向量或矩阵

学过线性代数之后我们都知道，转置是常见的操作，它将矩阵的**每个元素**的行坐标、列坐标**互换**。

```python
# 加载numpy库
import numpy as np

# 创建矩阵
matrix_vector = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 转置matrix_vector矩阵
print(matrix_vector.T)
```

实际上，在线性代数里面，**向量是不能被转置的**。

我们如果想“转置向量”，就需要把向量纯粹的当做$1×N$或者$N×1$的矩阵处理（即用`[[, ]]`而不是`[, ]`）：

```python
# 严格地讲，向量是不能被转置的
print(vector.T)

# 转置向量通常指二维数组表示形式下将行向量转换为列向量或者反向转换
print(np.array([[1, 2, 3, 4, 5, 6]]).T)
```

# 目标11 展开一个矩阵

所谓“展开”矩阵，不过是**将一个矩阵转换成一个一维数组**，Numpy中的flatten可以帮助我们实现：

```python
# 加载numpy库
import numpy as np

# 创建矩阵
matrix_vector = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 将matrix_vector矩阵展开
print(matrix_vector.flatten())
```
我们才看过的reshape显然也能完成这种小任务：
```python
# 将矩阵展开的另一种策略是利用reshape创建一个行向量
print(matrix_vector.reshape(1, -1))
```

# 目标12 计算矩阵的秩

线性代数里面，矩阵的秩也是重要的概念。为了便于理解，我们这里就不提什么向量组的极大无关组那些，我们可以认为矩阵的秩就是**按照其行或者列展开的向量空间的维数**，神圣的Numpy提供了matrix_rank，我们利用它可以轻松求解：

```python
# 加载numpy库
import numpy as np

# 创建用于求秩的新矩阵
matrix5 = np.array([[1, 1, 1], [1, 1, 10], [1, 1, 15]])

# 计算矩阵matrix5的秩
print(np.linalg.matrix_rank(matrix5))
```

# 目标13 计算行列式

我在学线性代数的时候，行列式是最早学的Part了，行列式只是一个数而已，但矩阵的行列式是很有用的。

简而言之，**矩阵的[ ]换成| |就是矩阵的行列式的表示**（手写版），只是从一个数表变成了一个数。

求解行列式可能是复杂的，但Numpy的det帮助我们解决了这个问题：

```python
# 加载numpy库
import numpy as np

# 创建用于行列式求解的新矩阵
matrix6 = np.array([[1, 2, 3], [2, 4, 6], [3, 8, 9]])

# 求解矩阵matrix6的行列式
print(np.linalg.det(matrix6))
```

# 目标14 获取矩阵的对角线元素

有时候，我们可能想要获取矩阵的**对角线元素**，Numpy的diagonal能帮到我们：

```python
# 加载numpy库
import numpy as np

# 创建用于行列式求解的新矩阵
matrix6 = np.array([[1, 2, 3], [2, 4, 6], [3, 8, 9]])

# 返回矩阵的对角线元素
print(matrix6.diagonal())
```

我们还可以使用offset参数在主对角线**上下偏移**，获取偏移后的对角线方向上的元素：

```python
# 返回主对角线向上偏移量为1的对角线元素
print(matrix6.diagonal(offset=1))

# 返回主对角线向下偏移量为1的对角线元素
print(matrix6.diagonal(offset=-1))
```

# 目标15 计算矩阵的迹

线性代数里提到了矩阵的迹，指**矩阵对角线元素之和**，常被用在机器学习方法的底层计算中，Numpy的trace可以加以求解：

```python
# 加载numpy库
import numpy as np

# 创建用于行列式求解的新矩阵
matrix6 = np.array([[1, 2, 3], [2, 4, 6], [3, 8, 9]])

# 返回矩阵的迹
print(matrix6.trace())
```
当然，也可以麻烦一些，利用对矩阵对角线元素求和的方式求解：
```python
# 求迹的另外的方法（返回对角线元素并求和）
print(sum(matrix6.diagonal()))
```

# 目标16 计算特征值和特征向量

线性代数中，矩阵的特征值和特征向量特别重要，我学习的时候这是矩阵相似对角化的重要基础。另外，假设线性变换是以矩阵A的形式给出的，则当应用此线性变换的时候，特征向量只会改变大小（不改变方向）。

$A\xi = \lambda\xi$（$A$为方阵，$λ$是特征值，$\xi$是特征向量）

Numpy的eig()可以帮助我们求解此问题。

```python
# 加载numpy库
import numpy as np

# 创建一个求解特征值、特征向量的矩阵
matrix7 = np.array([[1, -1, 3], [1, 1, 6], [3, 8, 9]])

# 计算特征值和特征向量
eigenvalues, eigenvectors = np.linalg.eig(matrix7)

# 查看特征值
print(eigenvalues)

# 查看特征向量
print(eigenvectors)
```

# 目标17 计算点积

向量的点积其实在高中就学习了，在线性代数和空间解析几何中也是重要内容。可以这样定义：$\sum\limits_{i=1}^{n}{a_{i}b_{i}}$

Numpy的dot()可以完成这个任务。

```python
# 加载numpy库
import numpy as np

# 构造两个点积（数量积）所需向量
vector_a = np.array([1, 2, 3])
vector_b = np.array([4, 5, 6])

# 计算点积
print(np.dot(vector_a, vector_b))
```
Python 3.5+版本可以利用@求解向量点积：
```python
# Python 3.5+ 版本可以这样求解点积
print(vector_a @ vector_b)
```

# 目标18 计算矩阵的相加或相减

所谓矩阵加法或者减法，无非是在两个**形状大小完全一致**的矩阵上，对**每个元素逐一进行**加减法，Numpy的add和subtract可以分别实现矩阵加减法：

```python
# 加载numpy库
import numpy as np

# 构造两个可用于加减的矩阵
matrix_a = np.array([[1, 1, 1], [1, 1, 1], [1, 1, 2]])
matrix_b = np.array([[1, 3, 1], [1, 3, 1], [1, 3, 8]])

# 两矩阵相加
print(np.add(matrix_a, matrix_b))

# 两矩阵相减
print(np.subtract(matrix_a, matrix_b))
```
直接利用运算符运算也是被支持的：
```python
# 直接用+/-也可以做矩阵加减
print(matrix_a + matrix_b)
print(matrix_a - matrix_b)
```

# 目标19 矩阵的乘法

矩阵乘法的实现类似向量乘法，可以用Numpy的dot：

```python
# 加载numpy库
import numpy as np

# 构造两个可用于乘法的小矩阵
matrix_c = np.array([[1, 1], [1, 2]])
matrix_d = np.array([[1, 3], [1, 2]])

# 两矩阵相乘
print(np.dot(matrix_c, matrix_d))
```

Python 3.5+版本可以利用@求解矩阵乘法：

```python
# Python 3.5+ 版本可以这样求解矩阵乘法
print(matrix_c @ matrix_d)
```
只是把矩阵对应元素相乘，可以用*求解：
```python
# 我们也可以把两矩阵对应元素相乘，而非矩阵乘法
print(matrix_c * matrix_d)
```

# 目标20 计算矩阵的逆

如果逆矩阵存在，则可以用Numpy的linalg.inv来计算：

```python
# 加载numpy库
import numpy as np

# 创建一个用于求逆的矩阵
matrix8 = np.array([[1, 4], [2, 5]])

# 计算矩阵的逆
print(np.linalg.inv(matrix8))
```

**如果逆矩阵存在**，矩阵本身和逆矩阵相乘得到**单位矩阵**：

```python
# 验证一个矩阵和它的逆矩阵相乘等于I（单位矩阵）
print(matrix8 @ np.linalg.inv(matrix8))
```

# 目标21 生成随机数

伪随机数是很重要的，值得一提的是，其生成器中有“种子”。
```python
# 加载numpy库
import numpy as np

# 设置随机数种子
np.random.seed(0)

# 生成3个0.0~1.0之间的浮点随机数
print(np.random.random(3))
```
我们继续看看吧：
```python
# 生成3个1~10之间的随机整数
print(np.random.randint(0, 11, 3))

# 从平均值是0.0，标准差是1.0的正态分布中抽取3个数
print(np.random.normal(0.0, 1.0, 3))

# 从平均值是0.0，散布程度是1.0的logistic分布中抽取3个数
print(np.random.logistic(0.0, 1.0, 3))

# 从大于等于1.0，小于2.0的范围内抽取3个数
print(np.random.uniform(1.0, 2.0, 3))
```

# 本文总结

Numpy有丰富的内容，本文举一些经典的应用加以阐释，还望对读者有所帮助。
