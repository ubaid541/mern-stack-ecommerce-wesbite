/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilBurn, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCol, CForm, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'

const AddProductForm = () => {

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

    const [product, setProduct] = useState()
    const [file, setFile] = useState([])
    const [newProduct, setNewProduct] = useState({
      pro_name : "",
      pro_desc : "",
      pro_price : "",
      pro_addon : "",
      discount : "",
      pro_attr : "",
      pro_category : "",
      pro_image : []
    })

    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const user_id = user[0]._id
    const user_role = user[1]
    const [data, setData] = useState()

    useEffect(() => {
        if(!user || user === null || user_role !== "seller"){
           return navigate("/admin/all-products")
        }
   
       //  get addons,attributes,coupons and categories for product
       const get_product_extras = async ()=>{
           const addons = axios.get("/addons",{
               params:{
                   user_id,
                   user_role
               }
           })
           const attr = axios.get("/attributes",{
               params:{
                   user_id,
                   user_role
               }
           })
           const coupon = axios.get("/coupons",{
               params:{
                   user_id,
                   user_role
               }
           })
           const categories = axios.get("/categories",{
            params:{
                user_id,
                user_role
            }
        })
   
           axios.all([addons, attr,categories,coupon],{
               params:{
                   user_id,
                   user_role
               }
           }).then(axios.spread((...responses) => {
               const addons_list = responses[0].data
               const attr_list = responses[1].data
               const categories_list = responses[2].data
               const coupons_list = responses[3].data
   
               setData({addons_list,attr_list,categories_list,coupons_list})
               
             })).catch(errors => {
               // react on errors.
               console.log(errors)
               if(error.response.status <= 500 || error.response.status >= 400){
                setError([true,"Sorry something went wrong on server side.Kindly try again later."])
                setTimeout(() => {
                  setError(false)
                }, 3000)
                return
              }
             })
       }
   
       get_product_extras() 
   
       },[user_id,user_role,navigate,user])

    const handleChange = (e)=>{
        setNewProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }    

    const handleFile = (e)=>{
    const file_details = e.target.files[0]
     setFile(file_details)
  }

    const handleClick =async (e)=>{
        e.preventDefault()

        try {
          
              const fd = new FormData()
              fd.append('pro_image',file)
              fd.append('name',JSON.stringify(newProduct))


             const add =  await axios.post("/products/addProduct",fd ,{params:{
              user_id
             }})

             
        window.scrollTo(0, 0);
        setSuccess([true,add.data[0] + "Redirecting to main Page."])

       setTimeout(() => {
        navigate('/admin/all-products')
         setSuccess(false)
       }, 3000)

        } catch (error) {
            console.log(error)
            window.scrollTo(0, 0);
            if(error.response.status === 500){
              setError([true,"Sorry something went wrong on server side.Kindly try again later."])
              setTimeout(() => {
                setError(false)
              }, 3000)
              return
            }

            setError([true, error.response.data])
            setTimeout(() => {
              setError(false)
            }, 3000)
        }
    }
  return (
    <div>
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
                    {error &&
                    (
                      <CAlert color="danger" className="d-flex align-items-center mt-3">
                        <CIcon
                          icon={cilBurn}
                          className="flex-shrink-0 me-2 "
                          width={24}
                          height={24}
                        />
                        <div>{error}</div>
                      </CAlert>
                   ) }
    </CCol>
      <CForm className="row g-3" encType="multipart/form-data">
        <CFormInput type='hidden' value={user_id} name='user_id' id='user_id' onChange={e=> setNewProduct(e.target.value)} />
        <CCol md={5} lg={6}>
          <CFormInput 
          type="text" 
          id="pro_name" 
          name='pro_name'
          onChange={handleChange}
          label="Product Name" 
          autoComplete='off'
          required />
        </CCol>
        <CCol md={5} lg={6}>
          <CFormInput 
          type="number" 
          id="pro_price" 
          name='pro_price'
          onChange={handleChange}
          autoComplete="off"
          label="Product Price" 
          required />
        </CCol>
        <CCol xs={12}>
          <CFormTextarea
            id="pro_desc"
            name='pro_desc'
            onChange={handleChange}
            autoComplete="off"
            label="Product Description"
            rows="4"
            required
          ></CFormTextarea>
        </CCol>

        <CCol md={5} lg={6}>
          <CFormSelect id="discount"
          name='discount'
          onChange={handleChange}
           label="Coupon">
            <option>Select A Coupon</option>
            {data && data.coupons_list !== undefined && data.coupons_list.length > 0 
            ? data.coupons_list.map((coupon)=>{
                return(
                    <option value={coupon._id} key={coupon._id}>{coupon.coupon_name}</option>
                )
            }): " No coupon found."}
          </CFormSelect>
        </CCol>
        <CCol md={5} lg={6}>
          <CFormSelect 
          id="pro_addon" 
          name='pro_addon'
          onChange={handleChange}
          label="Addons">
            <option>Select Addon</option>
            {data && data.addons_list !== undefined && data.addons_list.length > 0 
            ? data.addons_list.map((addon)=>{
                return(
                    <option value={addon._id} key={addon._id}>{addon.addon_name}</option>
                )
            }): " No Addon found."}
          </CFormSelect>
        </CCol>
        <CCol md={6} lg={6}>
          <CFormSelect 
          id="pro_attr" 
          name='pro_attr'
          onChange={handleChange}
          label="Attributes">
            <option>Select Attributes</option>
            {data && data.attr_list !== undefined && data.attr_list.length > 0 
            ? data.attr_list.map((attr)=>{
                return(
                    <option value={attr._id} key={attr._id}>{attr.attr_name}</option>
                )
            }): " No Attribute found."}
          </CFormSelect>
        </CCol>
        <CCol md={6} lg={6}>
          <CFormSelect 
          id="pro_category" 
          name='pro_category'
          onChange={handleChange}
          label="Category" required>
            <option>Select Category</option>
            {data && data.categories_list !== undefined && data.categories_list.length > 0 
            ? data.categories_list.map((category)=>{
                return(
                    <option value={category._id} key={category._id}>{category.cat_name}</option>
                )
            }): " No Categories found."}
          </CFormSelect>
        </CCol>
        <CCol md={6} lg={6}>
          <CFormInput type="file"
          name='pro_image'
          onChange={handleFile}
           id="pro_image" 
           label="Upload product image." required />
        </CCol>
        { file && file.length !== 0 &&
          <CCol md={12}>
        <img src={  URL.createObjectURL(file) } alt="image_preview"   style={{height: "300px"}}       />          
        </CCol>
        }
        <CCol xs={12}>
          <CButton type="submit" className="" onClick={handleClick}>
            Save
          </CButton>
        </CCol>
      </CForm>

    </div>
  )
}

export default AddProductForm
