---
title: Python程序设计实验题
date: 2023-03-03 11:21:37
summary: 本文分享Python程序设计实验题解。
tags:
- Python
categories:
- Python
---

# 实验1 选择结构

设计一个程序，输出提示信息"Please input two nurbers:"，提示用户输入两个数字。使用选择结构判断用户输入的两个数字的大小，如果相同，则输出"The nubers are the same."提示消息；如果不相同，则将较大的数字显示出来，并给出"The larger nuber is:"提示消息。

```python
print("Please input two numbers:")

a, b = map(eval, input().split())

if a == b:
    print("The numbers are the same.")
elif a > b:
    print("The larger number is:", a)
else:
    print("The larger number is:", b)
```

根据用户输入的应征税收入计算所得税，下表给出了相关数据，确保程序中包含错误检查部分以防用户输入负数。

| 收入 | 计税比例 |
|:----:|:----:|
| \< 5000 | 0 |
| 5000 \~ 8000 | 3% |
| 8000 \~ 17000 | 10% |
| 17000 \~ 30000 | 20% |
| 30000 \~ 40000 | 25% |
| 40000 \~ 60000 | 30% |
| 60000 \~ 85000 | 35% |
| \> 85000 | 45% |

提示：收入=薪水-五险一金

```python
def calculate_tax(salaries, insurances) -> float:
    x = salaries - insurances - 5000
    if salaries >= 0 and insurances >= 0:
        if x <= 0:
            tax_result = 0
        elif (x > 0) and (x <= 3000):
            tax_result = x * 0.03 - 0
        elif (x > 3000) and (x <= 12000):
            tax_result = x * 0.1 - 210
        elif (x > 12000) and (x <= 25000):
            tax_result = x * 0.2 - 1410
        elif (x > 25000) and (x <= 35000):
            tax_result = x * 0.25 - 2660
        elif (x > 35000) and (x <= 55000):
            tax_result = x * 0.3 - 4410
        elif (x > 55000) and (x <= 80000):
            tax_result = x * 0.35 - 7160
        else:
            tax_result = x * 0.45 - 15160
        return tax_result
    else:
        return -1


salaries = eval(input("请输入工资："))
insurances = eval(input("请输入五险一金："))

tax = calculate_tax(salaries, insurances)
print("应缴个税=", tax)
```

# 实验2 循环结构

设计一个程序，输出一个提示信息"Please input ten students testscores:"，提示用户输入十个学生的考试成绩，使用选择和循环结构来判断并统计及格学生的人数，并输出统计结果。

```python
print("Please input ten student's test scores:")

s = 0

for i in range(10):
    score = eval(input())
    if score >= 60:
        s = s + 1

print(s)
```

设计一个程序，计算并输出正整数n的阶乘$n!$，其中$n$的值由用户输入。
```python
print("Please input the number you want to calculate.")

number = int(input())

if number > 0:
    result = 1
    while number >= 1:
        result = result * number
        number = number - 1
    print("The result is:", result)
else:
    print("Your input is wrong.")
```

设计一个程序，求出所有的水仙花数。
提示：“水仙花数”是一个三位的正整数，其各个数字的立方和等于该数本身。例如，由于$153=1^3+5^3+3^3$，153就是水仙花数”。
```python
print("Let's calculate and list all of the narcissistic numbers.")

for i in range(1, 10, 1):
    for j in range(0, 10, 1):
        for k in range(0, 10, 1):
            m = i ** 3 + j ** 3 + k ** 3
            if i * 100 + j * 10 + k * 1 == m:
                print("One of the result is: ", m)

print("That's all, thanks.")
```

# 实验3 嵌套循环结构

设计一个程序，输出一个提示信息，请求用户输入班级数量及每个班级的学生数量，程序使用嵌套循环结构进行学生成绩统计，假设每个学生都选修了三门课，计算每个学生所有课程的总分和平均分，以及每门课程所有学生的平均分，且在屏幕上给出计算结果。
```python
grades1 = []
grades2 = []
grades3 = []

print("Please input the number of the classes.")
class_num = eval(input("class number:"))

print("Please input the number of the students.")
student_num = eval(input("student number:"))

for i in range(0, class_num):
    print("The class", i + 1, ":")
    for j in range(0, student_num):
        print("The student", j + 1, ":")
        grade1 = eval(input("Please input the first grade of the student:"))
        grades1.append(grade1)
        grade2 = eval(input("Please input the second grade of the student:"))
        grades2.append(grade2)
        grade3 = eval(input("Please input the third grade of the student:"))
        grades3.append(grade3)
        grade_sum = grade1 + grade2 + grade3
        grade_average = grade_sum / 3
        print("The sum of the grades is:", grade_sum)
        print("The average of the grades is:", grade_average)

sum1 = sum(grades1)
sum2 = sum(grades2)
sum3 = sum(grades3)
average1 = sum(grades1) / len(grades1)
average2 = sum(grades2) / len(grades2)
average3 = sum(grades3) / len(grades3)

print("The sum of the subject1 is:", sum1)
print("The average of the subject1 is:", average1)
print("The sum of the subject2 is:", sum2)
print("The average of the subject2 is:", average2)
print("The sum of the subject3 is:", sum3)
print("The average of the subject3 is:", average3)
```

