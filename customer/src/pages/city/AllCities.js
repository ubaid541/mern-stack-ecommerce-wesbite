import React from 'react'
import { CityCard } from '../../components'
import useFetch from '../../hooks/useFetch'

const AllCities = () => {
    const cities = useFetch(`/customer/city/`)
    console.log(cities);
  return (
    <>
        <div className='singleCityPage m-5'>
        <div className='singleCiyHeading'>
          <h3>All Cities</h3> 
        </div>

        <div className='single_city_businesses grid  my-5' >

          {cities.data?.length > 0 ?
          cities.data?.map((item,index)=>(
              
                <CityCard city={item}/>

          )):"No Cities"}
        </div>
      </div>
    </>
  )
}

export default AllCities