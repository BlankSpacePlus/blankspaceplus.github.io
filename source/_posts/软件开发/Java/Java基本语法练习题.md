---
title: Java基本语法练习题
date: 2019-11-30 12:34:15
summary: 本文整合自早期的五篇博客，为初学者提供了一些Java面向对象、Java字符串、Java集合、IO流、Java线程的知识点和练习题。
tags:
- Java
categories:
- Java
---

# 本文说明

1. 本文整合自早期的五篇博客，代码也是初学Java不久时编写的，难免不够优雅简洁。
2. 本文的受众应该是初学Java的读者，比较熟悉的读者可以自行跳过。

# 面向对象练习题

## Q1：equals的使用

编写一个商品类,包含品名和价格。
创建商品对象,判断两个同名商品对象是否相同;判断两个同名同价格商品对象是否相同。
```java
/**
 * 编写一个商品类,包含品名和价格
 * 创建商品对象,判断两个同名商品对象是否相同;判断两个同名同价格商品对象是否相同
 */
public class Goods {
    private String name;
    private double price;
    
    public Goods(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    public String getName() {
        return this.name;
    }
    
    public double getPrice() {
        return this.price;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj != null && obj instanceof Goods) {
            if (((Goods)obj).getName().equals(this.name)) {
                return true;
            }
        }
        return false;
    }

}
```

```java
public class equalsTest1 {
    public static void main(String[] args) {
        Goods g1 = new Goods("卫龙", 0.50);
        Goods g2 = new Goods("冰露", 1.00);
        Goods g3 = new Goods("农夫山泉", 2.00);
        Goods g4 = new Goods("卫龙", 1.00);
        
        //都不相同
        System.out.println("g1和g3是否一样?" + g1.equals(g3));
        //价格不同、名称相同
        System.out.println("g1和g4是否一样?" + g1.equals(g4));
        //名称不同、价格相同
        System.out.println("g2和g4是否一样?" + g2.equals(g4));
        //自反性
        System.out.println("g1和g1是否一样?" + g1.equals(g1));
        //对称性
        System.out.println("g3和g1是否一样?" + g3.equals(g1));
    }
}
```

## Q2：利用Calendar类获取一些时间数据

```java
import java.util.Calendar;

/**
 * 利用Calendar类获取一些时间数据
 */
public class CalendarTest2 {
    public static void main(String[] args) {
        Calendar cal = Calendar.getInstance();
        System.out.println(cal);
        System.out.println(cal.get(Calendar.YEAR) + "年" + (cal.get(Calendar.MONTH)+1) + "月"
                + cal.get(Calendar.DAY_OF_MONTH) + "日" + cal.get(Calendar.WEEK_OF_YEAR) + "周");
    }
}
```

## Q3：时区转换

巴黎时间比北京时间晚7个小时，纽约时间比北京时间晚12个小时 ，试编写一程序，根据输入的北京时间输出相应的巴黎和纽约时间。
```java
import java.util.Calendar;
import java.util.Scanner;
import java.text.SimpleDateFormat;

/**
 * 巴黎时间比北京时间晚7个小时，纽约时间比北京时间晚12个小时 ，试编写一程序，根据输入的北京时间输出相应的巴黎和纽约时间
 */
public class CalendarTest1 {
    public static void main(String[] args) throws Exception {
        Scanner scan = new Scanner(System.in);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        System.out.print("请输入所需转化的北京时间...\n年>");
        var string1 = scan.next();
        System.out.print("月>");
        var string2 = scan.next();
        System.out.print("日>");
        var string3 = scan.next();
        System.out.print("时>");
        var string4 = scan.next();
        System.out.print("分>");
        var string5 = scan.next();
        System.out.print("秒>");
        var string6 = scan.next();
        try {
            var year = Integer.parseInt(string1);
            var month = Integer.parseInt(string2);
            var day = Integer.parseInt(string3);
            var hourOfDay = Integer.parseInt(string4);
            var minute = Integer.parseInt(string5);
            var second = Integer.parseInt(string6);
            calendar.setTime(sdf.parse(year + "-" + month + "-" + day + " " + hourOfDay + ":"  + minute + ":" + second));
            calendar.add(Calendar.HOUR_OF_DAY, -7);
            System.out.println("巴黎时间是:" + sdf.format(calendar.getTime()));
            calendar.add(Calendar.HOUR_OF_DAY, -5);
            System.out.println("纽约时间是:" + sdf.format(calendar.getTime()));
        } catch (NumberFormatException e) {
            System.out.println("输入的不是数值!\n" + e);
        }
        scan.close();
    }

}
```

## Q4：获取1-50的随机整数

```java
import java.util.Random;

/**
 * 获取1-50的随机整数
 */
public class RandomTest {
    public static void main(String[] args) {
        for (int i = 0; i < 7; i++) {
            //下面等价
            System.out.println((int)Math.floor(Math.random() * 50) + 1);
            System.out.println((int)Math.ceil(Math.random() * 50));
            System.out.println(new Random().nextInt(50) + 1);
        }
    }

}
```

## Q5：获取百度和本机的Address

