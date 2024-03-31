import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPost = () => {
  return (
    <section className='error-page'>
       <div className="center">
        <Link to="/" className='btn primary'>Return Home</Link>
        <h2>Page is not Found!</h2>
       </div>
    </section>
  )
}

export default ErrorPost
