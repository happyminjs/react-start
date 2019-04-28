1、JSX 的时候一般都会带上换行和缩进，这样可以增强代码的可读性
2、推荐在 JSX 代码的外面扩上一个小括号，这样可以防止 分号自动插入的bug
```js
const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);
```
3、可以使用引号来定义以字符串为值的属性
```js
const element = <div tabIndex="0"></div>;
```
4、使用大括号来定义以 JavaScript 表达式为值的属性（不要再在外面套引号了，JSX 会将引号当中的内容识别为字符串而不是表达式。）
```js
const element = <img src={user.avatarUrl} />;
```
5、React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称
```bash
例如，class 变成了 className，而 tabindex 则对应着 tabIndex
```
6、Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。
```js
// 下面两种代码的作用是完全相同的：
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
// React.createElement() 返回一个类似下面例子的对象(简化过的)：
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world'
    }
};
```
7、通过ReactDOM.render() 的方法来将其渲染到页面上
```js
const element = <h1>Hello, world</h1>;
const element2 = <Welcome name="Sara" />;  // 组件形式
ReactDOM.render(element, document.getElementById('root'));
// 渲染到id为root的元素内
```
8、React元素都是不可变的，新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法。（React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分）
```js
// 例如下面的计时器：
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
### 9、函数定义组件
接收一个单一的“props”对象并返回了一个React元素（注意：组件名称必须以大写字母开头）
Props是只读的，不可以更改
```js
// 方法一：
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// 方法二： 
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// 渲染
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
### 10、组合组件
注意：组件的返回值只能有一个根元素。这也是我们要用一个\<div\>来包裹所有\<Welcome />元素的原因。
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
### 11、状态(state)
状态与属性十分相似，但是状态是私有的，完全受控于当前组件。要正确使用状态。
##### 不要直接更新状态  
```javascript
// 此代码不会重新渲染组件：
this.state.comment = 'Hello';     // Wrong
// 应当使用 setState():
this.setState({comment: 'Hello'});      // Correct
```
构造函数是唯一能够初始化 this.state 的地方。
##### 状态更新可能是异步的  
多个setState() 调用合并成一个调用可提高性能。
this.props 和 this.state 可能是异步更新的，不应该依靠它们的值来计算下一个状态。
```js
// Wrong ,不可以直接取counter给自己赋值
this.setState({
  counter: this.state.counter + this.props.increment,
});
// Correct ，应使用下面这种写法。先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}))
```
##### 状态更新合并

### 12、生命周期  
![生命周期图](/pub-img/cycle.jpg)  
#### 初始化：
###### getDefaultProps()
    设置默认的props，也可以用dufaultProps设置组件的默认属性.
###### getInitialState()
    在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props
###### componentWillMount()
    组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
    比如 nextState.name = 'XX', render的时候会用你更改的值。
    但是在这里调用this.setState()要谨慎，不能每次在 componentWillUpdate 执行 this.setState()，可能会死循环。
###### render()
    react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
###### componentDidMount()
    组件渲染之后调用，只调用一次。
#### 更新：
###### componentWillReceiveProps(nextProps)
```bash
组件初始化时不调用，组件接受新的props时调用。
```
###### shouldComponentUpdate(nextProps, nextState)
```bash
react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候
```
###### componentWillUpdata(nextProps, nextState)
```bash
组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
```
###### render()
```bash
组件渲染
```
###### componentDidUpdate()
```bash
组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
```
#### 卸载:
###### componentWillUnmount()
```bash
组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
```
### 13、一个完整的组件都发生了什么
```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
>1、当 \<Clock /> 被传递给 ReactDOM.render() 时，React 调用 Clock 组件的构造函数。 由于 Clock 需要显示当前时间，所以使用包含当前时间的对象来初始化 this.state 。 我们稍后会更新此状态。  

>2、React 然后调用 Clock 组件的 render() 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 Clock 的渲染输出。  

>3、当 Clock 的输出插入到 DOM 中时，React 调用 componentDidMount() 生命周期钩子。 在其中，Clock 组件要求浏览器设置一个定时器，每秒钟调用一次 tick()。

>4、浏览器每秒钟调用 tick() 方法。 在其中，Clock 组件通过使用包含当前时间的对象调用 setState() 来调度UI更新。 通过调用 setState() ，React 知道状态已经改变，并再次调用 render() 方法来确定屏幕上应当显示什么。 这一次，render() 方法中的 this.state.date 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。

>5、一旦Clock组件被从DOM中移除，React会调用componentWillUnmount()这个钩子函数，定时器也就会被清除。
### 14、事件处理 + 传参方法

```js
// 方法一
class App extends React.Component{
  constructor() {
    // 确保 this 在 clickEvent 中绑定
    this.clickEvent = this.clickEvent.bind(this);
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.clickEvent}>按钮</button>
      </div>
    )
  }
  clickEvent(event) {
    // this 指向class方法
    // event 点击按钮对象
    console.log(this);
    console.log('event', event);
  }
}

// 方法二
class App extends React.Component{
  constructor() {  }
  render() {
    return (
      <div className="App">
        // 确保 this 在 clickEvent 中绑定，此种方法的事件对象必须显示传递
        <button onClick={(e) => this.clickEvent('aaa', e)}>按钮</button>
      </div>
    )
  }
  clickEvent(param1, event) {
    console.log('param1', param1);
    console.log('event', event);
    console.log('this: ', this);
  }
}

// 方法三
class App extends React.Component{
  constructor() {
    // 确保 this 在 clickEvent 中绑定
    this.clickEvent = this.clickEvent.bind(this);
  }
  render() {
    return (
      <div className="App">
        // 要将this放在第一个参数，因为bind继承this
        <button onClick={this.clickEvent.bind(this, 'aaa', 'bbbb')}>按钮</button>
      </div>
    )
  }
  clickEvent(param1, param2, event){
    // 要将event排在最后一个参数
    console.log('param1',param1);  //  bbbb
    console.log('param2',param2);  //  aaa
    console.log('this ', this);    //  this
    console.log('event ', event);  //  event
  }
}
```

    
