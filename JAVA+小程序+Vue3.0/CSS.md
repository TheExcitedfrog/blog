## 定义

1.flex

    flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。
    flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。

### 多元素水平垂直居中

1. 父元素设置
   flex //**让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容**
   flex-direction：row //**flex-direction 属性规定灵活项目的方向。**
   align-item：center //**align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式**。
   justify-content：center //将内容水平居中对齐

#### 在横向滚动条内放置滚动

在父组件container内部添加box-sizing：border-box修改padding造成的width超过100%造成界面滚动的问题

#### 在原生组件上设置边距

偶尔在自定义组件上设置边距会无效
如果希望自定义样式生效需要使用外部样式类
externalClasses:['l-class'] 

有时候样式由开发者定义后传递