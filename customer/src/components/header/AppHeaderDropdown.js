import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilUser, cilArrowLeft, cilShareBoxed, cilArrowRight, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>

        <CDropdownItem to="/customer/orders">
          <CIcon icon={cilShareBoxed} className="me-2" />
          Orders
        </CDropdownItem>
        <CDropdownItem to="/customer/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem to="/customer/login">
          <CIcon icon={cilArrowRight} className="me-2" />
          Login
        </CDropdownItem>
        <CDropdownItem to="/customer/register">
          <CIcon icon={cilUserPlus} className="me-2" />
          Register
        </CDropdownItem>
        <CDropdownItem>
          <CIcon icon={cilArrowLeft} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
