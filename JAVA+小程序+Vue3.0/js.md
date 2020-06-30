# JavaScript

## 函数式编程

在js中利用函数式编程特性

find、filter、map、some、reduce

## 数据缓存

1. this.data.content = content
2. 缓存
3. 保存在全局 app

>保存数据 类的对象 本身就具有保存数据的功能

**类的对象 保存数据和状态**
```js
    const t = new Theme()
    t.a = 1

    cosnt t2 = new Theme()
    t2.a = 2
    不同对对象保存了两个数据的状态
```
**类能保存数据但是不能保存状态**
```js
    Theme.a = 1
    Theme.a = 2
    类能保存数据但是不能保存状态
```

### 重构model下的类

用static保存属性的扩展性不够
全局只能有一份 

在http请求下 将数据保存在类下和实例相关的属性下，再在子方法内返回实例相关属性下的数据
>model层获取业务数据过程
```js

themes = []

async getThemes(){
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url:"themes",
            data:{
                names
            }
        })
    }

    async getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }

    async getHomeLocationE(){
        return this.themes.find(t => t.name === Theme.locationE)
    }
```
>视图层数据获取过程
```js
 async initAllData() {
        const theme = new Theme();
        await theme.getThemes()

        const themeA = await theme.getHomeLocationA()
        const themeE = await theme.getHomeLocationE()
 }
```

### paging对象

一个生成器
通过类对象实例化保存状态和属性

