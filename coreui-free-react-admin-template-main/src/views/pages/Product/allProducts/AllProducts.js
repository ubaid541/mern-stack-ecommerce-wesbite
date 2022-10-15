/* eslint-disable prettier/prettier */
import { cilImage, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'
import "./AllProducts.css"
import useFetch from '../../../../hooks/useFetch'


  const AllProducts = () => {

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [product, setProduct] = useState()
  const [newProduct, setNewProduct] = useState()

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const user_id = user[0]._id
  const user_role = user[1]

  useEffect(() => {
    if(!user || user === null){
     return  navigate("/")
    }


    const attributes = async () => {
      const get_product = await axios.get(`/products`,{
        params:{
          user_id,
          user_role
        }
      })
      setProduct(get_product.data)
    }

    attributes()    
  },[])



  const handleDelete = async (id)=>{
    if(window.confirm("Are you sure? You are going to delete a record.")){
      try {

        const delete_product = await axios.delete(`/products/deleteProduct/${id}`)

          const updatedProducts = product.filter((product) => product._id !== id);
          setProduct(updatedProducts);


        setSuccess([true,delete_product.data])
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
  

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              All Products
              {user_role === "seller" &&
              <Link to={`/admin/add-product` } style={{float:"right"}} className='btn btn-primary'>Add New Product </Link>
              }
              </CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                    <CIcon icon={cilImage} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Category</CTableHeaderCell>
                    {user_role === "admin" && 
                    <CTableHeaderCell className="text-center">Business Name</CTableHeaderCell>
                    }
                    <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Edit</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {product !== undefined && product.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item._id}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.pro_name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div><img className='tblImg' src={item.pro_image
                        ? item.pro_image
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} 
                  alt='product_image'/></div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.pro_price}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.pro_category ? item.pro_category.cat_name : "No category"}</div>
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
                        <div>
                        <CDropdown>
                <CDropdownToggle color="dark"><CIcon icon={cilSettings} />
                </CDropdownToggle>
                <CDropdownMenu>
                   { user_role === "seller" &&
                   <CDropdownItem 
                   onClick={(e)=>{
                    e.preventDefault()
                    navigate(`/admin/products/edit-product/${item._id}`)
                   }} style={{cursor:'pointer'}}>Edit</CDropdownItem>
                   }
                    <CDropdownItem onClick={()=>handleDelete(item._id)}
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



export default AllProducts
