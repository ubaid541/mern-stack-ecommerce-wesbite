/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { AuthContext } from 'src/context/AuthContext'
import axios from 'axios'

const Login = () => {

  const [credentials, setCrendentials] = useState({
    username : undefined,
    password: undefined,
})
  const {user,loading,error,dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  

  const handleChange = (e)=>{
    setCrendentials(
      prev=>({...prev,[e.target.id]:e.target.value})
      )
  }

  const handleClick = async (e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{

        const res = await axios.post("/auth/admin/login",credentials)
        if(res.data.role === "seller" || res.data.role === "admin"){
          dispatch({type:"LOGIN_SUCCESS",payload:[res.data.details,res.data.role]})

         navigate("/admin/dashboard")
        }else{
          dispatch({type:"LOGIN_FAILURE",
          payload:{message : "You are not allowed!"}})
        }

    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
    }

}


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                      placeholder="Username" 
                      name='username' 
                      autoComplete="username" id='username' onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name='password'
                        placeholder="Password"
                        autoComplete="current-password"
                        id="password"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton disabled={loading} onClick={handleClick} color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                      <CCol xs={12}  className="text-right">
                      {error && <CAlert className='mt-3' color="danger">
                        {error.message}
                      </CAlert>}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Not Registered?</p>
                    <p>Get register to become a seller.</p>
                    <Link to="/admin/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
