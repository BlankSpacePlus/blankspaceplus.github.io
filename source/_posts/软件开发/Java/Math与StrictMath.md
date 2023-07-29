---
title: Math与StrictMath
date: 2019-05-22 21:06:12
summary: 本文分享java.lang.Math和java.lang.StrictMath的相关内容。
tags:
- Java
categories:
- 开发技术
---

# Math与StrictMath

java.lang.Math和java.lang.StrictMath都是Java中的数学工具类，提供了一系列常用的数学运算方法，如绝对值、幂运算、三角函数、对数函数等。

java.lang.Math和java.lang.StrictMath都属于Java标准库，是Java语言提供的数学工具类。两者都提供了相似的数学运算方法，可以进行常见的数学计算和操作。

java.lang.Math与java.lang.StrictMath的区别：
- 精度：java.lang.Math方法的实现可以是平台特定的，它们的精度和性能可能有所差异，但通常提供了较好的性能。而java.lang.StrictMath则保证了在不同平台上的一致精度，其方法的实现是严格按照规范来实现的，可以提供更高的数学精确度。
- 异常处理：java.lang.Math中的方法在计算过程中可能会产生特殊值（如NaN、无穷大等），并且在计算异常情况下返回这些特殊值。而java.lang.StrictMath则采用了严格的异常处理方式，如果计算过程中出现异常，会抛出异常，而不会返回特殊值。
- 使用场景：一般情况下，使用java.lang.Math即可满足大部分数学运算的需求，它具有良好的性能和通用性。而java.lang.StrictMath主要用于那些对数学精度要求非常高的场景，或者需要确保在不同平台上结果一致的情况下使用。
- 性能：虽然java.lang.StrictMath提供了更高的精度和严格的异常处理，但在绝大多数情况下，java.lang.Math已经足够满足常规的数学运算需求，并且性能更好。因此，一般情况下推荐使用java.lang.Math。只有在确实需要更高的精确度或严格的异常处理时，才需要考虑使用java.lang.StrictMath。

# java.lang.Math

## 静态常量

`java.lang.Math`类，它有两个静态的属性(类变量)：`E`和`PI`。

## 方法

