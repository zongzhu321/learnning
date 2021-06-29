##  一、预编译

### 1 概念

#### 1）什么是预编译

首先，我们知道JavaScript是解释性语言

- 解释性：逐行解析，逐行执行

那么，什么是预编译呢？

在JavaScript真正被解析之前，js解析引擎会首先把整个文件进行**预处理**，以消除一些歧义，这个预处理的过程就被称为**预编译**

> 示例

```js
console.log(a)
var a = 123
console.log(a)
function a() {
  console.log(a)
}
a()
```

这是一段奇怪的代码，先思考一下，三个console.log 分别会打印出什么

如果要完全理解，我们就需要深入的分析 `js引擎` 到底是如何工作的

#### 2）全局对象GO

> 全局对象

全局对象（Global Object）：

- <u>在浏览器环境中，`js引擎` 会整合 `<script>` 标签中的内容，产生 `window` 对象，这个window对象就是全局对象</u>
- 在node环境中，会产生 `global` 对象

##### 全局变量

在 `<script>` 标签中声明的变量为 `全局变量`，全局变量会作为 `window` 对象的属性存在

> 示例

```js
var a = 100;
console.log(a)
console.log(window.a)
```

这里打印 a 实际上相当于打印 `window` 对象的a属性

> 扩展

啥叫整合？

> 示例

```js
<script>
	var a = 100
	console.log(a)
	console.log(window.a)
</script>
<script>
    // 这里能访问到a吗？？？
    console.log(a)
</script>
```

- 可以，因为j`s引擎` 会把所有的 `<script>` 标签整合到一起，生成一个 `window` 对象

##### 全局函数

在 `<script>` 标签中声明的函数为 `全局函数`，全局函数会作为 `window` 对象的方法存在！！

> 示例

```js
function a(){
	console.log('1111')
}
console.log(window.a)
```

那么问题来了，当同时定义变量a和函数a时，会发生什么呢？

就像我们看到的奇怪代码里一样，而预编译就是为了处理类似的这些冲突

#### 3）活动对象AO

> 活动对象

活动对象（activation Object）：也叫激活对象

- 在函数被调用时产生，用来保存当前函数内部的执行环境（Execution Context），也叫执行期上下文
- 在函数调用结束时销毁

##### 局部变量

在函数内部声明的变量叫 **局部变量**，局部变量作为 **AO对象**的属性存在

> 示例

```js
function a() {
	var i = 0
  console.log(i)
}
a()
```

> 如何理解局部变量

在`函数a` 的外部，不能访问的 `变量i` 只在`函数a` 的范围内才能使用，其实，这也就是作用域的由来

- 如果不执行函数，不会产生 `AO对象` ，就不会存在 `i属性` 
- 如果执行函数，就会产生 `AO对象` ，并将 `变量i` 作为 `AO对象` 的属性
- 函数执行完后，AO对象被销毁，也就意味着不能使用 `i属性`

##### 局部函数

在函数内部声明的函数叫 **局部函数**，局部函数作为 **AO对象**的方法存在

> 示例

```js
function a(){
	function b(){
		console.log(222)
	}
  b()
}
a()
```

### 2 全局预编译

#### 1）流程

1. 查找变量声明，作为GO对象的属性名，值为undefined
2. 查找函数声明，作为GO对象的属性名，值为function

> 变量声明

通过 `var` 关键字声明变量

```js
var a  // 变量声明
var a = 111  // 变量声明+变量赋值
```

> 函数声明

通过`function` 关键字声明函数

```js
function a(){}  // 函数声明
var a = function() {}   // 函数表达式 不是函数声明
```

> 示例

```js
console.log(a)
var a = 100
console.log(a)
function a(){
	console.log(111)
}
console.log(a)
// 1、产生window对象
// 2、查找变量的声明，把a作为window对象的属性名，属性值为undefined
// 3、查找函数的声明，把函数名a作为window对象的属性名，属性值为function
// 全局预编译结束，结束后 代码从上到下依次执行
```

#### 2）结论

如果存在同名的变量和函数，函数的优先级高

### 3 函数预编译

#### 1）流程

1. 在函数被调用时，为当前函数产生 `AO对象`
2. 查找形参和变量声明作为 `AO对象` 的属性名，值为 undefined
3. 使用实参的值改变形参的值
4. 查找函数声明，作为 `AO对象` 的属性名，值为function

#### 2）示例

> 示例一

```js
function a(test){
	var i = 0
  function b() {
    console.log(222)
  }
  b()
}
a(1)
// 1、产生window对象
// GO：1、查找变量的声明
//     2、查找函数的声明，将函数a作为window对象的属性名，值为function
// 全局预编译结束
// 执行代码
// 执行第8行，调用函数a，产生函数a的AO对象
// AO: 1、查找形参 test,变量i作为 AO对象的属性名，值为undefined
//     2、实参1赋值给test，test：1
//     3、查找局部函数b, b作为AO对象的属性名，值为function
// 函数预编译结束
// 执行
// i= 0
// 执行b  调用b函数
```

> 示例二

```js
function a(test){
	console.log(b)
  var b = 0;
  console.log(b)
  function b(){
    console.log(2222)
  }
}
a(1)
```

