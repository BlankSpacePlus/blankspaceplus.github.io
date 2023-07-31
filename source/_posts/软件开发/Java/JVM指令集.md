---
title: JVM指令集
date: 2020-03-03 13:47:58
summary: 本文分享JDK20的JVM规范所提供的201个JVM指令。
tags:
- Java
- JVM
categories:
- Java
---

# 数据存取

## 从常量池取值并入栈

JVM的const系列指令是用于将常量值从常量池中加载到操作数栈中的指令。常量池是一个与类或接口相关联的表，其中包含各种常量值、符号引用等信息。在编译Java代码时，常量值通常会直接嵌入到代码中，而符号引用则会转化为对应的常量池索引。

这些指令可以用于直接操作常量值，从而方便地进行数值计算、字符串操作等。值得注意的是，const系列指令只能加载常量值，不能加载局部变量或数组元素等非常量值。

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `aconst_null` | 将null对象引用压入栈 | `ACONST_NULL` | 1 |
| `iconst_m1` | 将int类型常量-1压入栈 | `ICONST_M1` | 2 |
| `iconst_0` | 将int类型常量0压入栈 | `ICONST_0` | 3 |
| `iconst_1` | 将int类型常量1压入栈 | `ICONST_1` | 4 |
| `iconst_2` | 将int类型常量2压入栈 | `ICONST_2` | 5 |
| `iconst_3` | 将int类型常量3压入栈 | `ICONST_3` | 6 |
| `iconst_4` | 将int类型常量4压入栈 | `ICONST_4` | 7 |
| `iconst_5` | 将int类型常量5压入栈 | `ICONST_5` | 8 |
| `lconst_0` | 将long类型常量0压入栈 | `LCONST_0` | 9 |
| `lconst_1` | 将long类型常量1压入栈 | `LCONST_1` | 10 |
| `fconst_0` | 将float类型常量0压入栈 | `FCONST_0` | 11 |
| `fconst_1` | 将float类型常量1压入栈 | `FCONST_1` | 12 |
| `fconst_2` | 将float类型常量2压入栈 | `FCONST_2` | 13 |
| `dconst_0` | 将double类型常量0压入栈 | `DCONST_0` | 14 |
| `dconst_1` | 将double类型常量1压入栈 | `DCONST_1` | 15 |
| `bipush` | 将一个8位带符号整数压入栈 | `BIPUSH` | 16 |
| `sipush` | 将16位带符号整数压入栈 | `SIPUSH` | 17 |
| `ldc` | 把常量池中的项压入栈 | `LDC` | 18 |
| `ldc_w` | 把常量池中的项压入栈（使用宽索引） | `LDC_W` | 19 |
| `ldc2_w` | 把常量池中long类型或者double类型的项压入栈（使用宽索引） | `LDC2_W` | 20 |

## 从局部变量取值并入栈

在JVM中，局部变量是一段被分配给方法的栈内存。JVM会将方法参数、临时变量、方法返回值等存储在局部变量中。当JVM需要使用一个局部变量的值时，它需要进行load操作，将该值从局部变量表中加载到操作数栈中。

load操作是根据局部变量的类型来执行的，例如load操作可以是iload、fload、aload等。这些操作指令对应了不同类型的局部变量，比如iload对应int类型的局部变量，fload对应float类型的局部变量，aload对应引用类型的局部变量等。

