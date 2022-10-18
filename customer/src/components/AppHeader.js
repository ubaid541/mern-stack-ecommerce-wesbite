import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilCart, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky">
      <CContainer fluid>
        {/* <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler> */}
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/">Home</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/customer/products">Products</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/customer/categories">Categories</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/customer/businesses">Businesses</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <form className="d-flex ms-4" method="get" action="/search-result">
            <input
              className="form-control me-2"
              type="text"
              name="pro_box"
              id="pro_box"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" id="search_product" type="submit">
              Search
            </button>
            <div
              className="pro_list list-group"
              style={{ position: 'absolute', marginTop: ' 2.2%' }}
              id="pro_list"
            ></div>
          </form>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="/customer/cart">
              <CIcon icon={cilCart} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
