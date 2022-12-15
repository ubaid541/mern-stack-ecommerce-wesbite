import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        Fatafut Mungwaen
        <span className="ms-1">&copy; 2022 ubaid.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
