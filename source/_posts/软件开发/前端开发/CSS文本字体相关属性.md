---
title: CSS文本字体相关属性
date: 2020-02-16 00:55:29
summary: 本文介绍CSS3文本字体相关属性。
tags:
- Web前端技术
- CSS
- HTML
categories:
- 开发技术
---

# 字体相关属性测试

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html"; charset="utf-8"/>
    <title>CSS字体属性设置</title>
  </head>
  <body>
    <!--设置文字颜色灰色-->
    <span style="color:#888888">color:#888888</span><br/>
    <!--设置文字颜色红色-->
    <span style="color:red">color:red</span><br/>
    <!--设置文字字体为隶书-->
    <span style="font-family:'隶书'">font-family:'隶书'</span><br/>
    <!--设置文字字体大小20-->
    <span style="font-size:20pt">font-size:20pt</span><br/>
    <!--设置文字字体大小为绝对最小-->
    <span style="font-size:xx-small">font-size:xx-small</span><br/>
    <!--设置文字字体大小为绝对较小-->
    <span style="font-size:x-small">font-size:x-small</span><br/>
    <!--设置文字字体大小为绝对小-->
    <span style="font-size:small">font-size:small</span><br/>
    <!--设置文字字体大小为绝对正常-->
    <span style="font-size:medium">font-size:medium</span><br/>
    <!--设置文字字体大小为绝对大-->
    <span style="font-size:large">font-size:large</span><br/>
    <!--设置文字字体大小为绝对较大-->
    <span style="font-size:x-large">font-size:x-large</span><br/>
    <!--设置文字字体大小为绝对最大-->
    <span style="font-size:xx-large">font-size:xx-large</span><br/>
    <!--设置文字字体大小为相对父元素字体增大-->
    <span style="font-size:larger">font-size:larger</span><br/>
    <!--设置文字字体大小为相对父元素字体缩小-->
    <span style="font-size:smaller">font-size:smaller</span><br/>
    <!--设置文字不拉伸-->
    <span style="font-strength:normal">font-strength:normal</span><br/>
    <!--设置文字横向压缩-->
    <span style="font-strength:narrower">font-strength:narrower</span><br/>
    <!--设置文字横向拉伸-->
    <span style="font-strength:wider">font-strength:wider</span><br/>
    <!--设置文字不倾斜-->
    <span style="font-style:normal">font-style:normal</span><br/>
    <!--设置文字斜体-->
    <span style="font-style:italic">font-style:italic</span><br/>
    <!--设置文字倾斜-->
    <span style="font-style:oblique">font-style:oblique</span><br/>
    <!--设置文字更细-->
    <span style="font-weight:lighter">font-weight:lighter</span><br/>
    <!--设置文字粗细正常-->
    <span style="font-weight:normal">font-weight:normal</span><br/>
    <!--设置文字加粗-->
    <span style="font-weight:bold">font-weight:bold</span><br/>
    <!--设置文字更粗-->
    <span style="font-weight:bolder">font-weight:bolder</span><br/>
    <!--设置文字加粗900-->
    <span style="font-weight:900">font-weight:900</span><br/>
    <!--设置文字是否有修饰线之无修饰-->
    <span style="text-decoration:none">text-decoration:none</span><br/>
    <!--设置文字是否有修饰线之闪烁-->
    <span style="text-decoration:blink">text-decoration:blink</span><br/>
    <!--设置文字是否有修饰线之下划线-->
    <span style="text-decoration:underline">text-decoration:underline</span><br/>
    <!--设置文字是否有修饰线之删除线-->
    <span style="text-decoration:line-through">text-decoration:line-through</span><br/>
    <!--设置文字是否有修饰线之上划线-->
    <span style="text-decoration:overline">text-decoration:overline</span><br/>
    <!--设置文字大写字母格式-->
    <span style="font-variant:small-caps">font-variant:small-caps</span><br/>
    <!--设置文字阴影效果-->
    <span style="text-shadow:-5px -5px 2px gray">text-shadow:-5px -5px 2px gray</span><br/>
    <!--设置文字不转换大小写-->
    <span style="text-transform:none">text-transform:none</span><br/>
    <!--设置文字首字母大写-->
    <span style="text-transform:capitalize">text-transform:capitalize</span><br/>
    <!--设置文字大写-->
    <span style="text-transform:uppercase">text-transform:uppercase</span><br/>
    <!--设置文字小写-->
    <span style="text-transform:lowercase">text-transform:LOWERCASE</span><br/>
    <!--设置字体行高-->
    <span style="line-height:30pt">line-height:30pt</span><br/>
    <!--设置字符之间的间隔-->
    <span style="letter-spacing:5pt">letter-spacing:5pt</span><br/>
    <!--设置字符之间的间隔-->
    <span style="letter-spacing:15pt">letter-spacing:15pt</span><br/>
    <!--设置单词之间的间隔-->
    <span style="word-spacing:20pt">word-spacing:20pt hello world</span><br/>
    <!--设置单词之间的间隔-->
    <span style="word-spacing:60pt">word-spacing:60pt hello world</span><br/>
  </body>
</html>
```

# 网页展示

![](../../../images/软件开发/前端开发/CSS文本字体相关属性/1.png)
![](../../../images/软件开发/前端开发/CSS文本字体相关属性/2.png)
