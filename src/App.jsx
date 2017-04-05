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
        <ChatBar name={this.state.currentUser.name} handleNewContent={this.handleNewContent.bind(this)} handleNewUsername={this.handleNewUsername.bind(this)}/>
      </div>
    );
  }
  handleNewContent(e) {
    let currUser = this.state.currentUser.name;
    if (e.keyCode === 13) {
      const enteredMessage = {username: currUser, content: e.target.value}
      const toSend = {
        type: 'content',
        text: enteredMessage
      }
      this.socket.send(JSON.stringify(toSend));
      e.target.value = "";
    }
  }
  handleNewUsername(e) {
    if (e.keyCode === 13) {
      console.log(e)
      const enteredUsername = e.target.value
      this.socket.send(JSON.stringify(enteredUsername))
      e.target.value = "";
    }
  }
}
export default App;
