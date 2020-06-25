# BST二分搜索树

<<<<<<< HEAD
#### 小知识点
=======
### 小知识点
>>>>>>> a10bf071829045041dfc73c4f5345f3ba6b0b4e3
1.E泛型支持compareTo比较语法
   ```
    e.compaerTo(param) > 0 || <0 比较大小
   ```
2.e.equals

## 深入理解递归终止条件
>修改前
```
    private void add(Node node,E e){
        if (e.equals(node.e))
            return;
        else if (e.compareTo(node.e) < 0 && node.left == null ){
            node.left = new Node(e);
            size++;
            return;
        } else if (e.compareTo(node.e) > 0 && node.right == null){
            node.right = new Node(e);
            size++;
            return;
        }

        if (e.compareTo(node.e) < 0)
            add(node.left,e);
        else // e.compareTo(node.e) > 0
            add(node.right,e);
    }
```
空本身也可以认为是一个节点，只要在当前节点下添加到一个实际上为空的节点，则在这个位置创建一个节点，并和上一个节点做连接，递归就完成了。
>修改后
```
//向以node为根的二分搜索树中插入e元素，递归算法
//返回插入新节点后二分搜索树的根
private Node add(Node node,E e){

        if(node == null){
            size++;
            return new Node(e);
        }

        if (e.compareTo(node.e) < 0)
            node.left = add(node.left,e);
        else if (e.com)
            node.right = add(node.right,e);
}
    
```
>返回值

无论add函数做了何种操作，最后二分搜索树的根依然是node节点

因为已经在add函数中对root插入的情况做了一次判断，所以在构造函数的初始化add操作中直接向root根节点插入元素e
```
 root =  add(root,e);
```

## 二分搜索树查询元素
<<<<<<< HEAD
简单递归实现
```
private boolean contains(Node node,E e){
        if (node == null)
            return false;

        if (e.compareTo(node.e) == 0)
            return true;
        else if (e.compareTo(node.e) < 0)
            return contains(node.left,e);
        else //(e.compareTo(node.e) >0)
            return contains(node.right,e);

    }
```

## 二分搜索树的遍历
1.遍历操作就是把所有节点都访问一遍
2.访问的原因和业务相关
3.在线性结构下，**遍历是极其容易的**
### 前序遍历

先走根节点，再走左右节点

```
public void preOrder(){
        preOrder(root);
    }

    private void preOrder(Node node){
        if (node == null)
            return;

        System.out.println(node.e);
        preOrder(node.left);
        preOrder(node.right);
    }
```
>>>如何将一个层序遍历变成图形化输出？
### 中序遍历

**中序遍历天生自带顺序排序功能**

```
private void inOrder(Node node){
        if (node == null)
            return;
        inOrder(node.left);
        System.out.println(node.e);
        inOrder(node.right);
    }
```

### 后序遍历

>应用 

为二分搜索树释放内存
```
private void postOrder(Node node){
        if (node == null)
            return;
        postOrder(node.left);
        postOrder(node.right);
        System.out.println(node.e);
    }
```

## 深入理解前中后序遍历二分搜索树

对进程入栈的顺序监控，就能良好把握节点弹出的时机

### 二分搜索树前序遍历的非递归写法

使用栈实现遍历顺序
后入先出

```
public void preOrderNR(){
        Stack<Node> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()){
            Node cur = stack.pop();
            System.out.println(cur.e);

            if (cur.right != null)
                stack.push(cur.right);
            if (cur.left != null)
                stack.push(cur.left);
        }

    }
```

>使用非递归算法实现中序和后续遍历？

## 二分搜索树的层序遍历



