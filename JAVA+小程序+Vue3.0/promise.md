## promise设计

```
    new Promise(
        //传入一个执行器
        function(resolve,reject){
            //一段耗时很长的异步操作

            resolve();//数据处理完成

            reject();数据处理出错
        }
    ).then(function A(){
        //成功，下一步操作
    }),function B(){
        //失败，做相应处理
    }
```

1.**Promise是一个代理对象，它和原先要进行的操作并无关系**
2.通过引入一个回调，避免更多的回调

## Promise状态

1.pending 待定 初试状态
2.fulfill 实现 操作成功
3.rejected 被否决 操作失败

Promise状态发生改变，就会触发.then()里的响应函数处理后续步骤。
Promise状态一经改变，就不会再次改变。

**Promise实例一经创建，执行器立即执行**
因为执行是一个异步操作，机器能够将其暂时忽略，只有当执行结束后，执行相应的then操作，形成一个then队列，每个then都会返回一个新的Promise实例，最后状态变成成功或者失败

### 简单范例

```
console.log('here we go')

new Promise( resolve=>{
    setTimeout( ()=>{
        resolve('hellow');
    },2000);
}).then( value => {
    console.log( value +  'world');
});

```

>结果

    here we go
    两秒后
    hellow world

### 两步执行的范例

```
console.log('here we go')

new Promise( resolve=>{
    setTimeout( ()=>{
        resolve('hellow');
    },2000);
}).then( value => {
    console.log(value);
    return new Promise( resolve => {
        setTimeout( () => {
            resolve('world')
        },2000)
    })
}).then( value => {
    console.log( value + 'world');
});
```

>结果

    here we go 
    两秒后
    hello 
    两秒后
    world world

## 对已完成的Promis执行then

```
cnosole.log('start');

let promise = new Promise( resolve => {
    setTimeout(() = > {
        console.log('the promise fulfilled');
        resolve('hellow world')
    },1000)
});

setTimeout(()=> {
    promise.then( value => {
        console.log(value)
    })
},3000)
```

>结果

start
两秒
the promise fulfilled
两秒
hellow world


## then里不返回Promise

```
console.log('here we go')
new Promise( resolve => {
	setTimeout( ()=>{
		resolve('hellow');
	},2000)
}) .then( value => {
	console.log(value);
	console.log('everyone');
	(function () {
		return new Promise(resolve => {
			setTimeout(() => {
				console.log('Mr.Laurence');
				resolve('Merry Xmas');
			},2000);
		});
	}());
	return false;
}).then( value => {
	console.log(value + 'world');
})
```

>结果

here we go
两秒后
hellow
everyone
false world
两秒后
Mr.Laurence

>解析

第二个Promise没有在then内返回，所以在执行函数内会直接生成一个新的Promise并等待两秒钟，之后他会执行输出Mr.Laurence,此时下一个then事实上与第二个Promise是并发进行的，所以他会在输出everyon后直接输出返回的false+ world ,两秒后对应的Mr.Laurence被打印出来。