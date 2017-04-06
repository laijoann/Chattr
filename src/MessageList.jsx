import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';
import GiphyMessage from './Giphy.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
      { this.props.messages.map( message => {
        switch (message.type) {
          case 'content':
            return <Message
            key={message.text.id}
            colour={this.props.colour}
            username={message.text.username}
            content={message.text.content} />
          case 'usernameSystemMsg':
            return <SystemMessage
            key={message.text.id}
            prevUser={message.text.prevUser}
            newUser={message.text.newUser} />
          case 'giphy':
            return <GiphyMessage
            key={message.text.id}
            colour={this.props.colour}
            username={message.text.username}
            imageURL={message.text.content} />
        }

     })}
      </main>
    )
  }
}

MessageList.propTypes = {
  messages: React.PropTypes.array,
  colour: React.PropTypes.string
}

export default MessageList;
