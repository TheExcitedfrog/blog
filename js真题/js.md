# 题目

## var let const 区别

var是ES5语法
let const 是ES6语法
var有变量提升

var和let是变量，可修改 const是常量，不可修改
let const 有块级作用域 var没有

```js
//变量提升 分析var变量后提前声明，但不会赋值
console.log(a) //undefined
var a = 10 

console.log(b) // cannot access b before init
let b = 20 
```

## typeof返回哪些类型

undefined string number boolean symbol 值类型
object  null也是object 引用类型
function 有引用类型特点 但会单独区分

## 列举强制类型转换和隐式类型转换

1. 强制parseInt parseFloat toString
2. if、逻辑运算、==、+字符串拼接

## 手写深度比较，模拟lodash isEqual
```js
const obj1= {a:10,b:{x:100,y:200}}
const obj2= {a:10,b:{x:100,y:200}}
isEqual(obj1,obj2) === true
```
```js
function isObj(obj){
    return typeof obj === 'object' && obj !== null
}

function isEqual(obj1,obj2){
    if(!isObj(obj1) || !isObj(obj2)){
        // 值类型 （参与equal一般不是函数）
        return obj1 === obj2
    }
    if(obj1 === obj2){
        return true
    }
    //两个都是引用类型，而且不相等
    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)
    if(obj1Keys.length !== obj2Keys.length){
        return false
    }
    for(let key in obj1){
        //比较key的value 递归
        const res = isEqual(obj1[key],obj2[key])
        if(!res){
            return false
        }
    }
}

const obj1= {a:10,b:{x:100,y:200}}
const obj2= {a:10,b:{x:100,y:200}}

console.log(obj1 == obj2) //false
console.log(isEqual(obj1,obj2))
```
## split()和join()的区别
```js
'1-2-3'.split('-') //[1,2,3]
[1,2,3].join('-') //'1-2-3'
```
## 数组的pop push unshift shift分别是什么
1. 功能是什么？
2. 返回值是什么
3. 是否对原数组造成影响？

>结果

1. pop 返回尾抛出值，原数组-尾
2. push 返回数组长度 原数组+尾
3. unshift 返回数组长度 原数组+头
4. shift 返回头抛出值 原数组-头

## 纯函数

1. 不改变原数组（没有副作用）
2. 返回一个数组

contact 追加，变成一个新数组
map 函数遍历进行操作
filter 过滤
slice 深拷贝，复制

## 数组slice和splice的区别

1. 功能slice 切片 ；splice 剪接
2. 参数和返回值
3. 是否纯函数

```js
slice 纯函数 无副作用
const arr = [1,2,3,4,5]
const arr1 = arr.slice() //[1,2,3,4,5]
const arr2 = arr.slice(1,4) //[2,3,4]  [1,4)
const arr3 = arr.slice(2) //[3,4,5]
const arr4 = arr.slice(-2) //[4,5] 后两个

splice 非纯函数              *index *length 索引和长度 
const spliceRes = arr.splice(1,2,'a','b','c') //1,'a','b','c',4,5
```

## [10,20,30].map(parseInt)返回结果是什么？

1. map的参数和返回值
2. parseInt的参数和返回值

结果：[10,NaN,NaN]

```js
//拆解
[10,20,30].map((num,index)=>{
    return parseInt(num,index)
})
第二个参数标识进制
parseInt(10,0) //10
parseInt(20,1) //NaN
parseInt(30,2) //NaN 
```
## ajax请求get和post的区别？

get用户查询
post用户提交
get参数在url上
post放在请求内

## 闭包是什么？有什么特性？有何影响？

1. 回顾作用域和自由变量
2. 作为参数被传入，作为返回值被返回
3. 自由变量的查找，要在函数定义的地方（非执行的地方）

影响：变量会常驻内存，得不到释放。闭包不要乱用

如果是自由变量，内存会被释放
闭包 函数作为返回值，内存不会被释放

## 如何阻止冒泡和默认行为？

event.stopProgation()
event.preventDefault()

## 查找、添加、删除、移动DOM节点的方法？

document.getElementByClassName
document.getElementById
document.getElementByTagName
document.querySlectorAll
document.createElement
div1.appendChild(newP)

获取父元素
div1.childNodes
删除子元素
div1.removeChild

//property
p1.style.width
p1.nodeName
p1.nodeType
p1.classNmae

//attribute
p1.setAttribute
p1.getAttribute

## 如何减少DOM操作？
耗性能
1. 缓存DOM查询结果
2. 多次DOM操作合并到一次插入

## jsonp原理
浏览器同源策略和跨域
那些html能绕过跨域
jsonp原理

## 函数声明和函数表达式的区别 
```js
//函数声明
function fn（）{...}
//函数表达式
const fn = function(){...}
```
函数声明会在代码执行前预加载 类似变量提升
函数表达式不会

## new Object()和Object.create()的区别
{}等同于new Object(),原型是Object.prototype
Object.create(null) 没有原型
Object.create({...})可指定原型 该原型基于{}对象指向的Object基类 
>结论

Object.create是创建一个空对象 ，然后将参数内的对象保存在原型中
## this的场景题
```js
const User = {
    count:1,
    getCount: function(){
        return this.count
    }
}
    console.log(User.getCount()) // 1
    const func = User.getCount
    console.log(func()) // undefined
```
## 作用域和自由变量的场景题
```js
let i
for(i = 1;i<=3;i++){
    setTimeout(function(){
        console.log(i)
    },0)
}
// 10 10 10 
```


## 判断字符串以字母开头，后面字母数字下划线，长度6-30

const reg = /^[a-zA-Z]\w{5,29}$/