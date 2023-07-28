---
title: HTML支持的通用属性
date: 2020-05-09 22:38:20
summary: 本文介绍HTML5支持的通用属性。
tags:
- Web前端技术
- HTML
categories:
- 开发技术
---

# 保留属性

## id

id属性用于为HTML元素指定唯一标识，当程序使用JavaScript编程时即可通过该属性值来获取该HTML元素。

## style

style属性用于为HTML元素指定CSS样式。

## class

class属性用于匹配CSS样式的class选择器。

## dir

对于大多数HTML元素而言，dir属性用于设置元素中内容的排列方向。
dir通常支持ltr和rtl两种取值：ltr是从左至右（左对齐）；rtl是从右至左（右对齐）。

## title

title属性用于为HTML元素指定额外信息。
通常的，当用户把鼠标移动到指定title的元素上面时，浏览器将会显示title属性所指定的信息。

## lang

lang属性用于告知浏览器和搜索引擎：网络或网页中元素的内容所使用的的语言。
这个“语言”的取值应该是指定的语言代码，比如：
- en：英文
- ja：日文
- zh：中文

## accessKey

accessKey元素用于在HTML页面有多个元素时指定激活所在元素的快捷键。
**备注：Firefox暂不支持**

## tabindex

tabindex属性用于控制窗口、HTML元素获取焦点的顺序。
用户可以通过Tab键不断切换窗口或网页中的HTML元素来获取焦点。
tabindex被设置为1时，第一次按下Tab键时该元素获得焦点。

通常情况下，tabindex属性用在\<a>、\<area>、\<button>、\<input>、\<select>、\<textarea>等可被激活、可与用户交互的元素上才有明显效果。
如果把tabindex元素用于非上述元素上（它们本身不需要被激活、与用户交互，而是需要在js代码中调用focus()使其获得焦点），因此最好将tabindex设为-1，以避免Tab和focus()都能激活该元素。

# 新增属性

## contentEditable

contentEditable用于指定是否允许开发者直接编辑HTML元素中的内容，值为true或false。
这里的HTML元素并不是指那些原本就允许用户输入的表单元素，而是主要针对于\<table>、\<div>这种元素，将其中内容变为可编辑状态。

HTML文档是树形结构，父元素被指定contentEditable="true"时，子元素默认也是true，除非特殊指定contentEditable="false"。

若是用户可编辑，用户编辑后的内容就会显示在该页面中。可惜的是，这些内容不会被保存，一旦刷新页面，编辑的内容就会“丢失”。
开发者可以通过innerHTML属性获取编辑后的内容。

## designMode

designMode属性就像是全局的contentEditable属性，有on和off两种取值。
当整个页面的designMode被设置为on时，页面上所有支持contentEditable属性的元素都变成可编辑状态。

## hidden

hidden属性告诉浏览器是否隐藏该元素，有true和false两种取值。
一旦hidden是true，不仅意味着浏览器不显示该组件，浏览器甚至不会保留该组件占有的空间。
hidden属性可以代替CSS样式单中的display属性，设置hidden="true"相当于在CSS中设置display:none。

## spellcheck

spellcheck属性告诉浏览器对用户输入的内容进行拼写检查，有true和false两种取值。
spellcheck属性作用于\<area>、\<textarea>等元素，如果被开启的时候遇到拼错的单词，浏览器会给出错误提示（红色波浪下划线）。
**备注：Firefox暂不支持**

## contextmenu

contextmenu属性用于为HTML元素设置右键菜单，该属性目前不被主流浏览器支持。
