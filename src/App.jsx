import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: []
    }
  }
  componentDidMount() {
    this.socket = new WebSocket('ws://172.46.3.111:3001')
    this.socket.onmessage = (newMsg) => {
      const receivedMsg = JSON.parse(newMsg.data)
      switch (receivedMsg.type) {
        case 'content':
        case 'usernameSystemMsg':
        case 'giphy':
          const contMsg = this.state.messages.concat(receivedMsg)
          this.setState({messages: contMsg})
          break;
        case 'username':
          this.state.currentUser = { name: receivedMsg.text.newUser }
          break;
      }
    }
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} systemMessages={this.state.systemMessages} />
        <ChatBar name={this.state.currentUser.name} handleNewContent={this.handleNewContent.bind(this)} handleNewUsername={this.handleNewUsername.bind(this)}/>
      </div>
    )
  }
  handleNewContent(e) {
    if (e.keyCode === 13) {
      const enteredMessage = {username: this.state.currentUser.name, content: e.target.value}
      let toSend = {
        text: enteredMessage
      }
      if (e.target.value.match(/^\/gif (.+)$/)) {
        const matches = /^\/gif (.+)$/.exec(e.target.value)
        toSend.type = 'giphy'
        toSend.text.content = matches[1]
      } else {
        toSend.type = 'content'
        toSend.text.content = e.target.value
      }
      console.log('bout to send', toSend)
      this.socket.send(JSON.stringify(toSend));
      e.target.value = '';
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
