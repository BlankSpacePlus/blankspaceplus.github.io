---
title: Maven必知必会
date: 2022-02-07 14:54:16
summary: 本文分享Maven相关基础知识。
tags:
- Maven
- Java
categories:
- Java
---

# Maven

![](../../../images/软件开发/Java/Maven必知必会/1.png)

[Maven官网链接](https://maven.apache.org)
[Maven下载链接](https://maven.apache.org/download.cgi)

# Maven目录结构

`M2_HOME`目录是Maven根目录：
- 📁 bin
    - 🗄️ m2.conf
    - 🗄️ mvn
    - 🗄️ mvn.cmd
    - 🗄️ mvnDebug
    - 🗄️ mvnDebug.cmd
    - 🗄️ mvnyjp
- 📁 boot
    - 🗄️ plexus-classworlds-x.x.x.jar : Java类加载器框架
- 📁 conf
    - 📁 logging
        - 🗄️ simplelogger.properties
    - 🗄️ settings.xml : Maven核心配置文件
    - 🗄️ toolchains.xml
- 📁 lib : Maven运行时需要的Java类库
    - 📁 ext
        - 🗄️ README.txt
    - 📁 jansi-native
        - 📁 freebsd32
            - 🗄️ libjansi.so
        - 📁 freebsd64
            - 🗄️ libjansi.so
        - 📁 linux32
            - 🗄️ libjansi.so
        - 📁 linux64
            - 🗄️ libjansi.so
        - 📁 osx
            - 🗄️ libjansi.jnilib
        - 📁 windows32
            - 🗄️ jansi.dll
        - 📁 windows64
            - 🗄️ jansi.dll
        - 🗄️ README.txt
    - 🗄️ ......
- 🗄️ LICENSE
- 🗄️ NOTICE
- 🗄️ README.txt

# Maven构建项目

![](../../../images/软件开发/Java/Maven必知必会/2.png)

构建过程包含的主要的环节：
- 清理：删除上一次构建的结果，为下一次构建做好准备
- 编译：Java源程序编译成*.class字节码文件
- 测试：运行提前准备好的测试程序
- 报告：针对刚才测试的结果生成一个全面的信息
- 打包
    - Java工程：jar包
    - Web工程：war包
- 安装：把一个Maven工程经过打包操作生成的jar包或war包存入Maven仓库
- 部署
    - 部署jar包：把一个jar包部署到Nexus私服服务器上
    - 部署war包：借助相关Maven插件，将war包部署到Tomcat服务器上

# Maven生命周期

Maven的生命周期就是为了对所有的构建过程进行抽象和统一。Maven的生命周期是抽象的，这意味着生命周期本身不做任何实际的工作。

Maven拥有三套相互独立的生命周期，它们分别为clean、default、site。
- `clean`生命周期的目的是清理项目。
    - `pre-clean`：执行一些清理前需要完成的工作。
    - `clean`：清理上一次构建生成的文件。
    - `post-clean`：执行一些清理后需要完成的工作。
- `default`生命周期的目的是构建项目。
    - `validate`：校验项目是否正确并且所有必要的信息可以完成项目的构建过程。
    - `initialize`：初始化构建状态，比如设置属性值。
    - `generate-sources`：生成包含在编译阶段中的任何源代码。
    - `process-sources`：处理项目主资源文件。一般来说，是对`src/main/ resources`目录的内容进行变量替换等工作后，复制到项目输出的主classpath目录中。
    - `generate-resources`：生成将会包含在项目包中的资源文件。
    - `process-resources`：复制和处理资源到目标目录，为打包阶段最好准备。
    - `compile`：编译项目的主源码。一般来说，是编译`src/main/ java`目录下的Java文件至项目输出的主classpath目录中。
    - `process-classes`：处理编译生成的文件，比如说对class文件做字节码改善优化。
    - `generate-test-sources`：生成包含在编译阶段中的任何测试源代码。
    - `process-test-sources`：处理项目测试资源文件。一般来说，是对`src/test/ resources`目录的内容进行变量替换等工作后，复制到项目输出的测试classpath目录中。
    - `generate-test-resources`：为测试创建资源文件。
    - `process-test-resources`：复制和处理测试资源到目标目录。
    - `test-compile`：编译项目的测试代码。一般来说，是编译`src/test/java`目录下的Java文件至项目输出的测试classpath目录中。
    - `process-test-classes`：处理测试源码编译生成的文件。
    - `test`：使用单元测试框架运行测试，测试代码不会被打包或部署。
    - `prepare-package`：在实际打包之前，执行任何的必要的操作为打包做准备。
    - `package`：接受编译好的代码，打包成可发布的格式，如JAR。
    - `pre-integration-test`：在执行集成测试前进行必要的动作。比如说，搭建需要的环境。
    - `integration-test`：处理和部署项目到可以运行集成测试环境中。
    - `post-integration-test`：	在执行集成测试完成后进行必要的动作。比如说，清理集成测试环境。
    - `verify`：运行任意的检查来验证项目包有效且达到质量标准。
    - `install`：将包安装到Maven本地仓库，供本地其他Maven项目使用。
    - `deploy`：将最终的包复制到远程仓库，供其他开发人员和Maven项目使用。
- `site`生命周期的目的是建立项目站点。
    - `pre-site`：执行一些在生成项目站点之前需要完成的工作。
    - `site`：生成项目站点文档。
    - `post-site`：执行一些在生成项目站点之后需要完成的工作。
    - `site-deploy`：将生成的项目站点发布到服务器上。

每个Maven生命周期包含一些阶段(phase)，这些阶段是有顺序的，并且后面的阶段依赖于前面的阶段，用户和Maven最直接的交互方式就是调用这些生命周期阶段。

较之于生命周期阶段的前后依赖关系，三套生命周期本身是相互独立的，用户可以仅仅调用clean生命周期的某个阶段，或者仅仅调用default生命周期的某个阶段，而不会对其他生命周期产生任何影响。例如，当用户调用clean生命周期的clean阶段的时候，不会触发default生命周期的任何阶段，反之亦然，当用户调用default生命周期的compile阶段的时候，也不会触发clean生命周期的任何阶段。

Maven的核心仅仅定义了抽象的生命周期，具体的任务是交由插件完成的，插件以独立的构件形式存在。Maven的生命周期与插件相互绑定，用以完成实际的构建任务。具体而言，是生命周期的阶段与插件的目标相互绑定，以完成某个具体的构建任务。
为了能让用户几乎不用任何配置就能构建Maven项目，Maven在核心为一些主要的生命周期阶段绑定了很多插件的目标，当用户通过命令行调用生命周期阶段的时候，对应的插件目标就会执行相应的任务。
除了内置绑定以外，用户还能够自己选择将某个插件目标绑定到生命周期的某个阶段上，这种自定义绑定方式能让Maven 项目在构建过程中执行更多更富特色的任务。

完成了插件和生命周期的绑定之后，用户还可以配置插件目标的参数，进一步调整插件目标所执行的任务，以满足项目的需求。几乎所有Maven插件的目标都有一些可配置的参数，用户可以通过命令行和POM 配置等方式来配置这些参数。

# Maven配置信息

代理配置：
```xml
  <proxies>
    <proxy>
      <id>optional</id> 
      <active>true</active>
      <protocol>http</protocol>
      <host>127.0.0.1</host>
      <port>7089</port>
    </proxy>
  </proxies>
```

镜像配置：
```xml
  <mirrors>
    <mirror>
        <id>aliyun</id>
        <mirrorOf>*</mirrorOf>
        <name>aliyun Maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
  </mirrors>
```

默认JDK版本配置：
```xml
  <profile>
    <id>jdk-1.8</id>
    <activation>
      <activeByDefault>true</activeByDefault>
      <jdk>1.8</jdk>
    </activation>
    <properties>
      <maven.compiler.source>1.8</maven.compiler.source>
      <maven.compiler.target>1.8</maven.compiler.target>
      <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
  </profile>
```

本地仓库地址配置：
```xml
  <localRepository>D:/Maven/repository</localRepository>
```

# Maven单元测试

在默认情况下，`maven-surefire-plugin`插件的test目标会自动执行测试源码路径（默认为`/src/test/java/`）下所有符合一组命名模式的测试类：
- `**/Test*.java`：何子目录下所有命名以Test开头的Java类。
- `**/*Test.java`：任何子目录下所有命名以Test结尾的Java类。
- `**/*TestCase.java`：任何子日录下所有命名以TestCase结尾的Java类。

# Maven模型POM

POM（Project Object Model）：项目对象模型。
DOM（Document Object Model）：文档对象模型。

## Maven常见POM元素

常见pom.xml元素如下所示：
- `<groupId></groupId>`：项目所隶属的实际项目ID，未必是一对一的关系（必须定义）
- `<artifactId></artifactId>`：项目中的一个子Maven项目（模块）（必须定义）
- `<version></version>`：项目当前版本（必须定义）
    - `SNAPSHOT`：表示快照版本，正在迭代过程中，不稳定的版本
    - `RELEASE`：表示正式版本
- `<packaging></packaging>`：项目打包方式，默认为jar（可选定义）
- `<name></name>`：项目名称（更用户友好的名称）
- `<description></description>`：项目详情介绍
- `<properties></properties>`：项目属性
- `<dependencies></dependencies>`：项目依赖

Maven规定：所有Java组件都可以用Maven坐标唯一标识。Maven坐标的元素包括：`groupId`、`artifactId`、`version`、`packaging`、`classifier`。Maven提供了一个内含多数流行Java项目组件的中央仓库。

`classifier`不可以直接定义，需要通过附加插件辅助生成。

## Maven的POM聚合

```xml
<modules>
  <module>module1</module>
  <module>module2</module>
</modules>
```

对于聚合模块来说，它知道有哪些被聚合的模块，但那些被聚合的模块不知道这个聚合模块的存在。

## Maven的POM继承

```xml
<parent>
  <groupId></groupId>
  <artifactId></artifactId>
  <version></version>
  <relativePath></relativePath>
</parent>
```

对于继承关系的父POM来说，它不知道有哪些子模块继承于它，但那些子模块都必须知道自己的父POM是什么。

可继承的POM元素：
- `groupld`：项目组ID，项目坐标的核心元素。
- `version`：项目版本，项目坐标的核心元素。
- `description`：项目的描述信息。
- `organization`：项目的组织信息。
- `inceptionYear`：项目的创始年份。
- `url`：项目的URL地址。
- `developers`：项目的开发者信息。
- `contributors`：项目的贡献者信息。
- `distributionManagement`：项目的部署配置。
- `issueManagement`：项目的缺陷跟踪系统信息。
- `ciManagement`：项目的持续集成系统信息。
- `scm`：项目的版本控制系统信息。
- `mailingLists`：项目的邮件列表信息。
- `properties`：自定义的Maven属性。
- `dependencies`：项目的依赖配置。
- `dependencyManagement`：项目的依赖管理配置。
- `repositories`：项目的仓库配置。
- `build`：包括项目的源码目录配置、输出目录配置、插件配置、插件管理配置等。
- `reporting`：包括项目的报告输出目录配置、报告插件配置等。

## Maven的标签大全

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/maven-v4_0_0.xsd">
    <!--父项目的坐标。如果项目中没有规定某个元素的值，那么父项目中的对应值即为项目的默认值。 坐标包括group ID，artifact ID和 
        version。 -->
    <parent>
        <!--被继承的父项目的构件标识符 -->
        <artifactId />
        <!--被继承的父项目的全球唯一标识符 -->
        <groupId />
        <!--被继承的父项目的版本 -->
        <version />
        <!-- 父项目的pom.xml文件的相对路径。相对路径允许你选择一个不同的路径。默认值是../pom.xml。Maven首先在构建当前项目的地方寻找父项 
            目的pom，其次在文件系统的这个位置（relativePath位置），然后在本地仓库，最后在远程仓库寻找父项目的pom。 -->
        <relativePath />
    </parent>
    <!--声明项目描述符遵循哪一个POM模型版本。模型本身的版本很少改变，虽然如此，但它仍然是必不可少的，这是为了当Maven引入了新的特性或者其他模型变更的时候，确保稳定性。 -->
    <modelVersion>4.0.0</modelVersion>
    <!--项目的全球唯一标识符，通常使用全限定的包名区分该项目和其他项目。并且构建时生成的路径也是由此生成， 如com.mycompany.app生成的相对路径为：/com/mycompany/app -->
    <groupId>asia.banseon</groupId>
    <!-- 构件的标识符，它和group ID一起唯一标识一个构件。换句话说，你不能有两个不同的项目拥有同样的artifact ID和groupID；在某个 
        特定的group ID下，artifact ID也必须是唯一的。构件是项目产生的或使用的一个东西，Maven为项目产生的构件包括：JARs，源 码，二进制发布和WARs等。 -->
    <artifactId>banseon-maven2</artifactId>
    <!--项目产生的构件类型，例如jar、war、ear、pom。插件可以创建他们自己的构件类型，所以前面列的不是全部构件类型 -->
    <packaging>jar</packaging>
    <!--项目当前版本，格式为:主版本.次版本.增量版本-限定版本号 -->
    <version>1.0-SNAPSHOT</version>
    <!--项目的名称, Maven产生的文档用 -->
    <name>banseon-maven</name>
    <!--项目主页的URL, Maven产生的文档用 -->
    <url>http://www.baidu.com/banseon</url>
    <!-- 项目的详细描述, Maven 产生的文档用。 当这个元素能够用HTML格式描述时（例如，CDATA中的文本会被解析器忽略，就可以包含HTML标 
        签）， 不鼓励使用纯文本描述。如果你需要修改产生的web站点的索引页面，你应该修改你自己的索引页文件，而不是调整这里的文档。 -->
    <description>A maven project to study maven.</description>
    <!--描述了这个项目构建环境中的前提条件。 -->
    <prerequisites>
        <!--构建该项目或使用该插件所需要的Maven的最低版本 -->
        <maven />
    </prerequisites>
    <!--项目的问题管理系统(Bugzilla, Jira, Scarab,或任何你喜欢的问题管理系统)的名称和URL，本例为 jira -->
    <issueManagement>
        <!--问题管理系统（例如jira）的名字， -->
        <system>jira</system>
        <!--该项目使用的问题管理系统的URL -->
        <url>http://jira.baidu.com/banseon</url>
    </issueManagement>
    <!--项目持续集成信息 -->
    <ciManagement>
        <!--持续集成系统的名字，例如continuum -->
        <system />
        <!--该项目使用的持续集成系统的URL（如果持续集成系统有web接口的话）。 -->
        <url />
        <!--构建完成时，需要通知的开发者/用户的配置项。包括被通知者信息和通知条件（错误，失败，成功，警告） -->
        <notifiers>
            <!--配置一种方式，当构建中断时，以该方式通知用户/开发者 -->
            <notifier>
                <!--传送通知的途径 -->
                <type />
                <!--发生错误时是否通知 -->
                <sendOnError />
                <!--构建失败时是否通知 -->
                <sendOnFailure />
                <!--构建成功时是否通知 -->
                <sendOnSuccess />
                <!--发生警告时是否通知 -->
                <sendOnWarning />
                <!--不赞成使用。通知发送到哪里 -->
                <address />
                <!--扩展配置项 -->
                <configuration />
            </notifier>
        </notifiers>
    </ciManagement>
    <!--项目创建年份，4位数字。当产生版权信息时需要使用这个值。 -->
    <inceptionYear />
    <!--项目相关邮件列表信息 -->
    <mailingLists>
        <!--该元素描述了项目相关的所有邮件列表。自动产生的网站引用这些信息。 -->
        <mailingList>
            <!--邮件的名称 -->
            <name>Demo</name>
            <!--发送邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->
            <post>banseon@126.com</post>
            <!--订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->
            <subscribe>banseon@126.com</subscribe>
            <!--取消订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->
            <unsubscribe>banseon@126.com</unsubscribe>
            <!--你可以浏览邮件信息的URL -->
            <archive>http:/hi.baidu.com/banseon/demo/dev/</archive>
        </mailingList>
    </mailingLists>
    <!--项目开发者列表 -->
    <developers>
        <!--某个项目开发者的信息 -->
        <developer>
            <!--SCM里项目开发者的唯一标识符 -->
            <id>HELLO WORLD</id>
            <!--项目开发者的全名 -->
            <name>banseon</name>
            <!--项目开发者的email -->
            <email>banseon@126.com</email>
            <!--项目开发者的主页的URL -->
            <url />
            <!--项目开发者在项目中扮演的角色，角色元素描述了各种角色 -->
            <roles>
                <role>Project Manager</role>
                <role>Architect</role>
            </roles>
            <!--项目开发者所属组织 -->
            <organization>demo</organization>
            <!--项目开发者所属组织的URL -->
            <organizationUrl>http://hi.baidu.com/banseon</organizationUrl>
            <!--项目开发者属性，如即时消息如何处理等 -->
            <properties>
                <dept>No</dept>
            </properties>
            <!--项目开发者所在时区， -11到12范围内的整数。 -->
            <timezone>-5</timezone>
        </developer>
    </developers>
    <!--项目的其他贡献者列表 -->
    <contributors>
        <!--项目的其他贡献者。参见developers/developer元素 -->
        <contributor>
            <name />
            <email />
            <url />
            <organization />
            <organizationUrl />
            <roles />
            <timezone />
            <properties />
        </contributor>
    </contributors>
    <!--该元素描述了项目所有License列表。 应该只列出该项目的license列表，不要列出依赖项目的 license列表。如果列出多个license，用户可以选择它们中的一个而不是接受所有license。 -->
    <licenses>
        <!--描述了项目的license，用于生成项目的web站点的license页面，其他一些报表和validation也会用到该元素。 -->
        <license>
            <!--license用于法律上的名称 -->
            <name>Apache 2</name>
            <!--官方的license正文页面的URL -->
            <url>http://www.baidu.com/banseon/LICENSE-2.0.txt</url>
            <!--项目分发的主要方式： repo，可以从Maven库下载 manual， 用户必须手动下载和安装依赖 -->
            <distribution>repo</distribution>
            <!--关于license的补充信息 -->
            <comments>A business-friendly OSS license</comments>
        </license>
    </licenses>
    <!--SCM(Source Control Management)标签允许你配置你的代码库，供Maven web站点和其它插件使用。 -->
    <scm>
        <!--SCM的URL,该URL描述了版本库和如何连接到版本库。欲知详情，请看SCMs提供的URL格式和列表。该连接只读。 -->
        <connection>
            scm:svn:http://svn.baidu.com/banseon/maven/banseon/banseon-maven2-trunk(dao-trunk)
        </connection>
        <!--给开发者使用的，类似connection元素。即该连接不仅仅只读 -->
        <developerConnection>
            scm:svn:http://svn.baidu.com/banseon/maven/banseon/dao-trunk
        </developerConnection>
        <!--当前代码的标签，在开发阶段默认为HEAD -->
        <tag />
        <!--指向项目的可浏览SCM库（例如ViewVC或者Fisheye）的URL。 -->
        <url>http://svn.baidu.com/banseon</url>
    </scm>
    <!--描述项目所属组织的各种属性。Maven产生的文档用 -->
    <organization>
        <!--组织的全名 -->
        <name>demo</name>
        <!--组织主页的URL -->
        <url>http://www.baidu.com/banseon</url>
    </organization>
    <!--构建项目需要的信息 -->
    <build>
        <!--该元素设置了项目源码目录，当构建项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 -->
        <sourceDirectory />
        <!--该元素设置了项目脚本源码目录，该目录和源码目录不同：绝大多数情况下，该目录下的内容 会被拷贝到输出目录(因为脚本是被解释的，而不是被编译的)。 -->
        <scriptSourceDirectory />
        <!--该元素设置了项目单元测试使用的源码目录，当测试项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 -->
        <testSourceDirectory />
        <!--被编译过的应用程序class文件存放的目录。 -->
        <outputDirectory />
        <!--被编译过的测试class文件存放的目录。 -->
        <testOutputDirectory />
        <!--使用来自该项目的一系列构建扩展 -->
        <extensions>
            <!--描述使用到的构建扩展。 -->
            <extension>
                <!--构建扩展的groupId -->
                <groupId />
                <!--构建扩展的artifactId -->
                <artifactId />
                <!--构建扩展的版本 -->
                <version />
            </extension>
        </extensions>
        <!--当项目没有规定目标（Maven2 叫做阶段）时的默认值 -->
        <defaultGoal />
        <!--这个元素描述了项目相关的所有资源路径列表，例如和项目相关的属性文件，这些资源被包含在最终的打包文件里。 -->
        <resources>
            <!--这个元素描述了项目相关或测试相关的所有资源路径 -->
            <resource>
                <!-- 描述了资源的目标路径。该路径相对target/classes目录（例如${project.build.outputDirectory}）。举个例 
                    子，如果你想资源在特定的包里(org.apache.maven.messages)，你就必须该元素设置为org/apache/maven /messages。然而，如果你只是想把资源放到源码目录结构里，就不需要该配置。 -->
                <targetPath />
                <!--是否使用参数值代替参数名。参数值取自properties元素或者文件里配置的属性，文件在filters元素里列出。 -->
                <filtering />
                <!--描述存放资源的目录，该路径相对POM路径 -->
                <directory />
                <!--包含的模式列表，例如**/*.xml. -->
                <includes />
                <!--排除的模式列表，例如**/*.xml -->
                <excludes />
            </resource>
        </resources>
        <!--这个元素描述了单元测试相关的所有资源路径，例如和单元测试相关的属性文件。 -->
        <testResources>
            <!--这个元素描述了测试相关的所有资源路径，参见build/resources/resource元素的说明 -->
            <testResource>
                <targetPath />
                <filtering />
                <directory />
                <includes />
                <excludes />
            </testResource>
        </testResources>
        <!--构建产生的所有文件存放的目录 -->
        <directory />
        <!--产生的构件的文件名，默认值是${artifactId}-${version}。 -->
        <finalName />
        <!--当filtering开关打开时，使用到的过滤器属性文件列表 -->
        <filters />
        <!--子项目可以引用的默认插件信息。该插件配置项直到被引用时才会被解析或绑定到生命周期。给定插件的任何本地配置都会覆盖这里的配置 -->
        <pluginManagement>
            <!--使用的插件列表 。 -->
            <plugins>
                <!--plugin元素包含描述插件所需要的信息。 -->
                <plugin>
                    <!--插件在仓库里的group ID -->
                    <groupId />
                    <!--插件在仓库里的artifact ID -->
                    <artifactId />
                    <!--被使用的插件的版本（或版本范围） -->
                    <version />
                    <!--是否从该插件下载Maven扩展（例如打包和类型处理器），由于性能原因，只有在真需要下载时，该元素才被设置成enabled。 -->
                    <extensions />
                    <!--在构建生命周期中执行一组目标的配置。每个目标可能有不同的配置。 -->
                    <executions>
                        <!--execution元素包含了插件执行需要的信息 -->
                        <execution>
                            <!--执行目标的标识符，用于标识构建过程中的目标，或者匹配继承过程中需要合并的执行目标 -->
                            <id />
                            <!--绑定了目标的构建生命周期阶段，如果省略，目标会被绑定到源数据里配置的默认阶段 -->
                            <phase />
                            <!--配置的执行目标 -->
                            <goals />
                            <!--配置是否被传播到子POM -->
                            <inherited />
                            <!--作为DOM对象的配置 -->
                            <configuration />
                        </execution>
                    </executions>
                    <!--项目引入插件所需要的额外依赖 -->
                    <dependencies>
                        <!--参见dependencies/dependency元素 -->
                        <dependency>
                            ......
                        </dependency>
                    </dependencies>
                    <!--任何配置是否被传播到子项目 -->
                    <inherited />
                    <!--作为DOM对象的配置 -->
                    <configuration />
                </plugin>
            </plugins>
        </pluginManagement>
        <!--使用的插件列表 -->
        <plugins>
            <!--参见build/pluginManagement/plugins/plugin元素 -->
            <plugin>
                <groupId />
                <artifactId />
                <version />
                <extensions />
                <executions>
                    <execution>
                        <id />
                        <phase />
                        <goals />
                        <inherited />
                        <configuration />
                    </execution>
                </executions>
                <dependencies>
                    <!--参见dependencies/dependency元素 -->
                    <dependency>
                        ......
                    </dependency>
                </dependencies>
                <goals />
                <inherited />
                <configuration />
            </plugin>
        </plugins>
    </build>
    <!--在列的项目构建profile，如果被激活，会修改构建处理 -->
    <profiles>
        <!--根据环境参数或命令行参数激活某个构建处理 -->
        <profile>
            <!--构建配置的唯一标识符。即用于命令行激活，也用于在继承时合并具有相同标识符的profile。 -->
            <id />
            <!--自动触发profile的条件逻辑。Activation是profile的开启钥匙。profile的力量来自于它 能够在某些特定的环境中自动使用某些特定的值；这些环境通过activation元素指定。activation元素并不是激活profile的唯一方式。 -->
            <activation>
                <!--profile默认是否激活的标志 -->
                <activeByDefault />
                <!--当匹配的jdk被检测到，profile被激活。例如，1.4激活JDK1.4，1.4.0_2，而!1.4激活所有版本不是以1.4开头的JDK。 -->
                <jdk />
                <!--当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性。 -->
                <os>
                    <!--激活profile的操作系统的名字 -->
                    <name>Windows XP</name>
                    <!--激活profile的操作系统所属家族(如 'windows') -->
                    <family>Windows</family>
                    <!--激活profile的操作系统体系结构 -->
                    <arch>x86</arch>
                    <!--激活profile的操作系统版本 -->
                    <version>5.1.2600</version>
                </os>
                <!--如果Maven检测到某一个属性（其值可以在POM中通过${名称}引用），其拥有对应的名称和值，Profile就会被激活。如果值 字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段 -->
                <property>
                    <!--激活profile的属性的名称 -->
                    <name>mavenVersion</name>
                    <!--激活profile的属性的值 -->
                    <value>2.0.3</value>
                </property>
                <!--提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活 profile。另一方面，exists则会检查文件是否存在，如果存在则激活profile。 -->
                <file>
                    <!--如果指定的文件存在，则激活profile。 -->
                    <exists>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/
                    </exists>
                    <!--如果指定的文件不存在，则激活profile。 -->
                    <missing>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/
                    </missing>
                </file>
            </activation>
            <!--构建项目所需要的信息。参见build元素 -->
            <build>
                <defaultGoal />
                <resources>
                    <resource>
                        <targetPath />
                        <filtering />
                        <directory />
                        <includes />
                        <excludes />
                    </resource>
                </resources>
                <testResources>
                    <testResource>
                        <targetPath />
                        <filtering />
                        <directory />
                        <includes />
                        <excludes />
                    </testResource>
                </testResources>
                <directory />
                <finalName />
                <filters />
                <pluginManagement>
                    <plugins>
                        <!--参见build/pluginManagement/plugins/plugin元素 -->
                        <plugin>
                            <groupId />
                            <artifactId />
                            <version />
                            <extensions />
                            <executions>
                                <execution>
                                    <id />
                                    <phase />
                                    <goals />
                                    <inherited />
                                    <configuration />
                                </execution>
                            </executions>
                            <dependencies>
                                <!--参见dependencies/dependency元素 -->
                                <dependency>
                                    ......
                                </dependency>
                            </dependencies>
                            <goals />
                            <inherited />
                            <configuration />
                        </plugin>
                    </plugins>
                </pluginManagement>
                <plugins>
                    <!--参见build/pluginManagement/plugins/plugin元素 -->
                    <plugin>
                        <groupId />
                        <artifactId />
                        <version />
                        <extensions />
                        <executions>
                            <execution>
                                <id />
                                <phase />
                                <goals />
                                <inherited />
                                <configuration />
                            </execution>
                        </executions>
                        <dependencies>
                            <!--参见dependencies/dependency元素 -->
                            <dependency>
                                ......
                            </dependency>
                        </dependencies>
                        <goals />
                        <inherited />
                        <configuration />
                    </plugin>
                </plugins>
            </build>
            <!--模块（有时称作子项目） 被构建成项目的一部分。列出的每个模块元素是指向该模块的目录的相对路径 -->
            <modules />
            <!--发现依赖和扩展的远程仓库列表。 -->
            <repositories>
                <!--参见repositories/repository元素 -->
                <repository>
                    <releases>
                        <enabled />
                        <updatePolicy />
                        <checksumPolicy />
                    </releases>
                    <snapshots>
                        <enabled />
                        <updatePolicy />
                        <checksumPolicy />
                    </snapshots>
                    <id />
                    <name />
                    <url />
                    <layout />
                </repository>
            </repositories>
            <!--发现插件的远程仓库列表，这些插件用于构建和报表 -->
            <pluginRepositories>
                <!--包含需要连接到远程插件仓库的信息.参见repositories/repository元素 -->
                <pluginRepository>
                    <releases>
                        <enabled />
                        <updatePolicy />
                        <checksumPolicy />
                    </releases>
                    <snapshots>
                        <enabled />
                        <updatePolicy />
                        <checksumPolicy />
                    </snapshots>
                    <id />
                    <name />
                    <url />
                    <layout />
                </pluginRepository>
            </pluginRepositories>
            <!--该元素描述了项目相关的所有依赖。 这些依赖组成了项目构建过程中的一个个环节。它们自动从项目定义的仓库中下载。要获取更多信息，请看项目依赖机制。 -->
            <dependencies>
                <!--参见dependencies/dependency元素 -->
                <dependency>
                    ......
                </dependency>
            </dependencies>
            <!--不赞成使用. 现在Maven忽略该元素. -->
            <reports />
            <!--该元素包括使用报表插件产生报表的规范。当用户执行"mvn site"，这些报表就会运行。 在页面导航栏能看到所有报表的链接。参见reporting元素 -->
            <reporting>
                ......
            </reporting>
            <!--参见dependencyManagement元素 -->
            <dependencyManagement>
                <dependencies>
                    <!--参见dependencies/dependency元素 -->
                    <dependency>
                        ......
                    </dependency>
                </dependencies>
            </dependencyManagement>
            <!--参见distributionManagement元素 -->
            <distributionManagement>
                ......
            </distributionManagement>
            <!--参见properties元素 -->
            <properties />
        </profile>
    </profiles>
    <!--模块（有时称作子项目） 被构建成项目的一部分。列出的每个模块元素是指向该模块的目录的相对路径 -->
    <modules />
    <!--发现依赖和扩展的远程仓库列表。 -->
    <repositories>
        <!--包含需要连接到远程仓库的信息 -->
        <repository>
            <!--如何处理远程仓库里发布版本的下载 -->
            <releases>
                <!--true或者false表示该仓库是否为下载某种类型构件（发布版，快照版）开启。 -->
                <enabled />
                <!--该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳。这里的选项是：always（一直），daily（默认，每日），interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。 -->
                <updatePolicy />
                <!--当Maven验证构件校验文件失败时该怎么做：ignore（忽略），fail（失败），或者warn（警告）。 -->
                <checksumPolicy />
            </releases>
            <!-- 如何处理远程仓库里快照版本的下载。有了releases和snapshots这两组配置，POM就可以在每个单独的仓库中，为每种类型的构件采取不同的 
                策略。例如，可能有人会决定只为开发目的开启对快照版本下载的支持。参见repositories/repository/releases元素 -->
            <snapshots>
                <enabled />
                <updatePolicy />
                <checksumPolicy />
            </snapshots>
            <!--远程仓库唯一标识符。可以用来匹配在settings.xml文件里配置的远程仓库 -->
            <id>banseon-repository-proxy</id>
            <!--远程仓库名称 -->
            <name>banseon-repository-proxy</name>
            <!--远程仓库URL，按protocol://hostname/path形式 -->
            <url>http://192.168.1.169:9999/repository/</url>
            <!-- 用于定位和排序构件的仓库布局类型-可以是default（默认）或者legacy（遗留）。Maven 2为其仓库提供了一个默认的布局；然 
                而，Maven 1.x有一种不同的布局。我们可以使用该元素指定布局是default（默认）还是legacy（遗留）。 -->
            <layout>default</layout>
        </repository>
    </repositories>
    <!--发现插件的远程仓库列表，这些插件用于构建和报表 -->
    <pluginRepositories>
        <!--包含需要连接到远程插件仓库的信息.参见repositories/repository元素 -->
        <pluginRepository>
            ......
        </pluginRepository>
    </pluginRepositories>
 
 
    <!--该元素描述了项目相关的所有依赖。 这些依赖组成了项目构建过程中的一个个环节。它们自动从项目定义的仓库中下载。要获取更多信息，请看项目依赖机制。 -->
    <dependencies>
        <dependency>
            <!--依赖的group ID -->
            <groupId>org.apache.maven</groupId>
            <!--依赖的artifact ID -->
            <artifactId>maven-artifact</artifactId>
            <!--依赖的版本号。 在Maven 2里, 也可以配置成版本号的范围。 -->
            <version>3.8.1</version>
            <!-- 依赖类型，默认类型是jar。它通常表示依赖的文件的扩展名，但也有例外。一个类型可以被映射成另外一个扩展名或分类器。类型经常和使用的打包方式对应， 
                尽管这也有例外。一些类型的例子：jar，war，ejb-client和test-jar。如果设置extensions为 true，就可以在 plugin里定义新的类型。所以前面的类型的例子不完整。 -->
            <type>jar</type>
            <!-- 依赖的分类器。分类器可以区分属于同一个POM，但不同构建方式的构件。分类器名被附加到文件名的版本号后面。例如，如果你想要构建两个单独的构件成 
                JAR，一个使用Java 1.4编译器，另一个使用Java 6编译器，你就可以使用分类器来生成两个单独的JAR构件。 -->
            <classifier></classifier>
            <!--依赖范围。在项目发布过程中，帮助决定哪些构件被包括进来。欲知详情请参考依赖机制。 - compile ：默认范围，用于编译 - provided：类似于编译，但支持你期待jdk或者容器提供，类似于classpath 
                - runtime: 在执行时需要使用 - test: 用于test任务时使用 - system: 需要外在提供相应的元素。通过systemPath来取得 
                - systemPath: 仅用于范围为system。提供相应的路径 - optional: 当项目自身被依赖时，标注依赖是否传递。用于连续依赖时使用 -->
            <scope>test</scope>
            <!--仅供system范围使用。注意，不鼓励使用这个元素，并且在新的版本中该元素可能被覆盖掉。该元素为依赖规定了文件系统上的路径。需要绝对路径而不是相对路径。推荐使用属性匹配绝对路径，例如${java.home}。 -->
            <systemPath></systemPath>
            <!--当计算传递依赖时， 从依赖构件列表里，列出被排除的依赖构件集。即告诉maven你只依赖指定的项目，不依赖项目的依赖。此元素主要用于解决版本冲突问题 -->
            <exclusions>
                <exclusion>
                    <artifactId>spring-core</artifactId>
                    <groupId>org.springframework</groupId>
                </exclusion>
            </exclusions>
            <!--可选依赖，如果你在项目B中把C依赖声明为可选，你就需要在依赖于B的项目（例如项目A）中显式的引用对C的依赖。可选依赖阻断依赖的传递性。 -->
            <optional>true</optional>
        </dependency>
    </dependencies>
    <!--不赞成使用. 现在Maven忽略该元素. -->
    <reports></reports>
    <!--该元素描述使用报表插件产生报表的规范。当用户执行"mvn site"，这些报表就会运行。 在页面导航栏能看到所有报表的链接。 -->
    <reporting>
        <!--true，则，网站不包括默认的报表。这包括"项目信息"菜单中的报表。 -->
        <excludeDefaults />
        <!--所有产生的报表存放到哪里。默认值是${project.build.directory}/site。 -->
        <outputDirectory />
        <!--使用的报表插件和他们的配置。 -->
        <plugins>
            <!--plugin元素包含描述报表插件需要的信息 -->
            <plugin>
                <!--报表插件在仓库里的group ID -->
                <groupId />
                <!--报表插件在仓库里的artifact ID -->
                <artifactId />
                <!--被使用的报表插件的版本（或版本范围） -->
                <version />
                <!--任何配置是否被传播到子项目 -->
                <inherited />
                <!--报表插件的配置 -->
                <configuration />
                <!--一组报表的多重规范，每个规范可能有不同的配置。一个规范（报表集）对应一个执行目标 。例如，有1，2，3，4，5，6，7，8，9个报表。1，2，5构成A报表集，对应一个执行目标。2，5，8构成B报表集，对应另一个执行目标 -->
                <reportSets>
                    <!--表示报表的一个集合，以及产生该集合的配置 -->
                    <reportSet>
                        <!--报表集合的唯一标识符，POM继承时用到 -->
                        <id />
                        <!--产生报表集合时，被使用的报表的配置 -->
                        <configuration />
                        <!--配置是否被继承到子POMs -->
                        <inherited />
                        <!--这个集合里使用到哪些报表 -->
                        <reports />
                    </reportSet>
                </reportSets>
            </plugin>
        </plugins>
    </reporting>
    <!-- 继承自该项目的所有子项目的默认依赖信息。这部分的依赖信息不会被立即解析,而是当子项目声明一个依赖（必须描述group ID和 artifact 
        ID信息），如果group ID和artifact ID以外的一些信息没有描述，则通过group ID和artifact ID 匹配到这里的依赖，并使用这里的依赖信息。 -->
    <dependencyManagement>
        <dependencies>
            <!--参见dependencies/dependency元素 -->
            <dependency>
                ......
            </dependency>
        </dependencies>
    </dependencyManagement>
    <!--项目分发信息，在执行mvn deploy后表示要发布的位置。有了这些信息就可以把网站部署到远程服务器或者把构件部署到远程仓库。 -->
    <distributionManagement>
        <!--部署项目产生的构件到远程仓库需要的信息 -->
        <repository>
            <!--是分配给快照一个唯一的版本号（由时间戳和构建流水号）？还是每次都使用相同的版本号？参见repositories/repository元素 -->
            <uniqueVersion />
            <id>banseon-maven2</id>
            <name>banseon maven2</name>
            <url>file://${basedir}/target/deploy</url>
            <layout />
        </repository>
        <!--构件的快照部署到哪里？如果没有配置该元素，默认部署到repository元素配置的仓库，参见distributionManagement/repository元素 -->
        <snapshotRepository>
            <uniqueVersion />
            <id>banseon-maven2</id>
            <name>Banseon-maven2 Snapshot Repository</name>
            <url>scp://svn.baidu.com/banseon:/usr/local/maven-snapshot</url>
            <layout />
        </snapshotRepository>
        <!--部署项目的网站需要的信息 -->
        <site>
            <!--部署位置的唯一标识符，用来匹配站点和settings.xml文件里的配置 -->
            <id>banseon-site</id>
            <!--部署位置的名称 -->
            <name>business api website</name>
            <!--部署位置的URL，按protocol://hostname/path形式 -->
            <url>
                scp://svn.baidu.com/banseon:/var/www/localhost/banseon-web
            </url>
        </site>
        <!--项目下载页面的URL。如果没有该元素，用户应该参考主页。使用该元素的原因是：帮助定位那些不在仓库里的构件（由于license限制）。 -->
        <downloadUrl />
        <!--如果构件有了新的group ID和artifact ID（构件移到了新的位置），这里列出构件的重定位信息。 -->
        <relocation>
            <!--构件新的group ID -->
            <groupId />
            <!--构件新的artifact ID -->
            <artifactId />
            <!--构件新的版本号 -->
            <version />
            <!--显示给用户的，关于移动的额外信息，例如原因。 -->
            <message />
        </relocation>
        <!-- 给出该构件在远程仓库的状态。不得在本地项目中设置该元素，因为这是工具自动更新的。有效的值有：none（默认），converted（仓库管理员从 
            Maven 1 POM转换过来），partner（直接从伙伴Maven 2仓库同步过来），deployed（从Maven 2实例部 署），verified（被核实时正确的和最终的）。 -->
        <status />
    </distributionManagement>
    <!--以值替代名称，Properties可以在整个POM中使用，也可以作为触发条件（见settings.xml配置文件里activation元素的说明）。格式是<name>value</name>。 -->
    <properties />
</project>
```

# Maven工程目录

Maven提倡“约定优于配置”，其中Maven工程目录结构也有所约定。

Maven工程基本目录结构：
- 📁 src
    - 📁 main
        - 📁 java
        - 📁 resources
            - 🗄️ env.properties（如果未指定配置文件时默认使用的配置）
            - 🗄️ env.test.properties（当测试配置文件使用时的测试配置）
            - 🗄️ env.prod.properties（当生产配置文件使用时的生产配置）
        - 📁 webapp
            - 📁 WEB-INF
    - 📁 test
        - 📁 java
        - 📁 resources
- 📁 target
    - 📁 classes (程序类编译结果)
    - 📁 test-classes (测试类编译结果)
    - 📁 surefire-reports (测试报告)

# Maven依赖

依赖管理中要解决的具体问题：
- jar包的下载：使用Maven之后，jar包会从规范的远程仓库下载到本地
- jar包之间的依赖：通过依赖的传递性自动完成
- jar包之间的冲突：通过对依赖的配置进行调整，让某些jar包不会被导入

## Maven依赖范围

- `compile`：默认依赖范围，编译、测试、运行时classpath都可用。
- `test`：编译、运行时classpath不可用，只有测试classpath可用。
- `provided`：运行时classpath不可用，编译、测试classpath可用。
- `runtime`：编译classpath不可用，测试、运行时classpath可用。
- `system`：必须通过systemPath元素显式指定，与本机系统绑定。
- `import`：不对编译、测试、运行时classpath产生实质性的影响。

| 依赖范围(scope) | 对编译classpath有效 | 对测试classpath有效 | 对运行时classpath有效 | 例子 |
|:----:|:----:|:----:|:----:|:----:|
|  compile  | √ | √ | √ | spring-core |
|  test  | × | √ | × | junit |
|  provided  | √ | √ | × | servlet-api |
|  runtime  | × | √ | √ | jdbc实现 |
|  system  | √ | √ | × | 本地Maven仓库以外的类库文件 | 

## Maven依赖传递

| 依赖范围(scope) |  compile  |  test  |  provided  |  runtime  |
|:----:|:----:|:----:|:----:|:----:|
|  compile  |  compile  | × | × | runtime |
|  test  |  test  | × | × | test |
|  provided  |  provided  | × | provided | provided |
|  runtime  |  runtime  | × | × | runtime |

## Maven依赖冲突

依赖冲突的调节：
- 路径最近者优先
- 首先声明者优先

查看当前项目最终已解析依赖：
```shell
mvn dependency:list
```

查看当前项目最终已解析依赖树：
```shell
mvn dependency:tree
```

分析当前项目的依赖：
```shell
mvn dependency:analyze
```

## Maven依赖排除

在`<dependency></dependency>`中添加`<exclusions></exclusions>`可以排除不需要的依赖。

```xml
    <dependencies>
        <dependency>
            <groupId></groupId>
            <artifactId></artifactId>
            <version></version>
            <exclusions>
                <exclusion>
                    <groupId></groupId>
                    <artifactId></artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
```

## Maven依赖解析

Maven依赖解析机制：
1. 当依赖的范围是system的时候，Maven直接从本地文件系统解析构件。
2. 根据依赖坐标计算仓库路径后，尝试直接从本地仓库寻找构件，如果发现相应构件，则解析成功。
3. 在本地仓库不存在相应构件的情况下，如果依赖的版本是显式的发布版本构件，如1.2、2.1-beta-1等，则遍历所有的远程仓库，发现后，下载并解析使用。
4. 如果依赖的版本是RELEASE或者LATEST，则基于更新策略读取所有远程仓库的元数据`groupld/artifactId/maven-metadata.xml`，将其与本地仓库的对应元数据合并后，计算出RELEASE或者LATEST真实的值，然后基于这个真实的值检查本地和远程仓库。
5. 如果依赖的版本是SNAPSHOT，则基于更新策略读取所有远程仓库的元数据`groupld/artifactId/ version/maven-metadata.xml`，将其与本地仓库的对应元数据合并后，得到最新快照版本的值，然后基于该值检查本地仓库，或者从远程仓库下载。
6. 如果最后解析得到的构件版本是时间戳格式的快照，如1.4.1-20091104.121450-121，则复制其时间戳格式的文件至非时间戳格式，如SNAPSHOT，并使用该非时间戳格式的构件。

## Maven本地依赖

```xml
<dependency>
    <groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    <scope>system</scope>
    <systemPath>${project.basedir}/src/main/resources/<jar_name>.jar</systemPath>
</dependency>
```

# Maven属性

同类Maven依赖版本可以通过定义Maven属性统一起来：
```xml
    <properties>
        <swagger.version>2.9.2</swagger.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>${swagger.version}</version>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>${swagger.version}</version>
        </dependency>
    </dependencies>
```

# Maven仓库

Maven仓库的分类：
- 远程仓库
    - 中央仓库
    - 私有仓库
    - 其他公共仓库
- 本地仓库

Maven仓库中，路径与Maven依赖坐标的关系是：`<groupId>/<artifactId>/<version>/<artifactId>-<version>.<packaging>`。

需要根据Maven依赖坐标寻找Maven依赖组件时，会先在本地仓库查找，如果本地没有则去远程仓库
查找。

本地仓库原本不存在，当执行第一条Maven命令后，才会创建本地仓库。

私有仓库是架设在局域网内部的仓库，代理广域网上的中央仓库，有助于：
- 节省外网带宽
- 加速Maven构建
- 部署第三方组件
- 提高稳定性，增强控制
- 降低中央仓库的负载

![](../../../images/软件开发/Java/Maven必知必会/3.png)

# Maven镜像

如果仓库X可以提供仓库Y存储的所有内容，那么就可以认为X是Y的一个镜像。换句话说．任何一个可以从仓库Y获得的构件，都能够从它的镜像中获取。

关于镜像的一个更为常见的用法是结合私服。由于私服可以代理任何外部的公共仓库（包括中央仓库），因此，对于组织内部的Maven用户来说，使用一个私服地址就等于使用了所有需要的外部仓库，这可以将配置集中到私服，从而简化Maven本身的配置。在这种情况下，任何需要的构件都可以从私服获得，私服就是所有仓库的镜像。

镜像配置规则：
- `<mirrorOf> * </mirrorOf>`：匹配所有远程仓库。
- `<mirrorOf> external: * </mirrorOf>`：匹配所有远程仓库，使用localhost的除外，使用file://协议的除外。也就是说，匹配所有不在本机上的远程仓库。
- `<mirrorOf> repo1 , repo2 </mirrorOf>`：匹配仓库repo1和repo2，使用逗号分隔多个远程仓库。
- `<mirrorOf> * , !repo1 </mirrorOf>`：匹配所有远程仓库，repo1除外，使用感叹号将仓库从匹配中排除。

# Maven插件

常见Maven插件：


| 插件 | 描述 |
|:----:|:----:|
| `maven-clean-plugin` | 构建之后清理目标文件，删除目标目录。 |
| `maven-compiler-plugin` | 编译Java源文件。 |
| `maven-surefile-plugin` | 运行JUnit单元测试，创建测试报告。 |
| `maven-jar-plugin` | 从当前工程中构建JAR文件。 |
| `maven-war-plugin` | 从当前工程中构建WAR文件。 |
| `maven-javadoc-plugin` | 为工程生成Javadoc。 |
| `maven-antrun-plugin` | 从构建过程的任意一个阶段中运行一个Ant任务的集合。 |

# Maven命令参数

Maven执行与构建有关的命令时，必须在pom.xml路径下执行，否则报错：`The goal you specified requires a project to execute but there is no POM in this directory`

## Maven命令参数

| 缩略参数 | 完整参数 | 参数说明 |
|:----:|:----:|:----:|
| `-am` | `--also-make` | 如果指定了项目列表，则还构建列表所需的项目 |
| `-amd` | `--also-make-dependents` | 如果指定了项目列表，则还构建依赖于列表上项目的项目 |
| `-B` | `--batch-mode` | 以非交互（批处理）模式运行（禁用输出颜色） |
| `-b` | `--builder <arg>` | 要使用的构建策略的id |
| `-C` | `--strict-checksums` | 如果校验和不匹配则构建失败 |
| `-c` | `--lax-checksums` | 如果校验和不匹配则发出警告 |
| `-cpu` | `--check-plugin-updates` | 无效，仅保留用于向后兼容 |
| `-D` | `--define <arg>` | 定义系统属性 |
| `-e` | `--errors` | 产生执行错误消息 |
| `-emp` | `--encrypt-master-password <arg>` | 加密主安全密码 |
| `-ep` | `--encrypt-password <arg>` | 加密服务器密码 |
| `-f` | `--file <arg>` | 强制使用备用POM文件（或带有pom.xml的目录） |
| `-fae` | `--fae-at-end` | 仅在之后使构建失败； 允许所有不受影响的构建继续 |
| `-ff` | `--fail-fast` | 在反应式构建中第一次失败时停止 |
| `-fn` | `--fail-never` | 无论项目结果如何，构建都不会失败 |
| `-gs` | `--global-settings <arg>` | 全局设置文件的备用路径 |
| `-gt` | `--global-toolchains <arg>` | 全局工具链文件的备用路径 |
| `-h` | `--help` | 显示帮助信息 |
| `-l` | `--log-file <arg>` | 所有构建输出将进入的日志文件（禁用输出颜色） |
| `-llr` | `--legacy-local-repository` | 使用Maven2旧版本地存储库行为，即不使用`_remote.repositories`。 也可以使用`-Dmaven.legacyLocalRepo=true`激活 |
| `-N` | `--non-recursive` | 不递归到子项目中 |
| `-npr` | `--no-plugin-registry` | 无效，仅保留用于向后兼容 |
| `-npu` | `--no-plugin-updates` | 无效，仅保留用于向后兼容 |
| `-nsu` | `--no-snapshot-updates` | 禁止快照更新 |
| `-o` | `--offline` | 离线工作 |
| `-P` | `--activate-profiles <arg>` | 要激活的以逗号分隔的配置文件列表 |
| `-pl` | `--projects <arg>` | 以逗号分隔的要构建的指定反应器项目列表，而不是所有项目。项目可以通过`[groupId]:artifactId`或其相对路径指定 |
| `-q` | `--quiet` | 安静输出-只显示错误 |
| `-rf` | `--resume-from <arg>` | 从指定项目恢复reactor |
| `-s` | `--settings <arg>` | 用户设置文件的备用路径 |
| `-t` | `--toolchains <arg>` | 用户工具链文件的备用路径 |
| `-T` | `--threads <arg>` | 线程数，例如2.0C，其中C是核心乘积 |
| `-U` | `--update-snapshots` | 强制检查远程存储库上丢失的版本和更新的快照 |
| `-up` | `--update-plugins` | 无效，仅保留用于向后兼容 |
| `-v` | `--version` | 显示版本信息 |
| `-V` | `--show-version` | 显示版本信息而不停止构建 |
| `-X` | `--debug` | 产生执行调试输出 |

## Maven基本命令

```shell
# 清除编译结果，删除target目录
mvn clean
# 主程序编译
mvn compile
# 测试程序编译
mvn test-compile
# 测试程序
mvn test
# 程序打包
mvn package
# 将本地构建过程中生成的jar包存入Maven本地仓库
mvn install
```

## Maven进阶命令参数

```shell
# 离线模式，相当于以本地模式执行
mvn -o | mvn clean install -o
# 禁用递归查找 pom.xml，多 module 工程中可以用来单独 install 'parent'
mvn -N | mvn clean install -N
# 禁用交互模式（听说在 jenkins 上可以禁止输出下载进度？）
mvn -B | mvn clean install -B
# 多 module 工程中指定打包某个 module 和其依赖的 module，若指定多个以逗号分隔
mvn -pl xxx -am | mvn clean package -pl xxx-api -am
# 多 module 工程中指定从某个 module 开始构建，可以和 -pl 联用
mvn -rf | mvn clean package -rf xxx-api
# 异常时打印堆栈
mvn -e
# 开启 debug 模式，打开后日志茫茫多，包括 -e 的内容
mvn -X
# 开启多线程构建，'C' 代表 cpu 核数，'0.5C' 表示有 core/2 个线程，'4' 表示固定 4 个线程
mvn -T 0.5C | mvn -T 4
# 指定 pom.xml 文件路径
mvn -f
# 指定 settings.xml 文件路径
mvn -s
# 强制更新依赖
mvn -U
# 强制更新插件
mvn -up
# 禁止更新依赖
mvn -nsu
# 禁止更新插件
mvn -npu
# 激活 profile
mvn -P
# 开启静默模式，只输出异常，某些场景下非常有用
mvn -q | mvn help:evaluate -q -DforceStdout -Dexpression=project.version
```

## Maven创建项目

基本命令：
```shell
mvn archetype:generate
```

```shell
mvn archetype:generate "-DgroupId=<groupId>" "-DartifactId=<artifactId>" "-DarchetypeArtifactId=maven-archetype-quickstart" "-DinteractiveMode=false"
```

参数说明：
- `-DgroupId`: 组织名
- `-DartifactId`: 项目名-模块名
- `-DarchetypeArtifactId`: archetypeId
- `-DinteractiveMode`: 是否使用交互模式
