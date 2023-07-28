---
title: VisualBasicScript基本语法
date: 2020-02-28 21:50:37
summary: 本文分享VisualBasic的分支结构、循环结构、内置函数。
tags:
- VBScript
categories:
- 开发技术
---

# 分支结构

在 VBScript 我们可以使用4种条件语句：
- **If 语句**：假如你希望在条件为 true 时执行一系列的代码，可以使用这个语句。
- **If...Then...Else 语句**：假如你希望执行两套代码其中之一，可以使用这个语句。
- **If...Then...Elseif 语句**：假如你希望选择多套代码之一来执行，可以使用这个语句。
- **Select Case 语句**：假如你希望选择多套代码之一来执行，可以使用这个语句。

## If 语句

如果需要在条件为 true 时只执行一行语句，可以把代码写为一行：

```vbnet
if i=10 Then msgbox "Hello"
```

假如我们需要在条件为 true 时执行不止一条语句，那么就必须在一行写一条语句，然后使用关键词 "End If" 来结束这个语句：

```vbnet
If i=10 Then
    msgbox "Hello"
    i = i+1
End If
```

## If...Then...Else 语句

```vbnet
If i=1 Then
    msgbox "Hello"
Else
    msgbox "Goodbye"
End If
```

## If...Then...Elseif 语句

```vbnet
If payment="Bob" Then
    msgbox "Hello, Bob!"
Elseif payment="Sam" Then
    msgbox "Hello, Sam!"
Elseif payment="Amy" Then
    msgbox "Hello, Amy!"
Else
    msgbox "Hello, World!"
end If
```

## Select Case 语句
```vbnet
Select Case payment
Case "Bob"
    msgbox "Hello, Bob!"
Case "Sam"
    msgbox "Hello, Sam!"
Case "Amy"
    msgbox "Hello, Amy!"
Case Else
    msgbox "Hello, World!"
End Select
```

# 循环结构

在 VBScript 中，我们可以使用四种循环语句：
- **For...Next 语句**：运行一段语句指定的次数，可指定步长。
- **For Each...Next 语句**：针对数组中的每个元素或集合中的每个条目来运行某段语句。
- **Do...Loop 语句**：运行循环，当条件为 true 或者直到条件为 true 时。
- **While...Wend 语句**：不要使用这个语句，应该使用 Do...Loop 语句代替它。

## For...Next 语句

```vbnet
For i=1 to 10
  some code
Next
```

### 使用 Step 控制步长

步数($±$)可以是正数，也可以是负数。

```vbnet
For i=2 To 10 Step 2
  some code
Next
```

```vbnet
For i=10 To 2 Step -2
  some code
Next
```

### 使用 Exit 退出循环

```vbnet
For i=1 to 10
  If i=5 Then Exit
Next
```

## ForEach...Next 语句

```vbnet
Dim names(2)
names(0) = "Bob"
names(1) = "Sam"
names(2) = "Amy"

For Each i In names
  document.write(i & "<br/>")
Next
```

## Do...Loop 语句

```vbnet
i=0
Do While i < 10
  document.write(i & "<br/>")
  i=i+1
Loop
```

# 内置函数

## String 函数

|函数 	|描述|
|:----:|:----:|
|InStr 	|返回字符串在另一字符串中首次出现的位置。检索从字符串的第一个字符开始|
|InStrRev 	|返回字符串在另一字符串中首次出现的位置。检索从字符串的最末字符开始|
|LCase 	|把指定字符串转换为小写|
|Left 	|从字符串的左侧返回指定数目的字符|
|Len 	|返回字符串中的字符数目|
|LTrim 	|删除字符串左侧的空格|
|RTrim 	|删除字符串右侧的空格|
|Trim 	|删除字符串左侧和右侧的空格|
|Mid 	|从字符串返回指定数目的字符|
|Replace 	|使用另外一个字符串替换字符串的指定部分指定的次数|
|Right 	|返回从字符串右侧开始指定数目的字符|
|Space 	|返回由指定数目的空格组成的字符串|
|StrComp 	|比较两个字符串，返回代表比较结果的一个值|
|String 	|返回包含指定长度的重复字符的字符串|
|StrReverse 	|反转字符串|
|UCase 	|把指定的字符串转换为大写|

## Array 函数

|函数 |	描述|
|:----:|:----:|
|Array 	|返回一个包含数组的变量|
|Filter 	|返回下标从零开始的数组，其中包含基于特定过滤条件的字符串数组的子集|
|IsArray 	|返回一个布尔值，可指示指定的变量是否是数组|
|Join 	|返回一个由数组中若干子字符串组成的字符串|
|LBound 	|返回指定数组维数的最小下标|
|Split 	|返回下标从0开始的一维数组，包含指定数目的子字符串|
|UBound 	|返回指定数组维数的最大下标|

## Math 函数

