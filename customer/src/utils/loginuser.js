import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/CustomerAuthContext'

// Check network connection
export function LoginUser(){
    const {user,} = useContext(AuthContext)
    const navigate = useNavigate()

  // if user already loggedin
  useEffect(() => {
    if(user){
      navigate("/")
      return
    }
  }, [])

}