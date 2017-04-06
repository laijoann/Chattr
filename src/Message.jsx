import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className='message'>
        <span className ='message-username'
          style={{color: this.props.colour}}>
          {this.props.username}
        </span>
        <span className='message-content'>
          {this.props.content}
        </span>
      </div>
    )
  }
}

Message.propTypes = {
  username: React.PropTypes.string,
  content: React.PropTypes.string,
  colour: React.PropTypes.string
}

export default Message;
