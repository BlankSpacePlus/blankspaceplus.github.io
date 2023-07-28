---
title: VB.NET程序设计Quiz
date: 2020-09-26 19:25:31
summary: 本文分享VB.NET程序设计的测验内容。
tags:
- VB.NET
categories:
- VB.NET
---

# Quiz1

问题 1 
下列关于可变长度形参列表的描述正确的是哪一项？
A. ParamArray关键字可以用ByRef修饰
B. 需要使用ParamArray关键字来修饰可变长度的参数列表
C. ParamArray修饰的形参可放在参数列表的任意位置
D. ParamArray关键字可以修饰二维数组参数

**答案：B**
*解析：
ParamArray只能用ByVal修饰，A错；
ParamArray修饰的形参必须放在列表的最后，C错；
ParamArray关键字只能修饰一维数组参数，不能修饰二维数组参数，D错。*

问题 2
已知有如下的子过程，哪个调用是正确的？
`Sub Test (ByVal a As Integer，ByVal b As Integer，Optional ByVal c As Boolean=True)`
A. Test(1,False)
B. Test(False)
C. Test(1,2)
D. Test()

**答案：C**
*解析：
Optional表示可选参数，是Boolean类型，但是必选的是两个Integer类型的。*

问题 3 
编辑代码需要使用下列哪个窗口？
A. 解决方案资源管理器窗口
B. 代码编辑器
C. 工具箱
D. 属性窗口

**答案：B**
*解析：略*

问题 4 
已知x,y,z为布尔变量（Boolean），并且x=4，y=1，z=0，则下面的表达式的值为True：
`x+z>=y And Also x=z`
 对 
 错
 
**答案：错** 
*解析：AndAlso是指短路与运算符，所以相当于直接看是不是两边均为真就行（当成不短路的做也行）。
左边，4+0>=1，True；右边，1 <> 0，False。
布尔表达式真值是False。*

问题 5 
在SelectCase语句中，如果有多个离散值进行选择可以用冒号隔开，例如：Case 1:3。
 对 
 错
  
**答案：错**
*解析：应该用逗号而不是冒号。*

问题 6 
请补全下面的程序片段，该程序片段用来计算1至99的奇数的和。
```vbnet
Dim Sum As Integer=0
Dim i As Integer=1
While i <=99
    Sum +=i
    (                      )
End Do
```
A. i+=2
B. i-=1
C. i-=2
D. i +=1

**答案：A**
*解析：取奇数，所以步长是2。*

问题 7 
当程序执行时，注释会导致计算机把 '符号（即单引号）之后的文本打印在屏幕上。
 对 
 错
 
 **答案：错** 
*解析：'可以在VB.NET里表示注释符，注释后面本行内容的显然不会被处理。*

问题 8 
下列对结构体的定义哪个是正确的？
A.
```vbnet
Structure
    Dim name As String
End Structure
```
B.
```vbnet
Structure Animal
End Structure
```
C.
```vbnet
Structure Animal
    Dim name As String 
End Structure
```
D.
```vbnet
Structure String
    Dim name As String
    Dim  No As String 
End Structure
```

**答案：C**
*解析：考察VB.NET结构体的问题。
VB.NET结构体必须有命名，A错;
结构体命名不能采用关键词String，D错；
结构体里至少有一个Dim的变量，B错。*

问题 9 
"#234" Like "1234" 的结果为True。
 对 
 错

**答案：错**
*解析：Like模糊匹配的时候Pattern应该在后面，所以是不对的。
换而言之："1234" Like "#234"，这是True。* 

问题 10 
ReDim语句可以修改数组的维数。
 对 
 错

**答案：错**
*解析：ReDim语句不能修改数组维数。*

问题 11 
根据下面的代码判断那个描述是正确的？
```vbnet
Enum  CustomColor
   Red
   Pink =3 
  Yellow=6
  Green
  Blue=9
  Brown
End Enum
```
A. Color.Red的值为1
B. Color.Brown的值为10
C. Color.Green的值为8
D. Color.Red的值为2

**答案：B**
*解析：考察VB.NET枚举。
Color.Red会自动赋值为0，A错，D错；
Color.Green会顺延，所以会赋值为7，B错。*

问题 12 
下列关于名称为Sum的重载方法哪个是错误的？
已知该方法的声明如下：
`Function Sum（ByVal a As Integer， ByVal b As Integer） As Integer`
A. `Function Sum (ByVal a As Double, ByVal b As Double) As Double`
B. `Function Sum (ByVal a As Integer, ByVal b As Integer, ByVal c As Integer) As Integer`
C. `Function Sum (ByVal a As Double, ByVal b As Integer) As Double`
D. `Function Sum (ByVal a As Integer, ByVal b As Integer) As Double`

