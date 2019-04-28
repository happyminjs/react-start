import React, { Component } from 'react';
// import Clock from './components/clock';
import logo from './logo.svg';
import './public/reset.css';
import './App.css';

function Welcome(props) {
  return <h3>Hello, {props.name}</h3>;
}
function RegistButton(props) {
  if (typeof props.isRegist == 'undefined'){
    return null;
    // 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。
  }
  let btn = null;
  if (props.isRegist){
    btn = <span>hh</span>
  }else{
    btn = <span>ww</span>
  }
  return (
    <p onClick={props.onClick}>
      {btn}
      {props.isRegist ? 'Regist' : 'Login'}
      {props.isRegist && <span>黑</span>}
    </p>
  );
}

class Clock extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    console.log(props);
    this.state = {
      date: new Date(),
      name: this.props.name + '   ' + new Date()
    };
  }
  componentWillMount() {
    // 只组件初始化时调用，之后更新不调用
    console.log('componentWillMount: 初始化时调用一次');
  }
  componentDidMount() {
    //组件渲染之后调用，只调用一次。
    this.timerID = setInterval(() => this.tick(),1000);
  }
  componentWillUnmount() {
    // 组件将要卸载时调用
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date(),
      name: this.props.name + '   ' + new Date()
    });
  }
  render() {
    return (
      <div>
        <p>Hello,  {this.state.name}!</p>
        <p>It is {this.state.date.toLocaleTimeString()}.</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isRegist: false,
      arr: [1, 2, 3],
      clickName1: '按钮11',
      clickName2: '按钮222',
    }
    this.clickEvent = this.clickEvent.bind(this);
  }
  render() {
    return (
      <div className="App">
        <div className="img-part">
          <img src="https://pic8.58cdn.com.cn/nowater/fangfe/n_v2790441016a694609a9ceae077e6a46c5.jpg" alt=""/>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save.
          </p>
          <RegistButton isRegist={this.state.isRegist} onClick={this.changeRegist.bind(this)}></RegistButton>
        </header>
        <div className="app-content">
          <div className="click-part">
            <button className="click-btn" onClick={this.clickEvent} style={{marginRight: '10px'}}>{this.state.clickName1}</button>
            <button className="click-btn" onClick={(e) => this.clickEvente('aaa', e)} style={{marginRight: '10px'}}>{this.state.clickName1}</button>
            <button className="click-btn" onClick={this.clickEvent22.bind(this, 'aaa', 'bbbb')}>{this.state.clickName2}</button>
          </div>
          <div className="list-part">
            <ul>
              {this.state.arr.map((number, index) =><li key={index}>{number}</li>)}
            </ul>
          </div>
          <form action="">
            <label htmlFor="name">
              Name:
              <input type="text" name="name"/>
            </label>
          </form>
          <Welcome name={false} />
          <Welcome name="Cahal" />
          <Clock name="Edite" />
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
        </div>
      </div>
    );
  }
  changeRegist() {
    this.setState({
      isRegist: !this.state.isRegist
    })
  }
  clickEvent(event) {
    console.log(this);
    console.log('event', event);
  }
  clickEvente(param1, event){
    console.log('param1', param1);
    console.log('event', event);
    console.log('this: ', this);
  }
  clickEvent22(param1, param2, event){
    // 要将event排位最后一个参数
    console.log('param1',param1);  //  bbbb
    console.log('param2',param2);  //  aaa
    console.log('this ', this);    //  this
    console.log('event ', event);  //  event
  }
}

export default App;