在load操作中，JVM会使用索引来访问局部变量表中的某个变量，并将其压入操作数栈中。这个索引是一个从0开始的整数，表示局部变量表中的第几个位置。需要注意的是，JVM在load操作之前需要先检查该变量是否已经被正确初始化，如果变量没有被初始化或者该索引超出了局部变量表的范围，JVM将会抛出一个异常。

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `iload` | 从局部变量中装载int类型值 | `ILOAD` | 21 |
| `lload` | 从局部变量中装载long类型值 | `LLOAD` | 22 |
| `fload` | 从局部变量中装载float类型值 | `FLOAD` | 23 |
| `dload` | 从局部变量中装载double类型值 | `DLOAD` | 24 |
| `aload` | 从局部变量中装载引用类型值 | `ALOAD` | 25 |
| `iload_0` | 从局部变量0中装载int类型值 | `ILOAD_0` | 26 |
| `iload_1` | 从局部变量1中装载int类型值 | `ILOAD_1` | 27 |
| `iload_2` | 从局部变量2中装载int类型值 | `ILOAD_2` | 28 |
| `iload_3` | 从局部变量3中装载int类型值 | `ILOAD_3` | 29 |
| `lload_0` | 从局部变量0中装载long类型值 | `LLOAD_0` | 30 |
| `lload_1` | 从局部变量1中装载long类型值 | `LLOAD_1` | 31 |
| `lload_2` | 从局部变量2中装载long类型值 | `LLOAD_2` | 32 |
| `lload_3` | 从局部变量3中装载long类型值 | `LLOAD_3` | 33 |
| `fload_0` | 从局部变量0中装载float类型值 | `FLOAD_0` | 34 |
| `fload_1` | 从局部变量1中装载float类型值 | `FLOAD_1` | 35 |
| `fload_2` | 从局部变量2中装载float类型值 | `FLOAD_2` | 36 |
| `fload_3` | 从局部变量3中装载float类型值 | `FLOAD_3` | 37 |
| `dload_0` | 从局部变量0中装载double类型值 | `DLOAD_0` | 38 |
| `dload_1` | 从局部变量1中装载double类型值 | `DLOAD_1` | 39 |
| `dload_2` | 从局部变量2中装载double类型值 | `DLOAD_2` | 40 |
| `dload_3` | 从局部变量3中装载double类型值 | `DLOAD_3` | 41 |
| `aload_0` | 从局部变量0中装载引用类型值 | `ALOAD_0` | 42 |
| `aload_1` | 从局部变量1中装载引用类型值 | `ALOAD_1` | 43 |
| `aload_2` | 从局部变量2中装载引用类型值 | `ALOAD_2` | 44 |
| `aload_3` | 从局部变量3中装载引用类型值 | `ALOAD_3` | 45 |
| `iaload` | 从数组中装载int类型值 | `IALOAD` | 46 |
| `laload` | 从数组中装载long类型值 | `LALOAD` | 47 |
| `faload` | 从数组中装载float类型值 | `FALOAD` | 48 |
| `daload` | 从数组中装载double类型值 | `DALOAD` | 49 |
| `aaload` | 从数组中装载引用类型值 | `AALOAD` | 50 |
| `baload` | 从数组中装载byte类型或boolean类型值 | `BALOAD` | 51 |
| `caload` | 从数组中装载char类型值 | `CALOAD` | 52 |
| `saload` | 从数组中装载short类型值 | `SALOAD` | 53 |

## 从栈取值并存入局部变量

JVM支持将栈顶的值存储到当前方法的局部变量表中的某个位置上。这个过程需要指定存储到哪个位置，以及该位置所需的数据类型。

在JVM中，局部变量表是用来存储方法中的参数和局部变量的表格，每个局部变量表的位置都有一个编号，从0开始递增。在执行方法时，JVM会为方法分配一个局部变量表，并根据方法的参数和局部变量数量确定表格的大小。

当JVM需要从栈中store值到局部变量表时，需要指定存储到哪个位置，通常是通过局部变量表中的位置编号来指定。

