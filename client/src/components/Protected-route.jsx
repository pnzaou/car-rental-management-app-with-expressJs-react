import React, { useContext } from 'react'
import TokenContext from '../contexts/token.context'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function ProtectedRoute({children}) {

    const {token} = useContext(TokenContext)

    if(!token) {
        return <Navigate to="/members-login"/>
    }
    
  return (
    <>{children}</>
  )
}

ProtectedRoute.propTypes = {
    children: PropTypes.node
}