```java
import java.net.InetAddress;
import java.net.UnknownHostException;

public class TestInetAddress {

	public static void main(String[] args) {
		
		try {
			InetAddress inetAddress = InetAddress.getByName("www.baidu.com");
			
			System.out.println(inetAddress.getHostAddress());
			System.out.println(inetAddress.getHostName());
			
			InetAddress localAddress = InetAddress.getLocalHost();
			
			System.out.println(localAddress.getHostAddress());
			System.out.println(localAddress.getHostName());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}

	}

}
```

# 字符串练习题

## Q1：将输入的任意0-999的整数全部补全为三位数输出(不足三位补0)

```java
import java.util.Scanner;

/**
 * 将输入的任意0-999的整数全部补全为三位数输出(不足三位补0)
 */
public class StringTest1 {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        while (true) {
            System.out.println("请输入一个999以下的非负整数");
            String input = scan.next();
            try {
                int judgeNumber = Integer.parseInt(input);
                if (judgeNumber < 0 || judgeNumber > 999) {
                    System.out.println("输入不合法");
                } else if (judgeNumber < 10) {
                    System.out.println("00" + judgeNumber);        
                } else if (judgeNumber < 100) {
                    System.out.println("0" + judgeNumber);
                } else {
                    System.out.println(judgeNumber);
                }
            } catch (NumberFormatException e) {
                System.out.println(e);
            }
            System.out.println("是否退出？Y(不区分大小写)/任意输入");
            if (scan.next().equalsIgnoreCase("Y")) {
                break;
            }
        }
        scan.close();
    }

}
```

## Q2：输入一个手机号，将中间四位使用星号替代

```java
import java.util.Scanner;

/**
 * 输入一个手机号，将中间四位使用星号替代
 */
public class StringTest2 {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        while (true) {
            System.out.println("请输入一个11位的电话号码");
            //必须long,int会爆掉
            String input = scan.next();
            try {
                Long.parseLong(input);
                if (input.length() != 11) {
                    System.out.println("输入电话号码长度不合法");
                } else {
                    System.out.println(input.substring(0, 3) + "****" + input.substring(7 ,11));
                }
            } catch (NumberFormatException e) {
                System.out.println("输入了不合法的字符...\n" + e);
            }
            System.out.println("是否退出？Y(不区分大小写)/任意输入");
            if (scan.next().equalsIgnoreCase("Y")) {
                break;
            }
        }
        scan.close();
    }
}
```

## Q3：从命令行输入两个字符串类型的数值，并计算输出的两个数值的和

```java
import java.util.Scanner;

/**
 * 从命令行输入两个字符串类型的数值，并计算输出的两个数值的和
 */
public class StringTest3 {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        while (true) {
            System.out.print("请输入字符串1:\nString1>");
            var var1 = scan.nextLine();
            System.out.print("请输入字符串1:\nString1>");     
            var var2 = scan.nextLine();
            try {
                var var3 = Double.parseDouble(var1);
                var var4 = Double.parseDouble(var2);
                System.out.println(var3 + var4);
            } catch (NumberFormatException e) {
                System.out.println("输入非数值" + e);
            }
            System.out.println("是否退出？Y(不区分大小写)/其他任意输入");
            if (scan.next().equalsIgnoreCase("Y")) {
                break;
            }    
        }
        scan.close();
    }

}
```

## Q4：统计输入的字符串中'e'的频数

```java
import java.util.Scanner;

/**
 * 统计输入的字符串中'e'的频数
 */
public class StringTest4 {
    public static int getNumber(String var) {
        int counter = 0;
        char[] charArray = var.toCharArray();
        for (char c : charArray) {
            if (c == 'e') {
                counter++;
            }
        }
        return counter; 
    }
    
    public static void main(String[] args) {
        System.out.println("请输入任意的内容,输入exit退出");
        Scanner scan = new Scanner(System.in);
        String temp = scan.next();
        while (!temp.equals("exit")) {
            System.out.println("'e'出现的频数是: " +getNumber(temp));
            System.out.println("请输入任意的内容,输入exit退出");
            temp = scan.next();
        }
        scan.close();
    }

}
```

## Q5：生成十个0-100之间的随机数,放到数组中,然后排序输出

```java
import java.util.Random;
import java.util.Arrays;
import java.util.Scanner;

/**
 * 生成十个0-100之间的随机数,放到数组中,然后排序输出
 */
public class StringTest5 {
    public static void main(String[] args) {
        Random random = new Random();
        Scanner scan = new Scanner(System.in);
        while (true) {
            int[] array = new int[10];
            for (int i = 0; i < 10; i++) {
                array[i] = random.nextInt(101);
            }
            //Arrays.sort(array);
            Arrays.parallelSort(array);
            for (int i : array) {
                System.out.print(i + " ");
            }   
            System.out.println("\n是否退出？Y(不区分大小写)/任意输入");
            if (scan.next().equalsIgnoreCase("Y")) {
                break;
            }
        }
        scan.close();
    }

}
```

## Q6：分别在控制台输入字符串和子字符串，并计算字符串中子字符串 出现的次数

