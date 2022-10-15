/* eslint-disable prettier/prettier */
import { cilBurn, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol,  CForm, CFormInput, CRow} from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {  useLocation, useNavigate} from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'


const EditAttr = () => {
  const attrName_ref = useRef(null)
  const attrPrice_ref = useRef(null)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [attr, setAttr] = useState({
    attr_name : "",
    attr_price : "",
  })


  const location = useLocation()
  const attr_id = location.pathname.split("/")[4]

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user || user === null){
     return  navigate("/")
    }
    
    const attributes = async () => {
   
      const get_attr = await axios.get(`/single-attr/${attr_id}`)
      setAttr(get_attr.data)
    }

    attributes()    
  })

  // update attribute
  const handleClick = async (e)=>{
    e.preventDefault()

    const attr_name = attrName_ref.current.value
    const attr_price = attrPrice_ref.current.value

    try {
      const res = await axios.put("/attributes/updateAttr/",{attr_name,attr_price},{params:{
        attr_id
      }})

      setAttr(res.data)

      setSuccess([true,res.data + "Redirecting to main Page."])

      setTimeout(() => {
        navigate('/admin/attributes')
        setSuccess(false)
      }, 2000)
    } catch (error) {
      setError([true,error.response.data ])
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <>
    <CCol xs={12} className="text-right">
                    
                    {error && (
                      <CAlert color="danger" className="d-flex align-items-center mt-3">
                        <CIcon
                          icon={cilBurn}
                          className="flex-shrink-0 me-2"
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
                        <div>{success}</div>
                      </CAlert>
                    )}
    </CCol>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
                Edit Attribute
            </CCardHeader>
            <CCardBody>
              <br />
              <CForm className="row g-3">
                {attr !== undefined && (
                    <>
                    <CFormInput
                        type="text"
                        id="attr_name"
                        name='attr_name'
                        ref={attrName_ref}
                        defaultValue={attr.attr_name}
                        floatingLabel="Attribute Name" placeholder="Attribute Name"
                        autoComplete='off' />
                        <CFormInput
                        type="number"
                        id="attr_price"
                        name='attr_price'
                        ref={attrPrice_ref}
                        defaultValue={attr.attr_price}
                        floatingLabel="Attribute Price" placeholder="Attributes Price"
                        autoComplete='off' />
                                          </>
                )
                }
               
                    <CCol xs={12}>
                        <CButton onClick={handleClick} type="submit" className=''>Save</CButton>
                    </CCol>
                </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}



export default EditAttr
