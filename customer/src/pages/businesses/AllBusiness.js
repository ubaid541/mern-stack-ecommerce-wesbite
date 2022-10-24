import React from 'react'
import { Container } from 'react-bootstrap'
import BusinessListCard from '../../components/businesslistcard/BusinessListCard'
import useFetch from '../../hooks/useFetch'

const AllBusiness = () => {

  const business = useFetch(`/customer/business/`)
  return (
    <>
        <div className='allBusinesses'>
            <Container fluid="md">
                <div className='all_businesses my-5'>
                <h2>All Businesses</h2>
                </div>

                <div className='business_list grid mb-5'>
                  {business.data?.map((item,index)=>(
                    <BusinessListCard business={item}/>
                  ))}
                </div>
            </Container>
        </div>
    </>
  )
}

export default AllBusiness