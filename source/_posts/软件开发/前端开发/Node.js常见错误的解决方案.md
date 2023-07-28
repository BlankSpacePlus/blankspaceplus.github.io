---
title: Node.js常见错误的解决方案
date: 2022-05-02 14:25:51
summary: 本文分享Node.js常见错误的解决方案。
tags:
- Web前端技术
- Node.js
- JavaScript
categories:
- 开发技术
---

# @parcel/transformer-js: Browser scripts cannot have imports or exports.

编译Node工程：

```json
{
  // ...
  "devDependencies": {
    "parcel": "^2.7.0",
    "parcel-bundler": "^1.12.5",
    "typescript": "^4.8.4"
  },
  // ...
}
```

报错：

<font color="red">@parcel/transformer-js: Browser scripts cannot have imports or exports.</font>

解决方法：

```html
<body>
  <script src="./index.js"></script>
</body>
```

`<script src="./index.js"></script>`改成`<script src="./index.js" type="module"></script>`

即：

```html
<body>
  <script src="./index.js" type="module"></script>
</body>
```
