import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilArrowTop,
  cilBike,
  cilCart,
  cilCheckCircle,
  cilOptions,
} from '@coreui/icons'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-5"
          color="primary"
          value={
            <>
              10{' '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilCart} />
              </span>
            </>
          }
          title="Pending Orders"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-5"
          color="success"
          value={
            <>
              15{' '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilCheckCircle} />
              </span>
            </>
          }
          title="Completed Orders"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-5"
          color="danger"
          value={
            <>
              3{' '}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilBike} />
              </span>
            </>
          }
          title="Cancelled"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
