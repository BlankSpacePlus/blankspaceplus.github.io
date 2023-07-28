---
title: HTML的DOM事件属性
date: 2020-05-09 15:42:06
summary: 本文分享HTML5的DOM事件属性相关内容。
tags:
- Web前端技术
- HTML
- JavaScript
categories:
- 开发技术
---

# HTML事件属性

HTML4增加了使事件在浏览器中触发动作的能力，比如当用户点击元素时启动JavaScript。

下面列出了添加到HTML元素中，定义事件动作的全局事件属性，HTML5引入的事件被标记为红色，HTML5不支持的被标记删除线。

## Window事件属性

下面是针对 window 对象触发的事件 => \<body>

|属性 	|值 	|描述|
|:----:|:----:|:----:|
|<font color="red">onafterprint 	|script 	|文档打印之后触发|
|<font color="red">onbeforeprint 	|script 	|文档打印之前触发|
|<font color="red">onbeforeunload 	|script 	|文档卸载之前触发|
|<font color="red">onerror| 	script 	|当错误发生时触发|
|<font color="red">onhaschange 	|script 	|当文档已改变时触发|
|onload 	|script 	|页面结束加载之后触发|
|<font color="red">onmessage 	|script 	|当消息被触发时触发|
|<font color="red">onoffline 	|script 	|当文档离线时触发|
|<font color="red">ononline 	|script 	|当文档上线时触发|
|<font color="red">onpagehide 	|script 	|当窗口隐藏时触发|
|<font color="red">onpageshow 	|script| 当窗口成为可见时触发|
|<font color="red">onpopstate 	|script 	|当窗口历史记录改变时触发|
|<font color="red">onredo 	|script 	|当文档执行redo时触发|
|<font color="red">onresize 	|script 	|当浏览器窗口被调整大小时触发|
|<font color="red">onstorage 	|script 	|当Web Storage区域更新后触发|
|<font color="red">onundo 	|script 	|当文档执行undo时触发|
|onunload 	|script 	|当页面已下载或者浏览器窗口已被关闭时触发

## Form事件属性

下面是由HTML表单内的动作触发的事件 => 几乎所有的标签，特别是\<form>

|属性 	|值 	|描述|
|:----:|:----:|:----:|
|onblur 	|script 	|当元素失去焦点时触发|
|onchange 	|script 	|当元素值被改变时触发|
|<font color="red">oncontextmenu 	|script 	|当上下文菜单被触发时触发|
|onfocus 	|script 	|当元素获得焦点时触发|
|<font color="red">onformchange 	|script 	|当表单被改变时触发|
|<font color="red">onforminput 	|script 	|当表单获得用户输入时触发|
|<font color="red">oninput 	|script 	|当元素获得用户输入时触发|
|<font color="red">oninvalid 	|script 	|当元素无效时触发|
|~~onreset~~  	|script 	|当表单中的重置按钮被点击时触发|
|onselect 	|script 	|当元素中文本被选中后触发|
|onsubmit 	|script 	|当提交表单时触发|

## Keyboard事件属性

下面是由键盘或类似用户动作触发的事件：

|属性 	|值 	|描述|
|:----:|:----:|:----:|
|onkeydown 	|script 	|当用户按下按键时触发|
|onkeypress 	|script |	当用户敲击按钮时触发|
|onkeyup 	|script 	|当用户释放按键时触发|

## Mouse事件属性

下面是由鼠标或类似用户动作触发的事件：

|属性 	|值 	|描述|
|:----:|:----:|:----:|
|onclick 	|script 	|当元素上发生鼠标点击时触发|
|ondblclick 	|script 	|当元素上发生鼠标双击时触发|
|<font color="red">ondrag 	|script 	|当元素被拖动时触发|
|<font color="red">ondragend 	|script 	|当拖动操作结束时触发|
|<font color="red">ondragenter 	|script 	|当元素元素已被拖动到有效拖放区域时触发|
|<font color="red">ondragleave |	script 	|当元素离开有效拖放目标时触发|
|<font color="red">ondragover 	|script 	|当元素在有效拖放目标上正在被拖动时触发|
|<font color="red">ondragstart 	|script 	|当拖动操作开始时触发|
|<font color="red">ondrop 	|script 	|当被拖元素正在被拖放时触发|
|onmousedown 	|script 	|当元素上按下鼠标按钮时触发|
|onmousemove 	|script 	|当鼠标指针移动到元素上时触发|
|onmouseout 	|script 	|当鼠标指针移出元素时触发|
|onmouseover 	|script 	|当鼠标指针移动到元素上时触发|
|onmouseup 	|script 	|当在元素上释放鼠标按钮时触发|
|<font color="red">onmousewheel 	|script 	|当鼠标滚轮正在被滚动时触发|
|<font color="red">onscroll 	|script| 	当元素滚动条被滚动时触发|

## Media事件属性

下面是由视频、图像、音频等媒体触发的事件 => 所有的标签，常用于\<audio>、\<embed>、\<img>、\<object>、\<video>

|属性 	|值 	|描述|
|:----:|:----:|:----:|
|onabort 	|script 	|退出时运行的脚本|
|<font color="red">oncanplay 	|script 	|当媒体文件就绪、缓冲已足够开始播放时触发|
|<font color="red">oncanplaythrough 	|script 	|当媒体能够无需因缓冲而停止即可播放至结尾时触发|
|<font color="red">ondurationchange| 	script 	|当媒体长度改变时触发|
|<font color="red">onemptied| 	script 	|当发生意外断开等故障，媒体文件突然不可用时触发|
|<font color="red">onended |	script 	|当媒体已到达结尾时触发|
|<font color="red">onerror| 	script 	|当媒体文件加载期间发生错误时触发|
|<font color="red">onloadeddata 	|script 	|当媒体数据已加载时触发|
|<font color="red">onloadedmetadata 	|script 	|当元数据（分辨率、时长等）被加载时触发|
|<font color="red">onloadstart 	|script 	|在媒体文件开始加载且未实际加载任何数据前触发|
|<font color="red">onpause 	|script 	|当媒体被用户或程序暂停时触发|
|<font color="red">onplay 	|script 	|当媒体已就绪可以开始播放时触发|
|<font color="red">onplaying 	|script| 	当媒体已开始播放时触发|
|<font color="red">onprogress 	|script| 	当浏览器正在获取媒体数据时触发|
|<font color="red">onratechange 	|script| 	当回放速率改变时触发|
|<font color="red">onreadystatechange 	|script 	|当就绪状态改变时触发|
|<font color="red">onseeked 	|script| 	当seeking属性设置为false（指示定位已结束）时触发|
|<font color="red">onseeking 	|script |	当seeking属性设置为true（指示定位是活动的）时触发|
|<font color="red">onstalled 	|script 	|当浏览器不论何种原因未能取回媒体数据时触发|
|<font color="red">onsuspend 	|script |	当媒体数据完全加载之前不论何种原因终止取回媒体数据时触发|
|<font color="red">ontimeupdate 	|script| 	当播放位置改变（如快进到某位置）时触发|
|<font color="red">onvolumechange 	|script 	|当音量改变时（包括将音量设置为静音）时触发|
|onwaiting| 	script 	|当媒介已停止播放但打算继续播放时（如媒介暂停以缓冲更多数据）触发|
