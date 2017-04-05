import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
      <input className="chatbar-username" placeholder="Anonymous"
      onKeyUp={this.props.handleNewUsername} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.props.handleNewContent}/>
      </footer>
    )
  }
}

ChatBar.propTypes = {
  handleNewUsername: React.PropTypes.func,
  handleNewContent: React.PropTypes.func
}

export default ChatBar;
