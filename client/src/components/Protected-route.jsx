import { useContext } from 'react'
import TokenContext from '../contexts/token.context'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'

export default function ProtectedRoute({children, redirectTo}) {
    const {token} = useContext(TokenContext)
    const location = useLocation()

    if(!token) {
      localStorage.setItem('previousURL', location.pathname + location.search + location.hash)
      return <Navigate to={redirectTo}/>
    }

    try {
      const {exp} = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)

      if(exp < currentTime) {
        localStorage.setItem('previousURL', location.pathname + location.search + location.hash)
        localStorage.setItem("theme", "light")
        return <Navigate to={redirectTo}/>
      }
    } catch (error) {
      console.error('Token invalid:', error)
      return <Navigate to={redirectTo}/>
    }
    
  return (
    <>{children}</>
  )
}

ProtectedRoute.propTypes = {
    children: PropTypes.node,
    redirectTo: PropTypes.string.isRequired
}