```java
import java.util.Scanner;

/**
 * 分别在控制台输入字符串和子字符串，并计算字符串中子字符串 出现的次数
 */
public class StringTest7 {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("请输入字符串\nMainString>");
        var mainStr = scan.nextLine();
        System.out.print("请输入待检查的子串\nSubString>");
        var subStr = scan.nextLine();
        var mainLengrh = mainStr.length();
        var subLength = subStr.length();
        var count = 0;
        for (var i = 0; i <= mainLengrh - subLength; i++) {
            if (mainStr.substring(i, i+subLength).equals(subStr)) {
                count++;
            }
        }
        System.out.println(count);
        scan.close();
    }
}
```

## Q7：统计输入的字符串中中文字符、英文字符、0-9数字字符的分别的个数

```java
import java.util.Scanner;

/**
 * 统计输入的字符串中中文字符、英文字符、0-9数字字符的分别的个数
 */
public class StringTest8 {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int chineseCount = 0, engishCount = 0, digitCount = 0, otherCount = 0;
        while(true) {
            engishCount  = 0;
            chineseCount = 0;
            digitCount   = 0;
            otherCount   = 0;
            System.out.print("请输入待检查的字符串(输入exit退出)\nString>");
            var string = scan.next();
            if (string.equals("exit")) {
                break;
            }
            for(int i = 0; i < string.length(); i++) {
                var character = string.charAt(i);
                if(character >= '0' && character <= '9') {
                    digitCount++;
                } else if ((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z')) {
                    engishCount++;
                } else if ((character < '0' && character >= 0) || (character > '9' && character < 'A')
                        || (character > 'Z' && character < 'a') || (character > 'a' && character <= 127)){
                    otherCount++;
                }
            }
            chineseCount = string.length() - digitCount - engishCount - otherCount;
            System.out.println("输入的字符串中:\n中文字符有:" + chineseCount + "个\n英文字符有"
                    + engishCount + "个\n0-9的数字有" + digitCount + "个");
        }
        scan.close();
    }

}
```

## Q8：判断输入的数是不是正读反读都一样的回文数

```java
import java.util.Scanner;

/**
 * 判断输入的数是不是正读反读都一样的回文数
 */
public class StringTest9 {
    public static boolean judge(String string1) {
        //这里用toCharArray()
        char[] charArray1 = string1.toCharArray();
        int length = charArray1.length;
        char[] charArray2 = new char[length];
        for (int i = 0; i < length; i++) {
            charArray2[length - i - 1] = charArray1[i];
        }
        String string2 = String.valueOf(charArray2);
        if (string1.equals(string2)) {
            return true;
        }
        return false;
    }
    
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        while(true) {
            System.out.print("请输入待检查的数字(输入exit退出)\nNumber>");
            var string = scan.next();
            if (string.equals("exit")) {
                break;
            }
            try {
                Integer.parseInt(string);
                if (judge(string)) {
                    System.out.println(string + "是回文数");
                } else {
                    System.out.println(string + "不是回文数");
                }
            } catch (NumberFormatException e) {
                System.out.println(e);
            }
        }
        scan.close();
    }

}
```

# 集合框架练习题

## Q1：创建有三个属性(ID、Name、Balance)的银行账户，并可查余额

```java
/**
 * 创建有三个属性(ID、Name、Balance)的银行账户，并可查余额,这是Account账户
 */
public class Account {
    private long id;
    private String name;
    private double balance;
    
    public Account(long id, String name, double balance) {
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
    
    public void setBalance(double balance) {
        this.balance = balance;
    }
    
    public long getId() {
        return this.id;
    }
    
    public String getName() {
        return this.name;
    }
    
    public double getDouble() {
        return this.balance;
    }
    
    @Override
    public boolean equals(Object obj) {
        if ((obj != null) && (obj instanceof Account)) {
            if (((Account)obj).getId() == (this.getId())) {
                return true;
            }
        }
        return false;
    }
    
    @Override
    public String toString() {
        return "ID: " + id + ", Name: " + name + ", Balance: " + balance;
    }

}
```

```java
import java.util.Scanner;
import java.util.HashSet;

/**
 * 创建有三个属性(ID、Name、Balance)的银行账户，并可查余额,这是Bank
 */
public class Bank {
    public static void main(String[] args) {
        HashSet<Account> accountList = new HashSet<>();
        
        accountList.add(new Account(1234567890, "李华", 1000.0));
        accountList.add(new Account(1234567891, "嘿嘿", 4000.0));
        accountList.add(new Account(1234567892, "王强", 2000.0));
        accountList.add(new Account(1234567893, "赵刚", 3000.0));
        
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入待查询的ID\nID>");
        String str = scanner.next();
        try {
            var id = Long.parseLong(str);
            for (var account : accountList) {
                if (account.getId() == id) {
                    System.out.println(account);
                }
            }
        } catch (NumberFormatException e) {
            System.out.println(e);
        }
        scanner.close();
    }

}
```

## Q2：熟悉HashSet和Collection