JVM在执行store指令时，会将栈顶的值弹出，存储到指定的局部变量表位置上，并将该位置上的值的类型标记为已初始化。如果存储到的位置上已经存在一个值，该值将被覆盖。同时，如果指定的位置在局部变量表范围之外，或者存储的值与指定的位置所需的数据类型不匹配，将会抛出相应的异常。

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `istore` | 将int类型值存入局部变量 | `ISTORE` | 54 |
| `lstore` | 将long类型值存入局部变量 | `LSTORE` | 55 |
| `fstore` | 将float类型值存入局部变量 | `FSTORE` | 56 |
| `dstore` | 将double类型值存入局部变量 | `DSTORE` | 57 |
| `astore` | 将引用类型或returnAddress类型值存入局部变量 | `ASTORE` | 58 |
| `istore_0` | 将int类型值存入局部变量0 | `ISTORE_0` | 59 |
| `istore_1` | 将int类型值存入局部变量1 | `ISTORE_1` | 60 |
| `istore_2` | 将int类型值存入局部变量2 | `ISTORE_2` | 61 |
| `istore_3` | 将int类型值存入局部变量3 | `ISTORE_3` | 62 |
| `lstore_0` | 将long类型值存入局部变量0 | `LSTORE_0` | 63 |
| `lstore_1` | 将long类型值存入局部变量1 | `LSTORE_1` | 64 |
| `lstore_2` | 将long类型值存入局部变量2 | `LSTORE_2` | 65 |
| `lstore_3` | 将long类型值存入局部变量3 | `LSTORE_3` | 66 |
| `fstore_0` | 将float类型值存入局部变量0 | `FSTORE_0` | 67 |
| `fstore_1` | 将float类型值存入局部变量1 | `FSTORE_1` | 68 |
| `fstore_2` | 将float类型值存入局部变量2 | `FSTORE_2` | 69 |
| `fstore_3` | 将float类型值存入局部变量3 | `FSTORE_3` | 70 |
| `dstore_0` | 将double类型值存入局部变量0 | `DSTORE_0` | 71 |
| `dstore_1` | 将double类型值存入局部变量1 | `DSTORE_1` | 72 |
| `dstore_2` | 将double类型值存入局部变量2 | `DSTORE_2` | 73 |
| `dstore_3` | 将double类型值存入局部变量3 | `DSTORE_3` | 74 |
| `astore_0` | 将引用类型或returnAddress类型值存入局部变量0 | `ASTORE_0` | 75 |
| `astore_1` | 将引用类型或returnAddress类型值存入局部变量1 | `ASTORE_1` | 76 |
| `astore_2` | 将引用类型或returnAddress类型值存入局部变量2 | `ASTORE_2` | 77 |
| `astore_3` | 将引用类型或returnAddress类型值存入局部变量3 | `ASTORE_3` | 78 |
| `iastore` | 将int类型值存入数组中 | `IASTORE` | 79 |
| `lastore` | 将long类型值存入数组中 | `LASTORE` | 80 |
| `fastore` | 将float类型值存入数组中 | `FASTORE` | 81 |
| `dastore` | 将double类型值存入数组中 | `DASTORE` | 82 |
| `aastore` | 将引用类型值存入数组中 | `AASTORE` | 83 |
| `bastore` | 将byte类型或者boolean类型值存入数组中 | `BASTORE` | 84 |
| `castore` | 将char类型值存入数组中 | `CASTORE` | 85 |
| `sastore` | 将short类型值存入数组中 | `SASTORE` | 86 |

## 栈基本操作

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `nop` | 不做任何操作| `NOP` | 0 |
| `pop` | 弹出栈顶端1个字长的内容 | `POP` | 87 |
| `pop2` | 弹出栈顶端2个字长的内容 | `POP2` | 88 |
| `dup` | 复制栈顶部1个字长内容 | `DUP` | 89 |
| `dup_x1` | 复制栈顶部1个字长的内容，然后将复制内容及原来弹出的2个字长的内容压入栈 | `DUP_X1` | 90 |
| `dup_x2` | 复制栈顶部1个字长的内容，然后将复制内容及原来弹出的3个字长的内容压入栈 | `DUP_X2` | 91 |
| `dup2` | 复制栈顶部2个字长内容 | `DUP2` | 92 |
| `dup2_x1` | 复制栈顶部2个字长的内容，然后将复制内容及原来弹出的3个字长的内容压入栈 | `DUP2_X1` | 93 |
| `dup2_x1` | 复制栈顶部2个字长的内容，然后将复制内容及原来弹出的4个字长的内容压入栈 | `DUP2_X2` | 94 |
| `swap` | 交换栈顶部两个字长内容 | `SWAP` | 95 |

# 数值类型操作

## 数值运算

