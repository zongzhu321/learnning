JavaScript面向对象编程

# 一、类和对象

## 1 对象的概念

> 对象：一个具体的实体

在现实世界中，对象随处可见，一个人，一个学生，一个杯子，一辆汽车，游戏里的一个英雄...都是一个对象

## 2 对象的组成

> 如何描述一个对象呢

比如

- 每个人都有**姓名**，**年龄**，**性别**，这些特征
- 游戏里的英雄都有**生命值**，**攻击力**，**防御力**这些特征

对象除了这些**特征**外，还有一些 **行为/动作**

比如

- 人可以 **吃饭，睡觉**
- 游戏里的英雄可以 **移动**，可以放 **技能**

在程序里

- 把对象的特征叫做**属性**，使用变量来描述
- 把对象的行为叫做**方法**，使用函数来描述

因此，我们得出一个重要结论：

> 对象是有属性和方法组成的

## 3 类的概念

> 类：具有相同特征的事物的集合

我们把具有相同特征和行为的实体抽象出来，就形成了一个类

比如：把人集合在一起就形成了人类，把游戏英雄集合起来，就形成了英雄类

- 每一个人类都有一些相同的特征，比如：姓名，性别，年龄，身高，体重等等
- 每一个英雄也有一些相同的特征，比如：生命值，攻击力，防御力 等等

## 4 程序中的类和对象

> 那么如何使用程序来描述这些相同特征呢？

可以定义一个**模板/规范/设计图纸**，然后通过这个 **模板/规范、设计图纸**来生产一个个的**实体**

比如：我们可以通过图纸 来生产一辆汽车

- 我们把定义的这个 **模板**叫做**类**
- 把生产出来的 **实体**叫做**对象**
- 把生产的过程叫做 **实例化**

## 5 类和对象的关系

类和对象的关系，可以认为是 **整体和个体，抽象和具体的关系**

通过上面的描述，总结来说就是

- 类是对象的集合
- 对象是类的实例化

## 6 小结

1. 对象是由属性和方法组成的
2. 属性就是变量，方法就是函数
3. 类是对象的集合，对象是类的实例化

补充：由于类是对象的集合，通常我们也可以说类由属性和方法组成

# 二、初步认识js中的类和对象

## 1 构造函数的定义

在js中，没有类(class)的概念，主要通过构造函数来模拟的

在 **es6** 中，js引入了class关键字来表示类

> 语法

```js
function 构造函数名(){

}
```

1. 使用 `function` 关键字表示定义一个构造函数
2. 构造函数名一般 首字母大写

> 示例

```js
function Person(){

}
```

通过以上方式就可以定义一个Person构造函数，相当于定义好了一个Person类

## 2 构造函数的作用

### 1）通过构造函数实例化对象

在js中，我们通过构造函数（类）来实例化对象

> 语法

```js
new 构造函数名()
```

> 通过构造函数来实例化对象

```js
// 定义一个构造函数
function Person(){

}
// 实例化一个对象，赋值给变量p
var p = new Person()
console.log(typeof p)
```

以上代码

- 通过`new` 关键字，产生一个对象，并赋值给变量p
- 通过 `typeof` p测试变量p的类型为 object，说明p是一个对象

### 2）在构造函数中定义属性

> 构造函数规定了由该类实例化出来的对象应该包含哪些属性

比如，由学生类实例化出来的学生对象都应该有**姓名**，**年龄**这些属性

```js
function Student(){
  this.uname = null;
  this.age = null;
}
```

在构造函数的内部，我们通过 `this.属性名` 的方式来定义属性

在这里，先把这个看作固定写法，后面在具体分析

> 构造函数虽然可以规定实例化对象应该包含哪些属性，但是并不能确定实例对象的属性值

比如 人类都应该有名字这个属性，但是具体叫什么名字，只有在一个人出生的时候才去确定

因此，在实例化对象的时候，需要将 具体的数据 传递给构造函数

```js
// 定义一个学生类
function Student(n,a){
  this.name = n;
  this.age = a;
}
// 实例化对象
var stu = new Student('小明', 20)
```

> 重要结论

构造函数主要完成属性的初始化！

# 三、对象的方法

## 1 方法的定义和使用

我们已经知道

1. 类由属性和方法组成
2. 在js中，通过构造函数定义类
3. 在构造函数中可以通过 `this.属性名` 来定义属性

那么，在构造函数中是否可以同过 `this.方法名` 定义方法呢？

### 1）在构造函数中定义方法

```js
function Student(name,age){
  this.name = name;
  this.age = age;
  this.sayHi = function(){
    console.log(this.name+ 'say hi')
  }
}
```

### 2）方法的使用（调用）

> 语法

```js
对象.方法名()
```

## 2 使用构造函数定义方法的问题

