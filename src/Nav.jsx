import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-clientNum">{this.props.clientNum} users online</span>
      </nav>
    )
  }
}

ChatBar.propTypes = {
  handleNewUsername: React.PropTypes.func,
  handleNewContent: React.PropTypes.func,
  clientNum: React.PropTypes.number
}

export default ChatBar;
