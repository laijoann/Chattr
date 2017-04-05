import React, {Component} from 'react';

class SystemMessage extends Component {
  render() {
    return (
      <div className="systemMessage">
        {this.props.prevUser} changed their name to {this.props.newUser}.
      </div>
    )
  }
}

export default SystemMessage;
