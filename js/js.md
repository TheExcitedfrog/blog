# JavaScript

## 函数式编程

在js中利用函数式编程特性

find、filter、map、some、reduce

## 数据缓存

1. this.data.content = content
2. 缓存
3. 保存在全局 app

>保存数据 类的对象 本身就具有保存数据的功能

**类的对象 保存数据和状态**
```js
    const t = new Theme()
    t.a = 1

    cosnt t2 = new Theme()
    t2.a = 2
    不同对对象保存了两个数据的状态
```
**类能保存数据但是不能保存状态**
```js
    Theme.a = 1
    Theme.a = 2
    类能保存数据但是不能保存状态
```

### 重构model下的类

用static保存属性的扩展性不够
全局只能有一份 

在http请求下 将数据保存在类下和实例相关的属性下，再在子方法内返回实例相关属性下的数据
>model层获取业务数据过程
```js

themes = []

async getThemes(){
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url:"themes",
            data:{
                names
            }
        })
    }

    async getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }

    async getHomeLocationE(){
        return this.themes.find(t => t.name === Theme.locationE)
    }
```
>视图层数据获取过程
```js
 async initAllData() {
        const theme = new Theme();
        await theme.getThemes()

        const themeA = await theme.getHomeLocationA()
        const themeE = await theme.getHomeLocationE()
 }
```

### paging对象

一个生成器
通过类对象实例化保存状态和属性

#### 矩阵

1. 转置 对角线对称
2. 旋转 顺时针或逆时针旋转


# 基础知识


### 值类型和引用类型

#### 值类型 
```js
let a = 100
let b = a 
a = 200 
console.log(b) //100
```  
>常见值类型
```js
const a //undefined 会报错 
const s ='abc'
const n = 100
const b = true
const s = Symbol('s')
```

#### 引用类型
引用类型的值也会随之改变
```js
let a = {age :20}
let b = a
b.age = 21
console.log(a.age) // 21
```
常见引用类型
```js
const obj = {x:100}
const arr = ['a','b','c']
const n = null //特殊引用类型，指针指向空指针
// 特殊引用类型，但不用于存储数据，所以没有‘拷贝、复制’函数的说法
function fu(){}
```

#### 深入分析
从虚拟器解析现象的本质
>在值类型 

值类型的key:a 直接指向value:100
随后的b也会指向另一个空间内的key:b ->value:100

>在引用类型

a会在栈内申请一个内存地址1 key:a -> value:内存地址1
b也会指向内存地址1 key:b -> value:内存地址1

在栈内 key:内存地址1 -> value: {age:20}
如果通过b修改age的值
则 key:内存地址1 -> value:{age:21} 

