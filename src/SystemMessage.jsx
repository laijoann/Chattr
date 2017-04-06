import React, {Component} from 'react';

class SystemMessage extends Component {
  render() {
    return (
      <div className='system-message'>
        {this.props.prevUser} changed their name to {this.props.newUser}.
      </div>
    )
  }
}

SystemMessage.propTypes = {
  prevUser: React.PropTypes.string,
  newUser: React.PropTypes.string
}

export default SystemMessage;
