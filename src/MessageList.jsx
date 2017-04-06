import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';
import GiphyMessage from './Giphy.jsx';

class MessageList extends Component {

  componentDidUpdate(prevProps) {
    const scroll = () => {
      window.scrollTo(0, (document.body.scrollHeight));
    }
    if (!(prevProps.messages.length ===this.props.messages.length)) {
      try {
        const images = document.querySelectorAll('img');
        const img = images[images.length - 1]
        img.complete ? scroll() : img.addEventListener('load', scroll)
      } catch(err) {
        scroll()
      }
    }
  } //auto-scrolls to the latest message

  render() {
    return (
      <main className='messages'>
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
