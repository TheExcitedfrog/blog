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


function bindEvent(elem,type,selector,fn){
    if(fn == null){
        fn = selector
        selector = null
    }
    elem.addEventListener(type, event=>{
        const target = event.target
        if(selector){
            //代理情况
            if(target.matches(selector)){
                fn.call(target,event)
            }
        } else {
            //普通绑定
            fn.call(target,event)
        }
    })
}