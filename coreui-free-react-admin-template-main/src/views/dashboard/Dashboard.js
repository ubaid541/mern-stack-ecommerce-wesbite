import React, { useContext, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { AuthContext } from 'src/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      return navigate('/')
    }
  }, [])

  const random = Math.random() + 10
  const tableExample = [
    {
      number: 1,
      id: random,
      user: 'Ubaid',
      payment: { method: 'COD', status: 'Paid' },
      status: 'Processing',
      Time: '2022-09-20 1:00 PM',
    },
    {
      number: 2,
      id: random,
      user: 'Saad',
      payment: { method: 'COD', status: 'Paid' },
      status: 'Processing',
      Time: '2022-09-20 1:00 PM',
    },
    {
      number: 3,
      id: random,
      user: 'Ali',
      payment: { method: 'COD', status: 'Paid' },
      status: 'Processing',
      Time: '2022-09-20 1:00 PM',
    },
  ]

  return (
    <>
      <CRow>
        <CCol>
          <h3 className="mb-4">
            Welcome <span className="text-capitalize text-danger">{user && user[0].username}</span>
          </h3>
        </CCol>
      </CRow>
      <WidgetsDropdown />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Latest Orders</CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Id</CTableHeaderCell>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Payment Status</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Time</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.number}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.payment.method}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.payment.status}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.status}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.Time}</div>
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

export default Dashboard
