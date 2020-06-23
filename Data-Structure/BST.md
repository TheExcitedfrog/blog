#BST二分搜索树

####小知识点
1.E泛型支持compareTo比较语法
   ```
    e.compaerTo(param) > 0 || <0 比较大小
   ```
2.e.equals

##深入理解递归终止条件
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

##二分搜索树查询元素


