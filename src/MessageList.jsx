import React, {Component} from 'react';
import Message from "./Message.jsx";
import SystemMessage from "./SystemMessage.jsx";

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message />
        <SystemMessage />
      </main>
    )
  }
}

export default MessageList;
