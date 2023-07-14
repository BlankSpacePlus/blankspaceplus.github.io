---
title: DFS与BFS的区别
date: 2021-03-23 17:22:24
summary: 本文分享DFS和BFS的区别。
mathjax: true
tags:
- 算法
categories:
- 算法分析与设计
---

广度优先遍历(BFS)算法先访问所有最近的子结点，然后再向下访问。
深度优先遍历(DFS)算法先沿着一条路不断向下访问，然后再访问同级结点。

从基本的定义和实现思路上看，DFS和BFS都是[递归](https://blankspace.blog.csdn.net/article/details/102224364)的。
BFS和DFS都有其非递归的实现方法，但需要借助线性数据结构。其中，BFS往往使用FIFO的队列作为辅助结构，而DFS往往使用LIFO的栈作为辅助结构。

[二叉树基本算法](https://blankspace.blog.csdn.net/article/details/101633969)中的前序遍历、中序遍历、后序遍历都是DFS，而层序遍历则是BFS。
[图](https://blankspace.blog.csdn.net/article/details/102463258)的邻接表和邻接矩阵实现也分别有其对应的BFS和DFS实现。

DFS和BFS的用途远不止用于树和图，其实很多搜索算法问题都使用到了DFS或BFS，当然，也许DP会更优化一些QAQ

如果觉得对这方面掌握的不是很好，建议先借助树和图掌握DFS和BFS的基本套路，再去刷题：
- [洛谷-搜索题单](https://www.luogu.com.cn/training/112#problems)
- [力扣-DFS专题](https://leetcode-cn.com/tag/depth-first-search/)
- [力扣-BFS专题](https://leetcode-cn.com/tag/breadth-first-search/)
