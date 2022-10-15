/* eslint-disable prettier/prettier */
import { cilBurn, cilCheckCircle, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormSelect, CFormTextarea, CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'


const AllCoupon = () => {

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [coupon, setCoupon] = useState()
  const [newCoupon, setNewCoupon] = useState()

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const user_id = user[0]._id
  const user_role = user[1]


  useEffect(() => {
    if(!user || user === null){
     return  navigate("/")
    }


    const attributes = async () => {
      const get_coupon = await axios.get(`/coupons`,{
        params:{
          user_id,
          user_role
        }
      })
      setCoupon(get_coupon.data)
    }

    attributes()    
  })

  // handlechange for coupon input
  const handleChange = (e)=>{
    setNewCoupon((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  // add coupon
  const handleClick = async (e)=>{
    e.preventDefault()

    if(!newCoupon){
      return alert("Fields cannot be empty.")
    }

    if(!newCoupon.coupon_status){
      return alert("Kindly select coupon status.")
    }

    try {
      const res = await axios.post("/coupons/addCoupon",newCoupon,{params:{
        user_id
      }})
      navigate('/admin/coupons')
      setVisible(false)
      setSuccess([true,res.data[0]])

      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    } catch (error) {
      if(error.response.data.status === 500){
        setError([true,"Sorry something went wrong on server side.Kindly try again later."])
        setTimeout(() => {
          setError(false)
        }, 3000)
        return
      }
      setError([true,error.response.data])
      console.log(error);
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  // delete coupon
  const handleDelete = async (id)=>{
    if(window.confirm("Are you sure? You are going to delete a record.")){
     try {
       const delete_coupon = await axios.delete(`/coupons/deleteCoupon/${id}`)
 
       setSuccess([true,delete_coupon.data])
       setTimeout(() => {
         setSuccess(false)
       }, 3000)
 
     } catch (error) {
       setError([true, error.message])
       setTimeout(() => {
         setError(false)
       }, 3000)
     }
    }
   }

  const [visible, setVisible] = useState(false)
  return (
    <>
     <CCol xs={12} className="text-right">
                    
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
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Add Coupon</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CCard className='mb-4'>
      {error &&
        (<CHeader>
         
                      <CAlert color="danger" className="d-flex align-items-center mt-3">
                        <CIcon
                          icon={cilBurn}
                          className="flex-shrink-0 me-2 "
                          width={24}
                          height={24}
                        />
                        <div>{error}</div>
                      </CAlert>
                    
          </CHeader>
                   ) }
                <CCardBody>
                    <br/>
                    <CForm className="row g-3">
                    <CFormInput type="text" id="coupon_name"
                    name='coupon_name' 
                    onChange={handleChange}
                    autoComplete="off"
                    floatingLabel="Coupon Name" placeholder="Coupon Name"
                     />
                <CFormTextarea
                    id="coupon_desc"
                    name='coupon_desc' 
                    onChange={handleChange}
                    autoComplete="off"
                    floatingLabel="Description"
                    rows="5"></CFormTextarea>
                    <CFormInput 
                    type="number" 
                    id="coupon_value"
                    name='coupon_value' 
                    onChange={handleChange}
                    autoComplete="off"floatingLabel="Coupon Value" placeholder="Coupon Value" />
                    <CFormInput 
                    type="date" 
                    id="coupon_expired"
                    name='coupon_expired' 
                    onChange={handleChange}
                    autoComplete="off"
                    floatingLabel="Coupon Expiry Date" placeholder="Coupon Date" />
                    <CFormSelect
                    className='form-select-lg'
                    id='coupon_status'
                    name='coupon_status' 
                    onChange={handleChange}
                    autoComplete="off"
                    floatingLabel=""
                    aria-label="Coupon Status"
                    >
                    <option>Coupon Status</option>
                    <option value="1" >Active</option>
                    <option value="2">Disable</option>
                    </CFormSelect>
                <CCol xs={12}>
                    <CButton type="submit" className='' onClick={handleClick}>Save</CButton>
                </CCol>
                </CForm>
                </CCardBody>
            </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => setVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
                All Coupon
                {user_role === "seller" &&
                <CButton style={{float: "right"}} onClick={() => setVisible(!visible)}>Add Coupon</CButton>
                }
            </CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Description</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Value</CTableHeaderCell>
                    {user_role === "admin" && 
                    <CTableHeaderCell className="text-center">Business Name</CTableHeaderCell>
                    }
                    <CTableHeaderCell className="text-center">Date Added</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Expiry Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Edit</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {coupon !== undefined && coupon.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item._id}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.coupon_name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.coupon_desc}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.coupon_value}</div>
                      </CTableDataCell>
                      {user_role === "admin" &&
                      <CTableDataCell className="text-center">
                      <div>{item.seller_id.business_name}</div>
                    </CTableDataCell>
                      }
                      <CTableDataCell className="text-center">
                        <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{new Date(item.coupon_expired).toLocaleDateString()}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.coupon_status === "1" ? (<p className="text-success">Active</p>) : (<p className='text-danger'>Disabled</p>)}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>
                        <CDropdown>
                <CDropdownToggle color="dark"><CIcon icon={cilSettings} />
                </CDropdownToggle>
                <CDropdownMenu>
                  {user_role === "seller" &&
                    <CDropdownItem 
                    onClick={(e)=> {e.preventDefault();
                       navigate(`/admin/coupons/edit-coupon/${item._id}`)}}
                     style={{cursor:'pointer'}}
                     >
                      Edit
                    </CDropdownItem>
                  }
                    <CDropdownItem >Delete</CDropdownItem>
                </CDropdownMenu>onClick={()=>handleDelete(item._id)}
                    style={{cursor:'pointer'}}
                </CDropdown>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}



export default AllCoupon
