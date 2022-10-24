import React from 'react'
import { useParams } from 'react-router-dom'
import { BusinessListCard, CityCard } from '../../components'
import useFetch from '../../hooks/useFetch'

const SingleCity = () => {
    const {id} = useParams()
    const singleCity = useFetch(`/customer/singlecity/${id}`)

    console.log(singleCity);


  return (
    <>
         <div className='singleCityPage m-5'>
        <div className='singleCat_heading'>
          <h3>Category: <span className='text-danger'>{singleCity.data[0]?.city_name}</span> </h3> 
        </div>

        <div className='single_cat_product grid  my-5' >

          {singleCity.data[1] !== undefined && singleCity.data[1].length > 0 ?
          singleCity.data[1]?.map((item,index)=>(
              
                <BusinessListCard business={item}/>

          )):"No businesses in this city."}
        </div>
      </div>
    </>
  )
}

export default SingleCity