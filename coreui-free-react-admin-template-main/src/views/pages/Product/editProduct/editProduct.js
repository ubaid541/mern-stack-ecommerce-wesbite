/* eslint-disable prettier/prettier */
import { CButton, CCard, CCardBody, CCardHeader, CCol,CRow } from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditProductForm from 'src/components/form/EditProductForm'
import { AuthContext } from 'src/context/AuthContext'

const AddProduct = () => {


  return (
  <>
    <CRow>
        <CCol xs>
            <CCard className='mb-4'>
                <CCardHeader>Edit Product</CCardHeader>
                <CCardBody>
                    <br/>
                    <EditProductForm/>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
  </>
  )
}

export default AddProduct
