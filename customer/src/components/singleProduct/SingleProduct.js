import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Cart } from 'react-bootstrap-icons'
import image from "../../assets/images/category_bg.jpg"

const SingleProduct = () => {
  return (
    <>
    <Container>
                <Row>
                    <Col><Image src={image} className="img-fluid" width="400px"/></Col>
                    <Col >
                        <div className='product_details text-start' style={{marginTop:'20px'}}>
                            <div className='product_name'>
                                <h3>Product Name</h3>
                            </div>
                            <hr width="80px"/>
                            <div className='product_price my-3'>
                                <h5>Rs-250</h5>
                            </div>
                            <div className='product_desc my-3'>
                                <p>loremidfa;ldsjfdfje;wrjioepcndn ejoriep jnfeowp dmnfewirjq mdcdsmfmewfoip4wrjwe dvjeoiwrjpoqermnd,svnsdfowprewirjhpewqrewiop</p>
                            </div>

                            <div className='product_qty'>
                            <div className="form-floating">
                    <input
                      name="qty"
                      className="form-control"
                      type="number"
                      placeholder="Product Quantity"
                      defaultValue="1"
                      min="1"
                      id="qty"
                      required
                    />
                    <label htmlFor=" floatingInput">Quantity</label>
                  </div>
                            </div>

                            <div className='product_coupon my-3'>
                            <li className="list-group-item d-flex justify-content-between">
                <div>
                  <p>Discount</p>
                </div>
                <div>
                  <input
                    type="hidden"
                    name="discount_ID"
                    className="form-control"
                    value="<%= product.discount._id %>"
                    id="discount"
                  />
                  <p>
                    Coupon &nbsp; 200Rs
                  </p>
                </div>
              </li>
                            </div>

                            <div className='product_attr'>
                            <li className="list-group-item d-flex justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="attr"
                    type="checkbox"
                    value="<%= product.pro_attr._id %>"
                    id="attr"
                  />
                  <label className="form-check-label">
                   Attribute Name
                  </label>
                </div>
                <div>
                  <p>200Rs</p>
                </div>
              </li>
                            </div>

                            <div className='product_addon'>
                            <li className="list-group-item d-flex justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="addon"
                    type="checkbox"
                    value="<%= product.pro_addon._id %>"
                    id="addon"
                  />
                  <label className="form-check-label">
                   Addon
                  </label>
                </div>
                <div>
                  <p>350Rs</p>
                </div>

              </li>
                            </div>

                            <div className='add_to_cart my-4'>
                            <Button variant="danger" size="lg"><Cart className='me-2' style={{marginTop:'-5%'}}/>
                                Add To Cart
                            </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
    </Container>
    </>
  )
}

export default SingleProduct