`java.lang.Math`类的静态方法：
1. `abs(...a)`：作用是返回参数的绝对值
参数可以是double、float、int、long四种，返回对应的类型
2. `acos(double a)`：作用是返回参数的反余弦函数的值
参数是double型，返回浮点数从0.0到π，π也是以浮点数呈现
输入数据限定-1到1，否则会返回NaN(非数)
3. `addExact(...x, ...y)`：作用是返回两参数的和（求和）
参数是int+int或者long+long,返回对应类型的数值
一旦求和后结果发生溢出会抛出异常
4. `asin(double a)`：作用是返回参数的反正弦函数的值
参数是double型，返回浮点数从-π/2到π/2，π也是以浮点数呈现
输入数据限定-1到1，否则会返回NaN(非数)
5. `atan​(double a)`：作用是返回参数的反正切函数的值
参数是double型，返回浮点数从-π/2到π/2，π也是以浮点数呈现
POSITIVE_INFINITY和NEGATIVE_INFINITY不能用做参数的
6. `atan2​(double y,double x)`：作用是返回从直角坐标（x，y）转换为极坐标（r，θ）的θ角
返回double型
7. `cbrt​(double a)`：作用是返回参数的立方根
返回double型
8. `ceil​(double a)`：作用是返回大于或等于参数且数值上等于整数的最小（最接近负无穷大）的浮点数
返回double型
解释的通俗点就是向上取整后转成数学上相等的double型
9. `copySign​(...magnitude, ...sign)`：返回第一个参数，它会带上第二个浮点参数符号（+/-）
参数可以是double、float两种，返回对应的类型
返回double型
10. `cos​(double a)`：作用是返回参数的余弦函数的值
返回double型
11. `cosh​(double x)`：作用是返回参数的双曲余弦函数的值
返回double型
12. `decrementExact​(...a)`：作用是返回参数-1的值
参数可以是int、long两种，返回对应的类型
一旦-1后结果发生溢出会抛出异常
13. `exp​(double a)`：作用是返回e^a，以e为底的指数函数
返回double型
14. `expm1​(double x)`：作用是返回(e^a)-1，以e为底的指数函数值-1
返回double型
15. `floor​(double a)`：作用是返回小于或等于参数且数值上等于整数的最大（最接近正无穷大）的浮点数
返回double型
16. `floorDiv​(...x, ...y)`：作用是返回小于或等于代数运算所得商的最大（最接近正无穷大）值
参数可以是int+int、long+int、long+long三种
int+int返回int，其余两个返回long
17. `floorMod​(...x, ...y)`：作用是返回小于或等于代数运算所得模的最大（最接近正无穷大）值
参数可以是int+int、long+int、long+long三种
int+int返回int，其余两个返回long
18. `fma​(...a, ...b, ...c)`：作用是返回前两个数相加后与第三个数相乘得到的值
参数可以是double+double+double、float+float+float两种，返回对应的类型
19. `getExponent​(...d/f)`：作用是返回无偏指数
参数可以是double d、float f两种
返回int
无偏指数的内容参考：[IEEE-754](https://www.jianshu.com/p/8ee02e9bb57d)
20. `hypot​(double x, double y)`：作用是返回没有中间溢出或下溢的sqrt（x^2 + y^2）
返回double型
21. `IEEEremainder​(double f1, double f2)`：作用是根据IEEE754标准的规定，对两个参数计算剩余操作
返回double型
22. `incrementExact​(...a)`：作用是返回参数+1
参数可以是int、long两种，返回对应的类型
一旦+1后结果发生溢出会抛出异常
23. `log​(double a)`：作用是返回参数的自然对数（以e为底a的对数）
返回double型
24. `log10​(double a)`：作用是返回参数的常用对数（以10为底a的对数）
返回double型
25. `log1p​(double x)`：作用是返回参数+1后取的自然对数（以e为底a+1的对数）
返回double型
26. `max​(...a, ...b)`：作用是返回两个数里最大的（相对更大的）一个数
参数可以是double+double、float+float、int+int、long+long四种，返回对应的类型
27. `min​(...a, ...b)`：作用是返回两个数里最小的（相对更小的）一个数
参数可以是double+double、float+float、int+int、long+long四种，返回对应的类型
28. `multiplyExact​(...x, ...y)`：作用是返回两个数的乘积
参数可以是int+int、long+int、long+long三种
int+int返回int，其余两个返回long
一旦做乘积后结果发生溢出会抛出异常
29. `multiplyFull​(int x, int y)`：作用是返回参数的精确的数学乘积
参数为int，返回long
30. `multiplyHigh​(long x,long y)`：作用是作为一个long返回两个64位因子的128位积中最重要的64位
返回long
31. `negateExact​(...a)`：作用是返回参数的相反数
参数可以是int、long两种,返回对应的类型
取相反数后如果溢出会抛出异常
32. `nextAfter​(...start, ...direction)`：作用是返回第二个参数方向上与第一个参数相邻的浮点数
 参数可以是double+double、float+double两种
 返回值随第一个参数走
33. `nextDown​(...d/f)`：作用是返回在负无穷大方向上与d/f相邻的浮点值
参数可以是double d、float f两种，返回对应的类型
34. `nextUp​(...d/f)`：作用是返回在正无穷大方向上与d/f相邻的浮点值
参数可以是double d、float f两种，返回对应的类型
和上面的33.nextDown​(...)方法类似，不做赘述
35. `pow​(double a, double b)`：作用是返回第一个参数的第二个参数次幂（a^b）
返回double型
36. `random()`：作用是返回一个介于0.0和1.0之间的（伪随机）正数
37. `rint​(double a)`：作用是返回在数学上等于与参数值最接近且是整数的double
返回double型
解释的通俗一点就是四舍五入后取数学上相等的double型浮点
38. `round​(...a)`：作用是返回参数四舍五入后的整数值
参数可以是double、float两种
double参数返回long，float参数返回int
39. `scalb​(...d/f, nt scaleFactor)`：作用是返回d ×2^scaleFactor 
参数可以是double d、float f两种，返回对应的类型
相当于浮点×double的感觉
40. `signum​(...d/f)`：作用是返回符号函数的值
参数可以是double d 、float f两种，返回对应的类型
啰嗦点说就是返回参数的signum函数：如果参数为零，则返回零；如果参数大于零，则返回1.0；如果参数小于零，则返回-1.0
41. `sin​(double a)`：作用是返回参数的正弦函数的值
返回double型
42. `sinh​(double x)`：作用是返回参数的双曲正弦函数的值
返回double型
43. `sqrt​(double a)`：作用是返回四舍五入后的参数的平方根值
返回double型
44. `subtractExact​(...x, ...y)`：作用是返回两参数的差
参数可以是int+int、long+long两种，返回对应的类型
结果如果超出相应范围则抛出异常
45. `tan​(double a)`：作用是返回参数的正切函数的值
返回double型
46. `tanh​(double x)`：作用是返回参数双曲正切函数的值
返回double型
47. `toDegrees​(double angrad)`：作用是将以弧度度量的角度转换为以度度量的近似等效角度
返回double型
48. `toIntExact​(long value)`：作用是将long转换成对应的int值输出
返回int
如果超出int值的范围则抛出异常
49. `toRadians​(double angdeg)`：作用是将以度为单位的角度转换为以弧度为单位的近似等效角度
返回double型
50. `ulp​(...d/f)`：作用是返回参数的ULP大小
参数可以是double d、float f两种,返回对应的类型

## 参考代码

```java
public class MathDemo {
	public static void main(String[] args){
		/*--------下面是三角运算--------*/
		System.out.println("**--------下面是三角运算--------**");
		//将弧度转化为角度
		System.out.println("Math.toDegrees(1.57):" + Math.toDegrees(1.57));
		//将角度转化为弧度
		System.out.println("Math.toRadians(90):" + Math.toRadians(90));
		//计算反余弦，返回的角度在0.0到π之间
		System.out.println("Math.acos(1.2):" + Math.acos(1.2));
		//计算反正弦，返回的角度在-π/2到π/2之间
		System.out.println("Math.asin(0.8):" + Math.asin(0.8));
		//计算反正切，返回的角度在-π/2到π/2之间
		System.out.println("Math.atan(2.3):" + Math.atan(2.3));
		//计算三角余弦
		System.out.println("Math.cos(1.57):" + Math.cos(1.57));
		//计算双曲余弦
		System.out.println("Math.cosh(1.2):" + Math.cosh(1.2));
		//计算三角正弦
		System.out.println("Math.sin(1.57):" + Math.sin(1.57));
		//计算双曲正弦
		System.out.println("Math.sinh(1.2):" + Math.sinh(1.2));
		//计算三角正切
		System.out.println("Math.tan(0.8):" + Math.tan(0.8));
		//计算双曲正切
		System.out.println("Math.tanh(2.1):" + Math.tanh(2.1));
		//将直角坐标(x,y)转换成极坐标(r,thet)
		System.out.println("Math.atan2(0.1, 0.2):" + Math.atan2(0.1, 0.2));
		/*--------下面是取整运算--------*/
		System.out.println("**--------下面是取整运算--------**");
		//取整，返回小于目标数的最大整数
		System.out.println("Math.floor(-1.2):" + Math.floor(-1.2));
		//取整，返回大于目标数的最小整数
		System.out.println("Math.ceil(1.2):" + Math.ceil(1.2));
		//四舍五入取整
		System.out.println("Math.round(2.3):" + Math.round(2.3));
		/*--------下面是乘方、开方、指数运算--------*/
		System.out.println("**--------下面是乘方、开方、指数运算--------**");
		//计算平方根
		System.out.println("Math.sqrt(2.3):" + Math.sqrt(2.3));
		//计算立方根
		System.out.println("Math.cbrt(9):" + Math.cbrt(9));
		//返回欧拉数e的n次幂
		System.out.println("Math.exp(2):" + Math.exp(2));
		//返回sqrt(x2+y2)，没有中间溢出或者下溢
		System.out.println("Math.hypot(4, 4):" + Math.hypot(4, 4));
		//按照IEEE754标准的规定，对两个参数进行余数运算
		System.out.println("Math.IEEEremainder(5, 2):" + Math.IEEEremainder(5, 2));
		//计算乘方
		System.out.println("Math.pow(3, 2):" + Math.pow(3, 2));
		//计算自然对数
		System.out.println("Math.log(12):" + Math.log(12));
		//计算底数为10的对数
		System.out.println("Math.log10(9):" + Math.log10(9));
		//返回参数与1之和的自然对数
		System.out.println("Math.log1p(9):" + Math.log1p(9));
		/*--------下面是符号相关的运算--------*/
		System.out.println("**--------下面是符号相关的运算--------**");
		//计算绝对值
		System.out.println("Math.abs(-4.5):" + Math.abs(-4.5));
		//符号赋值，返回带有第二个浮点数符号的第一个浮点参数
		System.out.println("Math.copySign(1.2, -1.0):" + Math.copySign(1.2, -1.0));
		//符号函数，如果参数为0，则返回0；如果参数大于0，则返回1；如果参数小于0，则返回-1
		System.out.println("Math.signum(2.3):" + Math.signum(2.3));
		/*--------下面是符号相关的运算--------*/
		System.out.println("**--------下面是符号相关的运算--------**");
		//找出最大值
		System.out.println("Math.max(2.3, 4.5):" + Math.max(2.3, 4.5));
		//计算最小值
		System.out.println("Math.min(1.2, 3.4):" + Math.min(1.2, 3.4));
		//返回第一个参数和第二个之间的与第一个参数相邻的浮点数
		System.out.println("Math.nextAfter(1.2, 1.0):" + Math.nextAfter(1.2, 1.0));
		//返回比目标数略大的浮点数
		System.out.println("Math.nextUp(1.2):" + Math.nextUp(1.2));
		//返回一个伪随机数，该值大于0.0且小于1.0
		System.out.println("Math.random():" + Math.random());
	}
}
```

# java.lang.StrictMath

java.lang.StrictMath实现了更高的精度主要是通过以下几个方面：
- 使用严格的算法：java.lang.StrictMath使用了一些更为精确的数学算法，确保在不同平台上的计算结果一致。这些算法包括但不限于使用精确的数值计算方法、采用更高精度的数值表示、更细致的舍入规则等。
- 遵循IEEE-754规范：java.lang.StrictMath严格遵循IEEE 754标准，该标准定义了浮点数运算的规则、舍入方式等，保证了浮点数计算的精确性和一致性。
- 采用高精度数据类型：java.lang.StrictMath内部使用了更高精度的数据类型进行计算。例如，使用double类型进行浮点数计算时，精确度可以达到15位有效数字，而java.lang.StrictMath可能使用更高位数的浮点数类型进行计算，从而提供更高的精度。

java.lang.StrictMath依赖于java.lang.FdLibm。java.lang.FdLibm并没有定义为public，它只是一个工具类。该类是Java语言中从C语言版的Fdlibm库（版本5.3）移植而来的。Fdlibm库提供了一些基础的数学函数，比如三角函数、指数函数、对数函数、幂函数等等。在Java语言中，这些函数已经被包含在java.lang.Math类中，但是Java语言的实现方式可能会有些不同。该类作者提到了C语言版的Fdlibm库使用的技巧，即将64位的浮点数视为两个32位的整数数组，这种技巧在C语言中非常常见，但在Java语言中不方便直接实现。因此，该类实现了一些适合Java语言的方式来处理这些数学函数。同时，作者还指出，C语言版的Fdlibm库会对IEEE 754浮点数的异常条件进行严格的处理，但由于Java虚拟机不支持原生的IEEE浮点数异常处理，该类实现方式与C语言版的Fdlibm库可能有所不同，但尽可能地保持了代码清晰易懂。
