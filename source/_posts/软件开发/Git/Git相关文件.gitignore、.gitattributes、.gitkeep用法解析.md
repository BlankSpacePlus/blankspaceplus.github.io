---
title: Git相关文件.gitignore、.gitattributes、.gitkeep用法解析
date: 2022-02-08 22:32:40
summary: 本文介绍一些特殊的Git相关文件，如.gitignore、.gitattributes、.gitkeep。
tags:
- Git
categories:
- 开发技术
---

# .gitignore

[ProGit](https://git-scm.com/docs/gitignore)对`.gitignore`有相应的描述。

`.gitignore`是一个需要写入内容的文件，用于指定要忽略的刻意untrack的文件。

需要注意的是，`.gitignore`不对已经track的文件起效。

`.gitignore`文件中的每一行都指定一个模式(pattern)。在决定是否忽略路径(path)时，Git通常会检查来自多个源的`gitignore` pattern，按照以下从高到低的优先顺序（在一个优先级内，最后匹配的pattern决定结果）：
- 从命令行读取支持它们的命令的pattern。
- 从与路径相同的目录或任何父目录（直到工作树的顶层）中的`.gitignore`文件中读取的pattern，较高级别文件中的pattern被较低级别文件中的pattern覆盖到包含文件的目录。这些pattern式与`.gitignore`文件的位置相匹配。项目通常在其存储库中包含此类`.gitignore`文件，其中包含作为项目构建的一部分生成的文件的pattern。
- 从`$GIT_DIR/info/exclude`读取的pattern。
- 从配置变量`core.excludesFile`指定的文件中读取的pattern。

放置pattern的文件取决于pattern的使用方式：
- 应该受版本控制并通过clone分发到其他存储库的pattern（即所有开发人员都希望忽略的文件）应该使用`.gitignore`文件。
- 特定于特定存储库但不需要与其他相关存储库共享的pattern（例如，存在于存储库中但特定于一个用户工作流的辅助文件）应该使用`$GIT_DIR/info/exclude`文件。
- 用户希望Git在所有情况下忽略的pattern（例如，由用户选择的编辑器生成的备份或临时文件）通常使用用户`~/.gitconfig`中由`core.excludesFile`指定的文件。它的默认值为`$XDG_CONFIG_HOME/git/ignore`。如果`$XDG_CONFIG_HOME`未设置或为空，则使用`$HOME/.config/git/ignore`代替。

底层Git管道工具，例如`git ls-files`和`git read-tree`，读取由命令行选项指定的`gitignore` pattern，或从命令行选项指定的文件中读取。
而更高级别的Git工具，例如`git status`和`git add`，使用上述来源的pattern。

Pattern Format：
- 空行不匹配任何文件，因此它可以用作分隔符以提高可读性。
- 以`#`开头的行用作注释。对于以hash开头的pattern，在第一个hash前放置一个`\`。
- 每行pattern的尾部空格将被忽略，除非它们用`\`转义。
- 可选前缀`!`起到否定pattern排除的作用，任何被此前的pattern排除的匹配文件都将再次包含在内。
    - 出于性能考虑，Git不会列出排除的目录，因此如果已经排除`!`修饰文件的父目录，则无法重新包含该文件，包含文件的任何pattern都无效，无论它们是在哪里定义的。
    - 以`!`开头的pattern文本需要用`\`转义。
- `/`用作目录分隔符，可能出现在pattern的任何位置。
    - 如果pattern的开头或(和)中间有`/`，则该pattern是相对于特定`gitignore`文件本身的目录级别的，否则pattern也可能在`gitignore`级别以下的任何级别匹配。
    - 如果pattern的末尾有`/`，则该pattern将仅匹配目录，否则该pattern可以匹配文件和目录。
- `*`匹配除`/`以外的任何内容。
- `?`匹配除`/`之外的任何一个字符。
- 范围符号，例如`[a-zA-Z]`，可用于匹配范围内的字符之一。
- 与完整路径名匹配的pattern中的`**`具有特殊含义：
    - 前导`**`后跟`/`表示在所有目录中都匹配。
    - 末尾`**`匹配里面的所有内容，深度无限制。
    - `/`后跟`**`，`/`匹配零个或多个目录。
    - 其他的连续`*`组合被视为常规星号，将根据之前的规则进行匹配。

如果要停止跟踪当前track的文件，可以使用`git rm --cached`。

访问工作树中的`.gitignore`文件时，Git不遵循符号链接。当从索引或树访问文件而不是从文件系统访问文件时，这可以保持行为一致。
说明：符号链接，也称软链接，是一类特殊的文件，其包含有一条以绝对路径或者相对路径的形式指向其它文件或者目录的引用。

# .gitattributes

[ProGit](https://git-scm.com/docs/gitattributes)对`.gitattributes`有相应的描述。

`.gitattributes`是一个需要写入内容的文件，用于定义每个路径的属性。

`.gitattributes`文件中的每一行格式为`pattern attr1 attr2 ...`：
- 一个模式后跟一个属性列表，用空格分隔。
- 前导和尾随空格将被忽略。
- 以`#`开头的行将被忽略，视作注释。
- 以双引号开头的pattern以C语言风格引用。
- 当pattern与所讨论的路径匹配时，该行中列出的属性将被赋予该路径。

对于给定路径，每个属性的状态可能是：
- `Set`：只列出属性列表中的属性名称，指定特定的属性值`true`。
- `Unset`：列出以属性列表中的属性名称，加上`-`前缀，指定特定的属性值`false`。
- `Set to a value`：列出以属性列表中的属性名称，加上`=`和属性值后缀，指定特定字符串的属性值。
- `Unspecified`：没有pattern匹配路径，并且没有说明路径是否具有属性。

当多个pattern与路径匹配时，后面的行会覆盖前面的行，此覆盖是按属性完成的。

pattern匹配路径的规则与`.gitignore`文件中的规则基本相同，不同点在于：
- 禁止否定型pattern。
- 与目录匹配的pattern不会递归匹配该目录内的路径。

属性分配给路径的优先级（从高到低）：
- `$GIT_DIR/info/attributes`文件
- 与相关路径位于同一目录中的`.gitattributes`文件
- 相关路径的父目录中的`.gitattributes`文件（从文件所在目录开始直至工作树，包含`.gitattributes`的目录离相关路径越远，其优先级越低）
- 全局和系统范围的相关文件。

当工作树中缺少`.gitattributes`文件时，索引中的路径将用作后备。在`checkout`过程中，使用索引中的`.gitattributes`，然后将工作树中的文件用作后备。

属性配置的位置选择：
- 如果属性只影响单个存储库（即将属性分配给特定于该存储库的一个用户工作流的文件），则应该设置`$GIT_DIR/info/attributes`文件。
- 如果属性应该受版本控制并分发到其他存储库，则应该设置`.gitattributes`文件。
- 如果属性影响单个用户的所有存储库，应该设置由`core.attributesFile`配置选项指定的文件，与`git config`有关，默认值为`$XDG_CONFIG_HOME/git/attributes`。如果`$XDG_CONFIG_HOME`未设置或为空，则使用`$HOME/.config/git/attributes`代替。系统上所有用户的属性都应该放在`$(prefix)/etc/gitattributes`文件中。

`!`为前缀的属性名称可用于覆盖未指定状态路径的属性设置。

# .gitkeep

ProGit没有专门对`.gitkeep`做出规定。

`.gitkeep`是一个空文件，用于充当一个空文件夹的占位符。Git不允许track或者commit一个空文件夹，想要提交并显示这样的空文件夹，保持这个项目的结构，就需要`.gitkeep`充当占位符。

实际上，`.nofile`或者其他的占位文件也可以起到同样的作用。之所以使用`.gitkeep`是一种规范，是因为这是一种普遍习惯下的约定俗成。

# 文件生成

Windows系统生成以上文件可以借助文本编辑器，也可以记事本txt直接改名。

文本编辑器生成的方法非常简单，略。

Windows记事本txt改名的方法是创建默认的`新建文本文档.txt`，更名为`.gitattributes.`，即生成`.gitattributes`。

请注意更名为`.gitattributes.`而不是`.gitattributes`。

# 案例分析

例如，存在如下的目录结构：

- 📁root
    - 📁src
        - 📁main
            - 📁resources
                - 🗄️application.yml
            - 📁java
                - 📁com
                    - 📁example
                        - 📁constant
                        - 📁controller
                            - 🗄️StudentManagementController.java
                        - 📁dao
                            - 🗄️StudentDAO.java
                        - 📁entity
                            - 🗄️Student.java
                        - 📁service
                            - 📁impl
                                - 🗄️StudentManagementImpl.java 
                            - 🗄️StudentManagement.java 
        - 📁test ==（非空）==
            - 📁…… ==（省略）==
            - 🗄️…… ==（省略）==
    - 📁target ==（非空）==
        - 📁…… ==（省略）==
        - 🗄️…… ==（省略）==
    - 🗄️.gitattributes
    - 🗄️.gitignore
    - 🗄️pom.xml
    - 🗄️README.md

`.gitattributes`配置为：
```java
*.* linguist-language=python
```

`.gitignore`配置为：
```java
.idea
.classpath
.project
.settings
.checkstyle
.DS_Store
*.iml
target
**/.flattened-pom.xml
```

根据以上设定：
- GitHub解析到的语言类型是Python（所有的文件都会被识别为Python文件，尽管这是完全不合理的，实际不要这样去操作）
- target文件夹及其包含的所有子文件夹和文件都会被忽略，不会被记录下来
- `/root/src/main/java/com/example/constant`目录不会被记录下来，想要记录下来需要在其中加一个`.gitkeep`的空文件

done.
