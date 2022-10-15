/* eslint-disable prettier/prettier */
import { cilBurn, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol,  CForm, CFormInput, CRow} from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {  useLocation, useNavigate} from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'


const AllCategories = () => {
  const ref = useRef(null)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [category, setCategory] = useState({
    cat_name : ""
  })


  const location = useLocation()
  const category_id = location.pathname.split("/")[4]

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user || user === null){
     return  navigate("/")
    }
    
    const categories = async () => {
   
      const get_categories = await axios.get(`/single-category/${category_id}`)
      setCategory(get_categories.data)
    }

    categories()    
  })

  // update category
  const handleClick = async (e)=>{
    e.preventDefault()

    const cat_name = ref.current.value
    try {
      const res = await axios.put("/categories/updateCategory",{cat_name},{params:{
        category_id
      }})

      setCategory(res.data)

      setSuccess([true,res.data + "Redirecting to main Page."])

      setTimeout(() => {
        navigate('/admin/categories')
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
                Edit Category
            </CCardHeader>
            <CCardBody>
              <br />
              <CForm className="row g-3">
                {category !== undefined &&
                    <CFormInput 
                    type="text" 
                    id="cat_name"
                    name='cat_name'
                    onChange={(e)=>setCategory(prevstate=>({
                      ...prevstate,
                      name : e.target.name
                    }))} 
                    ref={ref}
                    defaultValue = {category.cat_name}
                    floatingLabel="Category Name" placeholder="Category Name"
                    autoComplete='off'
                     />
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



export default AllCategories
