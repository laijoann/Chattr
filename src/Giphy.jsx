import React, {Component} from 'react';

class SystemMessage extends Component {
  render() {
    return (
      <div className='giphyMessage'>
        <span className ='message-username'
          style={{color: this.props.colour}}>
          {this.props.username}
        </span>
        <span className='message-content'>
          <img src={this.props.imageURL} alt = '' />
        </span>
      </div>
    )
  }
}

SystemMessage.propTypes = {
  imageURL: React.PropTypes.string,
  username: React.PropTypes.string,
  colour: React.PropTypes.string
}

export default SystemMessage;
