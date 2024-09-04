import React from 'react'
import LoginForm from './components/Login-form'

const MembersLogin = () => {

    const url = window.location.href

  return (
    <div>
        <LoginForm url={url}/>
    </div>
  )
}

export default MembersLogin
