import React, { useContext } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilCart,
  cilChartPie,
  cilCheckCircle,
  cilCursor,
  cilDescription,
  cilDrop,
  cilGift,
  cilList,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSettings,
  cilShareBoxed,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Product Section',
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/admin/all-products',
    icon: <CIcon icon={cilShareBoxed} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/admin/categories',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Addons',
    to: '/admin/addons',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Attributes',
    to: '/admin/attributes',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Orders',
  },
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/admin/orders',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Orders',
        to: '/admin/orders',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Business Section',
  },
  {
    component: CNavItem,
    name: 'Coupons',
    to: '/admin/coupons',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Update Profile',
        to: '/admin/profile',
      },
    ],
  },
]

export default _nav
