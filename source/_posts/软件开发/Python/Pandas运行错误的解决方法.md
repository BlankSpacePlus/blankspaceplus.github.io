---
title: Pandas运行错误的解决方法
date: 2020-09-26 18:51:12
summary: 本文分享一些Pandas常见运行错误的解决方法。
tags:
- Python
- Pandas
categories:
- Python
---

![](../../../images/软件开发/Python/Pandas运行错误的解决方法/1.png)

# AttributeError: 'DatetimeProperties' object has no attribute 'weekday_name'

运行下面的代码：

```python
import pandas as pd

# 创建日期
dates = pd.Series(pd.date_range("2/2/2002", periods=3, freq="M"))
# 查看星期几
print(dates.dt.weekday_name)
# 只显示数值
print(dates.dt.weekday)
```

报错：
<font color="red">AttributeError: 'DatetimeProperties' object has no attribute 'weekday_name'</font>

解决方法：
weekday_name改为day_name()

最终代码：

```python
import pandas as pd

# 创建日期
dates = pd.Series(pd.date_range("2/2/2002", periods=3, freq="M"))
# 查看星期几
print(dates.dt.day_name())
# 只显示数值
print(dates.dt.weekday)
```
