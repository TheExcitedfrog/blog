## 路由核心思想
子组件传值 
```js
 setup(props,context) {
            function onClick(){
                context.emit('change-view','/detail/sub')
            }
            return{
                onClick
            }
        }
```
将路由参数通过事件传递到父组件，父组件通过<router-view @change-view="onChangeView"> 监听事件 触发后push路径
```js
setup() {
            function onChangeView(event) {
                router.push(event)
            }
            return {
                onChangeView
            }
        }
```