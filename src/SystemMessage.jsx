import React, {PropTypes} from 'react'

const SystemMessage = (props) => (
  <div className='system-message'>
    {props.prevUser} changed their name to {props.newUser}.
  </div>
)

SystemMessage.propTypes = {
  prevUser: PropTypes.string,
  newUser: PropTypes.string
}

export default SystemMessage
