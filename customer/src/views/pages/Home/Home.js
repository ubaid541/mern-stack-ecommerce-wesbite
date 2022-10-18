/* eslint-disable prettier/prettier */
import { CCarousel, CCarouselItem, CContainer, CImage } from '@coreui/react'
import React from 'react'
import hero from 'src/assets/images/hero-image.jpg'



const Home = () => {
  return <div>
    
    <CContainer fluid>
      <div className='main'>
      <CImage fluid src={hero} style={{width:'1500px'}} />
      </div>
    </CContainer>

  </div>
}

export default Home
