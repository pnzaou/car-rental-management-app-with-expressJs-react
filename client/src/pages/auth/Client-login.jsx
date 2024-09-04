import React from 'react'
import LoginForm from './components/Login-form'

const ClientLogin = () => {
  const url = window.location.href
  return (
    <div>
      <LoginForm url={url}/>
    </div>
  )
}

export default ClientLogin
