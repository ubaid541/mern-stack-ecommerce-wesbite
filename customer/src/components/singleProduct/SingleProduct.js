import React from 'react'
import { Alert, Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Cart, WifiOff } from 'react-bootstrap-icons'
import { NetworkConnection } from '../../utils/NetworkConnection'

const SingleProduct = ({product}) => {
  const {isOnline} = NetworkConnection()
  return (
    <>
    <Container>
                <Row>
                    <Col><Image src={product?.pro_image} className="img-fluid" width="400px" style={{height:"500px"}}/></Col>
                    <Col >
                        <div className='product_details text-start' style={{marginTop:'20px'}}>
                            <div className='product_name'>
                                <h3>{product?.pro_name}</h3>
                            </div>
                            <hr width="80px"/>
                            <div className='product_price my-3'>
                                <h5>Rs-{product?.pro_price}</h5>
                            </div>
                            <div className='product_desc my-3'>
                                <p>{product?.pro_desc}</p>
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

                {product?.discount ? 

                <div className='product_coupon my-3'>
                <li className="list-group-item d-flex justify-content-between">
                <div>
                  <p>Discount:<span className='fw-bold'> {product?.discount.coupon_name}</span></p>
                </div>
                <div>
                  <p>{product?.discount.coupon_value}Rs</p>
                </div>
              </li>
                            </div>
                 :"" }

                    {product?.pro_attr ?
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
                  {product?.pro_attr.attr_name}
                  </label>
                </div>
                <div>
                  <p> {product?.pro_attr.attr_price}Rs</p>
                </div>
              </li>
                            </div>
             :"" }


            {product?.pro_addon ?
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
                  {product?.pro_addon.addon_name}
                  </label>
                </div>
                <div>
                  <p> {product?.pro_addon.addon_price}Rs</p>
                </div>

              </li>
                            </div>

            :""}

                            <div className='add_to_cart my-4'>
                              {isOnline ? 
                           ( <Button variant="danger" size="lg"><Cart className='me-2' style={{marginTop:'-5%'}}/>
                                Add To Cart
                            </Button>)
                             : 
                             <Alert variant='danger'><WifiOff/> 😔 Kinldy check your internect connection to add product to cart.</Alert>
                              }
                            </div>
                        </div>
                    </Col>
                </Row>
    </Container>
    </>
  )
}

export default SingleProduct