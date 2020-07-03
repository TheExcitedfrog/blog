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