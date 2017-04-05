import React, {Component} from 'react';
import Message from "./Message.jsx";
import SystemMessage from "./SystemMessage.jsx";

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map( (message) => <Message key={message.id} username={message.username} content={message.content}/>)}
        {this.props.systemMessages.map( (message) => <SystemMessage key={message.id} prevUser={message.prevUser} newUser={message.newUser} />)}
      </main>
    )
  }
}

export default MessageList;

//TODO: so what do I do with the system messages O.o
