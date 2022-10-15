import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilArrowLeft,
  cilBriefcase,
  cilBurn,
  cilCheckCircle,
  cilLockLocked,
  cilPhone,
  cilUser,
} from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

const Register = () => {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState()
  const [b_details, setb_details] = useState()
  const [credentials, setCredentials] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const business_detail = async () => {
      const get_business_details = await axios.get('/business_registeration')

      const convert_string = JSON.parse(JSON.stringify(get_business_details))

      setb_details(convert_string.data)
    }

    business_detail()
  }, [])

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  // handle create account
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/admin/register', credentials)
      setSuccess(res.data[0])
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      setError([true, err.response.data])
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center mt-4 mb-3">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register As Seller</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First Name"
                      name="fname"
                      id="fname"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Last Name"
                      name="lname"
                      id="lname"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      name="username"
                      id="username"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      placeholder="Phone"
                      name="phone"
                      id="phone"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilBriefcase} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Business Name"
                      name="business_name"
                      id="business_name"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CFormSelect
                      aria-label="Default select example"
                      name="city"
                      id="city"
                      onChange={handleChange}
                    >
                      <option>City</option>
                      {b_details !== undefined && b_details.city.length > 0
                        ? b_details.city.map((city) => {
                            return (
                              <option value={city._id} key={city._id}>
                                {city.city_name}
                              </option>
                            )
                          })
                        : 'No city found.'}
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CFormSelect
                      aria-label="Default select example"
                      name="business_type"
                      id="business_type"
                      onChange={handleChange}
                    >
                      <option>Business Type</option>
                      {b_details !== undefined && b_details.b_type.length > 0
                        ? b_details.b_type.map((b_type) => {
                            return (
                              <option value={b_type._id} key={b_type._id}>
                                {b_type.business_type_name}
                              </option>
                            )
                          })
                        : 'No business type found.'}
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CFormSelect
                      aria-label="Default select example"
                      name="business_category"
                      id="business_category"
                      onChange={handleChange}
                    >
                      <option>Business Category</option>
                      {b_details !== undefined && b_details.b_cat.length > 0
                        ? b_details.b_cat.map((b_cat) => {
                            return (
                              <option value={b_cat._id} key={b_cat._id}>
                                {b_cat.business_category_name}
                              </option>
                            )
                          })
                        : 'No business category found.'}
                    </CFormSelect>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="danger" onClick={handleClick}>
                      <p className="m-0 text-white fw-bold">Create Account</p>
                    </CButton>
                  </div>
                  <CCol xs={12} className="text-right">
                    {error && (
                      <CAlert color="danger" className="d-flex align-items-center mt-3">
                        <CIcon
                          icon={cilBurn}
                          className="flex-shrink-0 me-2 "
                          width={24}
                          height={24}
                        />
                        <div>{error}</div>
                      </CAlert>
                    )}
                    {success && (
                      <CAlert color="success" className="d-flex align-items-center mt-3">
                        <CIcon
                          icon={cilCheckCircle}
                          className="flex-shrink-0 me-2"
                          width={24}
                          height={24}
                        />
                        <div>{success} Navigating to login page.</div>
                      </CAlert>
                    )}
                  </CCol>
                </CForm>
                <div className="mt-3">
                  <p>Already registered?</p>
                  <CIcon icon={cilArrowLeft} />
                  <Link to="/" className="ms-2">
                    Login
                  </Link>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
