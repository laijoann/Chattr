import React, {PropTypes} from 'react'

const SystemMessage = (props) => (
  <div className='message'>
    <span className ='message-username'
      style={{color: props.colour}}>
      {props.username}
    </span>
    <span className='message-content'>
      <img src={props.imageURL} alt = '' />
    </span>
  </div>
)

SystemMessage.propTypes = {
  imageURL: PropTypes.string,
  username: PropTypes.string,
  colour: PropTypes.string
}

export default SystemMessage
