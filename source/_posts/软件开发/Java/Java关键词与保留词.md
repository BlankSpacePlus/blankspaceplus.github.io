---
title: Java关键词与保留词
date: 2020-02-29 21:48:53
summary: 本文详细梳理Java支持的Keywords和ReservedWords。
tags:
- Java
categories:
- 开发技术
---

# Java关键词

| 关键词 | 说明 |
|:----:|:----|
| _ | Java9新增。从Java9开始，`_`不能再作为变量名使用。 |
| abstract | abstract可以修饰类和方法，不能修饰变量或构造方法。<br>没有方法体（实现）的方法必须声明为abstract，包含它的类必须声明为abstract。<br> 抽象类不能被实例化，但可以定义构造方法、抽象方法、普通方法、静态方法。抽象基类的抽象方法必须在其派生类中实现。<br>接口的方法中，除了Java8支持的default方法和static方法以外，全都默认是abstract的。<br>抽象类为其派生类提供了一套规范模板，但不必有抽象方法。<br>推荐阅读：[抽象类与接口](https://blankspace.blog.csdn.net/article/details/129923834)<br>推荐阅读：[抽象类与模板模式](https://blankspace.blog.csdn.net/article/details/123172755) |
| assert | Java4新增。assert语句描述了一个放置在Java程序中的谓词(判断真假的语句)，表明开发者认为该谓词在那个地方总是为真。<br>推荐阅读：[谓词逻辑](https://blankspace.blog.csdn.net/article/details/113782390)<br>如果断言在运行时评估为false，则会导致断言失败，抛出<font color="red">Exception in thread "xxx" java.lang.AssertionError: Error</font>，这通常会导致执行中止。 <br>默认情况下，断言在运行时是禁用的，但可以通过命令行选项`-ea`或通过类加载器上的方法以编程方式启用。<br>推荐阅读：[Java关键词assert解读](https://blankspace.blog.csdn.net/article/details/104668175) |
| boolean | boolean用于定义一个布尔类型变量。<br>boolean类型属于Java的八种基本类型，取值包括`true`和`false`。默认情况下，boolean变量会默认初始化取值为false。<br>boolean还用于声明方法返回基本类型boolean的值。<br>boolean对应的包装类为java.lang.Boolean。<br>推荐阅读：[Java的基本类型](https://blankspace.blog.csdn.net/article/details/104545979)<br>推荐阅读：[布尔逻辑](https://blankspace.blog.csdn.net/article/details/129391439) |
| break | break用于结束当前循环体内的执行，不论是for循环还是while循环。<br>Java支持命名标记循环，break结合该“语法糖”可以直接跳出标记循环。<br>break还可以用于结束switch...case..语句块。<br>推荐阅读：[循环控制语句](https://blankspace.blog.csdn.net/article/details/129441007) |
| byte | byte用于定义一个8位有符号二进制补码整数变量。<br>byte还用于声明方法返回基本类型byte的值。<br>byte对应的包装类为java.lang.Byte。<br>推荐阅读：[Java的基本类型](https://blankspace.blog.csdn.net/article/details/104545979) |
| case | case语句用于分支结构的switch...case...default...语句，目前只能与switch和default搭配。<br>case语句作为switch...case...default...语句块的一个分支，符合条件的case语句会被执行。<br>Java的各个版本不断丰富着switch...case...default...语句的“语法糖”。<br>推荐阅读：[分支结构语句](https://blankspace.blog.csdn.net/article/details/90484056) |
| catch | catch用于异常处理的try...catch...finally语句块，目前只能与try和finally搭配。<br>catch块中的语句指定try块抛出特定类型的异常时的处理方法，例如处理异常或继续抛出异常。<br>推荐阅读：[程序错误与异常处理](https://blankspace.blog.csdn.net/article/details/123164216)<br>推荐阅读：[Java异常处理的注意事项](https://blankspace.blog.csdn.net/article/details/101311260) |
| char | char于定义一个一个字符变量，可以保存Java源文件字符集中的任意字符。<br>char类型的变量既可以用一对单引号`''`引起来，也可以用对应的字符编号数值表示。<br>char对应的包装类为java.lang.Character。<br>推荐阅读：[Java的基本类型](https://blankspace.blog.csdn.net/article/details/104545979) |
| class | class用于修饰类，不论是普通类还是抽象类。class不仅包括外部类，还包括内部类。<br>推荐阅读：[类的本质](https://blankspace.blog.csdn.net/article/details/114680985)<br>class、interface、enum、record、@interface具有相等的地位，都能被编译为.class文件。<br>类的成员包括静态变量、静态方法、静态初始化块、静态内部类、成员变量、成员方法、初始化块、内部类等。<br>定义类的时候还要声明该类实现了什么接口、继承自什么基类。如果未显式指定基类，则默认为java.lang.Object。<br>class还可以用于表示java.lang.Class的实例，以`<ClassName>.class`的形式中使用，在反射中应用广泛。<br>推荐阅读：[反射](https://blankspace.blog.csdn.net/article/details/104720556) |
| const | 迄今为止，const关键词尚未被启用，因此没有实际意义。<br>参考其他语言，const更多地是被用于修饰常量的定义，鉴于Java10对var语法的支持，或许今后会支持const语法。<br>推荐阅读：[变量声明](https://blankspace.blog.csdn.net/article/details/129382715) |
| continue | continue语句会跳过当前循环中的代码，强迫开始下一次循环。<br>Java支持命名标记循环，continue结合该“语法糖”可以直接重新开始标记循环。<br>推荐阅读：[循环控制语句](https://blankspace.blog.csdn.net/article/details/129441007) |
| default | default语句用于分支结构的switch...case...default...语句。<br>default用于标记如果没有case匹配指定值则要执行的语句块，起到逻辑判定兜底的作用。<br>Java8开始支持接口定义default方法。接口定义的方法需要有default修饰，而通常所说的“默认方法”不加default修饰。<br>推荐阅读：[抽象类与接口](https://blankspace.blog.csdn.net/article/details/129923834)<br>此外，@default被用于JavaDoc中对默认值的标记。<br>推荐阅读：[JavaDoc文档注释](https://blankspace.blog.csdn.net/article/details/103198971) |
| do | do目前只能与while搭配，构建一个do...while后置检验循环，先执行与循环相关的语句块，然后测试与while相关的布尔表达式。<br>do...while循环的循环体至少执行一次，因此其程序设计思路与普通while循环不同。<br>推荐阅读：[循环控制语句](https://blankspace.blog.csdn.net/article/details/129441007) |
| double | double用于定义一个64位双精度IEEE-754浮点数变量。<br>double还用于声明方法返回基本类型double的值。<br>double对应的包装类为java.lang.Double。<br>推荐阅读：[Java的基本类型](https://blankspace.blog.csdn.net/article/details/104545979)<br>推荐阅读：[基本数学运算](https://blankspace.blog.csdn.net/article/details/102970758)<br>推荐阅读：[Java数值计算的常见错误](https://blankspace.blog.csdn.net/article/details/104707882) |
| else | else目前只能与if搭配，构建一个if...else if...else...分支结构语句。<br>if...else if...else...语句与switch...case...default...语句等效，但适用范围更加广泛。<br>if...else if...else...语句测试一个布尔表达式：如果表达式的计算结果为真，则计算与if关联的语句块；如果表达式的计算结果为假，则计算与else关联的语句块。<br>推荐阅读：[分支结构语句](https://blankspace.blog.csdn.net/article/details/90484056) |
| enum | Java5新增。enum用于声明枚举类型。<br>class、interface、enum、record、@interface具有相等的地位，都能被编译为.class文件。<br>Java枚举类的基类是java.lang.Enum。<br>推荐阅读：[枚举](https://blankspace.blog.csdn.net/article/details/128921333) |
| extends | extends包含在类或接口的声明中，表示继承关系。<br>类可以继承自非final类，接口可以继承自接口。<br>抽象类可以继承自抽象类或普通类，普通类也可以继承自抽象类。<br>推荐阅读：[封装、继承、多态](https://blankspace.blog.csdn.net/article/details/114697596)<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239)<br>extends还可以用于在泛型中指定类型参数的上限。<br>推荐阅读：[泛型](https://blankspace.blog.csdn.net/article/details/128928431) |
| final | final可以修饰变量、类、方法。<br>如果用final修饰一个变量，该变量最多只能作为已执行命令的左手表达式出现一次，其值不能再被修改。<br>如果用final修饰一个类，则该类不能再被继承。<br>如果用final修饰一个方法，则该方法不能再被重写。<br>推荐阅读：[变量与常量](https://blankspace.blog.csdn.net/article/details/123163101)<br>推荐阅读：[重写与重载](https://blankspace.blog.csdn.net/article/details/128881890)<br>接口中的所有属性默认是final的，即便不明确声明。 |
| finally | finally用于异常处理的try…catch…finally语句块，目前只能与try和catch搭配。<br>无论是否有异常发生，该代码块中的语句都会被执行。通常用于释放资源或者关闭连接等必须执行的操作。<br>如果try语句块和finally块中都存在return语句，try块返回的数据会被finally块返回的数据覆盖，因此实际返回的是finally块返回的结果。<br>推荐阅读：[程序错误与异常处理](https://blankspace.blog.csdn.net/article/details/123164216)<br>推荐阅读：[Java异常处理的注意事项](https://blankspace.blog.csdn.net/article/details/101311260) |
| float | float用于定义一个32位双精度IEEE-754浮点数变量。<br>float还用于声明方法返回基本类型float的值。<br>float对应的包装类为java.lang.Float。<br>推荐阅读：[Java的基本类型](https://blankspace.blog.csdn.net/article/details/104545979) |
| for | for用于构建for循环，指定变量初始化、布尔表达式和自增，与while循环等效，例如`for (int i = 0; i < n; i++)`。<br>for循环头的变量初始化、布尔表达式和自增都可以酌情省略，甚至`for(;;)`也可以表示无限循环。<br>Java5开始支持“增强for循环”，用于迭代数组或Iterable对象，例如`for (String s : sArr)`。<br>推荐阅读：[循环控制语句](https://blankspace.blog.csdn.net/article/details/129441007) |
| goto | 迄今为止，goto关键词尚未被启用，因此没有实际意义。<br>参考其他语言，goto更多地是被用于循环流程控制，但容易降低代码可理解性。<br>推荐阅读：[循环控制语句](https://blankspace.blog.csdn.net/article/details/129441007) |
| if | if目前只能与else搭配，构建一个if...else if...else...分支结构语句。<br>if...else if...else...语句与switch...case...default...语句等效，但适用范围更加广泛。<br>if...else if...else...语句测试一个布尔表达式：如果表达式的计算结果为真，则计算与if关联的语句块；如果表达式的计算结果为假，则计算与else关联的语句块。<br>推荐阅读：[分支结构语句](https://blankspace.blog.csdn.net/article/details/90484056) |
| implements | implements包含在类声明中，指定当前类实现的一个或多个接口。<br>类继承其实现的接口所声明的类型和抽象方法。<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239) |
| import | import指定当前源文件可能要引用的类或整个包。<br>Java源文件的import语句应该位于package语句之后、所有的类定义之前，语句以分号结尾。<br>一个Java源文件的import语句可能没有，也可能有多条。<br>遇到类名冲突的情况，即使经过了import，也要写明类全名。<br>Java5开始，Java源文件的import语句可以导入非静态成员，也可以导入静态成员。当导入静态成员时，import要与static结合。<br>推荐阅读：[模块引入](https://blankspace.blog.csdn.net/article/details/129494843) |
| instanceof | instanceof是一个二元运算符，将对象引用作为其第一个操作数，并将类或接口作为其第二个操作数并产生布尔结果。当且仅当对象的运行时类型与类或接口的赋值兼容时，instanceof 运算符才计算为真。<br>instanceof运算符被用来操作对象实例，检查该对象是否是一个特定类型。<br>基本类型不是面向对象的一部分，其变量不能用点运算符，也不能充当instarnceof的第一个操作数。<br>推荐阅读：[变量类型推断](https://blankspace.blog.csdn.net/article/details/129401446) |
| int | int用于定义一个32位有符号二进制补码整数变量。<br>int还用于声明方法返回基本类型int的值。<br>int对应的包装类为java.lang.Integer。<br>推荐阅读：[Java的基本类型](https://blankspace.blog.csdn.net/article/details/104545979)<br>推荐阅读：[基本数学运算](https://blankspace.blog.csdn.net/article/details/102970758)<br>推荐阅读：[Java数值计算的常见错误](https://blankspace.blog.csdn.net/article/details/104707882) |
| interface | interface用于声明接口，接口是一种特殊的类。<br>Java接口的成员包括静态常量、静态方法、静态内部接口、抽象方法、默认方法。<br>Java接口可以由接口继承(extends)，也可以由抽象类全部或部分实现(implements)，也可以由普通类全部实现(implements)。<br>推荐阅读：[抽象类与接口](https://blankspace.blog.csdn.net/article/details/129923834)<br>推荐阅读：[接口与API](https://blankspace.blog.csdn.net/article/details/105441651)<br>interface还可以与@构成@interface声明注解，但是@interface与interface完全不同。<br>class、interface、enum、record、@interface具有相等的地位，都能被编译为.class文件。<br>尽管Java是单继承体系，但由于接口的存在，也可以实现多继承的效果。<br>推荐阅读：[封装、继承、多态](https://blankspace.blog.csdn.net/article/details/114697596)<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239) |
| long | long用于定义一个64位有符号二进制补码整数变量。<br>long还用于声明方法返回基本类型long的值。<br>long类型变量不能用于switch语句，这点与byte、short、int等不同。<br>long对应的包装类为java.lang.Long。<br>推荐阅读：[Java的基本类型](https://blankspace.blog.csdn.net/article/details/104545979)<br>推荐阅读：[基本数学运算](https://blankspace.blog.csdn.net/article/details/102970758)<br>推荐阅读：[Java数值计算的常见错误](https://blankspace.blog.csdn.net/article/details/104707882) |
| native | native用于修饰方法。<br>native修饰的方法不是在同一个Java源文件中实现的，而是在另一种语言中实现的（一般是C/C++）。<br>推荐阅读：[JNI的开发方法](https://blankspace.blog.csdn.net/article/details/124557271) |
| new | new用于创建类或数组对象（引用类型对象）的实例。<br>创建对象的方法并不只有new一种，但new的确是最常见的创建对象方法。<br>new创建对象时为新对象明确了运行时类型，在代码中引入了依赖性。<br>推荐阅读：[对象的本质](https://blankspace.blog.csdn.net/article/details/114677761)<br>推荐阅读：[对象模型的七要素](https://blankspace.blog.csdn.net/article/details/114676740) |
| package | package声明了Java的包结构。包结构是可以嵌套的，形成类似于广义表的结构。<br>包表示了一组类（包括接口等），用于划分应用程序的逻辑模型。包外程序通过调用包内元素完成行为。<br>外部程序调用包内元素，需要保证工程目录可以查找到对应的包，且通过import语句引入包内所需元素。<br>推荐阅读：[子系统与包](https://blankspace.blog.csdn.net/article/details/114667087)<br>包是高度相关的类的聚合，这些类本身是内聚的，但相对于其他聚合来说又是松散耦合的。<br>推荐阅读：[内聚与耦合](https://blankspace.blog.csdn.net/article/details/114685284)<br>包名与包路径要对应起来，否则会编译错误。<br>推荐阅读：[命令行下的Java包结构编译与执行](https://blankspace.blog.csdn.net/article/details/104552096) |
| private | private用于修饰属性、构造方法、方法、内部类。<br>private表示类的成员访问权限是类所私有的，只能在当前类的内部被访问。<br>private最适合于修饰属性，因为比较符合“封装”的要求。<br>private、protected、public是冲突的，不能修饰同一成员。<br>推荐阅读：[可见性](https://blankspace.blog.csdn.net/article/details/114701507)<br>推荐阅读：[封装、继承、多态](https://blankspace.blog.csdn.net/article/details/114697596)<br>私有方法不能被重写，但可以被重载。<br>推荐阅读：[重写与重载](https://blankspace.blog.csdn.net/article/details/128881890)<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239) |
| protected | protected用于修饰属性、构造方法、方法、内部类。<br>protected表示类的成员访问权限包括类、包、子类，既可以被同一个包里的其他类访问，也可以被不同包中的子类访问。<br>private、protected、public是冲突的，不能修饰同一成员。<br>推荐阅读：[可见性](https://blankspace.blog.csdn.net/article/details/114701507)<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239) |
| public | public用于修饰属性、构造方法、方法、内部类。<br>public表示类的成员具有Java最高可见性，可以被任何包下的类的成员访问。<br>接口的所有属性、方法都是public权限，包括default方法和static方法。<br>private、protected、public是冲突的，不能修饰同一成员。<br>推荐阅读：[可见性](https://blankspace.blog.csdn.net/article/details/114701507)<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239) |
| return | return用于完成一个方法的执行，是一个方法的终结。<br>return语句将一个符合方法定义的返回值返回给方法的调用者，返回值为void时可省略或写作`return;`。<br>推荐阅读：[函数的返回值](https://blankspace.blog.csdn.net/article/details/123169198) |
| short | short用于定义一个16位有符号二进制补码整数变量。<br>short还用于声明方法返回基本类型short的值。<br>short对应的包装类为java.lang.Short。<br>推荐阅读：[Java的基本类型](https://blankspace.blog.csdn.net/article/details/104545979) |
| static | static用于修饰属性、方法、初始化块、内部类。<br>static修饰的成员都属于类而不属于对象，尽管也可以通过`对象.静态成员`来调用。<br>static属性随着类的初始化而初始化。无论一个类存在多少个实例，该类都维护一个类字段的副本。<br>static方法或初始化块绑定到类而不是特定实例，并且只能对static成员进行操作，不能访问非static成员。<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239) |
| strictfp | Java2新增，虽保留但已废弃。<br>strictfp用来声明表达式严格遵循IEEE-754算术规范，限制浮点计算的精度和舍入，有助于跨平台特性的实现。strictfp无法保证高精度，真正的高精度浮点运算应该查看java.math.BigDecimal。<br>推荐阅读：[Java关键词strictfp解读](https://blankspace.blog.csdn.net/article/details/104579577) |
| super | super指向父类对象，可以用于访问父类中定义的实例变量和方法。当子类和父类中有同名的实例变量或方法时，使用super关键字可以访问父类中的对应成员。<br>此外，在子类中可以使用super关键字调用父类中的构造方法，以实现子类构造方法中对父类的初始化。<br>推荐阅读：[封装、继承、多态](https://blankspace.blog.csdn.net/article/details/114697596)<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239)<br>super还可以用于在泛型中指定类型参数的下限。<br>推荐阅读：[泛型](https://blankspace.blog.csdn.net/article/details/128928431)
| switch | switch语句用于分支结构的switch...case...default...语句，目前只能与case和default搭配。<br>对于switch语句块，符合条件的case语句块会被执行；如果case语句都不匹配，则执行default语句块（如果有）。<br>Java的各个版本不断丰富着switch...case...default...语句的“语法糖”。<br>推荐阅读：[分支结构语句](https://blankspace.blog.csdn.net/article/details/90484056) |
| synchronized | synchronized可以修饰方法或代码块，不能修饰属性、类等。<br>当synchronized修饰方法时，构成同步方法。同步方法的锁对象是当前实例对象。<br>对于static方法，其锁对象是类的Class对象。<br>当synchronized修饰代码块时，同步代码块的锁对象是括号中的对象。<br> synchronized保证一次最多一个线程在同一个对象上执行该代码。线程执行同步代码的同时，会获取对象的互斥锁；当线程退出同步代码时，对象的互斥锁会自动释放。<br>synchronized效率不是很高，尽管Java的许多版本都对其进行了优化。<br>推荐阅读：[单例模式](https://blankspace.blog.csdn.net/article/details/105337542) |
| this | this用于方法或构造方法内部，用来表示它所在类的一个实例。<br>this可用于访问类成员并作为对当前实例的引用，可以实现构造器之间的调用，也可以区分局部变量和属性。<br>推荐阅读：[Java关键词this解读](https://blankspace.blog.csdn.net/article/details/101598711)<br>推荐阅读：[Java继承核心知识](https://blankspace.blog.csdn.net/article/details/130035239) |
| throw | throw用于抛出声明的异常实例。<br>当try语句块中出现throw语句时，catch块处理的异常类型会被检查是否兼容当前异常类型。如果throw的异常类型不能被处理，那么只能通过throws声明传递异常给更高层次。<br>推荐阅读：[程序错误与异常处理](https://blankspace.blog.csdn.net/article/details/123164216)<br>推荐阅读：[Java异常处理的注意事项](https://blankspace.blog.csdn.net/article/details/101311260) |
| throws | throws用于方法声明中，指定哪些异常不在方法内处理，而是传递给程序的下一个更高层次。<br>Java方法中所有不是java.lang.RuntimeException实例的未捕获异常都必须使用throws显式声明。<br>推荐阅读：[程序错误与异常处理](https://blankspace.blog.csdn.net/article/details/123164216)<br>推荐阅读：[Java异常处理的注意事项](https://blankspace.blog.csdn.net/article/details/101311260) |
| transient | transient用于修饰属性，不能修饰类和方法。<br>transient阻止其修饰的成员属性被序列化。当对象被反序列化时，transient属性值不会被持久化和恢复，而是变成默认值。<br>static属性由于不属于对象，因此不会被序列化，自然不需要transient修饰。<br>推荐阅读：[Java关键词transient解读](https://blankspace.blog.csdn.net/article/details/104581904) |
| try | try用于异常处理的try...catch...finally语句块，目前只能与catch和finally搭配。<br>try块中抛出异常，catch块中的语句指定try块抛出特定类型的异常时的处理方法。<br>如果try语句块和finally块中都存在return语句，try块返回的数据会被finally块返回的数据覆盖，因此实际返回的是finally块返回的结果。<br>推荐阅读：[程序错误与异常处理](https://blankspace.blog.csdn.net/article/details/123164216)<br>推荐阅读：[Java异常处理的注意事项](https://blankspace.blog.csdn.net/article/details/101311260) |
| void | void用于修饰方法，表示一个方法不返回任何值。<br>推荐阅读：[void](https://blankspace.blog.csdn.net/article/details/129418074)<br>推荐阅读：[main函数](https://blankspace.blog.csdn.net/article/details/128867589) |
| volatile | volatile用于修饰属性，以保证跨线程变量变化的可见性。<br>线程每次读取volatile变量都会从内存中读取，而不是从CPU缓存中读取，并且每次写入volatile变量都会写入内存，而不仅仅是写入CPU缓存。<br>方法、类和接口、局部变量、方法参数等都不能用volatile修饰。<br>推荐阅读：[单例模式](https://blankspace.blog.csdn.net/article/details/105337542) |
| while | while用于构建while前置检验循环，与for循环等效。<br>while循环测试布尔表达式，如果表达式的计算结果为真，则执行与循环相关的语句块，直到表达式的计算结果为false。<br>while也可以与do搭配，构建一个do...while后置检验循环，先执行与循环相关的语句块，然后测试与while相关的布尔表达式。<br>while循环的循环体至少执行零次，do...while循环的循环体至少执行一次，二者有所区别。<br>推荐阅读：[循环控制语句](https://blankspace.blog.csdn.net/article/details/129441007) |

# Java保留词

| 关键词 | 说明 |
|:----:|:----|
| true | 布尔字面值。 |
| false | 布尔字面值。 |
| null | 一个引用文字值。 |
| exports | 
| module | 
| non-sealed | 用于声明扩展密封类的类或接口可以被未知类扩展。 |
| open | 
| opens | 
| permits | permits 子句指定允许扩展密封类的类。 |
| provides | 
| record | 
| requires | 
| sealed | 密封的类或接口只能由允许这样做的类和接口扩展或实现。 |
| to | 
| transitive | 
| uses | 
| var | Java10新增。一个特殊的标识符，不能用作类型名称。 |
| with | 
| yield | 当使用带标签的语句组时，用于为switch表达式设置一个值。 |