### 数值算术运算

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `iadd` | 执行int类型的加法 | `IADD` | 96 |
| `ladd` | 执行long类型的加法 | `LADD` | 97 |
| `fadd` | 执行float类型的加法 | `FADD` | 98 |
| `dadd` | 执行double类型的加法 | `DADD` | 99 |
| `isub` | 执行int类型的减法 | `ISUB` | 100 |
| `lsub` | 执行long类型的减法 | `LSUB` | 101 |
| `fsub` | 执行float类型的减法 | `FSUB` | 102 |
| `dsub` | 执行double类型的减法 | `DSUB` | 103 |
| `imul` | 执行int类型的乘法 | `IMUL` | 104 |
| `lmul` | 执行long类型的乘法 | `LMUL` | 105 |
| `fmul` | 执行float类型的乘法 | `FMUL` | 106 |
| `dmul` | 执行double类型的乘法 | `DMUL` | 107 |
| `idiv` | 执行int类型的除法 | `IDIV` | 108 |
| `ldiv` | 执行long类型的除法 | `LDIV` | 109 |
| `fdiv` | 执行float类型的除法 | `FDIV` | 110 |
| `ddiv` | 执行double类型的除法 | `DDIV` | 111 |
| `irem` | 计算int类型除法的余数 | `IREM` | 112 |
| `lrem` | 计算long类型除法的余数 | `LREM` | 113 |
| `frem` | 计算float类型除法的余数 | `FREM` | 114 |
| `drem` | 计算double类型除法的余数 | `DREM` | 115 |
| `ineg` | 对一个int类型值进行取反操作 | `INEG` | 116 |
| `lneg` | 对一个long类型值进行取反操作 | `LNEG` | 117 | 
| `fneg` | 将一个float类型的数值取反 | `FNEG` | 118 | 
| `dneg` | 将一个double类型的数值取反 | `DNEG` | 119 | 
| `iinc` | 把一个常量值加到一个int类型的局部变量上 | `IINC` | 132 | 

### 数值移位运算

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `ishl` | 执行int类型的向左移位操作 | `ISHL` | 120 | 
| `lshl` | 执行long类型的向左移位操作 | `LSHL` | 121 | 
| `ishr` | 执行int类型的向右移位操作 | `ISHR` | 122 | 
| `lshr` | 执行long类型的向右移位操作 | `LSHR` | 123 | 
| `iushr` | 执行int类型的向右逻辑移位操作 | `IUSHR` | 124 | 
| `lushr` | 执行long类型的向右逻辑移位操作 | `LUSHR` | 125 | 

### 数值逻辑运算

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `iand` | 对int类型值进行“逻辑与”操作 | `IAND` | 126 | 
| `land` | 对long类型值进行“逻辑与”操作 | `LAND` | 127 | 
| `ior` | 对int类型值进行“逻辑或”操作 | `IOR` | 128 | 
| `lor` | 对long类型值进行“逻辑或”操作 | `LOR` | 129 | 
| `ixor` | 对int类型值进行“逻辑异或”操作 | `IXOR` | 130 | 
| `lxor` | 对long类型值进行“逻辑异或”操作 | `LXOR` | 131 | 

### 数值比较运算

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `lcmp` | 比较long类型值 | `LCMP` | 148 | 
| `fcmpl` | 比较float类型值（当遇到NaN时，返回-1） | `FCMPL` | 149 | 
| `fcmpg` | 比较float类型值（当遇到NaN时，返回1） | `FCMPG` | 150 | 
| `dcmpl` | 比较double类型值（当遇到NaN时，返回-1） | `DCMPL` | 151 | 
| `dcmpg` | 比较double类型值（当遇到NaN时，返回1） | `DCMPG` | 152 |

## 数值类型转换

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `i2l` | 把int类型的数据转化为long类型 | `I2L` | 133 | 
| `i2f` | 把int类型的数据转化为float类型 | `I2F` | 134 | 
| `i2d` | 把int类型的数据转化为double类型 | `I2D` | 135 | 
| `l2i` | 把long类型的数据转化为int类型 | `L2I` | 136 | 
| `l2f` | 把long类型的数据转化为float类型 | `L2F` | 137 | 
| `l2d` | 把long类型的数据转化为double类型 | `L2D` | 138 | 
| `f2i` | 把float类型的数据转化为int类型 | `F2I` | 139 | 
| `f2l` | 把float类型的数据转化为long类型 | `F2L` | 140 | 
| `f2d` | 把float类型的数据转化为double类型 | `F2D` | 141 | 
| `d2i` | 把double类型的数据转化为int类型 | `D2I` | 142 | 
| `d2l` | 把double类型的数据转化为long类型 | `D2L` | 143 | 
| `d2f` | 把double类型的数据转化为float类型 | `D2F` | 144 | 
| `i2b` | 把int类型的数据转化为byte类型 | `I2B` | 145 | 
| `i2c` | 把int类型的数据转化为char类型 | `I2C` | 146 | 
| `i2s` | 把int类型的数据转化为short类型 | `I2S` | 147 | 

