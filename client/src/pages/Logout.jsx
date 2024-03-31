// eslint-disable-next-line
import { useContext, useEffect } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext" 

const Logout = () => {
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext)
  

  setCurrentUser(null)
  navigate('/login')

  return (
    <>
    </>
  )
}

export default Logout