虽然可以在构造函数中定义方法，但是一般不这么做，为什么？

看如下示例

```js
// 定义类
function Student(n,a){
	this.name = n;
	this.age = a;
  this.sayHi = function(){
    console.log(this.name + ' say hi')
  }
}

// 实例化对象
var stu = new Student('dog', 20)
var stu1 = new Student('cat', 18)
// 判断stu.sayHi === stu1.sayHi?   // false
// 方法名：表示内存中的首地址
// stu和stu1的sayH方法都需要分配不同的内存
```

- 上面这个比较表示 stu对象和stu1对象的sayHI方法在内存中的首地址是不同的！

方法名：表示内存中的首地址

# 四、对象实例化原理分析

## 1 引用数据类型

对象是一种特殊的数据，看如下代码

> 示例

```js
// 定义一个学生类
function Student(n, a){
	this.name = n;
  this.age = a
}
// 实例化对象
var stu = new Student('小明', 20)
```

- 这里并**不是**把所有的数据直接保存在变量中
- 而是先在堆区开辟一个空间，把这个空间的引用保存在变量中
- 在js中，**函数**和**对象**都是 **引用数据**类型

![截屏2021-06-06 上午11.11.10](/Users/mackbook-j/Desktop/截屏2021-06-06 上午11.11.10.png)

> 什么是引用呢，引用有什么用呢？

一句话解释：引用就是来找数据的

类似于路径的概念，就像我们可以通过路径 E:\document\......找到电脑中的一个文件

又或者酒店的房间号，通过房间号就可以找到房间

通过引用就可以找到内存中的数据

引用本质上是 **内存首地址**，通过这个地址可以找到对应的内存空间，进而获取数据

## 2 new实例化的步骤

![截屏2021-06-06 上午11.41.13](/Users/mackbook-j/Desktop/截屏2021-06-06 上午11.41.13.png)

## 3 为什么不在构造函数中定义方法

```js
// 定义一个学生类
function Student(n, a){
	this.name = n;
  this.age = a;
  this.sayHi = function(){
    
  }
}
// 实例化对象
var stu = new Student('小明', 20)
var stu1 = new Student('小刚', 30)
```

截屏2021-06-06 上午11.44.42

这就解释了前面的问题，虽然 **sayHi**方法的代码是相同的，但是每次实例化时会开辟一个新的内存空间，造成浪费

## 4 初步解决

既然方法是相同的，我们可不可以单独定义一个函数赋值给 sayHi呢？

> 示例

```js
// 初步解决方案
// 一、定义类
function Student(n, a){
  this.name = n;
  this.age = a;
  this.sayHi = sayHi
}
function sayHi(){
  console.log('大家好')
}

// 二、实例化对象
var stu = new Student('小明', 20)
var stu1 = new Student('xiaohong', 28)
console.log(stu.sayHi == stu1.sayHi) // true
```

![截屏2021-06-06 上午11.55.52](/Users/mackbook-j/Desktop/截屏2021-06-06 上午11.55.52.png)

这样做确实可以解决，但是这种做法很奇怪，一般不会使用，为什么这么说呢。

照理说， `sayHi` 函数应该仅仅是属于Student类，只有通过Student类实例化出来的对象可以调用。如果把`sayHi` 放在全局下，可以当成普通函数来调用。因此，我们称这种做法破坏了类的**封装性**

> 什么是**封装性**？

类的成员尽量封闭在类的内部，隐藏细节与实现

> 示例

```js
// 一、定义类
function Student(n, a){
  this.name = n;
  this.age = a;
  this.sayHi = sayHi;
}

function sayHi(){
  console.log('大家好，我叫' + this.name)
}
// 二、实例化对象
var stu = new Student('xiaoming', 20)
var stu1 = new Studnet('xiaohong', 38)

// 使用对象调用可以得到希望的结果
stu.sayHi();   // 大家好 我叫小红

// 当普通函数直接调用，会得到‘奇怪’的结果
sayHI();  // 大家好，我叫undefined
sayHI.call(stu)
```

为什么会出现这种'奇怪'的现象，要搞明白这个问题，就要了解js中的this指向

## 5 初步了解this指向

# 五、原型

前面，我们了解到属性可以定义在构造函数中，但是 **方法的定义**没有很好的解决方案

为了解决这个问题，体术了**原型模式**

或者，换句话说：**原型的产生主要是为了解决方法共享的问题**

## 1 什么是原型模式

系统在创建构造函数的同时，会自动在内存中生成一个与之相应的对象，这个对象就是 **原型对象**

比如：

```js
// 定义一个构造函数
function Person(){}
```

系统在创建Person构造函数的同时，自动在内存中生成一个与之对应的Person对象