```java
import java.util.Collection;
import java.util.Set;
import java.util.HashSet;

/**
 * 熟悉HashSet和Collection
 */
public class CollectionTest1 {
    public static void main(String[] args) {
        Set<Integer> set1 = new HashSet<>();
        set1.add(1);
        //set.add("a");
        set1.add(5);
        set1.add(4);
        set1.add(3);
        set1.add(2);
        set1.add(3);
        for (int i : set1) {
            System.out.print(i + " ");
        }
        System.out.println();
        Collection<Integer> c = set1;
        Set<Integer> set2 = new HashSet<>(c);
        set2.remove(4);
        set2.add(6);
        for (int i : set2) {
            System.out.print(i + " ");
        }
        System.out.println();
        Set<Integer> set3 = new HashSet<>(set1);
        set3.addAll(set2);
        for (int i : set3) {
            System.out.print(i + " ");
        }
        System.out.println();
        Set<Integer> set4 = new HashSet<>(set1);
        set4.retainAll(set2);      
        for (int i : set4) {
            System.out.print(i + " ");
        }
    }
}
```

## Q3：从控制台输入若干个单词（输入回车结束）放入集合中，将这些 单词排序后（忽略大小写）打印出来

```java
import java.util.Scanner;
import java.util.ArrayList;
import java.util.StringTokenizer;

/**
 * 从控制台输入若干个单词（输入回车结束）放入集合中，将这些 单词排序后（忽略大小写）打印出来
 */
public class CollectionTest2 {
    public static String getMax(ArrayList<String> list) {
        var count = 0;
        for (String str1 : list) {
            count = 0;
            for (String str2 : list) {
                if (str1.compareToIgnoreCase(str2) > 0) {
                    count++;
                }
            }
            if (count == list.size()-1) {
                return str1;
            }
        }
        return null;
    }
    
    public static ArrayList<String> sort(ArrayList<String> list) {
        ArrayList<String> temp = new ArrayList<>(list);
        ArrayList<String> result = new ArrayList<>();
        String max;
        for (int i = 0; i < list.size(); i++) {
            max = getMax(temp);
            result.add(max);
            temp.remove(max);
        }
        return result;
    }
    
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        var scanner = new Scanner(System.in);
        System.out.println("请输入一串文本,用#分割每个字符串,用回车键结束");
        var string = scanner.nextLine();
        var st = new StringTokenizer(string, "#");
        String temp;
        while (st.hasMoreTokens()) {
            temp = st.nextToken();
            list.add(temp);
        }
        for (String str : sort(list)) {
            System.out.println(str);
        }
        scanner.close();
    }

}
```

## Q4：用HashSet盛放学生数据并测试

```java
/**
 * 用HashSet盛放学生数据,这是学生类
 */
public class Student {
    
    private String id;
    
    private String name;
    
    public Student(String id, String name) {
        this.id = id;
        this.name = name;
    }
    
    public String getId() {
        return this.id;
    }
    
    public String getName() {
        return this.name;
    }
    
    @Override
    public String toString() {
        return "ID: " + this.id + " Name: " + this.name;
    }
}
```

```java
import java.util.Set;
import java.util.HashSet;

/**
 * 用HashSet盛放学生数据,这是测试类
 */
public class StudentSetTest {
    public static void main(String[] args) {
        Set<Student> studentSet = new HashSet<>();
        Student student1 = new Student("A0001", "王明");
        Student student2 = new Student("A0002", "李刚");
        Student student3 = new Student("A0003", "赵宇");
        studentSet.add(student1);
        studentSet.add(student2);
        studentSet.add(student3);
        for (Student student : studentSet) {
            System.out.println(student);
        }
    }
}
```

## Q5：在一个列表中存储以下元素：apple、grape、banana、pear，返回集合中的最大的和最小的元素，将集合进行排序，并将排序后的结果打印在控制台上

```java
import java.util.ArrayList;

/**
 * 在一个列表中存储以下元素：apple,grape,banana,pear
 * 返回集合中的最大的和最小的元素
 * 将集合进行排序，并将排序后的结果打印在控制台上
 */
public class ListTest1 {
    public static void main(String[] args) {
        ArrayList<String> fruitList = new ArrayList<>();
        fruitList.add("apple");
        fruitList.add("grape");
        fruitList.add("banana");
        fruitList.add("pear");
        System.out.println(getMax(fruitList));
        System.out.println(getMin(fruitList));
        for (String str : sort(fruitList)) {
            System.out.println(str);
        }
    }
    
    public static String getMax(ArrayList<String> list) {
        var count = 0;
        for (String str1 : list) {
            count = 0;
            for (String str2 : list) {
                if (str1.compareTo(str2) > 0) {
                    count++;
                }
            }
            if (count == list.size()-1) {
                return str1;
            }
        }
        return null;
    }
    
    public static String getMin(ArrayList<String> list) {
        var count = 0;
        for (String str1 : list) {
            count = 0;
            for (String str2 : list) {
                if (str1.compareTo(str2) < 0) {
                    count++;
                }
            }
            if (count == list.size()-1) {
                return str1;
            }
        }
        return null;
    }
    
    public static ArrayList<String> sort(ArrayList<String> list) {
        ArrayList<String> temp = new ArrayList<>(list);
        ArrayList<String> result = new ArrayList<>();
        String max;
        for (int i = 0; i < list.size(); i++) {
            max = getMax(temp);
            result.add(max);
            temp.remove(max);
        }
        return result;
    }

}
```

## Q6：用for、foreach、Iterator三种方法分别遍历ArrayList、LinkedList