**答案：D**
*解析：考察函数的重载。
重载要求我们定义名称相同、签名不同的函数。
重载与返回值无关，要求形参列表的类型顺序不同或者长度不同，D不符合要求。*

问题 13 
关于创建应用程序的一般步骤的顺序哪项是正确的？
(1) 运行并保存
(2) 创建一个新项目
(3) 调试
(4) 界面设计
A. (4)、(3)、(2)、(1)
B. (2)、(4)、(3)、(1)
C. (1)、(2)、(3)、(4)
D. (2)、(4)、(1)、(3)

**答案：B**
*解析：这题有点恶心，反正答案确实就是这个。*

问题 14 
下列哪一项可以作为变量的名称？
A. ？Value
B. 33Value
C. __FirstValue
D. Class

**答案：C**
*解析：考察变量命名合法性。
？不能用在变量命名中，A错；
数字不能在变量名开头，B错；
Class是关键字，不能用于变量名，D错。*

问题 15 
声明一个具有6个整型元素的数组A哪个是正确的？
 A. `Dim A(6) As Integer`
 B. `Dim A(5) As Integer`
 C. `Dim A As Integer()=New Integer(6){}`
 D. `Dim A(5) As Integer()`

**答案：B**
*解析：考察VB.NET数组的定义。
VB.NET在这里与C、Java等语言不同，长度为6的数组定义的时候用5来定义，A错。
C选项语法纯属自己编着玩的，不必当真，C错。
不能在类型后面加括号，D错。*

问题 16 
已知S1="My First Test"， S2="My first Test"，那么S1.CompareTo(S2)的值应该是-1。
 对
 错

**答案：错**
*解析：这个其实我也不是很理解，因为s1<s2（字典序），但是这个返回值确实是1，很奇怪……*

问题 17 
Visual Basic把myfirstvalue和MyFirstValue看成是不同的变量名。
 对 
 错

**答案：错**
解析：VB.NET不区分大小写，包括变量名……~~真的，你说吧多恶心的语法……~~ 

问题 18 
表达式`3*(2+6Mod 2^2)+12\6`的值是多少？
A. 14
B. 8 
C. 5 
D. 10 

**答案：A**
*解析：考察运算符的运算顺序和实际含义。Mod是取模，\是整除，^是指数运算（这个优先级最高），顺着算就行，结果12。*

问题 19 
请补全下面的程序片段，该程序片段用来计算整形数组B中的各元素和。
```vbnet
Dim Sum As Integer=0
For Each (     ) In B
    Sum+=a
Next
```
A. `a As Double`
B. `a  As Integer = 0`
C. `a As String`
D. `a  As Integer`

**答案：D**
*解析：考察For...Each语法。*

问题 20 
Function过程没有返回值，Sub过程可以有返回值。
 对 
 错

**答案：错**
*解析：恰恰相反……*

# Quiz2

问题 1
KeyPress事件的触发只能由具有ASCII码的按键组成。
【答案】对

问题 2
ListBox与ComboBox控件中的条目不能在运行时进行添加或删除。
【答案】错

问题 3
Insert方法可以实现向ListBox或ComboBox中的指定位置添加条目。
【答案】对

问题 4
Function过程没有返回值，Sub过程可以有返回值
【答案】错

问题 5
CheckBox，ComboBox控件的默认事件分别是什么？
【答案】CheckedChanged, SelectedIndexChanged

问题 6
OpenFileDialog控件可以通过调用（）方法来显示对话框。
【答案】ShowDialog

问题 7
一组CheckBox中要求，最少包含（ ）个CheckBox。
【答案】1

问题 8
一个控件如果在获得焦点的情况下，在键盘上按住一个按键，都会每隔一段时间就触发（ ）事件一次。
【答案】KeyPress

问题 9
RadioButton，ListBox控件的默认事件分别是什么？
【答案】CheckedChanged, SelectedIndexChanged

问题 10
下面关于ContextmenuStrip控件的描述正确的是哪项？
【答案】一个ContextmenuStrip控件可以与多个控件相关联

问题 11
一组RadioButton中要求，最少包含（ ）个RadioButton。
【答案】2

问题 12
下列关于名称为Sum的重载方法哪个是错误的？已知该方法的声明如下：`Function Sum (ByVal a As Integer， ByVal b As Integer) As Integer`
【答案】`Function Sum (ByVal a As Integer， ByVal b As Integer) As Double`

问题 13
下面关于菜单项中分隔符的描述正确的是哪项？
【答案】菜单项中的分隔符可以通过在设计菜单时键入“-”来实现

