---
title: MapReduce
date: 2023-03-15 14:43:56
summary: 本文分享MapReduce程序设计的基本理论和实战案例。
tags:
- MapReduce
categories:
- 程序设计
---

# MapReduce

MapReduce是一种编程模型，用于大规模数据集的并行运算。MapReduce极大地方便了编程人员在不会分布式并行编程的情况下，将自己的程序运行在分布式系统上。

Map和Reduce是两个过程。Map的意思是映射，Reduce的意思是规约，二者源于函数式编程语言和矢量编程语言。

MapReduce的通常软件实现是：
1. 指定一个Map函数，用来把一组键值对映射成一组新的键值对。
2. 指定一个支持并发的Reduce函数，用来保证所有映射的键值对中的每一个共享相同的键组。

MapReduce的一个经典实例是Hadoop，它常被用于处理大型分布式数据库。

# 单词计数

推荐阅读：[Hadoop实现MapReduce单词计数](https://hadoop.apache.org/docs/r1.2.1/mapred_tutorial.html#Example%3A+WordCount+v1.0)

## 样例数据

### 样例数据1

输入:
    chunk1: "Google Bye GoodBye Hadoop code"
    chunk2: "lintcode code Bye"

输出:
    Bye: 2
    GoodBye: 1
    Google: 1
    Hadoop: 1
    code: 2
    lintcode: 1

### 样例数据2

输入:
    chunk1: "Lintcode is so so good"

输出:
    Lintcode: 1
    good: 1
    is: 1
    so: 2

## 实现代码

```java
import java.util.*;

public class WordCount {

    private interface OutputCollector<K, V> {
        void collect(K key, V value);
    }

    public static class Map {
        public void map(String key, String value, OutputCollector<String, Integer> output) {
            StringTokenizer tokenizer = new StringTokenizer(value);
            while (tokenizer.hasMoreTokens()) {
                String word = tokenizer.nextToken();
                output.collect(word, 1);
            }
        }
    }

    public static class Reduce {
        public void reduce(String key, Iterator<Integer> values, OutputCollector<String, Integer> output) {
            int sum = 0;
            while (values.hasNext()) {
                sum += values.next();
            }
            output.collect(key, sum);
        }
    }

}
```

## 代码提交

[LintCode 499 单词计数(Map Reduce版本)](https://www.lintcode.com/problem/499/)

# 乱序字符串

用MapReduce来找乱序字符串的列表。

如果一个字符串S是乱序字符串，那么他存在一个字母集合相同，但顺序不同的字符串也在S中。

## 样例数据

### 样例数据1

输入: 
"lint lint lnit ln"

输出: 
  ["lint", "lint", "lnit"]
  ["ln"]

### 样例数据2

输入: 
"ab ba cab"

输出: 
  ["ab", "ba"]
  ["cab"]

## 实现代码

```java
import java.util.*;

public class Anagram {

    private interface OutputCollector<K, V> {
        void collect(K key, V value);
    }

    public static class Map {
        public void map(String key, String value, OutputCollector<String, String> output) {
            StringTokenizer tokenizer = new StringTokenizer(value);
            while (tokenizer.hasMoreTokens()) {
                String word = tokenizer.nextToken();
                char[] chars = word.toCharArray();
                Arrays.sort(chars);
                output.collect(new String(chars), word);
            }
        }
    }

    public static class Reduce {
        public void reduce(String key, Iterator<String> values, OutputCollector<String, List<String>> output) {
            List<String> list = new ArrayList<>();
            while (values.hasNext()) {
                list.add(values.next());
            }
            output.collect(key, list);
        }
    }

}
```

## 代码提交

[LintCode 503 乱序字符串(Map Reduce版本)](https://www.lintcode.com/problem/503/)

# 倒排索引

使用MapReduce来实现一个倒排索引。

## 样例数据

无

## 实现代码

```java
import java.util.*;

public class InvertedIndex {

    private interface OutputCollector<K, V> {
        public void collect(K key, V value);
    }

    private static class Document {
        public int id;
        public String content;
    }

    public static class Map {
        public void map(String _, Document value, OutputCollector<String, Integer> output) {
            StringTokenizer tokenizer = new StringTokenizer(value.content);
            while (tokenizer.hasMoreTokens()) {
                String word = tokenizer.nextToken();
                output.collect(word, value.id);
            }
        }
    }

    public static class Reduce {
        public void reduce(String key, Iterator<Integer> values, OutputCollector<String, List<Integer>> output) {
            Set<Integer> set = new TreeSet<>();
            while (values.hasNext()) {
                set.add(values.next());
            }
            output.collect(key, new ArrayList<>(set));
        }
    }

}
```

## 代码提交

[LintCode 504 倒排索引(Map Reduce版本)](https://www.lintcode.com/problem/504/)

# N-Gram

给出若干字符串和数字$N$。用MapReduce的方法统计所有N-Grams及其出现次数 。以字母为粒度。

## 样例数据

### 样例数据1

输入: 
N = 3
doc_1: "abcabc"
doc_2: "abcabc"
doc_3: "bbcabc"

输出:
[
  "abc": ５,
  "bbc": 1, 
  "bca": 3,
  "cab": 3
]

### 样例数据2

输入: 
N=3
doc_1: "abcabc"

输出:
[
  "abc": 2, 
  "bca": 1,
  "cab": 1
]

## 实现代码

```java
import java.util.*;

public class NGram {

    private interface OutputCollector<K, V> {
        void collect(K key, V value);
    }

    public static class Map {
        public void map(String s, int n, String str, OutputCollector<String, Integer> output) {
            for (int i = 0; i <= str.length()-n; i++) {
                output.collect(str.substring(i, i+n), 1);
            }
        }
    }

    public static class Reduce {
        public void reduce(String key, Iterator<Integer> values, OutputCollector<String, Integer> output) {
            int sum = 0;
            while (values.hasNext()) {
                sum += values.next();
            }
            output.collect(key, sum);
        }
    }

}
```

## 代码提交

[LintCode 537 N-Gram(Map Reduce版本)](https://www.lintcode.com/problem/537/)

# 最常使用的k个单词

使用MapReduce框架查找最常使用的$k$个单词。
Mapper的key为文档的id, 值是文档的内容，文档中的单词由空格分割.
对于Reducer，应该输出最多为$k$个key-value对, 包括最常用的$k$个单词以及他们在当前Reducer中的使用频率。评判系统会合并不同的Reducer中的结果以得到全局最常使用的$k$个单词，所以你不需要关注这一环节。$k$在TopK类的构造器中给出。

## 样例数据

### 样例数据1

输入:
document A = "lintcode is the best online judge
I love lintcode" 和
document B = "lintcode is an online judge for coding interview
you can test your code online at lintcode"

输出: 
"lintcode", 4
"online", 3

### 样例数据2

输入:
document A = "a a a b b b" 和
document B = "a a a b b b"

输出: 
"a", 6
"b", 6

## 实现代码

```java
import java.util.*;

public class NGram {

    private interface OutputCollector<K, V> {
        void collect(K key, V value);
    }

    public static class Map {
        public void map(String s, int n, String str, OutputCollector<String, Integer> output) {
            for (int i = 0; i <= str.length()-n; i++) {
                output.collect(str.substring(i, i+n), 1);
            }
        }
    }

    public static class Reduce {
        public void reduce(String key, Iterator<Integer> values, OutputCollector<String, Integer> output) {
            int sum = 0;
            while (values.hasNext()) {
                sum += values.next();
            }
            output.collect(key, sum);
        }
    }

}
```

## 代码提交

[LintCode 549 最常使用的k个单词(Map Reduce版本)](https://www.lintcode.com/problem/549/)

# 排序整数

通过MapReduce框架对整数进行排序。
在Mapper中，key为可以忽略的文档id，alue是待排序的整数。
在Reducer中，你可以指定什么是key或者value(取决于你是如何实现你的mapper类的)。对于输出的Reducer类，key可以是任意，但value需要有序(顺序取决于你什么时候输出)。

## 样例数据

### 样例数据1

输入:
1: [14,7,9]
2: [10,1]
3: [2,5,6,3]
4: []

输出:
[1,2,3,5,6,7,9,10,14]

### 样例数据2

输入:
1: [14,7]

输出:
[7,14]

## 实现代码

```java
import java.util.*;

public class SortIntegers {

    private interface OutputCollector<K, V> {
        void collect(K key, V value);
    }

    public static class Map {
        public void map(int _, List<Integer> value, OutputCollector<String, List<Integer>> output) {
            Collections.sort(value);
            output.collect(null, value);
        }
    }

    public static class Reduce {
        public void reduce(String key, List<List<Integer>> values, OutputCollector<String, List<Integer>> output) {
            PriorityQueue<Integer> pq = new PriorityQueue<>();
            for (List<Integer> list : values) {
                for (int i : list) {
                    pq.offer(i);
                }
            }
            List<Integer> ans = new ArrayList<>();
            while (!pq.isEmpty()) {
                ans.add(pq.poll());
            }
            output.collect(null, ans);
        }
    }

}
```

## 代码提交

[LintCode 554 排序整数(Map Reduce版本)](https://www.lintcode.com/problem/554/)

# Google Suggestion

使用MapReduce框架为谷歌Suggestion构建一个key-value索引，其中key是查询的前缀，value是查询的前10个查询。

您不需要遍历所有查询并计算搜索次数，假设您得到了一个查询列表及其搜索次数，这是另一个map reduce问题Word Count的输出。

map函数的键是可以忽略的文档id。map函数的值是一个文档实例，它包含两个成员变量word和count。如。“你好100”，这意味着这个查询“你好”已经被搜索了10次。map函数的输出取决于您的算法，我们不会检查它，所以您可以输出任何您想要的键值对。

reduce函数的键和值取决于您在map函数中的输出。reduce函数的输出是键值对，其中键是前缀，值是前10个查询及其计数。使用Document类来包装它们。

## 样例数据

### 样例数据1

输入:
[("apple",100), ("app",1200), ("app store",1200)]

输出: 
"a": [("app", 1200), ("app store", 1200), ("apple", 100)]
"ap": [("app", 1200), ("app store", 1200), ("apple", 100)]
"app": [("app", 1200), ("app store", 1200), ("apple", 100)]
"app ": [("app store", 1200)]
"app s": [("app store", 1200)]
"app st": [("app store", 1200)]
"app sto": [("app store", 1200)]
"app stor": [("app store", 1200)]
"app store": [("app store", 1200)]
"appl": [("apple", 100)]
"apple": [("apple", 100)]

### 样例数据2

输入:
[("apple",1200), ("app",1200), ("app store",1200)]

输出: 
"a": [("app", 1200), ("app store", 1200), ("apple", 1200)]
"ap": [("app", 1200), ("app store", 1200), ("apple", 1200)]
"app": [("app", 1200), ("app store", 1200), ("apple", 1200)]
"app ": [("app store", 1200)]
"app s": [("app store", 1200)]
"app st": [("app store", 1200)]
"app sto": [("app store", 1200)]
"app stor": [("app store", 1200)]
"app store": [("app store", 1200)]
"appl": [("apple", 1200)]
"apple": [("apple", 1200)]

## 实现代码

```java
import java.util.*;

public class GoogleSuggestion {

    private interface OutputCollector<K, V> {
        void collect(K key, V value);
    }

    private static class Document {
        public int count;
        public String content;
    }

    private static class Pair {
        private String content;
        private int count;
        Pair(String key, int value) {
            this.content = key;
            this.count = value;
        }
        public String getContent(){
            return this.content;
        }
        public int getCount(){
            return this.count;
        }
    }

    public static class Map {
        public void map(Document value, OutputCollector<String, Pair> output) {
            String content = value.content;
            String words = "";
            Pair value_pair = new Pair(content, value.count);
            for (int i = 0; i < content.length(); i++) {
                words += content.charAt(i);
                output.collect(words,value_pair);
            }
        }
    }

    public static class Reduce {
        private final Comparator<Pair> pairComparator = (left, right) -> {
            if (left.getCount() != right.getCount()) {
                return left.getCount() - right.getCount();
            }
            return right.getContent().compareTo(left.getContent());
        };
        public void setup() {
            // initialize your data structure here
        }
        public void reduce(String key, Iterator<Pair> values, OutputCollector<String, Pair> output) {
            PriorityQueue<Pair> queue = new PriorityQueue<>(pairComparator);
            ArrayList<Pair> list = new ArrayList<>();
            while (values.hasNext()) {
                queue.add(values.next());
                if (queue.size() > 10) {
                    queue.poll();
                }
            }
            while (!queue.isEmpty()) {
                list.add(queue.poll());
            }
            int n = list.size();
            for(int i = n-1; i >= 0; i--) {
                output.collect(key, list.get(i));
            }
        }
    }

}
```

## 代码提交

[LintCode 1787 Google Suggestion(Map Reduce版本)](https://www.lintcode.com/problem/1787/)
