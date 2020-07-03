function fn1(){
    console.log(this)
}

fn1() //window

fn1.call({x:100}) //{x:100}

const fn2 = fn1.bind({x:200})
fn2() //{x:200}

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