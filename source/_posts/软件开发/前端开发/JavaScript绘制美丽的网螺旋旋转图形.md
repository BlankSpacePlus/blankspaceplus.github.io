---
title: JavaScript绘制美丽的网螺旋旋转图形
date: 2019-10-15 20:35:14
summary: 本文用Canvas进行坐标变换，绘制美丽的网螺旋旋转图形。
tags:
- Web前端技术
- JavaScript
categories:
- 开发技术
---

![](../../../images/软件开发/前端开发/JavaScript绘制美丽的网螺旋旋转图形/1.png)

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv = "content-type" content = "text/html" charset = "utf-8"/>
  <title> 网页螺旋旋转图形 </title>
</head>
<body>
  <h1> 螺旋旋转图形 </h1>
  <canvas id = "mc" width = "400", height = "400"
    style = "border:1px solid black"> </canvas>
  <script languagetype = "text/javascript">
    var canvas = document.getElementById('mc');
    var context = canvas.getContext('2d');
    // 设置背景布为白色
    context.fillStyle = "#fff";
    // 创建一个画布
    context.fillRect(0, 0, 400, 300);
    // 图形绘制
    context.translate(200, 50);
    context.fillStyle = 'rgba(255, 0, 0, 0.25)';
    for (var i = 0; i < 50; i++) {
      // 图形向左、向下各移动25
      context.translate(25, 25);
      // 图形缩放
      context.scale(0.95, 0.95);
      // 图形旋转
      context.rotate(Math.PI/10);
      context.fillRect(0, 0, 100, 50);
    }
  </script>
</body>
</html>
```