```java
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;

/**
 * for、foreach、Iterator三种方法分别遍历ArrayList、LinkedList
 */
public class ArrayListAndLinkedListTest {
    public static void main(String[] args) {
        List<Integer> arrayList  = new ArrayList<>();
        List<Integer> linkedList = new LinkedList<>();
        arrayList.add(211);
        arrayList.add(100);
        arrayList.add(996);
        arrayList.add(985);
        arrayList.add(798);
        arrayList.add(3);
        linkedList.addAll(arrayList);
        System.out.println("for循环遍历ArrayList:");
        //for循环遍历ArrayList
        for (int i = 0; i < arrayList.size(); i++) {
            System.out.print(arrayList.get(i) + " ");
        }
        System.out.println("\nfor循环遍历LinkedList:");
        //for循环遍历LinkedList
        for (int i = 0; i < linkedList.size(); i++) {
            System.out.print(linkedList.get(i) + " ");
        }
        System.out.println("\nforeach循环遍历ArrayList:");
        //foreach循环遍历ArrayList
        for (int i : arrayList) {
            System.out.print(i + " ");
        }
        System.out.println("\nforeach循环遍历LinkedList:");
        //foreach循环遍历LinkedList
        for (int i : linkedList) {
            System.out.print(i + " ");
        }
        Iterator<Integer> arrayIterator  = arrayList.iterator();
        Iterator<Integer> linkedIterator = linkedList.iterator();
        System.out.println("\nIterator遍历ArrayList:");  
        //Iterator遍历ArrayList
        while (arrayIterator.hasNext()) {
            System.out.print(arrayIterator.next() + " ");
        }
        System.out.println("\nIterator遍历LinkedList:");
        //Iterator遍历LinkedList
        while (linkedIterator.hasNext()) {
            System.out.print(linkedIterator.next() + " ");
        }
    }
}
```

## Q7：对集合遍历的修改进行测试
```java
import java.util.*;

public class IteratorTest {
    public static void main(String[] args) {
        Collection<Integer> c = new ArrayList<>();
        c.add(1);
        c.add(2);
        c.add(3);
        c.add(4);
        c.add(5);
        Iterator<Integer> iterator = c.iterator();
        while (iterator.hasNext()) {
            int i = iterator.next();
            if (i == 3) {
                //c.remove(3);
                iterator.remove();
            }
            System.out.println(i);
        }
        System.out.println();
        //进不去，无输出。。因为迭代完了
        while (iterator.hasNext()) {
            int i = iterator.next();
            System.err.println("ss");
            System.out.println(i);
        }
        System.out.println();
        //可以看到缺了3
        for (int i : c) {
            System.out.println(i);
        }
        System.out.println();
        Collection<Integer> p =Collections.synchronizedCollection(new ArrayList<>(c));
        Iterator<Integer> iterator3 = p.iterator();
        while (iterator3.hasNext()) {
            int i = iterator3.next();
            if (i == 4) {
                p.remove(4);
                iterator3.remove();
            }
            //System.out.println(i);
        }
    }

}
```

## 基础知识补充

Collection 和 Collections的区别？
答：Collection是集合类的上级接口，继承与他的接口主要有Set和List。
Collections是针对集合类的一个帮助类，他提供一系列静态方法实现对各种集合的搜索、排序、线程安全化等操作。

Set里的元素是不能重复的，那么用什么方法来区分重复与否呢? 是用\=\= 还是equals()? 它们有何区别？
答：Set里的元素是不能重复的，那么用iterator()方法来区分重复与否。equals()是判读两个Set是否相等。
equals()和\=\=方法决定引用值是否指向同一对象equals()在类中被覆盖，为的是当两个分离的对象的内容和类型相配的话，返回真值

List, Set, Map是否继承自Collection接口？
答： List，Set是，Map不是

两个对象值相同(x.equals(y) == true)，但却可有不同的hash code，这句话对不对？
答：不对，有相同的hash code

说出ArrayList,Vector, LinkedList的存储性能和特性？
答：ArrayList和Vector都是使用数组方式存储数据，此数组元素数大于实际存储的数据以便增加和插入元素，它们都允许直接按序号索引元素，但是插入元素要涉及数组元素移动等内存操作，所以索引数据快而插入数据慢，Vector由于使用了synchronized方法（线程安全），通常性能上较ArrayList差，而LinkedList使用双向链表实现存储，按序号索引数据需要进行前向或后向遍历，但是插入数据时只需要记录本项的前后项即可，所以插入速度较快。

HashMap和Hashtable的区别？
答：HashMap是Hashtable的轻量级实现（非线程安全的实现），他们都完成了Map接口，主要区别在于HashMap允许空（null）键值（key）,由于非线程安全，效率上可能高于Hashtable。
HashMap允许将null作为一个entry的key或者value，而Hashtable不允许。
HashMap把Hashtable的contains方法去掉了，改成containsvalue和containsKey。因为contains方法容易让人引起误解。 
Hashtable继承自Dictionary类，而HashMap是Java1.2引进的Map interface的一个实现。
最大的不同是，Hashtable的方法是Synchronize的，而HashMap不是，在多个线程访问Hashtable时，不需要自己为它的方法实现同步，而HashMap 就必须为之提供外同步。 
Hashtable和HashMap采用的hash/rehash算法都大概一样，所以性能不会有很大的差异。

