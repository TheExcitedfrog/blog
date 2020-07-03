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
    
}

const obj1= {a:10,b:{x:100,y:200}}
const obj2= {a:10,b:{x:100,y:200}}

console.log(obj1 == obj2) //false
console.log(isEqual(obj1,obj2))