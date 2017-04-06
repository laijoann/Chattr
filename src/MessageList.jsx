import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';
import GiphyMessage from './Giphy.jsx';

class MessageList extends Component {
  componentDidUpdate(prevProps) {
    console.log(prevProps.messages.length, this.props.messages.length)

  }

  render() {
    return (
      <main id="chat-messages" className="messages">
      { this.props.messages.map( message => {
        switch (message.type) {
          case 'content':
            return <Message
            key={message.text.id}
            colour={message.text.colour}
            username={message.text.username}
            content={message.text.content} />
          case 'usernameSystemMsg':
            return <SystemMessage
            key={message.text.id}
            prevUser={message.text.prevUser}
            newUser={message.text.newUser} />
          case 'giphy':
          case 'image':
            return <GiphyMessage
            key={message.text.id}
            colour={message.text.colour}
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
