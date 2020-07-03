const xhr = new XMLHttpRequest()
xhr.open("POST","/api/login",false) //false 异步
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