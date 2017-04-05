import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    }
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://172.46.3.111:3001")
    this.socket.onmessage = (newMsg) => {
      const messages = this.state.messages.concat(JSON.parse(newMsg.data));
      this.setState({messages: messages});
    }
    console.log(this.state.messages)
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} handleNewContent={this.handleNewContent.bind(this)}/>
      </div>
    );
  }
  handleNewContent(e) {
    let currUser = this.state.currentUser.name;
    if (e.keyCode === 13) {
      const enteredMessage = {username: currUser, content: e.target.value}
      this.socket.send(JSON.stringify(enteredMessage));
      e.target.value = "";
    }
  }
}
export default App;