# 对象类型操作

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `new` | 创建一个新对象 | `NEW` | 187 | 
| `getstatic` | 从类中获取静态字段 | `GETSTATIC` | 178 | 
| `putstatic` | 设置类中静态字段的值 | `PUTSTATIC` | 179 | 
| `getfield` | 从对象中获取字段 | `GETFIELD` | 180 | 
| `putfield` | 设置对象中字段的值 | `PUTFIELD` | 181 | 
| `checkcast` | 确定对象为所给定的类型 | `CHECKCAST` | 192 | 
| `instanceof` | 判断对象是否为给定的类型 | `INSTANCEOF` | 193 | 

# 数组类型操作

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `newarray` | 分配数据成员类型为基本上数据类型的新数组 | `NEWARRAY` | 188 | 
| `anewarray` | 分配数据成员类型为引用类型的新数组 | `ANEWARRAY` | 189 | 
| `arraylength` | 获取数组长度 | `ARRAYLENGTH` | 190 | 
| `multianewarray` | 分配新的多维数组 | `MULTIANEWARRAY` | 197 | 

# 流程控制

## 条件比较判断

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `ifeq` | 如果等于0，则跳转 | `IFEQ` | 153 | 
| `ifne` | 如果不等于0，则跳转 | `IFNE` | 154 | 
| `iflt` | 如果小于0，则跳转 | `IFLT` | 155 | 
| `ifge` | 如果大于等于0，则跳转 | `IFGE` | 156 | 
| `ifgt` | 如果大于0，则跳转 | `IFGT` | 157 | 
| `ifle` | 如果小于等于0，则跳转 | `IFLE` | 158 | 
| `if_icmpeq` | 如果两个int值相等，则跳转 | `IF_ICMPEQ` | 159 | 
| `if_icmpne` | 如果两个int类型值不相等，则跳转 | `IF_ICMPNE` | 160 | 
| `if_icmplt` | 如果一个int类型值小于另外一个int类型值，则跳转 | `IF_ICMPLT` | 161 | 
| `if_icmpge` | 如果一个int类型值大于或者等于另外一个int类型值，则跳转 | `IF_ICMPGE` | 162 | 
| `if_icmpgt` | 如果一个int类型值大于另外一个int类型值，则跳转 | `IF_ICMPGT` | 163 | 
| `if_icmple` | 如果一个int类型值小于或者等于另外一个int类型值，则跳转 | `IF_ICMPLE` | 164 | 
| `if_acmpeq` | 如果两个对象引用相等，则跳转 | `IF_ACMPEQ` | 165 | 
| `if_acmpnc` | 如果两个对象引用不相等，则跳转 | `IF_ACMPNE` | 166 | 
| `ifnull` | 如果等于null，则跳转 | `IFNULL` | 198 | 
| `ifnonnull` | 如果不等于null，则跳转 | `IFNONNULL` | 199 | 

## 无条件跳转

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `goto` | 无条件跳转 | `GOTO` | 167 | 
| `goto_w` | 无条件跳转（宽索引） | `GOTO_W` | 200 | 

## 跳转表跳转

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `tableswitch` | 通过索引访问跳转表，并跳转 | `TABLESWITCH` | 170 | 
| `lookupswitch` | 通过键值匹配访问跳转表，并执行跳转操作 | `LOOKUPSWITCH` | 171 | 

# 方法执行

## 方法调用

JVM提供invoke指令用于方法调用。这些指令的调用会导致操作数栈和局部变量表的改变，具体的改变取决于调用的方法的返回值和参数类型。这些指令的使用要遵循特定的规则，包括参数类型和数量的匹配，访问权限等。在JVM执行过程中，这些规则的违反将导致指令无法正常执行并抛出异常。

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `invokevirtual` | 运行时按照对象的类来调用实例方法 | `INVOKEVIRTUAL` | 182 | 
| `invokespecial` | 根据编译时类型来调用实例方法 | `INVOKESPECIAL` | 183 | 
| `invokestatic` | 调用静态方法 | `INVOKESTATIC` | 184 | 
| `invokeinterface` | 调用接口方法 | `INVOKEINTERFACE` | 185 | 
| `invokedynamic` | 调用运行时动态绑定方法 | `INVOKEDYNAMIC` | 186 | 

