import React from 'react'
import {Header,AppContent, Footer} from "../components/index"
import "./Layout.css"


const Layout = () => {
  return (
    <>
        <Header />
        <div >
            <AppContent/>
        </div>
        <div>
          <Footer/>
        </div>
    </>
  )
}

export default Layout