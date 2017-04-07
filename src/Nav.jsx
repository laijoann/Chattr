import React, {PropTypes} from 'react'

const NavBar = (props) => (
  <nav className='navbar'>
    <a href='/' className='navbar-brand'>Chatty</a>
    <span className='navbar-clientNum'>{props.clientNum} users online</span>
  </nav>
)

NavBar.propTypes = {
  handleNewUsername: PropTypes.func,
  handleNewContent: PropTypes.func,
  clientNum: PropTypes.number
}

export default NavBar
