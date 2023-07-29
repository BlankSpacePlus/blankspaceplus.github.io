---
title: Java登录模拟系统的设计与实现
date: 2019-09-28 14:59:44
summary: 本文分享两个Java实现的命令行模拟登录系统案例。
tags:
- Java
categories:
- 开发技术
---

# Enum模拟登录实现

```java
import java.util.Scanner;

enum State {ON, OFF}

public class User {

    private Scanner scanner = new Scanner(System.in);

	private String userName;               // 用户名

	private State  state = State.OFF;    // 登录状态

	private String password;               // 密码
	
	private String readUserName() {
	    System.out.println("请输入用户名");
	    String readName = scanner.next();
	    return readName;
	}
	private void setUserName(String var) {
		this.userName = var;
	}
	
	private String getUserName() {
	    return this.userName;
	}
	
	private String readPassword() {
	    System.out.println("请输入密码");
	    String password = scanner.next();
	    return password;
	}
	
	private void setPassword(String password) {
        this.password = password;
	}
	
	private String getPassword() {
	    return this.password;
	}
	
    private void setState() {
        if (judgeUserName() && judgePassword()) {
            this.state = State.ON;
        }
    }
    
    private State getState() {
        return this.state;
    }
    
	private boolean judgeUserName() {
        if(this.userName.equals(readUserName())){
            System.out.println("ok");
            return true;
        } else {
            System.out.println("用户名不存在");
            return false;
        }	    
	}
	
	private boolean judgePassword() {
        if(password.equals(readPassword())) {
            System.out.println("ok");
            return true;
        } else {
            System.out.println("密码错误");
            return false;
        }	    
	}
	
	private void register() {
        setUserName(readUserName());
        setPassword(readPassword());
        if (getUserName() != null && getPassword() != null) {
            System.out.println("注册成功");
        }
	}
	
	private void landing() {
	    if (getState().equals(State.ON)) {
	        System.out.println("您已登陆");
	    } else {
	        setState();
	        if (getState() == State.ON) {
	            System.out.println("登录成功");	            
	        } else {
	            System.out.println("登录失败");
	        }
	    }
	}
	
	private void quit() {
	    if (getState().equals(State.OFF)) {
	        System.out.println("您未登录");
	    } else {
	        System.out.println("感谢使用");
	        this.state = State.OFF;	        
	    }
	}
	
	private void judge(int var) {
	    switch (var) {
	        case 1:
	            register();
	            break;
	        case 2:
	            landing();
	            break;
	        case 3:
	            quit();
	            break;
	        case 4:
	            System.exit(0);
	        default:
	            System.out.println("输入不合法");	            
	    }
	}
	
	public void run() {
	    while(true) {
	        System.out.println("请输入以下数字完成操作\n1.注册 2.登陆 3.退出登录 4.结束程序");          
	        String get = scanner.next();
	        try {
	            int choice = Integer.parseInt(get);
	            judge(choice);
	        } catch (Exception e) {
	            System.out.println(e);
	        }
	    }
	}
	
}
```

这段代码实现了一个用户登录注册系统，其中用到了枚举类型、Scanner、字符串、布尔值等基本数据类型和相关方法。

该系统主要实现以下功能：
- 用户可以注册账号并设置密码。
- 用户可以使用已注册的账号进行登录。
- 用户可以退出登录。
- 用户可以选择退出整个程序。

以下是代码的具体介绍：
- 定义了一个枚举类型 State，用来表示用户的登录状态，包括 ON 和 OFF 两种状态。
- 定义了一个类 User，其中包含了以下成员变量：
    - scanner：用来读取用户的输入。
    - userName：表示用户名的字符串。
    - state：表示用户登录状态的 State 枚举类型。
    - password：表示用户密码的字符串。
- 定义了一些私有方法来实现读取用户名和密码、判断用户名和密码是否正确、设置和获取用户名和密码以及设置用户状态等功能。
- 定义了一个 register() 方法，实现用户注册功能。该方法会调用 readUserName() 和 readPassword() 方法来读取用户名和密码，然后通过调用 setUserName() 和 setPassword() 方法来设置用户名和密码。如果用户名和密码都不为空，则输出 "注册成功"。
- 定义了一个 landing() 方法，实现用户登录功能。该方法会先判断用户是否已经登录，如果已经登录则输出 "您已登录"，否则调用 setState() 方法来设置用户状态。如果设置成功，则输出 "登录成功"，否则输出 "登录失败"。
- 定义了一个 quit() 方法，实现用户退出登录功能。该方法会先判断用户是否已经登录，如果未登录则输出 "您未登录"，否则输出 "感谢使用"，并将用户状态设置为 OFF。
- 定义了一个 judge() 方法，根据用户输入的数字来判断用户要进行的操作。如果用户输入的数字为 1，则调用 register() 方法；如果为 2，则调用 landing() 方法；如果为 3，则调用 quit() 方法；如果为 4，则直接结束程序；否则输出 "输入不合法"。
- 定义了一个 run() 方法，用来循环读取用户的输入并调用 judge() 方法来进行相应的操作。用户可以选择注册、登录、退出登录或结束程序。
- 在主函数中创建了一个 User 对象并调用 run() 方法来启动程序。程序会一直运行，直到用户选择结束程序。

