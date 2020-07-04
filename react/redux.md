# 基本概念

## store state

## action

## reducer

# 单项数据流

1. dispatch(action)
2. reducer->newState
3. subscribe触发通知

# react-redux

## `<Provider>` connect

```js
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

export default function () {
    return <Provider store={store}>
        <App />
    </Provider>
}
```
## connect

## mapStateToProps mapDispatchToProps

# 异步action
action返回一个函数，在ajax请求后再dispatch 
引入redux-thunk中间件
const store = createStore(rootReducer,applyMiddleware(thunk))
redux-promise
redux-saga

# 中间件 
## redux中间件

![图解](http://pic.yupoo.com/kkkxing/3c0bb7d2/7bb0f12f.png)
其他位置不能加逻辑
只能在dispatch内增加一些逻辑
>示例

```js
import {applyMiddleware,createStore} from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
const logger = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(thunk,logger) //会按顺序执行
)
```
logger 
```js
// 将老的dispatch保存起来，新建一个dispatch自己执行一段逻辑后再执行老的dispatch
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action){
    console.log('dispatching',action)
    next(action)
    console.log('next state',store.getState()) 
}
```
![单项数据流](http://pic.yupoo.com/kkkxing/957c630e/e497afd1.png)