![图解析](http://pic.yupoo.com/kkkxing/928016a6/82fb9f7b.png)

#### 为什么？
性能问题
值类型：单个数据占用空间小
引用类型：一个json对象可能非常大

#### 如何将值类型像引用类型一样去做赋值？
深拷贝  

#### typeof和深拷贝

typeof
1. 识别所有值类型
2. 识别函数
3. 判断是否是引用类型 -> 不能再往下识别//object



**深拷贝**
1. 注意判断值类型和引用类型
2. 注意判断是数组还是对象
3. 递归
```js
 const obj1 = {
    age:20,
    name:'xxx',
    address:{
        city:'beijing'
    },
    arr:['a','b','c']
}

const obj2 = deepClone(obj1)
obj2.address.city = 'shanghai'
cnosole.log(obj1.address.city) //shanghai 
/**
* 深拷贝
* obj 要拷贝的对象
**/
function deepClone(obj = {}){
    if(typeof obj != 'object' || obj == null){
        //obj是null或者不是一个对象
        return obj
    }
    //初始化返回结果
    let result
    if(obj instanceof Array){
        result = []
    } else{
        result = {}
    }

    for(let key in obj){
        //保证key不是原型的属性
        if(obj.hasOwnProperty(key)){
            //递归调用!!!
            result[key] = deepClone(obj[key])
        }
    }
    //返回结果
    return result 
}
```
通过递归完成深拷贝


### 变量计算
```
 == 运算符 会主动做类型转换
 === 除了  == null 之外，一律用===
```

### if语句和逻辑运算
```
truely变量：!!a === true
falsely变量： !!a === false
```
0 NaN '' null undefined false
是falsely变量，其余都是truely变量

### 原型链

#### 隐式原型和显示原型
```js
第一层
xialuo._porto_ 隐式原型
Student.prototype 显示原型
xialuo._porto_ === Student.prototype
第二层
Student.prototype._proto_ === People.prototype
```
>执行规则

获取属性xialuo.name或执行方法xialuo.sayHi()时
先在自身属性和方法寻找
如果找不到则自动去_proto_寻找

>why?

图片解析
![原型链](http://pic.yupoo.com/kkkxing/c3ff0f07/3c0e57f3.png)

Student的继承关系其实是系统内部new了一个People实例
所以Student下的prototype会有一个_proto_指向People的prototype

```
xialuo.hasOwnProperty('name') //true
xialuo.hasOwnProperty('sayHi') //false
xialuo.sayHi() // 函数输出
xialuo.hasOwnProperty('eat') //false
//！！！hasOwnProperty也不是自己的属性
xialuo.hasOwnProperty('hasOwnProperty') //false
```

>递进

![原型链递进](http://pic.yupoo.com/kkkxing/8c936036/d59cbe0e.png)
五层架构
People是object创建的
People下的_proto_也指向Object

>instanceof

通过instanceof,能够从_proto_向上寻找显示原型
```js
xialuo instanceof Array //false
xialuo instanceof Student/Object/People //true
```

#### 提示
class是ES6语法规范，由ECMA委员会发布
只规定语法规范，不规定如何实现
以上实现方式都是v8引擎实现方式，也是主流的

### 作用域和自由变量
作用域：一个变量的合法使用范围
1. 全局作用域
2. 函数作用域
3. 块级作用域（ES6）新增  {括号内 let const}

自由变量
1. 一个变量在当前作用域没有定义，但被使用了
2. 向上级作用域，一层一层依次寻找，直至找到为止
3. 如果到全局作用域都没找到，则报错xx is not defineed

#### 闭包

作用域应用的特殊情况，有两种表现：
1. 函数作为参数被传递
2. 函数作为返回值被返回
```js
//函数作为返回值
function create(){
    const a = 100
    return function (){
        console.log(a)
    }
}
const fn = create()
const a = 200
fn() //100
```
```js
//函数作为参数被传递
function print(fn){
    const a = 200
    fn()
}
const a = 100
function fn(){
    console.log(a)
}
print(fn) // 100 作为自由变量，应该向上一个作用域进行寻找，即在他定义的上一个作用域
```
>总结

所有的自由变量的查找，是在函数定义的地方，向上级作用域查找 **不是在执行的地方！！**

#### this
1. 作为普通函数
2. 使用call apply bind
3. 作为对象方法被调用
4. 在class方法中被调用
5. 箭头函数

**this取什么值，是在执行的时候确认的，不是在定义的时候**

>普通this指向
```js
function fn1(){
    console.log(this)
}
fn1() //window
```
>call和bind修改this指向
```js
fn1.call({x:100}) //{x:100}

const fn2 = fn1.bind({x:200})
fn2() //{x:200}
```
>箭头函数的指向
```js
const zhangsan = {
    name:'张三',
    sayHi(){
        //this即当前对象
        console.log(this)
    },
    wait(){
        setTimeout(function(){
            //this === window
            console.log(this)
            //这个函数被执行是setTimeout本身触发的，并不是类似zhangsan.sayHi这种执行方式
        }) 
    },
    waitAgain(){ 
        setTimeout(()=>{
            //this即当前对象
            //箭头函数的this永远取上一个作用域的this
            console.log(this)
        })
    }
}
```
>类下的指向
```js
class People{
    constructor(name){
        this.name = name
        this.age = 20
    }
    sayHi(){
        console.log(this)
    }
}

const zhangsan = new People('张三')
zhangsan.sayHi() //zhangsan对象
```


## 问题

### 如何判断一个变量是不是数组

a instanceof Array

### 手写一个建议jQuery，考虑插件和扩展性

```js
class jQuery{
    constructor(selector){
        const result = document.querySelectorAll(selector)
        const length = result.length
        for(let i =0 ;i<length;i++){
            this[i] = result[i]
        }
        this.length = length
        this.selector = selector
        //类似于数组，对象
    }
    get(index){
        return this[index]
    }
    each(fn){
        for(let i=0;i<this.length;i++){
            const elem = this[i]
            fn(elem)
        }
    }
    on(type,fn){
        return this.each(elem =>{
            elem.addEventListener(type,fn,false)
        })
    }
    //扩展很多API DOM
}
//插件
jQuery.prototype.dialog = function(info){
    alert(info)
}

//复写机制
class myJQuery extends jQuery{
    constructor(selector){
        super(selector)
    }
    //扩展方法
    addClass(className){

    }
    style(data){
        
    }
}


// const $p = new jQuery('p')
// $p.get(1) // <p>内容</P>
// $p.each((elem) =>console.log(elem.nodeName))  //P
// $p.on('click',()=>alert('clicked')) 
```

### class的原型本质，怎么理解？

原型和原型链的图示
属性和方法的执行规则

### this的不同场景，如何取值

1. 当做普通函数被调用
2. 使用 call bind apply   
3. 作为对象方法调用 返回对象本身
4. class方法中调用 返回本身
5. 箭头函数 返回上一级作用域的this

>bind的定义

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
### 手写bind函数
```js
function fn1(a,b,c){
    console.log('this',this) //this => {x:100}
    console.log(a,b,c) //10,20,30
    return 'this is fn1' //this is fun1
}

const fn2 = fn1.bind({x:100},10,20,30)
const res = fn2()
console.log(res)

fn1.hasOwnProperty('bind') //false
fn1._porto_ === Function.prototype //true
```


```js
//模拟bind
Function.prototype.bind1 = function(){
    // 将参数拆解为数组
    //将列表变成数组
    const args = Array.prototype.slice.call(arguments) 

    //获取this（数组第一项）
    //shitf()将数组第一项弹出并分割
    const t = args.shift()

    //fn1.bind(...)中的fn1
    const self = this

    return function (){
        return self.apply(t,args)
    }
}
```

### 实际开发中闭包的应用场景，举例说明

1. 隐藏数据->做一个cache工具
```js
//闭包隐藏数据，只提供api
function createCache(){
    const data = {} //闭包中的数据被隐藏，不被外界访问
    return {
        set:function(key,val){
            data[key] =val 
        },
        get:function(key){
            return data[key]
        }
    }
}
const c = createCache()
c.set('a',100)
console.log(c.get('a'))  //100
```


### 创建10个`<a>`标签,点击的时候弹出对应序号

```js
let i,a
for(i =0;i<10;++){
    a = document.createElement('a')
    a.innerHTML = i + '<br>'
    //这个事件在click的时候执行
    a.addEventListener('click', function(e){
        e.preventDefault()
        alert(i)
    }) 
    document.body.appendChild(a)
} //所有click都是10
```
```js
let a
for(let i =0;i<10;++){
    a = document.createElement('a')
    a.innerHTML = i + '<br>'
    //这个事件在click的时候执行
    a.addEventListener('click', function(e){
        e.preventDefault()
        alert(i)
    }) 
    document.body.appendChild(a)
} //i是在块作用域下生效的
```