通过循环打印出如下图案。
```
    *
   ***
  *****
```
```python
m = 3
n = 5

for i in range(1, m + 1):
    for j in range(n - i):
        print(" ", end="")
    for k in range(2 * i - 1):
        print("*", end="")
    print()
```

# 实验4 数组

设计一个程序，已知五个学生的考试成绩，保存在`Score[5]`数组中，计算这五个学生的总成绩和平均成绩，输出计算结果并给出相应的提示信息。
```python
scores = []

for i in range(5):
    a = eval(input("Please input the score:"))
    scores.append(a)

score_sum = sum(scores)
print("The sum of all the score is:", score_sum)
score_average = score_sum / 5
print("The average of all the score is:", score_average)
```

设计一个程序，从键盘读入五个学生的考试成绩，保存在`Score[5]`数组中，查找成绩最高的是第几个学生，输出查找结果并给出相应的提示信息。
```python
scores = []

for i in range(5):
    a = eval(input("Please input the score:"))
    scores.append(a)


def bubble_sort():
    n = 5
    k = n
    for i in range(n):
        flag = 1
        for j in range(1, k):
            if scores[j] > scores[j - 1]:
                scores[j], scores[j - 1] = scores[j - 1], scores[j]
                k = j
                flag = 0
        if flag:
            break


if __name__ == "__main__":
    bubble_sort()
    print(scores[0])
```

# 实验5 查找与排序

设计一个程序，已知五个学生的考试成绩，保存在`Score[5]`数组中，按照由大到小的顺序进行排序，并输出排序后的结果及相应的提示信息。
```python
scores = list(map(int, input().split(" ")))


def bubble_sort():
    n = len(scores)
    k = n
    for i in range(n):
        flag = 1
        for j in range(1, k):
            if scores[j] > scores[j - 1]:
                scores[j], scores[j - 1] = scores[j - 1], scores[j]
                k = j
                flag = 0
        if flag:
            break


if __name__ == "__main__":
    bubble_sort()
    print("No.1:", scores[0])
    print("No.2:", scores[1])
    print("No.3:", scores[2])
    print("No.4:", scores[3])
    print("No.5:", scores[4])
```

设计一个程序，对题目1中排序后的五个学生成绩进行二分法查找，查找的成绩由键盘读入，输出查找后的结果及相应的提示信息。
```python
scores = list(map(int, input().split(" ")))


def bubble_sort():
    n = len(scores)
    k = n
    for i in range(n):
        flag = 1
        for j in range(1, k):
            if scores[j] > scores[j - 1]:
                scores[j], scores[j - 1] = scores[j - 1], scores[j]
                k = j
                flag = 0
        if flag:
            break


def binary_search(search_key):
    low = 0
    high = len(scores) - 1
    while low <= high:
        mid = int((low + high) / 2)
        if search_key == scores[mid]:
            print("The number is the element", mid + 1, ".")
            break
        elif search_key > scores[mid]:
            high = mid - 1
        else:
            low = mid + 1
    else:
        print("It's no there.")


if __name__ == "__main__":
    bubble_sort()
    print("No.1:", scores[0])
    print("No.2:", scores[1])
    print("No.3:", scores[2])
    print("No.4:", scores[3])
    print("No.5:", scores[4])
    key = eval(input("Please enter your number:"))
    binary_search(key)
```

# 实验6 模块化

设计一个程序，提示用户输入五门课程的考试成绩，然后调用自定义函数`Average_Compute (ScoreSum ClassCount)`计算五门课程考试成绩的平均分。该函数有两个形参，第一个形参`ScoreSum`为五门课程的总成绩，第二个形参`ClassCount`为课程的总门数。在主程序中输出计算结果并给出相应的提示信息。
```python
print("Please input the five scores in a line:")
a, b, c, d, e = map(eval, input().split())

score_sum = a + b + c + d + e
class_count = 5


def average_compute():
    score_average = score_sum / class_count
    print("The average of the five score is:", score_average)
    return score_average


average_compute()
```

设计一个程序，提示用户输入一个整型数$n$，调用自定义递归函数`Fib(n)`计算前$n$项斐波那契数列，在主程序中输出计算结果。
```python
a = int(input())


def fibonacci_recursion(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci_recursion(n - 1) + fibonacci_recursion(n - 2)


def fibonacci(n):
    result_list = []
    for i in range(1, n + 1): result_list.append(fibonacci_recursion(i))
    return result_list


if __name__ == "__main__":
    print(",".join(str(i) for i in fibonacci(a)))
```

