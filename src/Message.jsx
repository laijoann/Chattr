import React, {PropTypes} from 'react'

const Message = (props) => (
  <div className='message'>
    <span className ='message-username'
      style={{color: props.colour}}>
      {props.username}
    </span>
    <span className='message-content'>
      {props.content}
    </span>
  </div>
)

Message.propTypes = {
  username: PropTypes.string,
  content: PropTypes.string,
  colour: PropTypes.string
}

export default Message
