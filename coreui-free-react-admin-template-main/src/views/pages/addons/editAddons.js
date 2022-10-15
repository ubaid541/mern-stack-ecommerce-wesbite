/* eslint-disable prettier/prettier */
import { cilBurn, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol,  CForm, CFormInput, CRow} from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {  useLocation, useNavigate} from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'


const EditAddon = () => {
  const addonName_ref = useRef(null)
  const addonPrice_ref = useRef(null)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [addon, setAddon] = useState({
    addon_name : "",
    addon_price : ""
  })


  const location = useLocation()
  const addon_id = location.pathname.split("/")[4]

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user || user === null){
     return  navigate("/")
    }
    
    const addons = async () => {
   
      const get_addons = await axios.get(`/single-addon/${addon_id}`)
      setAddon(get_addons.data)
    }

    addons()    
  })

  // update addon
  const handleClick = async (e)=>{
    e.preventDefault()

    const addon_name = addonName_ref.current.value
    const addon_price = addonPrice_ref.current.value

    try {
      const res = await axios.put("/addons/updateAddon/",{addon_name,addon_price},{params:{
        addon_id
      }})

      setAddon(res.data)

      setSuccess([true,res.data + "Redirecting to main Page."])

      setTimeout(() => {
        navigate('/admin/addons')
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
                Edit Addon
            </CCardHeader>
            <CCardBody>
              <br />
              <CForm className="row g-3">
                {addon !== undefined && (
                    <><CFormInput
                                      type="text"
                                      id="addon_name"
                                      name='addon_name'
                                      
                                      ref={addonName_ref}
                                      defaultValue={addon.addon_name}
                                      floatingLabel="Addon Name" placeholder="Addon Name"
                                      autoComplete='off' /><CFormInput
                                          type="number"
                                          id="addon_price"
                                          name='addon_price'
             
                                          ref={addonPrice_ref}
                                          defaultValue={addon.addon_price}
                                          floatingLabel="Addon Price" placeholder="Addon PRice"
                                          autoComplete='off' /></>
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



export default EditAddon
