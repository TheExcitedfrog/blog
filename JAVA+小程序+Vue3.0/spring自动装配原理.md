# 自动装配
1. 原理是什么
2. 为什么要有自动装配

---
js
使用第三方库
1. npm 安装/拷贝
2. 引用组件/函数/类

--- 
springBoot装配机制
1. maven
2. 引入包

## springboot SDK
1. Component Configuration
2. 加载第三方SDK

三大类：
- SpringBootConfiguration
- **EnableAutoConfiguration 核心** 
- ComponentScan

1. EnableAutoConfiguration下的@Import下带一个AutoConfigurationImportSelector
2. AutoConfigurationImportSelector下的selectImports函数自动加载包
3. 通过.factory配置文件寻找配置类

## @EnableXXX
模块装配

## SPI机制/思想
Service Provider Interface 

模块实现方案
调用方 标准服务接口 方案A B C 

基于interface + 策略模式 + 配置文件

## 解决变化 @Primary @条件注解 
关注的是类 对象上的变化 具体/粒度小

整体解决方案的变化

## 自动装配是解决将SDK的bean引入IOC


## 框架机制
不会直接用框架
二次封装/开发

增强型SpringBoot

异常反馈
资源不存在/参数错误

