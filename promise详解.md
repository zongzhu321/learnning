# 一. Promise

## 1、 为什么需要 promise



> 需求

后面的请求依赖前面请求的返回结果

> 回调地狱

在回调函数中嵌套回调

promise解决了回调地域问题

## 2、Promise的基本使用

Promise是一个构造函数，通过`new`关键字实例化对象

> 语法

```javascript
new Promise((resolve, reject) => {})
```

- `Promise` 接受一个函数作为参数
- 在参数函数中接受两个参数
  - resolve
  - reject

> Promise 实例

`promise` 实例有两个属性

- state：状态
- result：结果

### 1）promise状态

第一种状态：pending(准备，待解决，进行中)

第二种状态：fulfilled(已完成，成功)

第三种状态：rejected(已拒绝，失败)

### 2）promise状态的改变

通过调用 resolve() 和 reject() 改变promise对象的状态

> 示例

```javascript
const p = new Promise((resolve, reject) => {
	// resolve(): 调用函数，是当前promise对象的状态改成fulfilled
  // reject(): 调用函数，使当前promise对象的状态改成rejected
  resolve()
})
```

- resolve(): 调用函数，使当前promise对象的状态改成fulfilled
- reject(): 调用函数，使当前promise对象的状态改成rejected

> promise状态的改变是一次性的

### 3）promise 结果

通过调用resolve()，reject()，传递函数，改变 当前promise对象的结果

> 示例

```javascript
const p = new Promise((resolve, reject) => {
	resolve('成功的结果')
  // reject('失败的结果')
})
```



## 3、Promise的方法

### 1）then 方法

> 示例

```javascript
const p = new Promise((resolve, reject) => {
  // 通过调用resolve、reject，传递参数，改变当前对象的结果
  resolve('成功的结果')
  // reject(‘失败的结果’)
})
// then方法函数
// 参数
// 1、是一个函数
// 2、还是一个函数
// 返回值：是一个promise对象
p.then((value) => {
  // 当promise的状态是fulfilled时，执行
}, (reason) => {
  // 当promise的状态是rejected时，执行
})
```

- 在then方法的参数函数中，通过形参使用promise对象的结果

> then方法返回一个新的promise实例  状态为pending

> promise的状态不改变，不会执行then里面的方法

> 在then方法中，通过return将 返回的promise实例改为fulfilled状态

```javascript
const p = new Promise((resolve,reject) => {
  	resolve()
})
const t = p.then((val)=> {
  // 使用return 可以将t实例的状态改成fulfilled
  // return 123
  // 如果这里的代码出错，会将t实例状态改成rejected
  console.log(a)
}, () => {
  
})
t.then((val) => {
	console.logn(val)
}, (reason) => {
  console.logn(reason)
})
```

### 2）catch方法

> 示例

```javascript
const p = new Promise((resolve, reject) => {
  reject('失败')
  throw new Error('出错了')
})
// catch中的参数函数在什么时候被执行？
// 1、当promise的状态改成rejected时，被执行
// 2、当promise执行体中出现代码错误时，被执行
p.catch((reason) => {
  
})
```



## 4、promise.all 和 promise.race方法

### 1）promise.all

> Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
var p = Promise.all([p1,p2,p3]);
```

上面代码中，Promise.all 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 对象的实例。（Promise.all 方法的参数不一定是数组，但是必须具有 iterator 接口，且返回的每个成员都是 Promise 实例。）

p 的状态由 p1、p2、p3 决定，分成两种情况。

- 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
- 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

### 2）promise.race

> Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
var p = Promise.race([p1,p2,p3]);
```

上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的返回值。

如果Promise.all方法和Promise.race方法的参数，不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。



## Promise 优缺点

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。



> Promise 对象的错误具有"冒泡"性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获。

