/* eslint-disable prettier/prettier */
import { cilBurn, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol,  CForm, CFormInput, CFormSelect, CFormTextarea, CRow} from '@coreui/react'
import axios from 'axios'
import moment from "moment"
import React, { useContext, useEffect, useRef, useState } from 'react'
import {  useLocation, useNavigate} from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'


const EditCoupon = () => {
  let ref = useRef([])

  const addToRef = (el)=>{
    if(el && !ref.current.includes(el)){
      ref.current.push(el)
    }

  }

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [coupon, setCoupon] = useState({
    coupon_name : "",
    coupon_desc : "",
    coupon_value : "",
    coupon_expired : "",
    coupon_status : ""
  })


  const location = useLocation()
  const coupon_id = location.pathname.split("/")[4]
  const mydate  = coupon.coupon_expired  

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user || user === null){
     return  navigate("/")
    }
    
    const coupon = async () => {
   
      const get_coupon = await axios.get(`/single-coupon/${coupon_id}`)
      setCoupon(get_coupon.data)

    }

    coupon()    
  },[coupon_id,navigate,user])


  // update coupon
  const handleClick = async (e,index)=>{
    e.preventDefault()

    const updated_coupon = {
      coupon_name : ref.current[0].value,
      coupon_desc : ref.current[1].value,
      coupon_value : ref.current[2].value,
      coupon_expired : ref.current[3].value,
      coupon_status : ref.current[4].value

    }
    
    try {
      const res = await axios.put("/coupons/updateCoupon",{updated_coupon},{params:{
        coupon_id
      }})

      setCoupon(res.data)

      setSuccess([true,res.data + "Redirecting to main Page."])

      setTimeout(() => {
        navigate('/admin/coupons')
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
                Edit Coupon
            </CCardHeader>
            <CCardBody>
              <br />
              <CForm className="row g-3">
                {coupon !== undefined && (
                    <>
                   
                    <CFormInput type="text" id="coupon_name"
                    ref={addToRef}
                    name='coupon_name'
                    defaultValue={coupon.coupon_name}
                    autoComplete="off"
                    floatingLabel="Coupon Name" placeholder="Coupon Name"
                     />
                <CFormTextarea
                 ref={addToRef}
                    id="coupon_desc"
                    name='coupon_desc' 
                    defaultValue={coupon.coupon_desc}
                    autoComplete="off"
                    floatingLabel="Description"
                    rows="5"
                    ></CFormTextarea>
                    <CFormInput 
                    type="number" 
                    id="coupon_value"
                    name='coupon_value' 
                    ref={addToRef}
                    defaultValue={coupon.coupon_value}
                    autoComplete="off"floatingLabel="Coupon Value" placeholder="Coupon Value" />
                    <CFormInput 
                    type="date" 
                    id="coupon_expired"
                    name='coupon_expired' 
                    ref={addToRef} 
                   defaultValue={mydate && moment(mydate).format('YYYY-MM-DD')  }
                    autoComplete="off"
                    floatingLabel="Coupon Expiry Date" placeholder="Coupon Date" />
                    <CFormSelect
                    className='form-select-lg'
                    id='coupon_status'
                    name='coupon_status' 
                    ref={addToRef} 
                    autoComplete="off"
                    floatingLabel=""
                    aria-label="Coupon Status"
                    >
                    {
                        coupon.coupon_status === "1" ? 
                    ( <>
                    <option value="1" defaultValue={coupon.coupon_status}>Active</option>
                    <option value="2">Disable</option>
                    </>
                    )
                    : ( <>
                        <option value="2" defaultValue={coupon.coupon_status}>Disable</option>
                        <option value="1">Active</option>
                        </>
                        )
                    }
                    </CFormSelect>
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



export default EditCoupon
