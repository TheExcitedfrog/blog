function bindEvent(elem,type,fn){
    elem.addEventListener(type,fn)
}

const btn1= document.getElementById('btn1')
bindEvent(btn1,'click', event=>{
    console.log(event.target) // 获取触发的Dom节点
    event.preventDefault() // 阻止默认行为
    alert('clicked')
})
