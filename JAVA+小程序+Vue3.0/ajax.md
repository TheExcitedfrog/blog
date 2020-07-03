# 题目

## 手写一个简易的ajax
```js
function ajax(url,successFn){
    const xhr = new XMLHttpRequest()
    xhr.open("GET",url,true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.state ==200){
                successFn(xhr.responseText)
            }
        }
    }
    xhr.send(null)
}
```
结合Promise
```js
function ajax(url){
    const p = new Promise((resolve,reject) =>{
        const xhr = new XMLHttpRequest() 
        xhr.open("GET",url,true)
        xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.state === 200){
                resolve(
                    JSON.parse(xhr.responseText)
                )
            }
        } else if(xhr.state === 404){
            reject(new Error('404 not found'))
        }
    }
    xhr.send(null)
    })
    return p 
}

const url = 'http:xxxx'
ajax(url).
then(res=>console.log(res)).
catch(err=>console.log(err))
```


## 跨域的常用实现方式


# 知识点

## XMLHttpRequest
```js
const xhr = new XMLHttpRequest()
xhr.open("GET","/api",false)
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        if(xhr.state ==200){
            alert(xhr.responseText)
        }
    }
}
xhr.send(null)
```
```js
const xhr = new XMLHttpRequest()
xhr.open("POST","/api/login",false) //false 同步 true异步
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            alert(xhr.responseText)
        }
    }
}
xhr.send(
    JSON.stringify({
    userName:'张三',
    password:123
    })
)
```
## 状态码
>xhr.readyState

0 未初始化 还没有调用send方法
1 载入 已经调用send方法 正在发送请求
2 载入完成 send完成 已经接受全部响应内容
3 交互 正在解析响应内容
4 完成 响应内容解析完成 可以在客户端调用
>xhr.status

2xx 请求处理成功 200
3xx 重定向 301，302，304
4xx 客户端请求错误 404找不到 403无权限
5xx 服务器内部错误

## 跨域：同源策略，跨域解决方案

>什么是跨域

ajax请求时，浏览器要求当前网页和server必须同源
同源：协议、域名、端口 三者一致

图片 css js 可以跨域
通过图片统计打点

`<link /> <script>` 可以使用cdn，cdn一般都是外域
`<script>`可实现JSONP

jsonp
>逻辑

1. `<script>` 可以跨域
2. 服务器可以任意动态拼接数据返回
3. `<script>`就可以获取跨域数据，只要服务端愿意返回
>原理

通过callback返回一个函数，让页面去执行获取data

jquery实现jsonp
```js
$ajax({
    url:'xxxx',
    dataType:'jsonp',
    jsonpCallback:'callback',
    success:function(data){
        console.log(data)
    }
})
```
cors
设置http header