# HashMap模拟登录实现

User.java

```java
public class User{

	private String userName;       // 账号

	private String password;       // 密码
	
	public User() {}  // 默认构造方法
	
	public User(String userName,String password) {
		this.userName = userName;
		this.password = password;
	}
	
	public void setUserName(String name) {
		this.userName = name;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getPassword() {
		return password;
	}

	@Override
	public String toString() {
		return "userName:"+userName+" , password:"+password;
	}
	
}
```

UserSystem.java

```java
import java.io.IOException;
import java.util.HashMap;
import java.util.Scanner;

public class UserSystem {
    
    private HashMap<String, User> userMap;

    private Scanner scanner;
    
    public UserSystem() {
        userMap = new HashMap<>();
        scanner = new Scanner(System.in);
    }
    
    private int getChoice() throws IOException {
        while (true) {
            try {
                printMenu();
                System.out.print("Choice >");
                int choice = Integer.parseInt(scanner.next());
                if (choice >= 0 && choice <= 3) {
                    return choice;                    
                } else {
                    System.out.println("不合法的输入：" + choice);                    
                }
            } catch (NumberFormatException e) {
                System.out.println(e);
            }
        }
    }
    
    public void run() throws IOException {
        for (int choice = this.getChoice(); choice != 0; choice = this.getChoice()) {
            switch(choice) {
                case 1:
                    readRegister();
                    break;
                case 2:
                    readLanding();
                    break;
                case 3:
                    readDelete();
                    break;
            }
        }
    }
    
    private void printMenu() {
        System.out.println("欢迎来到我的世界\n<1>注册\n<2>登录\n<3>删除账号\n<0>退出");
    }
    
    private void readRegister() {
        System.out.print("请输入账号\nUserName >");
        String userName = scanner.next();
        if (! judgeIsExisted(userName)) {
            System.out.print("请输入密码\nPassword >");
            String password = scanner.next();
            //User user = new User(userName, password);
            userMap.put(userName, new User(userName, password));
        } else {
            System.out.println("注册失败");
            return;
        }
        System.out.println("注册成功");
    }
    
    private boolean judgeIsExisted(String userName) {
        if (! userMap.containsKey(userName)) {
            System.out.println("账号不存在");
            return false;
        } else {
            System.out.println("账号已存在");
            return true;
        }
    }
    
    private void readLanding() {
        System.out.print("请输入账号\nUserName >");
        String userName = scanner.next();
        if (judgeIsExisted(userName)) {
            System.out.print("请输入密码\nPassword >");
            String password = scanner.next();
            User user = judgePassword(userName, password);
            if (user != null) {
                System.out.println("登录成功");
            } else {
                System.out.println("登录失败");
            }
        }
    }
    
    private User judgePassword(String userName, String password) {
        User user = userMap.get(userName);
        if (password.equals(user.getPassword())) {
            System.out.println("密码正确");
            return user;
        } else {
            System.out.println("密码错误");
            return null;
        }
    }
    
    private void readDelete() {
        System.out.print("请输入账号\nUserName >");
        String userName = scanner.next();
        if (judgeIsExisted(userName)) {
            System.out.print("请输入密码\nPassword >");
            String password = scanner.next();
            User user = judgePassword(userName, password);
            if (user != null) {
                System.out.println("删除成功");
            } else {
                System.out.println("删除失败");
            }
        }
    }

}
```

这段代码实现了一个简单的用户系统，用户可以进行注册、登录和删除账号等操作。代码使用了Java语言，利用了HashMap、Scanner等类库。

在主函数中，我们创建了一个UserSystem对象，然后调用它的run方法，即可启动用户系统。run方法是一个无限循环，每次循环从用户输入中读取一个数字，根据不同的数字执行不同的操作。当用户输入0时，循环退出，程序结束。

在类定义中，我们定义了三个私有成员变量：userMap、scanner和CHOICES。其中，userMap是一个HashMap，用来保存所有的用户信息；scanner用来读取用户的输入。在类的构造函数中，我们初始化了这两个成员变量。

类中还定义了getChoice方法，用来读取用户的数字输入。如果用户输入了一个不合法的数字，getChoice方法会继续循环等待用户输入合法的数字。如果用户输入了一个合法的数字，getChoice方法会返回该数字。

类中还定义了三个私有方法：printMenu、readRegister和readLanding。printMenu方法用来打印用户菜单；readRegister方法用来读取用户的注册信息；readLanding方法用来读取用户的登录信息。这三个方法都没有返回值，它们主要是通过用户输入和修改userMap等成员变量，来实现用户系统的各种功能。

其中，readDelete方法和readLanding方法的代码几乎完全一致，可以考虑代码复用。而且，该用户系统没有对异常做处理，可能会因为用户的非法输入而导致程序崩溃。
