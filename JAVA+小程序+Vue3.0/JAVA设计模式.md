# 设计原则

- 开闭原则 （OCP） Open Close principle

- 软件、函数、类 扩展开放的 修改封闭的
- 新增业务模块/类 代替原来的类

- 里氏替换原则 迪米特法则 IOC DI
- 面向抽象编程 interface abstract
- 三大特性 多态性

1. interface
2. 设计模式:工厂模式
3. IOC/DI

=> 面向抽象编程 => OCP => 实现可维护代码

# 重点理论
1. 单纯interface可以统一方法的调用，但是不能统一对象的实例化
2. 面向对象 实例化对象 调用方法（完成业务逻辑）
3. 只有一段代码中没有new的出现才能保持代码的相对稳定，才能逐步实现OCP
4. 上一段话只是表象，实质是一段代码如果要保持稳定，就不应该负责对象的实例化
5. 对象的实例化不可能消除
6. 把对象实例化的过程交给其他的代码片段
7. 代码中总是会存在不稳定，隔离不稳定代码，保证其他代码的稳定
8. 变化造成了不稳定

计算机代码-》现实世界规律 业务 映射

工厂模式是工厂生成一个对象返回给函数，
而IOC是直接提供一个对象给函数，**有主动和被动的区别**


- IOC、DI、DIP
   1. DIP：dependency inversion principle依赖倒置
      - 高层模块不应该依赖低层模块，两者都应该依赖抽象
      - 抽象不应该依赖细节
      - 细节应该依赖抽象
   2. DI：dependency injection依赖注入
      - 通过容器将依赖传入一个类
      - **属性注入** set方法
      - **构造注入** 在构造函数内注入
      - 接口注入 较少

- DI的意义
  - 容器是在装配对象

- IOC
  - 实现 -> DI

## 变化
控制权
1. 程序员
2. 用户

新需求->控制代码的更改
--> 由产品经理来控制应用程序

eg：积木厂家（程序员）
    生产积木

玩家/用户 -> 搭建

## Spring和SpringBoot

SSM Spring + Spring MVC + MyBatis

Spring Framework

SpringBoot是Spring的应用

核心优势？

- 自动配置 有什么用？

## SpringBoot
OCP->IOC

IOC实现：容器 加入容器 注入
灵活性 场景

目的:
- 控制权交给用户
- 灵活的OCP 开闭原则

## XML

## 注解

### stereotype annotations

@Component 组件/类/bean 类的实例化 new

@Service 
@Controller 
@Repository 

@Configuration 

桥接点 通过IOC实例化

IOC 对象的实例化 和注入时机
- 在应用启动时就直接实例化对象并注入（默认机制）
- 立即/提前实例化 -> 可延迟实例化@Lazy（需要在所有使用依赖的对象本身也添加@Lazy）

## autowired注入方式

bytype 通过类型直接注入一个实现了接口的类型 有两个的同样类型的时会报错（默认注入方式）
byname 有多个同样类型的对象

寻找ISkill的实现bean

执行循序 
1. 找不到任何一个bean
2. 一个 直接注入
3. 找到多个 并不一定会报错 按照字段名字推断选择哪个bean

### 主动注入
@Qualifier("BeanStr")

## 应对变化的解决方案

1. 指定一个interface，用多个类实现同一个interface
   - 策略模式

2. 一个类，通过更改类的属性达到对应变化
   - 属性配置

## 几种注入方式

1. 字段注入 / 成员变量注入（不推荐但比较简单）
2. setter注入
3. 构造注入

## @ComponentScan包扫描机制
在入口文件的注解内自动追加，也能够手动追加，添加自定义的文件位置（不能和默认包路径重复）

## 策略模式的变化方案
1. byname 切换bean name
2. @Qualifile 指定bean
3. 有选择的只注入一个bean 注释掉某个bean上的@Component
4. @Primary+@Component 

## 条件注解 @Conditional

自定义条件注解
@Conditional + Condition

### 成品条件注解

@ConditionOnProperty（value=，havinValue=，matchIfMissing 如果无配置项则为该默认值）
