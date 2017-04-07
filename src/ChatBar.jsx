import React, {PropTypes} from 'react'

const ChatBar = (props) => (
  <footer className='chatbar'>
    <input
      className='chatbar-username'
      placeholder='Anonymous'
      onKeyUp={props.handleNewUsername} />
    <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyUp={props.handleNewContent}/>
  </footer>
)

ChatBar.propTypes = {
  handleNewUsername: PropTypes.func,
  handleNewContent: PropTypes.func,
  colour: PropTypes.string
}

export default ChatBar
