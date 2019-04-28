class Clock extends React.Component {
    constructor(props) {
      super(props);
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