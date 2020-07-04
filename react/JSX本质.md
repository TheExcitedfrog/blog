
# JSX等同于vue模板

# vue模板不是html

# JSX也不是JS

```js
const imgElem = <div id="div1">
        <p>some text</p>
        <img src={imgUrl}></img>
        </div>
```

```js
var imgElem = React.createElement("div", {
  id: "div1"
}, 
React.createElement("p", null, "some text"), 
React.createElement("img", {
  src: imgUrl
}));
```

返回vnode

```js
const app = <div>
        <Input submitTitle={onSubmitTitle} ></Input>
        <List list={list} ></List>
    </div>
```
加载组件
```js
var app = React.createElement("div", null, React.createElement(
    Input, {
  submitTitle: onSubmitTitle
}),
React.createElement(List, {
  list: list
}));
```
事件绑定
```js
var eventList = /*#__PURE__*/React.createElement("p", {
  onClick: (void 0).clickHandler
}, "some text"); 
```

list
```js
// JSX list
var listElem = /*#__PURE__*/React.createElement("ul", null, (void 0).state.list.map(function (item, index) {
  return /*#__PURE__*/React.createElement("li", {
    key: item.id
  }, "index ", index, "; title ", item.title);
}));
```
### React.createElement即h函数，返回vnode
1. 第一个参数可能是组件也可能是html tag
2. 组件名，首字母必须大写