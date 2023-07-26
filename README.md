# Hexo

- [Hexo官网](https://hexo.io/zh-cn/)
- [GitHub: hexojs/hexo](https://github.com/hexojs/hexo)

# Hexo搭建

- [CSDN: GitHub Pages + Hexo搭建个人博客网站](https://blog.csdn.net/yaorongke/article/details/119089190)
- [知乎: 超详细Hexo+Github博客搭建小白教程](https://zhuanlan.zhihu.com/p/35668237)

项目基于`Node.js`构建，博客框架为`Hexo`，最终定下的模板为`Matery`。

安装hexo库：
```shell
npm install -g hexo-cli
```

查看hexo版本：
```shell
hexo -v
```

构建hexo项目：
```shell
hexo init hexo-blog
npm install
```

修改`_config.yml`配置主题：
```shell
theme: matery
```

更新后运行项目：
```shell
hexo clean
hexo g -d
hexo s
```

# Hexo模板

- [GitHub: blinkfox/hexo-theme-matery](https://github.com/blinkfox/hexo-theme-matery)
    - [文章摘要的问题](https://github.com/blinkfox/hexo-theme-matery/issues/99)
    - [文章嵌入HTML代码](https://github.com/hexojs/hexo/issues/1692)
- [GitHub: fluid-dev/hexo-theme-fluid](https://github.com/fluid-dev/hexo-theme-fluid)
    - [Fluid用户指南](https://hexo.fluid-dev.com/docs/guide)

# Hexo配置

- [Hexo Configuration](https://hexo.io/zh-cn/docs/configuration.html)
- [Hexo支持LaTeX公式](https://blog.xiangfa.org/2020/09/let-hexo-support-latex-formulas/)

# Hexo的GitHub部署方法

- [GitHub: peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [GitHub Action - Hexo CI/CD](https://github.com/marketplace/actions/hexo-action)
- [GitHub Action - Hexo Deploy](https://github.com/marketplace/actions/hexo-deploy)
- [Hexo: 部署到GitHub Pages](https://hexo.io/docs/github-pages.html)
- [稀土掘金: github pages 404怎么解决](https://juejin.cn/s/github%20pages%20404%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)

# Hexo异常解决

- [Stackoverflow: brackets cannot be displayed correctly in hexo blog](https://stackoverflow.com/questions/63476271/brackets-cannot-be-displayed-correctly-in-hexo-blog)
- [Stackoverflow: Problem with GitHub Pages Jekyll Template](https://stackoverflow.com/questions/75212400/problem-with-github-pages-jekyll-template)
- [lingzhicheng: Nunjucks Errors](https://www.lingzhicheng.cn/2021/08/26/NunjucksErrors/)