## 方法返回

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `ireturn` | 从方法中返回int类型的数据 | `IRETURN` | 172 | 
| `lreturn` | 从方法中返回long类型的数据 | `LRETURN` | 173 | 
| `freturn` | 从方法中返回float类型的数据 | `FRETURN` | 174 | 
| `dreturn` | 从方法中返回double类型的数据 | `DRETURN` | 175 | 
| `areturn` | 从方法中返回引用类型的数据 | `ARETURN` | 176 | 
| `return` | 从方法中返回，返回值为void | `RETURN` | 177 | 

# 异常处理

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `jsr` | 跳转到子例程 | `JSR` | 168 | 
| `ret` | 从子例程返回 | `RET` | 169 | 
| `athrow` | 抛出异常或错误 | `ATHROW` | 191 | 
| `jsr_w` | 跳转到子例程（宽索引） | `JSR_W` | 201 | 

# 线程同步

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `montiorenter` | 进入并获取对象监视器 | `MONITORENTER` | 194 | 
| `monitorexit` | 释放并退出对象监视器 | `MONITOREXIT` | 195 | 

# 其他操作

| JVM指令 | 指令操作 | Classfile常量 | Classfile指令编号 |
|:----:|:----:|:----:|:----:|
| `wide` | 使用附加字节扩展局部变量索引 | `WIDE` | 196 | 

# 指令总结

下表总结了JVM指令集中的类型支持。通过用类型列中的字母替换操作码列中指令模板中的`T`来构建具有类型信息的特定指令。如果某些指令模板和类型的类型列为空白，则不存在支持该类型操作的指令。比如int类型有加载指令`iload`，而byte类型没有加载指令。

| JVM指令 | byte | short | int | long | float | double | char | reference |
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
| Tipush | bipush | sipush |   |   |   |   |   |   |
| Tconst |   |   | iconst | lconst | fconst | dconst |   | aconst |
| Tload |   |   | iload | lload | fload | dload |   | aload |
| Tstore |   |   | istore | lstore | fstore | dstore |   | astore |
| Tinc |   |   | iinc |   |   |   |   |   |
| Taload | baload | saload | iaload | laload | faload | daload | caload | aaload |
| Tastore | bastore | sastore | iastore | lastore | fastore | dastore | castore | aastore |
| Tadd |   |   | iadd | ladd | fadd | dadd |   |   |
| Tsub |   |   | isub | lsub | fsub | dsub |   |   |
| Tmul |   |   | imul | lmul | fmul | dmul |   |   |
| Tdiv |   |   | idiv | ldiv | fdiv | ddiv |   |   |
| Trem |   |   | irem | lrem | frem | drem |   |   |
| Tneg |   |   | ineg | lneg | fneg | dneg |   |   |
| Tshl |   |   | ishl | lshl |   |   |   |   |
| Tshr |   |   | ishr | lshr |   |   |   |   |
| Tushr |   |   | iushr | lushr |   |   |   |   |
| Tand |   |   | iand | land |   |   |   |   |
| Tor |   |   | ior | lor |   |   |   |   |
| Txor |   |   | ixor | lxor |   |   |   |   |
| i2T | i2b | i2s |   | i2l | i2f | i2d |   |   |
| l2T |   |   | l2i |   | l2f | l2d |   |   |
| f2T |   |   | f2i | f2l |   | f2d |   |   |
| d2T |   |   | d2i | d2l | d2f |   |   |   |
| Tcmp |   |   |   | lcmp |   |   |   |   |
| Tcmpl |   |   |   |   | fcmpl | dcmpl |   |   |
| Tcmpg |   |   |   |   | fcmpg | dcmpg |   |   |
| if_TcmpOP |   |   | if_icmpOP |   |   |   |   | if_acmpOP |
| Treturn |   |   | ireturn | lreturn | freturn | dreturn |   | areturn |

# 官方文档

推荐阅读：[JDK20官方文档-JVM指令集](https://docs.oracle.com/javase/specs/jvms/se20/html/jvms-6.html)
