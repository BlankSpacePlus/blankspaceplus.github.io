---
title: HTML直接引入TypeScript脚本
date: 2023-01-06 12:03:49
summary: 本文介绍一种通过开源工具实现HTML直接引入TypeScript脚本的方法。
tags:
- Web前端技术
- TypeScript
- HTML
categories:
- 开发技术
---

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
