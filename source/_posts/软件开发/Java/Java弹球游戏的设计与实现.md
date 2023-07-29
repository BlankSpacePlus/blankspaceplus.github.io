---
title: Java弹球游戏的设计与实现
date: 2019-09-28 14:51:19
summary: 本文分享基于Java-Swing开发的弹球游戏的设计与实现。
tags:
- Java
categories:
- 开发技术
---

# 程序说明

下面这段代码是一个简单的弹球游戏，通过键盘控制球拍移动，使小球不掉落，小球碰撞到球拍或边界时会反弹。具体实现细节如下：
- 定义了一些常量，如桌面的宽度和高度，球拍的垂直位置，球拍和小球的大小等。
- 创建了一个Frame对象，并设置标题为“弹球游戏”。
- 创建了一个Random对象，用于随机生成小球和球拍的位置以及小球的运动方向。
- 创建了一个MyCanvas对象tableArea，用于显示游戏界面。
- 定义了一个键盘监听器keyProcessor，用于处理按下向左、向右键时球拍的移动。
- 为窗口和tableArea对象分别添加键盘监听器。
- 定义了一个事件监听器taskPerformer，用于控制小球的运动和碰撞检测。
- 创建了一个Timer对象timer，用于定时执行事件监听器taskPerformer。
- 实现了MyCanvas类，重写了Canvas的paint()方法，用于绘制小球和球拍，并在游戏结束时显示“游戏已结束”的文字。
- 在init()方法中添加窗口关闭事件监听器，并将tableArea添加到Frame对象f中，最后启动定时器timer和窗口f。
- 在main()方法中创建一个PinBall对象，并调用其init()方法，启动游戏。

总体而言，这段代码比较简单，主要涉及了Swing组件、键盘监听、定时器等方面的知识，对于初学者来说是一个不错的练手项目。

# 实现代码

```java
import java.awt.*;
import java.awt.event.*;
import java.util.*;
import javax.swing.Timer;

public class PinBall {
    // 桌面的宽度
    private final int TABLE_WIDTH = 300;
    // 桌面的高度
    private final int TABLE_HEIGHT = 400;
    // 球拍的垂直位置
    private final int RACKET_Y = 340;
    // 下面定义球拍的高度和宽度
    private final int RACKET_HEIGHT = 20;
    private final int RACKET_WIDTH = 60;
    // 小球的大小
    private final int BALL_SIZE = 16;
    private Frame f = new Frame("弹球游戏");
    Random rand = new Random();
    // 小球纵向运行速度
    private int ySpeed = 10;
    // 返回一个-0.5~0.5的比率，用于控制小球的运行方向
    private double xyRate = rand.nextDouble() - 0.5;
    // 小球横向运行速度
    private int xSpeed = (int)(ySpeed * xyRate * 2);
    // 用ballX、ballY代表小球的坐标
    private int ballX = rand.nextInt(200) + 20;
    private int ballY = rand.nextInt(10) + 20;
    // racketX代表球拍的水平位置
    private int racketX = rand.nextInt(200);
    private MyCanvas tableArea = new MyCanvas();
    Timer timer;
    // 游戏是否结束的旗标
    private boolean isLose = false;
    
    public void init() {
        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
        // 设置桌面区域的最佳大小
        tableArea.setPreferredSize(new Dimension(TABLE_WIDTH, TABLE_HEIGHT));
        f.add(tableArea);
        // 定义键盘监听器
        KeyAdapter keyProcessor = new KeyAdapter() {
            public void keyPressed (KeyEvent ke) {
                // 按下向左、向右键时，球拍水平坐标分别减少、增加
                if (ke.getKeyCode() == KeyEvent.VK_LEFT) {
                    if (racketX > 0) {
                        racketX -= 10;
                    }
                }
                if (ke.getKeyCode() == KeyEvent.VK_RIGHT) {
                    if (racketX < TABLE_WIDTH - RACKET_WIDTH) {
                        racketX += 10;
                    }
                }
            }
        };
        // 为窗口和tableArea对象分别添加键盘监听器
        f.addKeyListener(keyProcessor);
        tableArea.addKeyListener(keyProcessor);
        // 定义每0.1秒执行一次的事件监听器
        ActionListener taskPerformer = evt ->{
            // 如果小球碰到左边边框
            if(ballX <= 0 || ballX >= TABLE_WIDTH - BALL_SIZE) {
                xSpeed = -xSpeed;
            }
            // 如果小球高度超越了球拍位置，且横向不在球拍范围之内，游戏结束
            if(ballY >= RACKET_Y - BALL_SIZE && (ballX < racketX || ballX > racketX + RACKET_WIDTH)) {
                timer.stop();
                // 设置游戏是否结束的旗标为true
                isLose = true;
                tableArea.repaint();
            }
            // 如果小球位于球拍之内，且到达球拍位置，球反弹
            else if(ballY <= 0 ||( ballY > RACKET_Y - BALL_SIZE && ballX > racketX && ballX <= racketX + RACKET_WIDTH) ){
                ySpeed = -ySpeed;
            }
            // 小球坐标增加
            ballY += ySpeed;
            ballX += xSpeed;
            tableArea.repaint();
        };
        timer = new Timer(100, taskPerformer);
        timer.start();
        f.pack();
        f.setVisible(true);
    }
    
    public static void main(String[] args) {
        new PinBall().init();
    }
    
    class MyCanvas extends Canvas{
        // 显式声明serialVersionUID可以防止反序列化版本异常InvalidCastException
        // 这是默认的声明，显示声明serialVersionUID可以避免对象不一致
        private static final long serialVersionUID = 1L;

        // 重写Canvas的paint()方法，实现绘画
        public void paint(Graphics g) {
            // 如果游戏已经结束
            if(isLose) {
                g.setColor(new Color(255, 0, 0));
                g.setFont(new Font("Times", Font.BOLD, 30));
                g.drawString("游戏已结束", 50, 200);
            }
            // 如果游戏还没结束
            else {
                // 设置颜色，并绘制小球
                g.setColor(new Color(240, 240, 80));
                g.fillOval(ballX, ballY, BALL_SIZE, BALL_SIZE);
                // 设置颜色，并绘制球拍
                g.setColor(new Color(80, 80, 200));
                g.fillRect(racketX, RACKET_Y, RACKET_WIDTH, RACKET_HEIGHT);
            }
        }
    }
}
```

# 效果展示

![](../../../images/软件开发/Java/Java扑克顺子判定的设计与实现/1.png) ![](../../../images/软件开发/Java/Java扑克顺子判定的设计与实现/2.png)
