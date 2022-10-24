import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import {CategoryCard, CityCard, ProductCard} from "../../components/index"
import { Link } from 'react-router-dom'
import "./Home.css"
import useFetch from '../../hooks/useFetch'

const Home = () => {
  let limit = 4

  const {data,loading,error} = useFetch(`/customer/category/`,limit)
  const category = data

  const product = useFetch(`/customer/product/`,limit)
  const city = useFetch(`/customer/city/`,limit)

  return (
    <>
        <section className='hero_section' style={{paddingTop:'300px',paddingBottom:'100px'}}>
        <Container fluid="md" >
          <Row>
            <Col className='text-start'>
              <div className='hero_heading mb-4'>
                <h1>Fatafut Mungwaen</h1>
              </div>
              <div className='hero_btn'>
              <Link variant="danger" to="/customer/productlist" className='btn btn-danger'>Explore Products</Link>
              </div>
            </Col>
            <Col></Col>
          </Row>
    </Container>
        </section>

        <section className="my-5 px-5">
        <div className='category_heading mb-3'>
            <h3>Cities</h3>
        </div>

        <div className='cities grid  my-5'  >

      {city.data?.map((item,index)=>(
       <CityCard city={item}/> 
        ))}

      </div>
      
      <div className='category_list_btn my-3'>
            <Link to="/customer/cities" className='btn btn-primary'> All Cities. </Link>
        </div>
        </section>

        <section className="my-5 px-5">
        <div className='category_heading mb-3'>
            <h3>Categories</h3>
        </div>

           <div className='categories grid  my-5'>

           {category?.map((item,index)=>(
           <CategoryCard category={item}/>
             ))}

         </div>
          
        <div className='category_list_btn my-3'>
            <Link to="/customer/category" className='btn btn-primary'>  All Categories. </Link>
        </div>
        </section>


        <section className="my-5 px-5">
        <div className='product_heading mb-3'>
            <h3>Product</h3>
            <hr style={{width:"30px",display:'flex',justifyContent:"center"}}/>
        </div>

        <div className='product grid  my-5' >

          {product.data?.map((item,index)=>(
          <ProductCard product={item}/>
          ))}
        </div>

          <div className='category_list_btn my-3'>
            <Link to="/customer/productlist" className='btn btn-primary'>  All Products. </Link>
        </div>
        </section>
    </>
  )
}

export default Home