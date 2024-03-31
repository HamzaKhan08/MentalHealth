import React from 'react'
import {Outlet} from 'react-router-dom';

import Header from './Header'
import Footer from './Footer'
//import ContactDetails from './Contact';


const Layout = () => {

  return (
    <>
     <Header />
       <Outlet />
     <Footer />
    </>
  )
}

export default Layout