问题 14
下面关于SaveFileDialog1的Filter属性的设置哪些是正确的？
【答案】SaveFileDialog1.Filter="All|*.*|EXE|*.exe"

问题 15
下面关于通用对话框的描述正确的是哪项？
【答案】以上说法都正确

问题 16
下面关于键盘事件的触发顺序描述正确的是哪项？
【答案】KeyDown→KeyPress→KeyUp

问题 17
下面关于鼠标事件的触发顺序描述哪项是错误的？
【答案】MouseHover→MouseWheel→MouseUp

问题 18
下面关于菜单项中分隔符的描述正确的是哪项？
【答案】菜单中的分隔符主要用来对菜单项进行分组显示

问题 19
下面哪个方法用来显示一个窗体？
【答案】Show

问题 20
下面哪个选项能够判断出是否按下了“退格”键？
【答案】`If e.KeyChar = ControlChars.Back Then`

# Quiz3

问题 1
下面关于接口的定义哪项是错误的？
【答案】`Protected Interface MyInterface Function Max(ByVal x As Integer, ByVal y As Integer) As Integer Sub Min(ByVal x As Integer, ByVal y As Integer) End Interface`

问题 2
下面哪个委托的声明是正确的？
【答案】`Private Delegate Sub MyDelegate (ByVal v1 As Object)`

问题 3
下面关于抽象类的描述哪项是正确的？
【答案】含有MustOverride方法的类必须声明为抽象类

问题 4
下面关于类的组成的描述哪项是正确的？
【答案】类中可以包含辅助接口的实现

问题 5
下面关于接口实现的描述哪项是正确的？
【答案】在一个类中可以只实现一个接口中的部分属性、方法或事件

问题 6
下面关于异常处理语句的描述哪项是正确的？
【答案】Try语句块中主要用来放置可能会引发异常的语句

问题 7
以下哪种方式不能实现多态？
【答案】封装

问题 8
下面关于重载与重写的描述哪项是正确的？
【答案】在派生类中重载基类中的方法需要保证方法的签名与基类必须不同

问题 9
Try…Catch…Finally语句不可以嵌套使用。
【答案】错

问题 10
.NET框架已经提供了全面的异常类，不需要开发人员开发自定义的异常类。
【答案】错

问题 11
下面关于继承的描述哪项是正确的？
【答案】Friend类可以作为基类

问题 12
下列关于属性的描述哪项是正确的？
【答案】默认情况下属性可读、可写

问题 13
下面哪个选项的语句不能实现对obj对象的声明并实例化？
【答案】`obj = New Class1`

问题 14
下面哪个选项不能创建一个名为Student的类？
【答案】`Protected Class Student ... End Class`

问题 15
下面关于方法的重载的描述哪些是正确的？
【答案】方法重载要求方法的签名必须不同

问题 16
下面的哪种做法不能实现，为指定的代码行设置断点？
【答案】将光标停留在需要设置断点的那行代码上，然后按“F8”键

问题 17
下面关于程序错误的描述哪项是错误的？
【答案】出现逻辑错误时，程序会终止运行

问题 18
下面关于事件过程与事件源的关联描述正确的是哪项？
【答案】以上说法均正确

问题 19
下面关于类（Class）与模块（Module）的描述哪项是正确的？
【答案】类和模块中都可以包含Sub过程和Function过程

问题 20
下面关于封装的相关描述哪个选项是正确的？
【答案】封装可以隐藏类的内部细节

# Quiz4

问题 1
对于BinaryReader类的对象，下列哪个方法用来读取文件中字符数组类型的数据？
【答案】ReadChars

问题 2
Command对象对数据源执行数据库命令，并返回结果。
【答案】对

问题 3
下列哪个选项定义了一个FileStream类对象，该对象允许对C盘根目录下的“First.txt”文件进行读取。
【答案】Dim fr As New FileStream("C:\First.txt", FileMode.Open, FileAccess.Read)
**【说明】选最短的，里面有Open的**

问题 4
下列哪个属性或方法可以用来获取文件游标的当前位置？
【答案】Position

问题 5
DataAdapter对象的Fill方法用来执行数据库查询并利用查询结果填充DataSet。
【答案】对

问题 6
下列哪种流的种类支持文件的顺序和随机访问。
【答案】FileStream

问题 7
下列哪个类用于进行文本文件的读取。
【答案】StreamReader

问题 8
DataReader是ADO.NET断开数据库连接体现的核心组件。
【答案】错

问题 9
Connection对象用于建立与指定数据源的连接。
【答案】对

问题 10
DataAdapter对象可以从数据源获取只读、仅向前的数据流。
【答案】错
