import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import {CategoryCard, CityCard, ProductCard} from "../../components/index"
import { Link } from 'react-router-dom'
import "./Home.css"

const Home = () => {
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
              <Link variant="danger" to="/customer/product" className='btn btn-danger'>Explore Products</Link>
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
          <CityCard/>
        </section>

        <section className="my-5 px-5">
        <div className='category_heading mb-3'>
            <h3>Categories</h3>
        </div>
          <CategoryCard/>
          
        <div className='category_list_btn my-3'>
            <Link to="/customer/category" className='btn btn-primary'>  All Categories. </Link>
        </div>
        </section>


        <section className="my-5 px-5">
        <div className='product_heading mb-3'>
            <h3>Product</h3>
        </div>
          <ProductCard/>

          <div className='category_list_btn my-3'>
            <Link to="/customer/product" className='btn btn-primary'>  All Products. </Link>
        </div>
        </section>


    </>
  )
}

export default Home