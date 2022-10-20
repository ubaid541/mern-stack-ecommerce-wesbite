import React from 'react'
import { Container } from 'react-bootstrap'
import BusinessListCard from '../../components/businesslistcard/BusinessListCard'

const AllBusiness = () => {
  return (
    <>
        <div className='allBusinesses'>
            <Container fluid="md">
                <div className='all_businesses my-5'>
                <h2>All Businesses</h2>
                </div>

                <div className='mb-5'>
                    <BusinessListCard/>
                </div>
            </Container>
        </div>
    </>
  )
}

export default AllBusiness