> 示例三

```js
function a(b,c){
  console.log(b)
  var b = 0
  console.log(b)
  function b(){
    console.log(2222)
  }
  console.log(c)
}
a(1)
```

> 示例四

```js
function a(i){
	// var i
  console.log(i)
  function i(){ 
  }
}
a(1)
```

#### 3）结论

- 只要声明了局部函数，函数的优先级最高
- 没有声明局部函数，实参的优先级最高
- 整体来说： 局部函数 > 实参 > 形参



## 二、作用域与作用域链

### 1、概念

#### 1）作用域

> 域：范围，区域
>
> 作用域是根据名称查找变量的一套规则

在js中，作用域分为**全局作用域**和**局部作用域**

- 全局作用域：由 `<script>` 标签产生的区域，从计算机的角度可以理解为window 对象
- 局部作用域：由函数产生的区域，从计算机的角度可以理解为该函数的 AO对象

#### 2）作用域链

在js中，函数存在一个隐式属性 `[[scopes]]` ，这个属性用来保存当前函数在执行时的环境（上下文），由于在数据结构上是链式的，也被称为作用域链，我们可以把它理解成一个**数组**

> 函数类型存在 [[scopes]]属性

```js
function a(){}
console.dir(a)  // 打印内部结构
```

- [[scopes]]属性在函数声明时产生，在函数被调用时更新
- [[scopes]]属性记录当前函数的执行环境
- 在函数被调用时，将该函数的AO对象压入到 [[scopes]]中

### 作用

作用域链有什么作用呢？

在访问变量或者函数时，会在作用域链上依次查找，最直观的表现是：

- 内部函数可以使用外部函数声明的变量

> 示例

```js
function a(){
	var a = 111
	function b(){
		console.log(aa)
	}
	b()
}
a()
```

- 在函数a中声明定义了变量 aa
- 在函数b中没有声明，却可以使用

> 思考

如果在函数b中，也定义同名变量 aa会怎样

> 结论

内部函数可以使用外部函数的变量

外部函数不能使用内部函数的变量

## 三、闭包

如果在内部函数使用了外部函数的变量，就会形成闭包，闭包保留了外部环境的引用

如果内部函数被返回到了外部函数的外边，在外部函数执行完后，依然可以使用闭包里的值

### 1、闭包的形成

在内部函数使用外部函数的变量，就会形成闭包，闭包是当前作用域的延伸

> 示例

```js
function a(){
	var aa = 100
	function b(){
		console.log(aa)
	}
	b()
}
a()
```

从代码的角度看，闭包也是一个对象，闭包里包含哪些东西呢？

在内部函数b中使用了外部函数a中的变量，这个变量就会作为闭包对象的属性！！

> 思考

```js
function a(){
	var aa = 100
	function b(){
		console.log(b)  // 形成闭包  执行完会销毁没有返回，有人也理解为没有形成闭包
	}
	b()
}
a()

// 1、产生aAO对象：{aa: 100, b: fun}
// 2、产生bAO对象
```

 会形成闭包，由于b的声明时在外部函数a中的，在内部函数b中使用了b，会形成闭包

闭包里存放了一个属性，就是b函数

> 思考

```js
function a(){
	var aa = 100
  function b(){
    var b = 200
    console.log(b)
  }
  b()
}
a()
```

不会形成闭包，由于在b函数内部定义了变量b，打印时直接使用的是内部函数里的变量b，不会形成闭包

### 2、闭包的保持

如果希望在函数调用后，闭包依然保持，就需要将内部函数返回到外部函数的外部 

> 示例

```js
function a(){
  var num = 0
  function b(){
    console.log(num++)   // 形成闭包
  }
  return b
}
var demo = a()
console.dir(demo)
a()()
a()()
demo()
demo()
```

第8行，调用a函数，将内部函数b返回，保存在函数a的外部

第9行，调用demo函数，实质上是调用内部函数，在函数b的[[scopes]]属性中可以找到闭包对象，从而访问到里面的值

### 3、总结

使用闭包要满足两个条件

1. 闭包要形成：在内部函数使用外部函数的变量
2. 闭包要保持：内部函数返回到外部函数的外面

## 四、闭包的应用

### 1、闭包的两面性

> 任何事物都有两面性

好处：一般来说，在函数外部是没办法访问函数内部的变量的，设计闭包最主要的作用就是为了解决这个问题。

坏处：有时不注意使用了闭包，会导致出现意想不到的结果

### 2、[闭包的应用](https://blog.csdn.net/abc1194474469/article/details/107465091) 

1. 在函数外部访问私有变量
2. 实现封装
3. 防止污染全局变量

> 示例

在函数外部访问私有变量

```js
function a(){
  var num = 0
  function b(){
    num++
  }
  return b
}
var demo = a()
demo()
```

本来在函数a的外部（全局）不能直接访问内部变量num，通过闭包就可以使用num变量了

> 示例

```js
function Person(){
  var uname
  function setName(uname){
    this.uname = uname
  }
  function getName(){
    console.log(this)
    return this.uname
  }
  return {
    getName: getName,
    setName: setName
  }
}

var xiaopang = Person()
xiangpang.setName('xiaopang')
var name = xiaopang.getName()
```

