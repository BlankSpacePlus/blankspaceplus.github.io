---
title: Python异常处理
date: 2019-10-18 10:50:16
summary: 本文分享Python异常处理的相关内容。
tags:
- Python
categories:
- Python
---

# 常见语法错误

 - 拼写错误
 - 程序不符合Python语法规范
 - 缩进错误

# 异常处理

 - `try...except...`：捕获单个异常并处理
 - `try...except...except...`：捕获多个异常并处理
 - `try...except...else...`：捕获异常并处理，如果没异常，执行else块语句
 - `try...except...finally...`：捕获异常并处理，finally块一定被执行（除非被强行中断）

# 抛出异常

- raise语句可以抛出异常：
  - `raise 异常名`
  - `raise 异常名, 附加数据`
  - `raise 类名`
- assert语句：
    - `assert<条件测试>, <异常附加数据>`：断言为假会抛出AssertionError异常并包含错误信息。

# 内置异常类

| 异常名 | 描述 |
|:----:|:----:|
| AttributeError | 调用不存在的方法引发的异常 |
| EOFError | 遇到文件末尾引发的异常 |
| ImportError | 导入模块出错引发的异常 |
| IndexError | 列表越界引发的异常 |
| IOError | I/O操作引发的异常 |
| KeyError | 使用字典中不存在的键引发的异常 |
| NameError | 使用不存在的变量名引发的异常 |
| TabError | 语句块缩进不正确引发的异常 |
| ValueError | 搜索列表中不存在的值引发的异常 |
| ZeroDivisionError | 除数为0引发的异常 |
| FileNotFoundError | 找不到文件引发的异常 |

# except的捕获方式

 - `except`：捕获所有异常
 - `except<异常名>`：捕获指定异常
 - `except (异常名1, 异常名2)`：捕获异常1或者异常2
 - `except<异常名> as <数据>`：捕获指定异常及其附加的数据
 - `except (异常名1, 异常名2)`：捕获指定异常1或者异常2及异常附加的数据

Java里面我们也有提及，能不要 catch All 就不要这样处理。就像这里的except语句，直接catch All，但往往是不合适的。

# 代码测试工作

## 函数

```python
def grade(sum):
    """
    >>> grade(90)
    '优'
    >>> grade(89)
    '良'
    >>> grade(65)
    '及格'
    >>> grade(10)
    '不及格'
    """
    if sum > 100 or sum < 0:
        print('Error')
        return
    elif sum > 90:
        return '优'
    elif sum > 80:
        return '良'
    elif sum > 70:
        return '中'
    elif sum > 60:
        return '及格'
    else:
        return '不及格'


if __name__ == '__main__':
    import doctest
    doctest.testmod()    
```

## 单元测试函数

test1.py
```python
def grade(sum):
    if sum > 100 or sum < 0:
        print('Error')
        return
    elif sum > 90:
        return '优'
    elif sum > 80:
        return '良'
    elif sum > 70:
        return '中'
    elif sum > 60:
        return '及格'
    else:
        return '不及格'


if __name__ == '__main__':
    import doctest
    doctest.testmod()    
```

文本文件 test.txt 中保存测试用例：
```python
>>>from test1 import grade
>>> grade(90)
'优'
>>> grade(89)
'良'
>>> grade(65)
'及格'
>>> grade(10)
'不及格'
```

测试语句：
```python
import doctest
doctest.testfile('test.txt')  
```
