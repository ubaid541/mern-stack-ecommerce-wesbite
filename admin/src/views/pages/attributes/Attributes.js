/* eslint-disable prettier/prettier */
import { cilBurn, cilCheckCircle, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'


const AllAttributes = () => {

      const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [attribute, setAttribute] = useState()
  const [newAttr, setNewAttr] = useState()

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const user_id = user[0]._id
  const user_role = user[1]


  useEffect(() => {
    if(!user || user === null){
     return  navigate("/")
    }

    
    const attributes = async () => {
      const get_attr = await axios.get(`/attributes`,{
        params:{
          user_id,
          user_role
        }
      })
      setAttribute(get_attr.data)
    }

    attributes()    
  })

  // handlechange for attribute input
  const handleChange = (e)=>{
    setNewAttr((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  // add attribute
  const handleClick = async (e)=>{
    e.preventDefault()

    try {
      const res = await axios.post("/attributes/addAttr",newAttr,{params:{
        user_id
      }})
      navigate('/admin/attributes')
      setVisible(false)
      setSuccess([true,res.data[0]])

      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    } catch (error) {
      setError([true,error.response.data])
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  // delete Attr
  const handleDelete = async (id)=>{
    if(window.confirm("Are you sure? You are going to delete a record.")){
     try {
       const delete_attr = await axios.delete(`/attributes/deleteAttr/${id}`)
 
       setSuccess([true,delete_attr.data])
       setTimeout(() => {
         setSuccess(false)
       }, 3000)
 
     } catch (error) {
       setError([true, error.message])
       setTimeout(() => {
         setError(false)
       }, 3000)
       console.log(error.message);
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
        <CModalTitle>Add Attribute</CModalTitle>
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
                    <CFormInput 
                    type="text"
                    id="attr_name" 
                    floatingLabel="Attribute Name"
                    placeholder="Attribute Name" 
                    onChange={handleChange}
                    autoComplete="off"
                      />
                    <CFormInput
                     type="number" 
                     id="attr_price" 
                     floatingLabel="Attribute Price" 
                     placeholder="Attribute Price"
                     onChange={handleChange}
                      />
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
                All Attributes
                {user_role === "seller" &&
                <CButton style={{float: "right"}} onClick={() => setVisible(!visible)}>Add Attribute</CButton>
                }
            </CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
                    {user_role === "admin" && 
                    <CTableHeaderCell className="text-center">Business Name</CTableHeaderCell>
                    }
                    <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Edit</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {attribute !== undefined && attribute.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item._id}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.attr_name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.attr_price}</div>
                      </CTableDataCell>
                      {user_role === "admin" &&
                      <CTableDataCell className="text-center">
                      <div>{item.seller_id.username}</div>
                    </CTableDataCell>
                      }
                      <CTableDataCell className="text-center">
                        <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>
                        <CDropdown>
                <CDropdownToggle color="dark"><CIcon icon={cilSettings} />
                </CDropdownToggle>
                <CDropdownMenu>
                  { user_role === "seller" &&
                    <CDropdownItem 
                    onClick={(e)=> {e.preventDefault();
                       navigate(`/admin/attributes/edit-attribute/${item._id}`)}}
                     style={{cursor:'pointer'}}
                     >
                      Edit
                    </CDropdownItem>
                  }
                     <CDropdownItem  onClick={()=>handleDelete(item._id)}
                    style={{cursor:'pointer'}}>Delete</CDropdownItem>
                </CDropdownMenu>
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



export default AllAttributes
