import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
      { this.props.messages.map( message => {
        if (message.type === 'content') {
          return <Message key={message.text.id} username={message.text.username} content={message.text.content} />
        } else if (message.type === 'usernameSystemMsg') {
          return <SystemMessage key={message.text.id} prevUser={message.text.prevUser} newUser={message.text.newUser} />
        }
     })}
      </main>
    )
  }
}

MessageList.propTypes = {
  messages: React.PropTypes.array
}

export default MessageList;
