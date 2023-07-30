---
title: Python列表基本操作
date: 2019-10-18 09:49:04
summary: 本文介绍Python列表基本操作。
tags:
- Python
categories:
- Python
---

# 0.准备

统一定义列表abc为：

```python
abc = ['a', 'b', 'c']
```

# 1.增

- 按位插入。
    ```python
    abc.insert(1, 'd')
    ```
- 表尾追加。
    ```python
    abc.append('d')
    ```

# 2.删

- 按位删除，不再使用。
    ```python
    del abc[1]
    ```
- 按位删除，还可以使用，只是元素变为“不可见”。
    ```python
    abc.pop(1)
    ```
- 按值删除。
    ```python
    abc.remove('c')
    ```

# 3.改

按照索引修改即可。

```python
abc[1] = 'd'
```

# 4.查

直接按索引查询即可。
```python
print(abc[0])
```

# 5.排序

- 永久性排序（与字母顺序相同）
    ```python
    abc.sort()
    ```
- 永久性排序（与字母顺序相反）
    ```python
    abc.sort(reverse=True)
    ```
- 临时性排序
    ```python
    print(sorted(abc))
    ```
- 倒序
    ```python
    abc.reverse()
    ```

# 6.获取表长

```python
print(len(abc))
```

# 7.运算符的使用

| Python表达式 | 结果 | 描述 |
|:----:|:----:|:----:|
| len(['a', 'b', 'c']) | 3 | 长度 |
| ['a', 'b', 'c'] + ['d', 'e', 'f'] | ['a', 'b', 'c', 'd', 'e', 'f'] | 组合 |
| ['ABC']*4 | ['ABC', 'ABC', 'ABC', 'ABC'] | 重复 |
| 'b' in ['a', 'b', 'c']| True | 显示元素是否存在于列表中 |
| for i in ['a', 'b', 'c']: print i | a b c | 迭代 |

# 8.截断与拼接

| Python表达式 | 结果 | 描述 |
|:----:|:----:|:----:|
| L[2] | ‘c’ | 读取第三个元素 |
| L[-2] | 'b' | 从右侧开始读取倒数第二个元素 |
| L[1:] | ['b', 'c'] | 输出从第二个元素开始后的所有元素 |

# 9.列表嵌套

```python
bcd = ['b', 'c', 'd']
abcd = [abc, bcd]
```

# 10.获取最大值和最小值

- 最大值
    ```python
    print(max(abc))
    ```
- 最小值
    ```python
    print(min(abc))
    ```

# 11.追加列表

```python
bcd = ['b', 'c', 'd']
abc.extend(bcd)
```

# 12.统计某元素出现次数

```python
print(abc.count('b'))
```

# 13.清空

```python
abc.clear()
```

# 14.复制拷贝

```python
abc2 = abc.copy()
```

# 15.获取某元素索引

```python
print(abc.index('b'))
```