ArrayList和Vector的区别？HashMap和Hashtable的区别？
答：就ArrayList与Vector主要从二方面来说：
1.同步性:Vector是线程安全的，也就是说是同步的，而ArrayList是线程序不安全的，不是同步的。
2.数据增长:当需要增长时,Vector默认增长为原来一培，而ArrayList却是原来的一半。
就HashMap与HashTable主要从三方面来说：
1.历史原因:Hashtable是基于陈旧的Dictionary类的，HashMap是Java 1.2引进的Map接口的一个实现。
2.同步性:Hashtable是线程安全的，也就是说是同步的，而HashMap是线程序不安全的，不是同步的。
3.值：只有HashMap可以让你将空值作为一个表的条目的key或value.

# IO流练习题

## 基础知识补充

java中有几种类型的流？JDK为每种类型的流提供了一些抽象类以供继承，请说出他们分别是哪些类？
答：字节流，字符流。
字节流继承于InputStream OutputStream；字符流继承于Reader Writer。在java.io包中还有许多其他的流，主要是为了提高性能和使用方便。

什么是java序列化，如何实现java序列化？
答：序列化就是一种用来处理对象流的机制，所谓对象流也就是将对象的内容进行流化。
可以对流化后的对象进行读写操作，也可将流化后的对象传输于网络之间。
序列化是为了解决在对对象流进行读写操作时所引发的问题。
序列化的实现：将需要被序列化的类实现Serializable接口，该接口没有需要实现的方法，implements Serializable只是为了标注该对象是可被序列化的，然后使用一个输出流(如：FileOutputStream)来构造一个ObjectOutputStream(对象流)对象，接着，使用ObjectOutputStream对象的writeObject(Object obj)方法就可以将参数为obj的对象写出(即保存其状态)，要恢复的话则用输入流。

在Java中，输入输出的处理需要引入的包是java.io，面向字节的输入输出类的基类是Inputstream和Outputstream。面向字符的输入输出类的基类是Reader和Writer。


使用处理流的优势有哪些？如何识别所使用的流是处理流还是节点流？
答：
优势：对开发人员来说，使用处理流进行输入/输出操作更简单；使用处理流的执行效率更高。
判别：处理流的构造器的参数不是一个物理节点，而是已经存在的流。而节点流都是直接以物理IO及节点作为构造器参数的。

Java中有几种类型的流？JDK为每种类型的流提供了一些抽象类以供继承，请指出它们分别是哪些类？
答：Java中按所操作的数据单元的不同，分为字节流和字符流。
字节流继承于InputStream和OutputStream类，字符流继承于Reader和Writer。
按流的流向的不同，分为输入流和输出流。
按流的角色来分，可分为节点流和处理流。缓冲流、转换流、对象流和打印流等都属于处理流，使得输入/输出更简单，执行效率更高。

什么是标准的I/O流？
在java语言中，用stdin表示键盘，用stdout表示监视器。他们均被封装在System类的类变量in 和out中，

```java
对应于系统调用System.in和System.out。这样的两个流加上System.err统称为标准流，它们是在System类中声明的3个类变量：
public static InputStream in
public static PrintStream out
public static PrintStream err
```

## 选择题

1.计算机处理的数据最终分解为\_\_的组合。
A 0 
B 数据包
C 字母
D 1 
2.计算机处理的最小数据单元称为\_\_。
A 位
B 字节
C 兆
D 文件
3.字母、数字和特殊符号称为\_\_。
A 位
B 字节
C 字符
D 文件
4.\_\_文件流类的 close 方法可用于关闭文件。
A FileOutputStream
B FileInputStream
C RandomAccessFile
D FileWrite
5.RandomAccessFile 类的\_\_方法可用于从指定流上读取整数。
A readInt
B readLine
C seek 
D close 
6.RandomAccessFile 类的\_\_方法可用于从指定流上读取字符串。
A readInt
B readLine
C seek 
D close 
7.RandomAccessFile 类的\_\_方法可用于设置文件定位指针在文件中的位置。
A readInt
B readLiIne
C seek 
D close 
8.在FilterOutputStream类的构造方法中，下面哪个类是合法的：
A File 
B InputStream
C OutputStream
D FileOutputStream

【答案】
1.答案：AD 知识点：计算机最终能处理的数据只能为 0 和 1。
2.答案：B 知识点：计算机处理的最小数据单元是字节。
3.答案：C 知识点：字符的概念。
4.答案： ABC 知识点：FileOutStream、FileInputStream、RandomAccessFile
文件流类的 close 方法可用于关闭文件。
5.答案：A 知识点：readInt方法的使用。
6.答案：B 知识点：readLIne方法的使用。
7.答案：C 知识点：seek 方法的使用。
8.答案：C 知识点：在FilterOutputStream类中只有一种结构：public
FilterOutputStream(OutputStream)。

# 线程练习题

## Q1：编写一个继承Thread类的方式实现多线程的程序

编写一个继承Thread类的方式实现多线程的程序。MyThread类有两个属性，一个字符串WhoAmI代表线程名，一个整数delay代表该线程随机要休眠的时间。构造有参的构造器，线程执行时，显示线程名和要休眠时间。
另外，定义一个测试类TestThread，创建三个线程对象以展示执行情况。

