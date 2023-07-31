---
title: 面向对象程序设计Java语言Castle代码修改整理
date: 2020-09-26 19:54:03
summary: 本文分享面向对象程序设计Java语言课程的Castle代码修改整理。
tags:
- 面向对象
- 软件工程
categories:
- 软件工程
---

# 课程信息

最近闲来无事刷刷MOOC，找到以前看的浙大翁凯老师的《面向对象程序设计——Java语言》课程，重新过一遍仍觉受益颇深。
其中有一个Castle的例子，原始代码很烂，翁凯老师在后面几章不断地带领观看者修改这个代码，那我也大概整理一下这部分的内容吧。

[面向对象程序设计——Java语言](https://www.icourse163.org/course/ZJU-1001542001)

# 原版代码

即使类的设计很糟糕，也还是有可能实现一个应用程序，使之运行并完成所需的工作。一个已完成的应用程序能够运行，但并不能表明程序内部的结构是否良好。当维护程序员想要对一个已有的软件做修改的时候，问题才会浮现出来。比如，程序员试图纠正已有软件的缺陷，或者为其增加一些新的功能。显然，如果类的设计良好，这个任务就可能很轻松；而如果类的设计很差，那就会变得很困难，要牵扯大量的工作。在大的应用软件中，这样的情形在最初的实现中就会发生了。如果以不好的结构来实现软件，那么后面的工作可能变得很复杂，整个程序可能根本无法完成，或者充满缺陷，或者花费比实际需要多得多的时间才能完成。在现实中，一个公司通常要维护、扩展和销售一个软件很多年，很可能今天在商店买到的软件，其最初的版本是在十多年前就开始了的。在这种情形下，任何软件公司都不能忍受不良结构的代码。既然很多不良设计的效果会在试图调整或扩展软件时明显地展现出来，那么就应该以调整或扩展软件来鉴别和发现这样的不良设计。

这里将使用一个叫作城堡游戏的例子，这个例子很简单，基本实现了一个基于字符的探险游戏。起初这个游戏并不十分强大，因为还没全部完成，你可以运用你的想像力来设计和实现这个的游戏，让它更有趣更好玩……

那么，首先，从下边这个糟糕的代码开始吧！

## Room类

```java
package castle;

public class Room {
    public String description;
    public Room northExit;
    public Room southExit;
    public Room eastExit;
    public Room westExit;

    public Room(String description) 
    {
        this.description = description;
    }

    public void setExits(Room north, Room east, Room south, Room west) 
    {
        if(north != null)
            northExit = north;
        if(east != null)
            eastExit = east;
        if(south != null)
            southExit = south;
        if(west != null)
            westExit = west;
    }

    @Override
    public String toString()
    {
        return description;
    }
}
```

## Game类

```java
import java.util.Scanner;

public class Game {
    private Room currentRoom;
        
    public Game() 
    {
        createRooms();
    }

    private void createRooms()
    {
        Room outside, lobby, pub, study, bedroom;
      
        //	制造房间
        outside = new Room("城堡外");
        lobby = new Room("大堂");
        pub = new Room("小酒吧");
        study = new Room("书房");
        bedroom = new Room("卧室");
        
        //	初始化房间的出口
        outside.setExits(null, lobby, study, pub);
        lobby.setExits(null, null, null, outside);
        pub.setExits(null, outside, null, null);
        study.setExits(outside, bedroom, null, null);
        bedroom.setExits(null, null, null, study);

        currentRoom = outside;  //	从城堡门外开始
    }

    private void printWelcome() {
        System.out.println();
        System.out.println("欢迎来到城堡！");
        System.out.println("这是一个超级无聊的游戏。");
        System.out.println("如果需要帮助，请输入 'help' 。");
        System.out.println();
        System.out.println("现在你在" + currentRoom);
        System.out.print("出口有：");
        if(currentRoom.northExit != null)
            System.out.print("north ");
        if(currentRoom.eastExit != null)
            System.out.print("east ");
        if(currentRoom.southExit != null)
            System.out.print("south ");
        if(currentRoom.westExit != null)
            System.out.print("west ");
        System.out.println();
    }

    // 以下为用户命令

    private void printHelp() 
    {
        System.out.print("迷路了吗？你可以做的命令有：go bye help");
        System.out.println("如：\tgo east");
    }

    private void goRoom(String direction) 
    {
        Room nextRoom = null;
        if(direction.equals("north")) {
            nextRoom = currentRoom.northExit;
        }
        if(direction.equals("east")) {
            nextRoom = currentRoom.eastExit;
        }
        if(direction.equals("south")) {
            nextRoom = currentRoom.southExit;
        }
        if(direction.equals("west")) {
            nextRoom = currentRoom.westExit;
        }

        if (nextRoom == null) {
            System.out.println("那里没有门！");
        }
        else {
            currentRoom = nextRoom;
            System.out.println("你在" + currentRoom);
            System.out.print("出口有: ");
            if(currentRoom.northExit != null)
                System.out.print("north ");
            if(currentRoom.eastExit != null)
                System.out.print("east ");
            if(currentRoom.southExit != null)
                System.out.print("south ");
            if(currentRoom.westExit != null)
                System.out.print("west ");
            System.out.println();
        }
    }
	
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		Game game = new Game();
		game.printWelcome();

        while ( true ) {
        		String line = in.nextLine();
        		String[] words = line.split(" ");
        		if ( words[0].equals("help") ) {
        			game.printHelp();
        		} else if (words[0].equals("go") ) {
        			game.goRoom(words[1]);
        		} else if ( words[0].equals("bye") ) {
        			break;
        		}
        }
        
        System.out.println("感谢您的光临。再见！");
        in.close();
	}

}
```

# 熟悉代码

1. 这个应用程序的任务是什么？ 通过接受用户的输入，改变当前所在的位置。
2. 这个应用程序接受什么样的命令？ help、go、bye。
3. 每个命令做什么？ help：显示使用说明；go：切换当前的房子；bye：退出应用程序。
4. 在场景中有多少间房?  大堂、酒吧、书房、卧室 共四间房子。
5. 画出现有的房间的地图： 
    ```java
    小酒吧----城堡外------大堂
                |
               书房-----------卧室
      ```
![](../../../images/软件工程/面向对象/面向对象程序设计Java语言Castle代码修改整理/1.png)

# 消除代码重复

程序中存在相似甚至相同的代码块，是非常低级的代码质量问题。

代码复制存在的问题是，如果需要修改一个副本，那么就必须同时修改所有其他的副本，否则就存在不一致的问题。这增加了维护程序员的工作量，而且存在造成错误的潜在危险。很可能发生的一种情况是，维护程序员看到一个副本被修改好了，就以为所有要修改的地方都已经改好了。因为没有任何明显迹象可以表明另外还有一份一样的副本代码存在，所以很可能会遗漏还没被修改的地方。

我们从消除代码复制开始。消除代码复制的两个基本手段，就是函数和父类。

代码复制是不良设计的一种表现，而上面的代码中并不少见，比如：

```java
System.out.println("现在你在" + currentRoom);
System.out.print("出口有：");
if(currentRoom.northExit != null)
    System.out.print("north ");
if(currentRoom.eastExit != null)
    System.out.print("east ");
if(currentRoom.southExit != null)
    System.out.print("south ");
if(currentRoom.westExit != null)
    System.out.print("west ");
System.out.println();
```

处理方式就是单独封装成一个函数：

```java
public void showPrompt() {
    System.out.println("现在你在" + currentRoom);
    System.out.print("出口有：");
    if(currentRoom.northExit != null)
        System.out.print("north ");
    if(currentRoom.eastExit != null)
        System.out.print("east ");
    if(currentRoom.southExit != null)
        System.out.print("south ");
    if(currentRoom.westExit != null)
        System.out.print("west ");
    System.out.println();
}
```

# 注意可扩展性

可扩展性也是必须注意的事情，简单的讲就是“**面对未来未知的变化，能够以不变应万变，以最小的代价和最小的影响来拥抱变化**”（非官方的说法，个人觉得更容易理解）。
可运行的代码≠良好的代码，虽代码做维护的时候更能看出代码的质量（无论是自己维护还是交给他人维护）。

比如说上面的代码，我们在Room类中用的是north、south、east、west，如果要加入up、down，则不仅要改Room，还要改Game，而且是大改，这样影响程序的可扩展性、可维护性。

# 做好封装

要评判某些设计比其他的设计优秀，就得定义一些在类的设计中重要的术语，以用来讨论 设计的优劣。对于类的设计来说，有两个核心术语：**耦合**和**聚合**。**耦合这个词指的是类和类之间的联系**。之前的章节中提到过，程序设计的目标是一系列通过定义明确的接口通信来协同工作的类。耦合度反映了这些类联系的紧密度。我们努力要获得低的耦合度，或者叫作**松耦合**（loose coupling）。

**耦合度决定修改应用程序的容易程度**。在一个紧耦合的结构中，对一个类的修改也会导致对其他一些类的修改。这是要努力避免的，否则，一点小小的改变就可能使整个应用程序发生改变。另外，要想找到所有需要修改的地方，并一一加以修改，却是一件既困难又费时的事情。另一方面，在一个松耦合的系统中，常常可以修改一个类，但同时不会修改其他类，而且整个程序还可以正常运作。

**聚合与程序中一个单独的单元所承担的任务的数量和种类相对应有关，它是针对类或方法这样大小的程序单元而言的**。理想情况下，一个代码单元应该负责一个聚合的任务（也就是说，一个任务可以被看作是一个逻辑单元）。一个方法应该实现一个逻辑操作，而一个类应该代表一定类型的实体。聚合理论背后的要点是重用：如果一个方法或类是只负责一件定义明确的事情，那么就很有可能在另外不同的上下文环境中使用。遵循这个理论的一个额外的好处是，当程序某部分的代码需要改变时，在某个代码单元中很可能会找到所有需要改变的相关代码段。

当然，以上面的代码为例，其余细节暂且不论，把属性设置成public，直接访问，这完全不符合封装的原则。
再细说一下这里的封装问题：Room和Game都有大量代码和出口相关，尤其是Room的四大属性，这样的设计大大加强了耦合度，不利于维护。

那是不是用“初学OOP经典大法”——[private]属性+[public]getter方法？
比如说`public Room northExit;`改成：

```java
public Room getNorth() {
    return this.northExit;
}
```

其实真不是，这真的是很多人的一个误区。
诚然，写setter/getter比起public的属性已经好了很多，但你细品，持有引用的类还是需要知道被引用的类的细节，二者还是紧紧耦合在一起的。
那我们需要什么呢？
我们需要这样一个函数：

```java
public String getExitDesc() {
    StringBuilder sb = new StringBuilder();
    if (this.northExit != null) {
        sb.append("north ");
    }
    if (this.southExit != null) {
        sb.append("south ");
    }
    if (this.eastExit != null) {
        sb.append("east ");
    }
    if (this.westExit != null) {
        sb.append("west ");
    }
    return sb.toString();
}
```
在此基础上，我们也知道之前为了避免代码重复而写了这样一个方法：
```java
public void showPrompt() {
    System.out.println("现在你在" + currentRoom);
    System.out.print("出口有：");
    if(currentRoom.northExit != null)
        System.out.print("north ");
    if(currentRoom.eastExit != null)
        System.out.print("east ");
    if(currentRoom.southExit != null)
        System.out.print("south ");
    if(currentRoom.westExit != null)
        System.out.print("west ");
    System.out.println();
}
```
我们为了降低耦合度，需要将其改为：
```java
public void showPrompt() {
    System.out.println("现在你在" + currentRoom);
    System.out.print("出口有：");
    System.out.println(currentRoom.getExitDesc());
    System.out.println();
}
```
接着看，之前由于去重代码，goRoom()已经是这个样子了：

```java
private void goRoom(String direction) {
    Room nextRoom = null;
    if(direction.equals("north")) {
        nextRoom = currentRoom.northExit;
    }
    if(direction.equals("east")) {
        nextRoom = currentRoom.eastExit;
    }
    if(direction.equals("south")) {
        nextRoom = currentRoom.southExit;
    }
    if(direction.equals("west")) {
        nextRoom = currentRoom.westExit;
    }
    if (nextRoom == null) {
        System.out.println("那里没有门！");
    } else {
        currentRoom = nextRoom;
        showPrompt();
    }
}
```
但其实这里还是重度耦合，我们要将这个事交还给Room来做：

```java
public Room getExit(String direction) {
    Room nextRoom = null;
    if(direction.equals("north")) {
        nextRoom = this.northExit;
    }
    if(direction.equals("east")) {
        nextRoom = this.eastExit;
    }
    if(direction.equals("south")) {
        nextRoom = this.southExit;
    }
    if(direction.equals("west")) {
        nextRoom = this.westExit;
    }
    return nextRoom;
}
```
而goRoom()则变成了：
```java
private void goRoom(String direction) {
    Room nextRoom = currentRoom.getExit(direction);
    if (nextRoom == null) {
        System.out.println("那里没有门！");
    } else {
        currentRoom = nextRoom;
        showPrompt();
    }
}
```
至此，Room和Game之间的耦合度大大降低了，至少没了直接的属性调用，Game不必完全知道Room的细节了。

# 使用接口增强可扩展性

上面的修改完成之后还有哪些不足呢？
上面的代码修改针对Room类实现的新方法，虽说把方向的细节正是隐藏在Room内部了，今后方向如何实现也与外部无关了，但还是一种“硬编码”的方式。
Game与Room松耦合，但Room本身还是“硬编码”，一旦方向变化，则需要大量的重写代码，可扩展性还是不好。
那怎么处理呢？
答案是：使用集合容器，比如HashMap。

修改方法就是删去所有的属性，转而换成一个Map属性：

```java
private Map<String , Room> exits = new HashMap<>();
```
这么改可还行，问题是之前的全被推翻了，那就重写呗！
比如说这个方法：
```java
public void setExits(Room north, Room east, Room south, Room west) {
    if(north != null)
        northExit = north;
    if(east != null)
        eastExit = east;
    if(south != null)
        southExit = south;
    if(west != null)
        westExit = west;
}
```
肯定是不能要了，那就重写一个getExit()：

```java
public void setExit(String dir, Room room) {
    exits.put(dir, room);
}
```
同样地，之前有一个修改后加进去的方法：
```java
public String getExitDesc() {
    StringBuilder sb = new StringBuilder();
    if (this.northExit != null) {
        sb.append("north ");
    }
    if (this.southExit != null) {
        sb.append("south ");
    }
    if (this.eastExit != null) {
        sb.append("east ");
    }
    if (this.westExit != null) {
        sb.append("west ");
    }
    return sb.toString();
}
```
也是涉及方向细节，要改：
```java
public String getExitDesc() {
    StringBuilder sb = new StringBuilder();
    for (Entry entry : exists.entrySet()) {
        sb.append(entry.getKey()).append(' ');
    }
    return sb.toString();
}
```
上一次重写的getExit()也要改：

```java
public Room getExit(String direction) {
    return exits.get(direction);
}
```
需要说明的是，永远不要认为这样一行代码的方法没有存在的意义，因为这最关键的是表示一个接口，提供这种服务，如果以后不这么写了呢？对吧，大家都是聪明人，不必多言。

Game类也受到点“波及”：

```java
private void createRooms() {
    Room outside, lobby, pub, study, bedroom;
    //	制造房间
    outside = new Room("城堡外");
    lobby = new Room("大堂");
    pub = new Room("小酒吧");
    study = new Room("书房");
    bedroom = new Room("卧室");
    //	初始化房间的出口
    outside.setExits(null, lobby, study, pub);
    lobby.setExits(null, null, null, outside);
    pub.setExits(null, outside, null, null);
    study.setExits(outside, bedroom, null, null);
    bedroom.setExits(null, null, null, study);
    currentRoom = outside;  //	从城堡门外开始
}
```
这里要改，但很简单，反正不过是初始化而已，调用getExit()改一改就行了。
而此时我们发现其他部分不需要改，这就是松耦合的好处啊！

# 框架+数据

从程序中识别出框架和数据，以代码实现框架，将部分功能以数据的方式加载，这样能在很大程度上实现可扩展性。

这个框架不是我们说的“Spring”、"MyBatis"那种。我们不想“if-else-”泛滥，就可以使用Handler，再使用Map来保存命令和Handler之间的关系，进而破除“if-else-”硬编码。

我们使用Map是一个很秀的想法，但是函数不是对象，而Map的value必须是对象，所以我们才用的Handler。

Handler被定义为一个类，这样会很好：

```java
public class Handler {
    public void doCmd(String message){
        //TODO something
    }
}
```

而Game需要一个Map：

```java
private Map<String, Handler> handlers = new HashMap<>();
```
那么在初始化Game的时候，在构造器中直接使用put()初始化必要的命令：

```java
public Game() {
    handlers.put("go", new HandlerGo());
    handlers.put("help", new HandlerHelp());
    handlers.put("bye", new HandlerBye());
    createRooms();
}
```
还需要一个play()方法，把main()的死循环扔进去：

```java
public void play() {
    while (true) {
        String line = in.nextLine();
        String[] words = line.split(" ");
        if (words[0].equals("help")) {
            game.printHelp();
        } else if (words[0].equals("go")) {
            game.goRoom(words[1]);
        } else if (words[0].equals("bye")) {
            break;
        }
    }
}
```
这个方法需要改一改：
```java
public void play() {
    while (true) {
        String line = in.nextLine();
        String[] words = line.split(" ");
        Handler handler = handlers.get(words[0]);
        if (handler != null) {
            handler.doCmd(words[1]);
        }
    }
}
```
这个没改好，因为没考虑退出的问题，但你要是考虑退出的问题，就需要if特判，就又绕回去了，所以需要再考虑：

```java
if (handler != null) {
    handler.doCmd(words[1]);
    if (handler.isBye()) {
        break;
    }
}
```
对应的，Handler也要完善一下：

```java
public class Handler {
    protected Game game;
    public Handler(Game game) {
        this.game = game;
    }
    public void doCmd(String message){}
    public boolean isBye() {
        return false;
    }
}
```

之前我们也发现了HandlerGo、HandlerHelp、HandlerBye还没出现，自然是都要extends类Handler，把板子做出来：

```java
public class HandlerGo extends Handler {
    public HandlerGo(Game game) {
        super(game);
    }
    @Override
    public void doCmd(String message) {
        game.goRoom(message);
    }
}
```

```java
public class HandlerHelp extends Handler {
    public HandlerHelp(Game game) {
        super(game);
    }
    @Override
    public void doCmd(String message) {
        System.out.print("迷路了吗？你可以做的命令有：go bye help");
        System.out.println("如：\tgo east");
    }
}
```

```java
public class HandlerBye extends Handler {
    public HandlerBye(Game game) {
        super(game);
    }
    @Override
    public boolean isBye() {
        return true;
    }
}
```
而goRoom()要改成public：
```java
public void goRoom(String direction) {
    Room nextRoom = currentRoom.getExit(direction);
    if (nextRoom == null) {
        System.out.println("那里没有门！");
    } else {
        currentRoom = nextRoom;
        showPrompt();
    }
}
```
再就是，构造Game对象的时候要传this：
```java
public Game() {
    handlers.put("go", new HandlerGo(this));
    handlers.put("help", new HandlerHelp(this));
    handlers.put("bye", new HandlerBye(this));
    createRooms();
}
```
这样就完成了基本的修改，只需微调即可完成系统修改。

这里直接使用了普通类来表示Handler，其实也可以考虑接口与抽象类，这里点到为止。

# 匿名内部类让代码更优雅

在评论区看到下面的代码（仅限于Game类的构造器），写的很不错，还做了扩展：

```java
public Game() {
    // 匿名类
    handlers.put("go", new Handler() {
        @Override
        public void doCmd(String word) {
            goRoom(word);
        }
    });
    handlers.put("bye", new Handler() {
        @Override
        public boolean isBye() {
            return true;
        }
    });
    handlers.put("help", new Handler() {
        @Override
        public void doCmd(String word) {
            System.out.print("迷路了吗？你可以做的命令有：");
            System.out.print(getHandlers());
            System.out.println(".");
            System.out.println("如： go east");
        }
    });
    handlers.put("gorandom", new Handler() {
        @Override
        public void doCmd(String word) {
            goRandom();
        }
    });
    rooms = createRooms();
}
```
是不是更秀了呢？哈哈，根本不再需要每一个具体的Handler类，也不需要this传参，Nice！

# 总结

本文总结了一下如何修改给出的Castle代码，使之基本做到高内聚、低耦合和具备可扩展性，也说明了很多编程的注意事项。
原版代码和课程讲评来自浙江大学翁凯老师，感兴趣的读者可以去查看相关的资源！
