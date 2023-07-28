---
title: CSS实现全屏覆盖、居中显示、等比缩放
date: 2020-05-09 13:32:43
summary: 本文分享CSS实现全屏覆盖、居中显示、等比缩放的方法。
tags:
- Web前端技术
- CSS
- HTML
categories:
- 开发技术
---

# 图片全屏覆盖

我们可能希望实现图片的全屏覆盖，这种覆盖是随着网页大小而调整的，而不是固定的，怎么做呢？

请看以下CSS代码：

```css
body{
  background:url("img.jpg") no-repeat center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
```

效果展示：

![](../../../images/软件开发/前端开发/CSS实现全屏覆盖、居中显示、等比缩放/1.png)
![](../../../images/软件开发/前端开发/CSS实现全屏覆盖、居中显示、等比缩放/2.png)

# 文本水平垂直居中

\<center>标签可以居中，但早已不被建议使用，实现居中应该使用CSS实现。

下面的CSS代码实现的不仅仅是水平、垂直双居中，而且是兼容网页变化的实现：

```css
div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

效果展示：
![](../../../images/软件开发/前端开发/CSS实现全屏覆盖、居中显示、等比缩放/3.png)

# 文本自适应缩放

上面的文本字体大小设计，看似还行，但如果我们把浏览器缩小，会看到：
![](../../../images/软件开发/前端开发/CSS实现全屏覆盖、居中显示、等比缩放/4.png)

此时文本文字就显得过大，我们必须要尽量做到自适应。
在网上查了些资料，发现必定都是大神，因为根本就不详细说，也没有代码说明，对读者极不友好，那就只能自己研究了。

说结论之前，先推荐一篇文章：[《网页字体单位px、em、%、rem、pt、vm、vh介绍》](https://www.jianshu.com/p/46897a8edfe5)

读过这篇文章，我决定改选vw作为字体大小单位，经过测试，选择2vw（10vw太大，0,1vw太小）。

```css
div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size:2vw;
  color:#a8e346;
}
```

效果：

![](../../../images/软件开发/前端开发/CSS实现全屏覆盖、居中显示、等比缩放/5.png)
![](../../../images/软件开发/前端开发/CSS实现全屏覆盖、居中显示、等比缩放/6.png)

可以看出：基本算是实现了自适应。

另外，在网上看到这么一段代码，感兴趣的可以自己去试试：
```html
<script type="text/javascript" >
  //网页字跟随页面自动变化
  function setRem(){
    //获取当前页面的宽度
    var width = document.body.offsetWidth;
    //设置页面的字体大小
    var nowFont=width/375*20;
    //通过标签名称来获取元素
    var htmlFont=document.getElementsByTagName('html')[0];
    // 给获取到的元素的字体大小赋值
    htmlFont.style.fontSize =nowFont+"px";
  }
  setRem();
  //监听屏幕变化
  window.οnresize=setRem;
</script>
```

# 本文完整网页源码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html" ;charset="utf-8">
    <title>赏金猎人</title>
    <style>
      body {
        background:url("img.jpg") no-repeat center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
      }
      div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size:2vw;
        color:#a8e346;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>这是一段普普通通的文本</h1>
    </div>
  </body>
</html>
```