```java
class MyThread extends Thread{
	private String whoAmI;
	private int delay;
	public MyThread(String s,int d){
		whoAmI = s;
		delay = d;
	}
	public void run(){
		try{
			sleep(delay);
		}catch(InterruptedException ie){
		}
		System.out.println("Hello!I am"+whoAmI+",I slept"+delay+"milliseconds");
	}
}

public class TestThread{
	public static void main(String[] args){
		MyThread t1 = new MyThread("Thread-1",(int)(Math.random()*100));
		MyThread t2 = new MyThread("Thread-2",(int)(Math.random()*100));
		MyThread t3 = new MyThread("Thread-3",(int)(Math.random()*100));
		t1.start();
		t2.start();
		t3.start();
	}
}
```

## Q2：利用多线程设计一个程序，同时输出 50 以内的奇数和偶数，以及当前运行的线程名。

```java
public class Threadprint extends Thread {
	int k = 1; 
	public void run() { 
		int i=k; 
		while(i<50) { 
			System.out.println(Thread.currentThread().getName()+"-----"+i); 
			i+=2; 
		} 
		System.out.println(Thread.currentThread().getName()+" end!"); 
	} 
	public static void main (String[] args) { 
	Threadprint t1=new Threadprint();
	Threadprint t2=new Threadprint(); 
	t1.k = 1;
	t2.k = 2;
	t1.start(); 
	t2.start(); 
	} 
}
```

## 基础知识补充

java中有几种方法可以实现一个线程？用什么关键字修饰同步方法? stop()和suspend()方法为何不推荐使用？
答：有两种实现方法，分别是继承Thread类与实现Runnable接口
用synchronized关键字修饰同步方法反对使用stop()，是因为它不安全。它会解除由线程获取的所有锁定，而且如果对象处于一种不连贯状态，那么其他线程能在那种状态下检查和修改它们。结果很难检查出真正的问题所在。suspend()方法容易发生死锁。
调用suspend()的时候，目标线程会停下来，但却仍然持有在这之前获得的锁定。此时，其他任何线程都不能访问锁定的资源，除非被"挂起"的线程恢复运行。对任何线程来说，如果它们想恢复目标线程，同时又试图使用任何一个锁定的资源，就会造成死锁。所以不应该使用suspend()，而应在自己的Thread类中置入一个标志，指出线程应该活动还是挂起。若标志指出线程应该挂起，便用wait()命其进入等待状态。若标志指出线程应当恢复，则用一个notify()重新启动线程。

sleep() 和 wait() 有什么区别? 
答：sleep是线程类（Thread）的方法，导致此线程暂停执行指定时间，给执行机会给其他线程，但是监控状态依然保持，到时后会自动恢复。调用sleep不会释放对象锁。
wait是Object类的方法，对此对象调用wait方法导致本线程放弃对象锁，进入等待此对象的等待锁定池，只有针对此对象发出notify方法（或notifyAll）后本线程才进入对象锁定池准备获得对象锁进入运行状态。

同步和异步有何异同，在什么情况下分别使用他们？举例说明。
答：如果数据将在线程间共享。例如正在写的数据以后可能被另一个线程读到，或者正在读的数据可能已经被另一个线程写过了，那么这些数据就是共享数据，必须进行同步存取。
当应用程序在对象上调用了一个需要花费很长时间来执行的方法，并且不希望让程序等待方法的返回时，就应该使用异步编程，在很多情况下采用异步途径往往更有效率。

启动一个线程是用run()还是start()?
答：启动一个线程是调用start()方法，使线程所代表的虚拟处理机处于可运行状态，这意味着它可以由JVM调度并执行。这并不意味着线程就会立即运行。run()方法可以产生必须退出的标志来停止一个线程。 

当一个线程进入一个对象的一个synchronized方法后，其它线程是否可进入此对象的其它方法?
答：不能，一个对象的一个synchronized方法只能由一个线程访问。

请说出你所知道的线程同步的方法。
答：wait()：使一个线程处于等待状态，并且释放所持有的对象的lock。
sleep()：使一个正在运行的线程处于睡眠状态，是一个静态方法，调用此方法要捕捉InterruptedException异常。
notify()：唤醒一个处于等待状态的线程，注意的是在调用此方法的时候，并不能确切的唤醒某一个等待状态的线程，而是由JVM确定唤醒哪个线程，而且不是按优先级。
notifyAll()：唤醒所有处入等待状态的线程，注意并不是给所有唤醒线程一个对象的锁，而是让它们竞争。

多线程有几种实现方法,都是什么?同步有几种实现方法，都是什么? 
答：多线程有两种实现方法，分别是继承Thread类与实现Runnable接口。
同步的实现方面有两种，分别是synchronized,wait与notify

线程的基本概念、线程的基本状态以及状态之间的关系？
答：线程指在程序执行过程中，能够执行程序代码的一个执行单位，每个程序至少都有一个线程，也就是程序本身。
Java中的线程有四种状态分别是：运行、就绪、挂起、结束。

简述synchronized和java.util.concurrent.locks.Lock的异同？
答：主要相同点：Lock能完成synchronized所实现的所有功能。
主要不同点：Lock有比synchronized更精确的线程语义和更好的性能。synchronized会自动释放锁，而Lock一定要求程序员手工释放，并且必须在finally从句中释放。 

