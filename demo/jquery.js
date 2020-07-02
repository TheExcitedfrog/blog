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