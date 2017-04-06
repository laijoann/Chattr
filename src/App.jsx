import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Nav from './Nav.jsx';
const emoji = require('node-emoji');

class App extends Component {
  constructor() {
    super()
    this.state = {
      clientNum: 0,
      clientColour: '#ffffff',
      currentUser: 'Anonymous',
      messages: []
    }
  }
  componentDidMount() {
    this.socket = new WebSocket('ws://172.46.3.111:3001')
    this.socket.onmessage = (newMsg) => {
      const receivedMsg = JSON.parse(newMsg.data)
      switch (receivedMsg.type) {
        case 'content':
          receivedMsg.text.content = emoji.emojify(receivedMsg.text.content)
          const contMsg = this.state.messages.concat(receivedMsg)
          this.setState({messages: contMsg})
          break;
        case 'usernameSystemMsg':
        case 'giphy':
        case 'image':
          const miscMsg = this.state.messages.concat(receivedMsg)
          this.setState({messages: miscMsg})
          break;
        case 'username':
          this.setState({currentUser: receivedMsg.text.newUser})
          break;
        case 'clientNum':
          this.setState({clientNum: receivedMsg.text})
          break;
        case 'userColour':
          this.setState({clientColour: receivedMsg.text})
          break;
      }
    }
  }
  render() {
    return (
      <div>
        <Nav clientNum={this.state.clientNum} />
        <MessageList messages={this.state.messages} systemMessages={this.state.systemMessages} />
        <ChatBar name={this.state.currentUser} handleNewContent={this.handleNewContent.bind(this)} handleNewUsername={this.handleNewUsername.bind(this)}/>
      </div>
    )
  }
  handleNewContent(e) {
    if (e.keyCode === 13) {
      const enteredMessage = {username: this.state.currentUser, content: e.target.value, colour: this.state.clientColour}
      let toSend = {
        text: enteredMessage
      }
      if (e.target.value.match(/^\/gif (.+)$/)) {
        const matches = /^\/gif (.+)$/.exec(e.target.value)
        toSend.type = 'giphy'
        toSend.text.content = matches[1]
      } else if (e.target.value.match(/(^[\S]*\.(\?\:jpg|jpeg|png|gif))/i)) {
        toSend.type = 'image'
        toSend.text.content = e.target.value
      } else {
        toSend.type = 'content'
        toSend.text.content = e.target.value
      }
      this.socket.send(JSON.stringify(toSend));
      e.target.value = '';
    }
  }
  handleNewUsername(e) {
    if (e.keyCode === 13) {
      const enteredUsername = e.target.value
      const toSend = {
        type: 'username',
        text: { prevUser: this.state.currentUser, newUser: enteredUsername }
      }
      this.socket.send(JSON.stringify(toSend))
    }
  }
}
export default App;
