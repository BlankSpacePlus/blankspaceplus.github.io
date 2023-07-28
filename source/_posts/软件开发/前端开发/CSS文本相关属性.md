---
title: CSS文本相关属性
date: 2020-02-16 14:18:45
summary: 本文介绍CSS3文本相关属性。
tags:
- Web前端技术
- CSS
- HTML
categories:
- 开发技术
---

# 说明

本文的“文本”相关属性控制的是整段、整个div内文本的显示效果，包括文本文字的缩进、段内文字的对齐方式、文本中空白字符的处理等等，需要掌握。

# 网页源码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html"; charset="utf-8"/>
    <title>文本属性</title>
    <style type="text/css">
      div {
        border:1px solid #000000;
        height: 80px;
        width: 200px;
      }
    </style>
  </head>
  <body>
    <!--缩进20pt-->
    <div style="text-indent:20pt">
      text-indent:20pt
    </div>
    <!--缩进40pt-->
    <div style="text-indent:40pt">
      text-indent:40pt
    </div>
    <!--左对齐-->
    <div style="text-align:left">
      text-align:left
    </div>
    <!--居中对齐-->
    <div style="text-align:center">
      text-align:center
    </div>
    <!--右对齐-->
    <div style="text-align:right">
      text-align:right
    </div>
    <!--两端对齐-->
    <div style="text-align:justify">
      text-align:justify
    </div>
    <!--文本从右边流入-->
    <div style="direction:rtl">
      direction:rtl
    </div>
    <!--文本从左边流入-->
    <div style="direction:ltr">
      direction:ltr
    </div>
    <!--当文字溢出的时候只做简单的裁剪-->
    <div style="overflow:hidden;white-space:nowrap;text-overflow:clip;">
      overflow:hidden;white-space:nowrap;text-overflow:clip;
    </div>
    <!--当文字溢出的时候裁剪之后显示裁剪标记-->
    <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
      overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
    </div>
    <!--按照默认情况忽略文本中的空白-->
    <div style="white-space:normal">
      white-space :   normal
      white-space :   normal
    </div>
    <!--保留文本中的所有空白-->
    <div style="white-space:pre">
      white-space :   pre
      white-space :   pre
    </div>
    <!--处理换行标签绝不换行-->
    <div style="white-space:nowrap">
      white-space :   nowrap
      white-space :   nowrap
    </div>
    <!--保留空白符序列但可以正常的进行换行-->
    <div style="white-space:pre-wrap">
      white-space :   pre-wrap
      white-space :   pre-wrap
    </div>
    <!--合并空白符序列，但保留换行符-->
    <div style="white-space:pre-line">
      white-space :   pre-line
      white-space :   pre-line
    </div>
    <!--从指定父元素继承white-space元素的值-->
    <div style="white-space:inherit">
      white-space :   inherit
      white-space :   inherit
    </div>
    <!--按照默认的规则进行换行-->
    <div style="word-break:normal">
      word-break:normal
      word-break:normal
    </div>
    <!--只能在半角空格或者连字符处换行-->
    <div style="word-break:keep-all">
      word-break:keep-all
      word-break:keep-all
    </div>
    <!--设置允许在单词中间换行-->
    <div style="word-break:break-all">
      word-break:break-all
      word-break:break-all
    </div>
    <!--按照浏览器默认规则换行，针对长单词或者URL-->
    <div style="word-wrap:normal;">
      aaaaaaaaaaaaaaaa https://blog.csdn.net/weixin_43896318
    </div>
    <!--允许在单词中间进行换行，针对长单词或者URL-->
    <div style="word-wrap:break-word;">
      aaaaaaaaaaaaaaaa https://blog.csdn.net/weixin_43896318
    </div>
  </body>
</html>
```

# 网页展示

![](../../../images/软件开发/前端开发/CSS文本相关属性/1.png)
![](../../../images/软件开发/前端开发/CSS文本相关属性/2.png)
![](../../../images/软件开发/前端开发/CSS文本相关属性/3.png)

# 说明

建议使用Chrome浏览器查看，因为Firefox浏览器对这里有些功能不支持……真的……
