import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor() {
    super()
    this.state = {
      keyNum: 4,
      currentUser: { name: "Bob" },
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} handleKeyUp={this.handleKeyUp.bind(this)}/>
      </div>
    );
  }
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      const enteredMessage = {id: this.state.keyNum, username: this.state.currentUser.name, content: e.target.value}
      this.state.keyNum += 1
      e.target.value = ""
      const messages = this.state.messages.concat(enteredMessage)
      this.setState({messages: messages})
    }
  }
}
export default App;