Java为什么要引入线程机制，线程、程序、进程之间的关系是怎样的？
答：线程可以彼此独立的执行，它是一种实现并发机制的有效手段，可以同时使用多个线程来完成不同的任务，并且一般用户在使用多线程时并不考虑底层处理的细节。
程序是一段静态的代码，是软件执行的蓝本。进程是程序的一次动态执行过程，即是处于运行过程中的程序。
线程是比进程更小的程序执行单位，一个进程可以启动多个线程同时运行，不同线程之间可以共享相同的内存区域和数据。多线程程序是运行时间后嗣可能出现在一个进程之内的、有一个以上线程同时运行的情况的程序。

Runnable接口包括哪些抽象方法？Thread类有哪些主要域和方法？
答：Runnable接口中仅有run()抽象方法。
Thread类主要域有：MAX_PRIORITY、MIN_PRIORITY、NORM_PRIORITY。
主要方法有start()、run()、sleep()、currentThread()、setPriority()、getPriority()、join()等。

创建线程有哪两种方式？试写出每种的具体的流程。比较两种创建方式的不同，哪个更优？
方式一：继承Thread类
1.定义类继承Thread类。
2.覆盖Thread类中的run方法。
3.创建Thread子类对象，即创建了线程对象。
4.调用线程对象start方法：启动线程，调用run方法。
方式二：实现Runnable接口
1.定义类，实现Runnable接口。
2.覆盖Runnable接口中的run方法。
3.通过Thread类建立线程对象。
4.将Runnable接口的子类对象作为实际参数传递给Thread类的构造方法中。
5.调用Thread类的start方法：开启线程，调用Runnable子类接口的run方法。
区别：
继承Thread: 线程代码存放Thread子类run方法中。
实现Runnable：线程代码存在接口的子类的run方法。
实现方法的好处：
1.避免了单继承的局限性。
2.多个线程可以共享同一个接口子类的对象，非常适合多个相同线程来处理同一份资源。

## 判断题

1.C 和 Java 都是多线程语言。（ ）
2.如果线程死亡，它便不能运行。（ ）
3.在 Java 中，高优先级的可运行线程会抢占低优先级线程。（ ）
4.程序开发者必须创建一个线程去管理内存的分配。（ ）
5.一个线程在调用它的 start 方法，之前，该线程将一直处于出生期。（ ）
6.当调用一个正在进行线程的 stop()方法时，该线程便会进入休眠状态。（ ）
7.如果线程的 run 方法执行结束或抛出一个不能捕获的例外，线程便进入等待状态。（ ）
8.一个线程可以调用 yield 方法使其他线程有机会运行。（ ）

【答案】
1.难度：容易
答案：错误
知识点：C 是单线程语言。
2.难度：容易
答案：正确
知识点：线程死亡就意味着它不能运行。
3.难度：适中
答案：正确
知识点：线程优先级的使用。
4.难度：适中
答案：错误
知识点：Java 提供了一个系统线程来管理内存的分配。
5.难度：容易
答案：正确
知识点：出生期的概念。
6.难度：适中
答案：错误
知识点：应该是 sleep 方法。
7.难度：适中
答案：错误
知识点：如果线程的 run 方法执行结束或抛出一个不能捕获的例外，线程便进入死亡状态。
8.难度：适中
答案：正确
知识点：yield 方法总是让高优先级的就绪线程先运行。

## 选择题

1.Java 语言中提供了一个\_\_线程，自动回收动态分配的内存。
A 异步
B 消费者
C 守护
D 垃圾收集
2.当\_\_方法终止时，能使线程进入死亡状态。
A run
B setPrority
C yield
D sleep
3.用\_\_方法可以改变线程的优先级。
A run
B setPrority
C yield
D sleep
4.线程通过\_\_方法可以使具有相同优先级线程获得处理器。
A run
B setPrority
C yield
D sleep
5.线程通过\_\_方法可以休眠一段时间，然后恢复运行。
A run
B setPrority
C yield
D sleep
6.\_\_方法使对象等待队列的第一个线程进入就绪状态。
A run
B notify
C yield
D sleep
7.方法 resume( )负责重新开始\_\_线程的执行。
A 被 stop( )方法停止
B 被 sleep( )方法停止
C 被 wait( )方法停止
D 被 suspend( )方法停止
8.\_\_方法可以用来暂时停止当前线程的运行。
A stop( )
B sleep( )
C wait( )
D suspend()

【答案】
1.难度：容易
答案：D
知识点：垃圾线程的使用。
2.难度：容易
答案：A
知识点：run 方法的使用。
3.难度：容易
答案：B
知识点：setPrority 方法的使用。
4.难度：容易
答案：C
知识点：yield 方法的使用。
5.难度：容易
答案：D
知识点：sleep 方法的使用。
6.难度：容易
答案：B
知识点：notify 方法的使用。
7.难度：适中
答案：D
知识点：一个线程被用 suspend( )方法，将该线程挂起。并通过调用 resume( )方法来重新开始线程的执行。
但是该方法容易导致死锁，应尽量避免使用
8.难度：适中
答案：BCD
知识点：当调用 stop( )方法后，当前的线程不能重新开始运行。