设计一个程序，计算销售价格。某个用品店需要一个程序可以在输入商品的原始价格(OriginalPrice )和折扣率(DiscountRate)之后，计算并输出该折扣商品的最终价格（SalePrice)。
已知：AmountSaved=OriginalPrice \* DiscountRate / 100、SalePrice =OriginalPrice - AmountSaved
```python
print("Please input the original price:")
original_price = eval(input())
print("Please input the discount rate:")
discount_rate = eval(input())
amount_saved = original_price * discount_rate / 100
sale_price = original_price - amount_saved
print("The sale price is:", sale_price)
```

# 实验7 文件

设计一个程序，保存客户文件。文件记录了客户姓名，用户输入姓之后，程序能够搜索文件，并输出所有该姓氏的客户姓名。

**略**

# 实验8 面向对象

设计一个程序， 对银行账户进行管理， 使用面向对象程序设计方法，设计BankAccount（银行账户） 类，包括Balance（余额）属性、Deposit（存款）方法、Withdraw（取款）方法、Get_balance（余额查询）方法、Set_balance（设置余额）方法。创建BankAccount类的实例， 提示用户输入存款信息和取款信息，对银行账户进行管理并输出存款余额。
```python
class BankAccount(object):

    def __init__(self, balance):
        self.balance = balance

    def set_balance(self, balance):
        self.balance = balance

    def deposit(self, n):
        self.balance += n
        print("存款成功，您的账户余额为：%s" % self.balance)

    def withdraw(self, n):
        self.balance -= n
        if n <= 10000:
            print("取款成功，您的账户余额为：%s" % self.balance)
        if n > 10000:
            print("抱歉，您的账户余额不足，无法完成交易。")

    def get_balance(self):
        print("您的账户余额为：%s" % self.balance)


balance = BankAccount(10000)
print("输入A，进行存款服务\n输入B进行取款服务\n输入C进行余额查询操作")
print("其他的输入均是不合法的，如果您进行了错误的输入，我们将不会为您服务！")
choice = input(("请输入您需要的服务类型："))
if choice == "A":
    n = eval(input("请输入您的存款金额："))
    balance.deposit(n)
elif choice == "B":
    n = eval(input("请输入您的取款金额："))
    balance.withdraw(n)
elif choice == "C":
    balance.get_balance()
else:
    print("您的输入不合法，抱歉，我们不能为您提供服务！")
```

设计一个程序， 将从键盘输入的客户姓名保存在一个顺序文件`record`中， 假设无客户重名的情况， 当输入的客户姓名为”quit”时表示输入结束。程序可以按照键盘输入的客户姓名进行查询，输出查询的客户在文件中的序号，并给出相应的提示信息。
```python
def file_write(file_name):
    print("Please input 'quit' to save and quit")
    record = open(file_name, 'w')
    while True:
        write = input("Please input the name: ")
        if write != 'quit':
            record.write(write + "\n")
        else:
            break
    record.close()


def file_find(find):
    i = 0
    record = open(file_name, 'r')
    line = record.readline()
    while line:
        i = i + 1
        if line == find + "\n":
            print(find, "is in the order number:", i)
            break
        line = record.readline()
    else:
        print("None!")
    record.close()


file_name = "record.txt"
file_write(file_name)
find = input("Please input what you want to find: ")
file_find(find)
```

设计一个GUI用户界面程序， 进行成绩转换。 显示一个窗体，窗体上放置标签控件对象、文本框控件对象和命令按钮控件对象，可以将用户在文本框控件对象中输入的百分制成绩， 在点击成绩转换命令按钮之后， 通过消息对话框显示对应的五级分制成绩。
```python
from tkinter import *
from tkinter import messagebox


def score_change():
    try:
        Hundred = eval(HundredScore.get())
        if (Hundred >= 0) and (Hundred <= 100):
            if Hundred < 60:
                FiveScore = str("很遗憾，你不及格")
            if (Hundred >= 60) and (Hundred < 70):
                FiveScore = str("恭喜你，你及格了，你的等级为及格")
            if (Hundred >= 70) and (Hundred < 80):
                FiveScore = str("还行，你的等级为中等")
            if (Hundred >= 80) and (Hundred < 90):
                FiveScore = str("不错，你的等级为良好")
            if (Hundred >= 90) and (Hundred <= 100):
                FiveScore = str("太棒了，你的等级为优秀")
            messagebox.showinfo("五级分制成绩", FiveScore)
    except:
        error = "请输入正确的数字！"
        messagebox.showinfo("ERROR!", error)


window = Tk()
window.title("百分制与五级分制成绩转换程序")
lbl = Label(window, text="输入百分制成绩：")
lbl.grid(row=0, column=0, pady=20, sticky=E)

HundredScore = StringVar()
EnterInput = Entry(window, width=20, textvariable=HundredScore)
EnterInput.grid(row=0, column=1, sticky=W)

ButtonCalculation = Button(window, text="成绩转换", command=score_change)
ButtonCalculation.grid(row=1, column=0, pady=40, sticky=E)

ButtonExit = Button(window, text="退出", command=quit)
ButtonExit.grid(row=1, column=1, pady=40, sticky=W)

window.mainloop()
```
