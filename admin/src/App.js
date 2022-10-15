/* eslint-disable prettier/prettier */
import React, {  Suspense, useContext } from 'react'
import { BrowserRouter,  Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

import './scss/style.scss'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// eslint-disable-next-line react/prop-types


// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = ()=> {

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
  
    if (user) {
      return <Navigate to="/admin/dashboard" />
    }
  
    return children
  }

    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={
              <ProtectedRoute>
            <Login />
              </ProtectedRoute>
            } />
            <Route exact path="/admin/register" name="Register Page" element={
              <ProtectedRoute>
            <Register />
              </ProtectedRoute>
            } />


            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          
          

          </Routes>
        </Suspense>
      </BrowserRouter>


    )
  
}

export default App
