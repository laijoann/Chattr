import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
      systemMessages: []
    }
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://172.46.3.111:3001")
    this.socket.onmessage = (newMsg) => {
      const receivedMsg = JSON.parse(newMsg.data)
      switch (receivedMsg.type) {
        case 'content':
          const messages = this.state.messages.concat(receivedMsg.text);
          this.setState({messages: messages});
          break;
        case 'username':
          this.state.currentUser = { name: receivedMsg.text.newUser }
          break;
        case 'usernameSystemMsg':
          const systemMessages = this.state.systemMessages.concat(receivedMsg.text)
          this.setState({systemMessages: systemMessages})
          break;
      }
    }
    console.log(this.state.messages)
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} systemMessages={this.state.systemMessages} />
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
      const enteredUsername = e.target.value
      const toSend = {
        type: 'username',
        text: { prevUser: this.state.currentUser.name, newUser: enteredUsername }
      }
      this.socket.send(JSON.stringify(toSend))
    }
  }
}
export default App;
