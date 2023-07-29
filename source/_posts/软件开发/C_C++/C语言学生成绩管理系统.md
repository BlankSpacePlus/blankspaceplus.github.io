---
title: C语言学生成绩管理系统
date: 2019-10-03 20:27:40
summary: 本文发布一个C语言开发的学生成绩管理系统。
tags:
- C语言
categories:
- 开发技术
---

# 开发环境

C版本：C99
IDE：CLion
C编译器：MinGW
数据结构：无序单链表

# 头文件选择

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
```

# 常量定义

课程容量：
```c
#define MAXSIZE 100
```

课程门数：
```c
#define COURSENUM 6
```

# 结构体定义

```c
typedef struct student {
    int num; // 学号
    char name[20]; // 姓名
    float score[COURSENUM]; // 各门课的成绩
    float ave; // 平均分
} StuType;

typedef struct Students {
    StuType *elem; // 学生数组空间起始地址
    int length; // 学生实际个数
} Students;
```

# 函数API定义

- `void create(Students *sa, int n)`
- `void display(Students sa)`
- `void searchByNum(Students sa, int num)`
- `void searchByName(Students sa, char *name)`
- `void add(Students *sa)`
- `void deleteByName(Students *sa, int num)`
- `void modifyByName(Students *sa, int num)`
- `void average(Students *sa)`
- `void sortByCourse(Students *sa)`
- `void sortByCourse2(Students *sa, int course)`
- `void level(Students sa)`
- `void levelByCourse(Students sa, int course)`

# 完整代码

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXSIZE 100     //课程最多人数
#define COURSENUM 6     //课程门数

typedef struct student {
    int num;                    //学号
    char name[20];              //姓名
    float score[COURSENUM];     //各门课的成绩
    float ave;                  //平均分
} StuType;

typedef struct Students {
    StuType *elem;              //学生数组空间起始地址
    int length;                 //学生实际个数
} Students;

void create(Students *sa, int n) {
    int i, j;
    char temp;
    float ave = 0, sum = 0;
    for (i = 0; i < n; i++) {
        printf("请输入第%d个学生的信息：\n", i+1);
        printf("学号：");
        scanf("%d%c", &sa->elem[i].num, &temp);
        //为了姓名读入正确，需要去掉录入学号信息时输入的回车
        printf("姓名：");
        gets(sa->elem[i].name);
        printf("六门课的成绩：英语、哲学、高等数学、数据结构、操作系统、计算机网络：");
        for (j = 0; j < COURSENUM; j++) {
            scanf("%f", &sa->elem[i].score[j]);
            sum+=sa->elem[i].score[j];
        }
        sa->elem[i].ave = sum/COURSENUM;
        sa->length = n;
        sum = 0;
    }
}

void display(Students sa) {
    int i, j;
    printf("%d个学生的信息如下：\n", sa.length);
    printf("学号、姓名、英语、哲学、高等数学、数据结构、操作系统、计算机网络、平均分\n");
    for (i = 0; i < sa.length; i++) {
        printf("%d  %s", sa.elem[i].num, sa.elem[i].name);
        for (j = 0; j < COURSENUM; j++) {
            printf("%8.1f", sa.elem[i].score[j]);
        }
        printf("%8.1f\n", sa.elem[i].ave);
    }
}

void searchByNum(Students sa, int num) {
    int i, j;
    for (i = 0; i < sa.length; i++) {
        if (sa.elem[i].num == num) {
            printf("学号、姓名、英语、哲学、高等数学、数据结构、操作系统、计算机网络、平均分\n");
            printf("%d  %s", sa.elem[i].num, sa.elem[i].name);
            for (j = 0; j < COURSENUM; j++) {
                printf("%8.1f", sa.elem[i].score[j]);
            }
            printf("%8.1f\n", sa.elem[i].ave);
            break;
        }
    }
    if (i == sa.length){
        printf("查无此人！\n");
    }
}

void searchByName(Students sa, char *name) {
    int i, j, flag = 0;
    for (i = 0; i < sa.length; i++) {
        if (strcmp(sa.elem[i].name, name) == 0) {
            printf("学号、姓名、英语、哲学、高等数学、数据结构、操作系统、计算机网络、平均分\n");
            printf("%d  %s", sa.elem[i].num, sa.elem[i].name);
            for (j = 0; j < COURSENUM; j++) {
                printf("%8.1f", sa.elem[i].score[j]);
            }
            printf("%8.1f\n", sa.elem[i].ave);
            flag = 1;
            break;
        }
    }
    if (!flag) {
        printf("查无此人！\n");
    }
}

void add(Students *sa) {
    int i;
    float sum = 0;
    char temp;
    printf("请输入该学生的信息：\n");
    printf("学号：");
    scanf("%d%c", &sa->elem[sa->length].num, &temp);
    //为了姓名读入正确，需要去掉录入学号信息时输入的回车
    printf("姓名：");
    gets(sa->elem[sa->length].name);
    printf("六门课的成绩：英语、哲学、高等数学、数据结构、操作系统、计算机网络：");
    for (i = 0; i < COURSENUM; i++) {
        scanf("%f", &sa->elem[sa->length].score[i]);
        sum+=sa->elem[sa->length].score[i];
    }
    sa->elem[sa->length].ave = sum/COURSENUM;
    sa->length++;
}

void deleteByName(Students *sa, int num) {
    int i, j, flag = 0;
    for (i = 0; i < sa->length; i++) {
        if (sa->elem[i].num == num) {
            for (j = i; j < sa->length; j++) {
                sa->elem[j] = sa->elem[j+1];
            }
            sa->length--;
            flag = 1;
            break;
        }
    }
    if (!flag) {
        printf("查无此人！\n");
    }
}

void modifyByName(Students *sa, int num) {
    int selected;
    int i, flag = 0;
    char temp;
    for (int i = 0; i < sa->length; i++) {
        if (sa->elem[i].num == num) {
            for (;;) {
                printf("------请选择要修改的项目：------\n");
                printf("        1:姓名\n");
                printf("        2:英语成绩\n");
                printf("        3:哲学成绩\n");
                printf("        4:高等数学成绩\n");
                printf("        5:数据结构成绩\n");
                printf("        6:操作系统成绩\n");
                printf("        7:计算机网络成绩\n");
                printf("        8:返回主菜单\n");
                scanf("%d", &selected);
                scanf("%c", &temp);
                switch (selected) {
                    case 1:
                        printf("请输姓名：");
                        gets(sa->elem[i].name);
                        break;
                    case 2:
                        printf("请输入英语成绩：");
                        scanf("%f", &sa->elem[i].score[0]);
                        average(sa);
                        break;
                    case 3:
                        printf("请输入哲学成绩：");
                        scanf("%f", &sa->elem[i].score[1]);
                        average(sa);
                        break;
                    case 4:
                        printf("请输入高等数学成绩：");
                        scanf("%f", &sa->elem[i].score[2]);
                        average(sa);
                        break;
                    case 5:
                        printf("请输入数据结构成绩：");
                        scanf("%f", &sa->elem[i].score[3]);
                        average(sa);
                        break;
                    case 6:
                        printf("请输入操作系统成绩：");
                        scanf("%f", &sa->elem[i].score[4]);
                        average(sa);
                        break;
                    case 7:
                        printf("请输入计算机网络成绩：");
                        scanf("%f", &sa->elem[i].score[5]);
                        average(sa);
                        break;
                    case 8:
                        return;
                }
            }
            flag = 1;
            break;
        }
    }
    if (!flag) {
        printf("查无此人！\n");
    }
}

void average(Students *sa) {
    int i, j;
    float ave = 0, sum = 0;
    for (j = 0; j < COURSENUM; j++) {
        scanf("%f", &sa->elem[i].score[j]);
        sum+=sa->elem[i].score[j];
    }
    sa->elem[sa->length].ave = sum/COURSENUM;
}

void sortByCourse(Students *sa) {
    int selected;
    for (;;) {
        printf("------请选择排序依据的科目：------\n");
        printf("        1:英语\n");
        printf("        2:哲学\n");
        printf("        3:高等数学\n");
        printf("        4:数据结构\n");
        printf("        5:操作系统\n");
        printf("        6:计算机网络\n");
        printf("        7:返回主菜单\n");
        scanf("%d", &selected);
        switch (selected) {
            case 1:
                sortByCourse2(sa, 0);
                break;
            case 2:
                sortByCourse2(sa, 1);
                break;
            case 3:
                sortByCourse2(sa, 2);
                break;
            case 4:
                sortByCourse2(sa, 3);
                break;
            case 5:
                sortByCourse2(sa, 4);
                break;
            case 6:
                sortByCourse2(sa, 5);
                break;
            case 7:
                return;
        }
    }
}

void sortByCourse2(Students *sa, int course) {
    int i, j, max;
    StuType stu;
    for (i = 0; i < sa->length; i++) {
        max = i;
        for (j = i+1; j < sa->length; i++) {
            if (sa->elem[j].score[course] > sa->elem[max].score[course]) {
                max = j;
            }
        }
        if (max != i) {
            stu.num = sa->elem[i].num;
            strcpy(stu.name, sa->elem[i].name);
            for (j = 0; j < COURSENUM; j++) {
                stu.score[j] = sa->elem[i].score[j];
            }
            sa->elem[i].num = sa->elem[max].num;
            strcpy(sa->elem[i].name, sa->elem[max].name);
            for (j = 0; j < COURSENUM; j++) {
                sa->elem[i].score[j] = sa->elem[max].score[j];
            }
            sa->elem[max].num = stu.num;
            strcpy(sa->elem[max].name, stu.name);
            for (j = 0; j < COURSENUM; j++) {
                sa->elem[max].score[j] = stu.score[j];
            }
        }
    }
}

void level(Students sa) {
    int selected;
    for (;;) {
        printf("------请选择统计分数段的科目：------\n");
        printf("        1:英语\n");
        printf("        2:哲学\n");
        printf("        3:高等数学\n");
        printf("        4:数据结构\n");
        printf("        5:操作系统\n");
        printf("        6:计算机网络\n");
        printf("        7:返回主菜单\n");
        scanf("%d", &selected);
        switch (selected) {
            case 1:
                levelByCourse(sa, 0);
                break;
            case 2:
                levelByCourse(sa, 1);
                break;
            case 3:
                levelByCourse(sa, 2);
                break;
            case 4:
                levelByCourse(sa, 3);
                break;
            case 5:
                levelByCourse(sa, 4);
                break;
            case 6:
                levelByCourse(sa, 5);
                break;
            case 7:
                return;
        }
    }
}

void levelByCourse(Students sa, int course) {
    int num[6] = {0}, i, j;
    for (int i = 0; i < sa.length; i++) {
        if (sa.elem[i].score[course] < 60) {
            num[0]++;
        } else if (sa.elem[i].score[course] < 70) {
            num[1]++;
        } else if (sa.elem[i].score[course] < 80) {
            num[2]++;
        } else if (sa.elem[i].score[course] < 90) {
            num[3]++;
        } else {
            num[4]++;
        }
    }
    switch (course) {
        case 0:
            printf("英语成绩分数段分布人数：60分以下、60~69分、70~79分、80~89分、90分以上分别为：\n");
            break;
        case 1:
            printf("哲学成绩分数段分布人数：60分以下、60~69分、70~79分、80~89分、90分以上分别为：\n");
            break;
        case 2:
            printf("高等数学成绩分数段分布人数：60分以下、60~69分、70~79分、80~89分、90分以上分别为：\n");
            break;
        case 3:
            printf("数据结构成绩分数段分布人数：60分以下、60~69分、70~79分、80~89分、90分以上分别为：\n");
            break;
        case 4:
            printf("操作系统成绩分数段分布人数：60分以下、60~69分、70~79分、80~89分、90分以上分别为：\n");
            break;
        case 5:
            printf("计算机网络成绩分数段分布人数：60分以下、60~69分、70~79分、80~89分、90分以上分别为：\n");
            break;
    }
    for (int i = 0; i < 5; i++) {
        printf("%6d", num[i]);
    }
    printf("\n");
}

int main() {
    int selected = 10, count, num;
    Students sa;
    char name[20], temp;
    sa.elem = (StuType *)malloc(sizeof(StuType)*MAXSIZE);
    for (;;) {
        printf("------本程序为学生程序管理系统，请选择系统功能：------\n");
        printf("        1:录入全部学生信息\n");
        printf("        2:按学号查询学生信息\n");
        printf("        3:按姓名查询学生信息\n");
        printf("        4:添加一个学生信息\n");
        printf("        5:按学号删除学生信息\n");
        printf("        6:按学号修改学生信息\n");
        printf("        7:显示所有学生信息\n");
        printf("        8:按课程成绩从高到低显示所有学生信息\n");
        printf("        9:按分数段统计学生信息\n");
        printf("        0:退出程序\n");
        scanf("%d", &selected);
        switch (selected) {
            case 1:
                printf("请输入学生个数：");
                scanf("%d", &count);
                create(&sa, count);
                break;
            case 2:
                printf("请输入要查询的学生的学号：");
                scanf("%d", &num);
                searchByNum(sa, num);
                break;
            case 3:
                //将菜单选择时键入的回车符删掉
                scanf("%c", &temp);
                printf("请输入要查询的学生的姓名：");
                gets(name);
                searchByName(sa, name);
                break;
            case 4:
                add(&sa);
                break;
            case 5:
                printf("请输入要删除的学生的学号：");
                scanf("%d", &num);
                deleteByName(&sa, num);
                break;
            case 6:
                printf("请输入要修改信息的学生的学号：");
                scanf("%d", &num);
                modifyByName(&sa, num);
                break;
            case 7:
                display(sa);
                break;
            case 8:
                sortByCourse(&sa);
                break;
            case 9:
                level(sa);
                break;
            case 0:
                return 0;
        }
    }
    return 0;
}
```