![截屏2021-06-06 下午12.42.51](/Users/mackbook-j/Desktop/截屏2021-06-06 下午12.42.51.png)

由上图可知，构造函数与原型对象是两个**独立**的内存空间

## 2 构造函数与原型对象的关系

他们是相对独立的，但是又存在联系

> 示例

```js
// 一、构造函数
function Person(n){
	this.name = n;
}
// 二、打印构造函数的结构
console.dir(Person);
```

在Person构造函数的内部存在一个属性 **Protype**指向Person的原型对象

在Person的原型对象的内部也存在一个属性**constructor**指向Person的构造函数

![截屏2021-06-06 下午3.32.07](/Users/mackbook-j/Desktop/截屏2021-06-06 下午3.32.07.png)

证明Person构造函数中 存在prototype属性

## 3 实例对象与原型对象的关系

在由Person类实例化出来的对象person1和person2中也有一个属性--proto--(**隐士原型**)指向原型对象

> 示例

```js
// 一、构造函数
function Person(n){
	this.name = n
}
// 二、实例化对象
var person1 = new Person('xiaoming');
var person2 = new Person('xiaomei');

// 三、打印person1和person2的内部结构
console.dir(person1)
console.dir(person2)
```

## 4 三者的关系

**构造函数**的 `prototype` 属性和**实例对象**的 `--proto--` 属性指向同一个对象

只要是函数 都存在属性prototype；只要是对象都存在属性--proto--

> 示例

```js
// 一、定义构造函数
function Person(n){
	this.name = n
}

// 二、实例化对象
var p = new Person('xiaoming')

// 三、测试
console.log(Person.prototype === p.__proto__);  // true
```

> 图解

![截屏2021-06-06 下午3.51.26](/Users/mackbook-j/Desktop/截屏2021-06-06 下午3.51.26.png)

## 5 使用原型定义方法

我们先大致了解下如何通过原型模式定义方法，再具体分析

> 示例

```js
// 一、在构造函数中定义属性
function Student(n, a){
  this.name = n;
  this.age = a;
}

// 二、在原型中定义方法
Student.prototype.sayHi = function(){
  console.log('大家好，我叫' + this.name)
}

// 三、实例化对象
var stu = new Student('xiaoming',20)
var stu1 = new Student('xiaomei',39)

// 比较不同的对象方法是否相同
console.log(stu.sayHi == stu1.sayHi);  // true
// 我们并没有发现stu中有sayHi方法，为什么可用呢
```

## 6 小结

- 在构造函数中定义属性
- 在原型对象中定义方法

# 六、原型链

## 1 引用数据类型特性

**引用数据类型（数组、对象、函数）都可以自由的扩展成员（属性和方法）**

1. 只要是引用类型都存在 --proto--属性
2. 只要是函数类型都存在prototype属性
3. 引用数据类型都可以**自由的扩展成员**（属性和方法）

### 1）引用类型都存在--proto--

> 示例

```js
// 定义一个对象
var obj = {}
// 以上代码相当于
var obj = new Object();
```

- 通过obj.--proto--可以找到原型对象
- 再通过obj.--proto--.constructor 可以找到对应的构造函数

### 2）函数类型还存在prototype

函数类型是一种特殊的引用类型，除了具有所有引用类型的特点（--proto--）外，

还具有自己特有的prototype属性。

函数类型可以通过 typeof判断，得到的结论是 function

结论：

1. 函数时引用类型，因此存在--proto--属性
2. 函数类型还存在特有的prototype属性

> 思考

1. 函数的--proto--指向什么？
2. 函数的prototype指向什么？

> 示例

```js
// 一、定义一个函数
function Foo(){}

// 通过Foo.prototype找到Foo的原型函数
// 通过Foo的原型对象的constructor可以找到构造函数
console.log(Foo.prototype.constructor === Foo);  // true
// 通过Foo.--proto--找到Function的原型对象
console.log(Foo.__proto__ == Function.prototype)  // true
```

![截屏2021-06-08 下午7.04.55](/Users/mackbook-j/Desktop/截屏2021-06-08 下午7.04.55.png)

1. Foo作为对象，可以看做是由Function构造函数实例化的一个对象，因此--proto--指向Function的原型
2. Foo本身作为构造函数，prototype指向Foo的原型

### 3） 引用类型可以扩展成员

先从熟悉的对象入手

> 示例

```js
// 定义一个对象
var obj = {}
// 以上代码相当于
// var obj = new Object()

// 先打印obj的内容
console.dir(obj)

// 给对象扩展属性和方法
obj.name = 'xiaoming'
obj.sayHi = function(){
  console.log('dajiahao')
}

// 再次打印obj的内容
console.dir(obj)
```

> 示例

定义一个普通函数，尝试给函数扩展



事实上，函数时一种
