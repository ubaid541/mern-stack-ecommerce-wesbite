import React from 'react'
import NavItems from '../navItems/NavItems'
import navigation from "../../_nav"
const HeaderNav = () => {
  return (
    <div>
      <NavItems items={navigation}/>
    </div>
  )
}

export default HeaderNav