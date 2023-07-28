---
title: Web网页脚本引入
date: 2023-02-24 00:37:01
summary: 本文分享Web网页脚本引入的相关内容。
tags:
- Web前端技术
categories:
- 开发技术
---

# 网页脚本的放置位置与载入时机

当页面载入浏览器时，页面中的脚本会立即被执行。
可惜我们并不一定希望这种情况发生。
有时我们希望当页面载入时执行脚本，而有时我们则希望当用户触发某个事件时执行这些脚本。

而脚本放置的位置与执行时机密切相关，且看各种情况。

## head 部分的脚本

当脚本被调用时，它们会被执行，或者某个事件被触发时，脚本也有可能会执行。
当我们把脚本放置于 head 部分时，就可以确保在用户使用之前它们已经被载入了。

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript">
      // some statements
    </script>
  </head>
  <body>
  </body>
</html>
```

## body 部分的脚本

当页面的 body 部分被载入时，脚本就会被执行。
当我们把脚本放置于 body 部分，它会生成页面的内容。

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  </head>
  <body>
    <script type="text/javascript">
      // some statements
    </script>
  </body>
</html>
```

## body 和 head 部分的脚本

可以同时在 body 和 head 部分放置脚本，理论上数量不限制。

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript">
      // some statements
    </script>
  </head>
  <body>
    <script type="text/javascript">
      // some statements
    </script>
  </body>
</html>
```

# HTML引入TypeScript脚本

大家都知道，HTML可以直接引入JavaScript脚本文件。有一天，博主就想到：博主学习TypeScript的时候，都是使用命令行编译器tsc或其他工具手动执行，那HTML能不能直接引入TypeScript脚本文件呢？

带着这个疑惑，博主查阅了一些资料，最终找到了一款开源工具：[typescript-compile](https://github.com/niutech/typescript-compile)。该工具会自动将TypeScript代码即时转换为JavaScript代码。虽然实际上仍然编译了TypeScript代码，但看起来是无需手动编译的，很有趣。

下面是博主的案例代码，分享给大家，注意相对路径。

`./index.html`：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Typescript嵌入HTML</title>
    <script type="text/typescript" src="./ts/hello.ts"></script>
    <script type="text/typescript" src="./ts/student.ts"></script>
</head>
<body>
<script type="text/javascript" src="./js/typescript.min.js"></script>
<script type="text/javascript" src="./js/typescript.compile.min.js"></script>
</body>
</html>
```

`./ts/hello.ts`：

```typescript
console.log("你好，TypeScript！")
```

`./ts/student.ts`：

```typescript
class Student {
    // 字段
    id: number
    name: string

    // 构造函数
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    // 方法
    introduce(): void {
        console.log("该学生的学号是：" + this.id + "，姓名是：" + this.name)
    }
}

// 创建一个对象
var student = new Student(123456, "李明松")

// 访问字段
console.log("该学生的姓名是：" + student.name)

// 访问方法
student.introduce()
```

切记，下面的HTML片段一定要嵌入到`<body></body>`标签的**最后**：
```html
<script type="text/javascript" src="typescript.min.js"></script>
<script type="text/javascript" src="typescript.compile.min.js"></script>
```

`typescript.min.js`和`typescript.compile.min.js`可以从[GitHub](https://github.com/niutech/typescript-compile)的README.md中的链接下载。

# HTML引入Python脚本

大家都知道，HTML可以直接引入JavaScript脚本文件。有一天，博主就想到：HTML能不能直接引入Python脚本文件呢？

带着这个疑惑，博主查阅了一些资料，最终找到了一款开源工具：[brython](https://github.com/brython-dev/brython)。该工具会自动将Python代码转换为JavaScript代码。

下面是博主的案例代码，分享给大家，注意相对路径。

`./index.html`：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <title>网页计算器</title>
    <link rel="stylesheet" href="./css/calculator.css">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.8.9/brython.min.js"></script>
</head>
<body onload="brython()">
<script type="text/python" src="./script/calculator.python"></script>
</body>
</html>
```

`./script/calculator.python`：

```python
from browser import document, html


document <= html.H1("Brython.js网页计算器")
calc = html.TABLE()
calc <= html.TR(html.TH(html.DIV("0", id="result"), colspan=3) + html.TD("C"))
lines = ["789/", "456*", "123-", "0.=+"]
calc <= (html.TR(html.TD(x) for x in line) for line in lines)
document <= calc
result = document["result"] # direct access to an element by its id


def action(event):
    """Handles the "click" event on a button of the calculator."""
    # The element the user clicked on is the attribute "target" of the event object
    element = event.target
    # The text printed on the button is the element's "text" attribute
    value = element.text
    if value not in "=C":
        # update the result zone
        if result.text in ["0", "error"]:
            result.text = value
        else:
            result.text = result.text + value
    elif value == "C":
        # reset
        result.text = "0"
    elif value == "=":
        # execute the formula in result zone
        try:
            result.text = eval(result.text)
        except:
            result.text = "error"

# Associate function action() to the event "click" on all buttons
for button in document.select("td"):
    button.bind("click", action)
```

`./css/calculator.css`：

```css
*{
    font-family: sans-serif;
    font-weight: normal;
    font-size: 1.1em;
}

td{
    background-color: #ccc;
    padding: 10px 30px 10px 30px;
    border-radius: 0.2em;
    text-align: center;
    cursor: default;
}

#result{
    border-color: #000;
    border-width: 1px;
    border-style: solid;
    padding: 10px 30px 10px 30px;
    text-align: right;
}

body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size:2vw;
}
```