|函数 	|描述|
|:----:|:----:|
|Abs 	|返回指定数字的绝对值|
|Atn 	|返回指定数字的反正切|
|Cos 	|返回指定数字（角度）的余弦|
|Exp 	|返回 e（自然对数的底）的幂次方|
|Hex 	|返回指定数字的十六进制值|
|Int 	|返回指定数字的整数部分|
|Fix 	|返回指定数字的整数部分|
|Log 	|返回指定数字的自然对数|
|Oct 	|返回指定数字的余弦值|
|Rnd 	|返回小于1但大于或等于0的一个随机数|
|Sgn 	|返回可指示指定的数字的符号的一个整数|
|Sin 	|返回指定数字（角度）的正弦|
|Sqr 	|返回指定数字的平方根|
|Tan 	|返回指定数字（角度）的正切|

## Date/Time 函数

|函数 	|描述|
|:----:|:----:|
|CDate 	|把一个有效的日期或时间表达式转换为日期类型|
|Date 	|返回当前的系统日期|
|DateAdd 	|返回已添加指定时间间隔的日期|
|DateDiff 	|返回两个日期之间的时间间隔数|
|DatePart 	|返回给定日期的指定部分|
|DateSerial 	|返回日期的指定年、月、日|
|DateValue 	|返回日期|
|Day 	|返回代表一月中一天的数字 （介于并包括1至31之间）|
|FormatDateTime 	|返回以日期或时间格式化的表达式|
|Hour 	|返回可代表一天中的小时的数字 （介于并包括0至23之间）|
|IsDate 	|返回可指示计算表达式能否转换为日期的布尔值|
|Minute 	|返回一个数字，代表小时的分钟 （介于并包括0至59）|
|Month 	|返回一个数字，代表年的月份 （介于并包括1至12之间）|
|MonthName 	|返回指定月份的名称|
|Now 	|返回当前的系统日期和时间|
|Second 	|返回一个数字，代表分钟的秒 （介于并包括0至59之间）|
|Time 	|返回当前的系统时间|
|Timer 	|返回自 12:00 AM 以来的秒数|
|TimeSerial 	|返回特定小时、分钟和秒的时间|
|TimeValue 	|返回时间|
|Weekday 	|返回一个数字，代表星期的一天（介于并包括1至7）|
|WeekdayName 	|返回星期中指定的一天的星期名|
|Year 	|返回一个代表年份的数字|

## Conversion 函数

|函数 	|描述|
|:----:|:----:|
|Asc 	|把字符串中的首字母转换为 ANSI 字符代码|
|CBool 	|把表达式转换为布尔类型|
|CByte 	|把表达式转换为字节（Byte）类型|
|CCur 	|把表达式转换为货币（Currency）类型|
|CDate 	|把有效的日期和时间表达式转换为日期（Date）类型|
|CDbl 	|把表达式转换为双精度（Double）类型|
|Chr 	|把指定的 ANSI 字符代码转换为字符|
|CInt 	|把表达式转换为整数（Integer）类型|
|CLng 	|把表达式转换为长整形（Long）类型|
|CSng 	|把表达式转换为单精度（Single）类型|
|CStr 	|把表达式转换为子类型 String 的 variant |
|Hex 	|返回指定数字的十六进制值|
|Oct 	|返回指定数字的八进制值|

## Format 函数

|函数 	|描述|
|:----:|:----:|
|FormatCurrency 	|返回作为货币值进行格式化的表达式|
|FormatDateTime 	|返回作为日期或时间进行格式化的表达式|
|FormatNumber 	|返回作为数字进行格式化的表达式|
|FormatPercent 	|返回作为百分数进行格式化的表达式|

## 其他函数

|函数 	|描述|
|:----:|:----:|
|CreateObject 	|创建指定类型对象|
|Eval 	|计算表达式，并返回结果|
|GetLocale 	|返回当前区域设置 ID 值|
|GetObject 	|返回对文件中 automation 对象的引用|
|GetRef 	|允许您把 VBScript 子程序连接到页面上的一个 DHTML 事件|
|InputBox 	|可显示对话框，用户可在其中输入文本，并/或点击按钮，然后返回结果|
|IsEmpty 	|返回一个布尔值，指示指定的变量是否已被初始化|
|IsNull 	|返回一个布尔值，指示指定的变量是否包含无效数据 (Null)|
|IsNumeric 	|返回一个布尔值，指示指定的表达式是否可作为数字来计算|
|IsObject 	|返回一个布尔值，指示指定的表达式是否是一个 automation 对象|
|LoadPicture 	|返回一个图片对象。仅用于32位平台|
|MsgBox 	|显示消息框，等待用户点击按钮，并返回指示用户点击了哪个按钮的值|
|RGB 	|返回一个表示 RGB 颜色值的数字|
|Round 	|对数进行四舍五入|
|ScriptEngine 	|返回使用中的脚本语言|
|ScriptEngineBuildVersion 	|返回使用中的脚本引擎版本号|
|ScriptEngineMajorVersion 	|返回使用中的脚本引擎的主版本号|
|ScriptEngineMinorVersion 	|返回使用中的脚本引擎的次版本号|
|SetLocale 	|设置地区 ID ，并返回之前的地区 ID|
|TypeName 	|返回指定变量的子类型|
|VarType 	|返回指示变量子类型的值|
