---
title: C++常用函数与STL标准模板库
date: 2023-01-13 23:46:38
summary: 本文分享用于程序设计的C++常用函数与STL标准模板库。
tags:
- C++
categories:
- 开发技术
---

# STL-pair

STL的`<utility>`头文件中描述了一个看上去非常简单的模版类pair，用来表示一个二元组或元素对，并提供了按照字典序对元素对进行大小比较运算符模版函数。 

例如，想要定义一个对象表示一个平面坐标点，则可以：
```cpp
pair<double, double> p;
cin >> p.first >> p.second;
```

# STL-set

定义：
```cpp
set<int> s1;
set<double> s2;
```

常用函数：
- `s.begin()`：返回指向第一个元素的迭代器
- `s.clear()`：清除所有元素
- `s.count()`：返回某个值元素的个数
- `s.empty()`：如果集合为空，返回true(真）
- `s.end() `：返回指向最后一个元素之后的迭代器，不是最后一个元素
- `s.equal_range()`：返回集合中与给定值相等的上下限的两个迭代器
- `s.erase()`：删除集合中的元素
- `s.find()`：返回一个指向被查找到元素的迭代器
- `s.get_allocator()`：返回集合的分配器
- `s.insert()`：在集合中插入元素
- `s.lower_bound()`：返回指向大于或等于某值的第一个元素的迭代器
- `s.key_comp()`：返回一个用于元素间值比较的函数
- `s.max_size()`：返回集合能容纳的元素的最大限值
- `s.rbegin()`：返回指向集合中最后一个元素的反向迭代器
- `s.rend()`：返回指向集合中第一个元素的反向迭代器
- `s.size()`：集合中元素的数目
- `s.swap()`：交换两个集合变量
- `s.upper_bound()`：返回大于某个值元素的迭代器
- `s.value_comp()`：返回一个用于比较元素间的值的函数

# STL-multiset

multiset与set的区别在于set中不能存在相同元素，而multiset中可以存在。

```cpp
multiset<int> s1;
multiset<double> s2;
```

multiset和set的常用函数相似。
需要注意的是，集合的count()能返回0(无)或者1(有)，而多重集合是返回准确的个数。

# STL-vector

定义：
```cpp
vector<int> s;	//  定义一个空的vector对象，存储的是int类型的元素
vector<int> s(n);	//  定义一个含有n个int元素的vector对象
vector<int> s(first, last);	//  定义一个vector对象，并从由迭代器first和last定义的序列[first, last)中复制初值
```

支持直接以下标方式访问容器中的元素：`s[i]`

常用函数：
- `s.front()`：返回首元素
- `s.back()`：返回尾元素
- `s.push_back(x)`：向表尾插入元素x
- `s.size()`：返回表长
- `s.empty()`：表为空时，返回真，否则返回假
- `s.pop_back()`：删除表尾元素
- `s.begin()`：返回指向首元素的随机存取迭代器
- `s.end()`：返回指向尾元素的下一个位置的随机存取迭代器
- `s.insert(it, val)`：向迭代器it指向的元素前插入新元素val
- `s.insert(it, n, val)`：向迭代器it指向的元素前插入n个新元素val
- `s.insert(it, first, last)`：将由迭代器first和last所指定的序列[first, last)插入到迭代器it指向的元素前面
- `s.erase(it)`：删除由迭代器it所指向的元素
- `s.erase(first, last)`：删除由迭代器first和last所指定的序列[first, last)
- `s.reserve(n)`：预分配缓冲空间，使存储空间至少可容纳n个元素
- `s.resize(n)`：改变序列长度，超出的元素将会全部被删除，如果序列需要扩展(原空间小于n)，元素默认值将填满扩展出的空间
- `s.resize(n, val)`：改变序列长度，超出的元素将会全部被删除，如果序列需要扩展(原空间小于n)，val将填满扩展出的空间
- `s.clear()`：删除容器中的所有元素
- `s.swap(v)`：将s与另一个vector对象进行交换
- `s.assign(first, last)`：将序列替换成由迭代器first和last所指定的序列[first, last)，[first, last)不能是原序列中的一部分

说明：
1. resize操作和clear操作都是对表的有效元素进行的操作，但并不一定会改变缓冲空间的大小
2. vector还有其他的一些操作，如反转、取反等
3. vector上还定义了序列之间的比较操作运算符(>、<、>=、<=、==、!=)，可以按照字典序比较两个序列

# STL-stack

定义：
```cpp
stack<int> s;
```

常用函数：
- `s.push(x)`：入栈
- `s.pop()`：出栈
- `s.top()`：访问栈顶
- `s.empty()`：当栈空时，返回true
- `s.size()`：访问栈中元素个数

# STL-queue

常用函数：
- `q.push(x)`：入队列
- `q.pop()`：出队列
- `q.front()`：访问队首元素
- `q.back()`：访问队尾元素
- `q.empty()`：判断队列是否为空
- `q.size()`：访问队列中的元素个数

# STL-priority_queue

定义：
```cpp
priority_queue<int> q1;
priority_queue<pair<int, int> > q2;	// 注意在两个尖括号之间一定要留空格，防止误判
priority_queue<int, vector<int>, greater<int>> q3;	// 定义小的先出队列
```

常用函数：
- `q.empty()`：如果队列为空，则返回true，否则返回false
- `q.size()`：返回队列中元素的个数
- `q.pop()`：删除队首元素，但不返回其值
- `q.top()`：返回具有最高优先级的元素值，但不删除该元素
- `q.push(item)`：在基于优先级的适当位置插入新元素

# STL-map

增加或修改：
- `m[key] = value`：[key]操作是map很有特色的操作，如果在map中存在键值为key的元素对，则返回该元素对的值域部分，否则将会创建一个键值为key的元素对，值域为默认值。所以可以用该操作向map中插入元素对或修改已经存在的元素对的值域部分。
- `m.insert(make_pair(key, value))`：也可以直接调用insert方法插入元素对，insert操作会返回一个pair，当map中没有与key相匹配的键值时，其first是指向插入元素对的迭代器，其second为true；若map中已经存在与key相等的键值时，其first是指向该元素对的迭代器,second为false。

删除：
- `m.erase(key)`：删除与指定key键值相匹配的元素对，并返回被删除的元素的个数。
- `m.erase(it)`：删除由迭代器it所指定的元素对，并返回指向下一个元素对的迭代器。

查找：
- `int i = m[key]`：要注意的是,当与该键值相匹配的元素对不存在时，会创建键值为key（当另一个元素是整形时，m[key]=0）的元素对。
- `map<string, int>::iterator it = m.find(key)`：如果map中存在与key相匹配的键值时，find操作将返回指向该元素对的迭代器；否则，返回的迭代器等于map的end()(参见vector中提到的begin()和end()操作)。

其他常用函数：
- `m.size()`：返回元素个数
- `m.empty()`：判断是否为空
- `m.clear()`：清空所有元素

二维map定义：
```cpp
map<string,map<string,int> > mp;
map<string,map<string,int> >::iterator it;
map<string,int>::iterator it2;
```

遍历：
```cpp
for (it = mp.begin(); it != mp.end(); it++) {
    cout << it->first <<endl;
    for (it2 = it->second.begin(); it2 != it->second.end(); it2++) {
        cout << "   |----" << it2->first << "(" << it2->second << ")" << endl;
    }
}
```

# STL-bitset

定义：
```cpp
const int MAXN = 32;	// 定义需要多少位
bitset<MAXN> bt;	// bt 包括 MAXN 位，下标 0 ~ MAXN - 1，默认初始化为 0
bitset<MAXN> bt1(0xf);	// 0xf 表示十六进制数 f，对应二进制 1111，将 bt1 低 4 位初始化为 1
bitset<MAXN> bt2(012);	// 012 表示八进制数 12，对应二进制 1010，即将 bt2 低 4 位初始化为 1010
bitset<MAXN> bt3("1010");	// 将 bt3 低 4 位初始化为 1010
bitset<MAXN> bt4(s, pos, n);	// 将 01 字符串 s 的 pos 位开始的 n 位初始化 bt4
```

支持直接以下标方式访问 bt 中在 pos 处的二进制位：`bt[pos]`

常用函数：
- `bt.any()`：bt 中是否存在置为 1 的二进制位
- `bt.none()`：bt 中是否不存在置为 1 的二进制位
- `bt.count()`：bt 中置为 1 的二进制位的个数
- `bt.size()`：bt 中二进制位的个数
- `bt.test(pos)`：bt 中在 pos 处的二进制位是否为 1
- `bt.set()`：把 bt 中所有二进制位都置为 1
- `bt.set(pos)`：把 bt 中在 pos 处的二进制位置为 1
- `bt.reset()`：把 bt 中所有二进制位都置为 0
- `bt.reset(pos)`：把 bt 中在pos处的二进制位置为0
- `bt.flip()`：把 bt 中所有二进制位逐位取反
- `bt.flip(pos)`：把 bt 中在 pos 处的二进制位取反
- `bt[pos].flip()`：把 bt 中在 pos 处的二进制位取反
- `bt.to_ulong()`：用 bt 中同样的二进制位返回一个 unsigned long 值

# STL-iterator

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main()
{
    vector<int> s;
    s.push_back(1);
    s.push_back(2);
    s.push_back(3);
    copy(s.begin(), s.end(), ostream_iterator<int> (cout, " "));
    cout << '\n';
    return 0;
}
```

# STL-algorithm

`min_element`/`max_element`：查找容器中的最小值/最大值

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main()
{
    vector<int> L;
    for (int i=0; i<10; i++) 
    {
        L.push_back(i);
    }
    vector<int>::iterator min_it = min_element(L.begin(), L.end());
    vector<int>::iterator max_it = max_element(L.begin(), L.end());
    cout << "Min is " << *min_it << endl;
    cout << "Max is " << *max_it << endl;
    return 0;
}
```

将v1的前三个元素复制到v2的中间（覆盖掉原来数据）：`copy(v1.begin(), v1.begin() + 3, v2.begin() + 4);`

在v2内部进行复制，注意参数2表示结束位置，结束位置不参与复制：`copy(v2.begin() + 4, v2.begin() + 7, v2.begin() + 2);`

# 补充

1. 万能头：`#include <bits/stdc++.h>`
