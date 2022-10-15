/* eslint-disable prettier/prettier */
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormSelect, CFormTextarea, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddProductForm from 'src/components/form/AddProductForm'
import { AuthContext } from 'src/context/AuthContext'

const AddProduct = () => {


  return (
  <>
    <CRow>
        <CCol xs>
            <CCard className='mb-4'>
                <CCardHeader>Add New Product</CCardHeader>
                <CCardBody>
                    <br/>
                    <AddProductForm/>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
  </>
  )
}

export default AddProduct
