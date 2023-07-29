---
title: java.math.RoundingMode
date: 2021-02-12 17:21:50
summary: 本文介绍java.math.RoundingMode的舍入模式，以及java.math.RoundingMode与java.math.BigDecimal的关系。
tags:
- Java
categories:
- 开发技术
---

java.math.RoundingMode是Java中一个枚举类，用于指定数字舍入的方式。它定义了一组枚举值，每个枚举值表示一种不同的舍入模式。java.math.RoundingMode提供了灵活的舍入选项，以满足不同的数值计算需求。

```java
public enum RoundingMode {
    UP(BigDecimal.ROUND_UP),
    DOWN(BigDecimal.ROUND_DOWN),
    CEILING(BigDecimal.ROUND_CEILING),
    FLOOR(BigDecimal.ROUND_FLOOR),
    HALF_UP(BigDecimal.ROUND_HALF_UP),
    HALF_DOWN(BigDecimal.ROUND_HALF_DOWN),
    HALF_EVEN(BigDecimal.ROUND_HALF_EVEN),
    UNNECESSARY(BigDecimal.ROUND_UNNECESSARY);

    // Corresponding BigDecimal rounding constant
    final int oldMode;

    private RoundingMode(int oldMode) {
        this.oldMode = oldMode;
    }

    public static RoundingMode valueOf(int rm) {
        return switch (rm) {
            case BigDecimal.ROUND_UP          -> UP;
            case BigDecimal.ROUND_DOWN        -> DOWN;
            case BigDecimal.ROUND_CEILING     -> CEILING;
            case BigDecimal.ROUND_FLOOR       -> FLOOR;
            case BigDecimal.ROUND_HALF_UP     -> HALF_UP;
            case BigDecimal.ROUND_HALF_DOWN   -> HALF_DOWN;
            case BigDecimal.ROUND_HALF_EVEN   -> HALF_EVEN;
            case BigDecimal.ROUND_UNNECESSARY -> UNNECESSARY;
            default -> throw new IllegalArgumentException("argument out of range");
        };
    }
}
```

java.math.BigDecimal定义了8个int类型常量值，这些常量从JDK9开始被标记为过时。
- `ROUND_UP`：0
- `ROUND_DOWN`：1
- `ROUND_CEILING`：2
- `ROUND_FLOOR`：3
- `ROUND_HALF_UP`：4
- `ROUND_HALF_DOWN`：5
- `ROUND_HALF_EVEN`：6
- `ROUND_UNNECESSARY`：7

与之对应的是，java.math.RoundingMode中定义的枚举值也有8个。
- `UP`：向正无穷方向舍入。如果数字为正，则舍入行为与CEILING相同；如果数字为负，则舍入行为与FLOOR相同。
- `DOWN`：向零方向舍入。无论数字是正还是负，舍入行为都与TRUNCATE相同。
- `CEILING`：向正无穷方向舍入。如果数字为正，则舍入行为与UP相同；如果数字为负，则舍入行为与FLOOR相同。
- `FLOOR`：向负无穷方向舍入。如果数字为正，则舍入行为与CEILING相同；如果数字为负，则舍入行为与UP相同。
- `HALF_UP`：最近数字舍入（五入），如果舍弃部分大于等于5，则舍入行为与UP相同；否则舍入行为与DOWN相同。
- `HALF_DOWN`：最近数字舍入（五舍），如果舍弃部分大于5，则舍入行为与UP相同；否则舍入行为与DOWN相同。
- `HALF_EVEN`：最近数字舍入（银行家舍入法），如果舍弃部分的左边一位数字为奇数，则舍入行为与HALF_UP相同；如果为偶数，则舍入行为与HALF_DOWN相同。
- `UNNECESSARY`：不需要舍入。如果对舍弃部分进行舍入，将抛出ArithmeticException异常。

java.math.RoundingMode的选择取决于所需的舍入规则和上下文。例如，在金融领域中，通常使用java.math.RoundingMode.HALF_UP或java.math.RoundingMode.HALF_EVEN来进行四舍五入。对于某些特定的应用场景，可能需要使用java.math.RoundingMode.UNNECESSARY来确保不会进行任何舍入。

在Java中，可以通过java.math.BigDecimal的setScale(int scale, RoundingMode roundingMode)方法来指定舍入模式。示例如下：

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class RoundingModeDemo {
    public static void main(String[] args) {
        BigDecimal number = new BigDecimal("123.456");
        BigDecimal rounded = number.setScale(2, RoundingMode.HALF_UP);
        System.out.println(rounded);
        BigDecimal roundedDown = number.setScale(2, RoundingMode.DOWN);
        System.out.println(roundedDown);
    }
}
```

输出结果：
<font color="orange">
123.46
123.45</font>

在上述示例中，使用`setScale`方法将数字舍入到指定的小数位数，并指定了舍入模式。第一个例子使用`HALF_UP`模式，第二个例子使用`DOWN`模式进行舍入。
