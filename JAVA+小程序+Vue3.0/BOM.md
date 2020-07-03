# 题目

## 如何识别浏览器类型

## 分析拆解url部分


# 知识点

## navigator
浏览器信息
```js
const ua = navigator.userAgent
const isChorm = ua.indexOf('Chorm')
console.log(isChorm) // Chorm/77.0....... Safari/537
```
## screen
屏幕信息
## location
url信息
```js
location.href
location.protocol //http: https
location.pathname // /learn/
location.host // www.xxx.com
location.search // ? a=xxx&b=xxx
location.hash
```

## history
前后缀信息
history.back()
history.forward()