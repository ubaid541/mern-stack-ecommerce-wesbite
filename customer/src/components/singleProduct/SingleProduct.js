import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Cart, Person, WifiOff } from 'react-bootstrap-icons'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/CustomerAuthContext'
import { NetworkConnection } from '../../utils/NetworkConnection'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SingleProduct = ({product}) => {
  const {isOnline} = NetworkConnection()
  const {user} = useContext(AuthContext)
 const [cartProduct, setcartProduct] = useState({})
 const [productExtra,setProductExtras] = useState({})
 const {cart,error,dispatch} = useContext(CartContext)

  useEffect(() => {
    setcartProduct(cart)
  }, [cart]) 



  const handleChange=(e)=>{

    if(e.target.type === "number"){
       setProductExtras(
        prev=>({...prev,[e.target.id]:e.target.value})
        )
    }else{

      if(e.target.checked){
        setProductExtras(
          prev=>({...prev,[e.target.id]:e.target.value})
          )
      }else{
        setcartProduct(
          prev=>(delete e.target.value)
          )
      }

    }


  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    
    try {
      dispatch({type:"CART_START"})
      let _cart = {...cart}
  
      if(!_cart.items){
        _cart.items={}
      }
  
      if (_cart.items[product._id]) {
        _cart.items[product._id].qty = _cart.items + productExtra.qty;
    } else {
      _cart.items[product._id]  =  {}
      _cart.items[product._id].qty = productExtra.qty;
      _cart.items[product._id].attr = productExtra.attr ;
      _cart.items[product._id].addon = productExtra.addon ;
      _cart.items[product._id].customer = user[0]._id ;
      _cart.items[product._id].business_id = product.seller_id._id ;
  
    }
  
    if(!_cart.totalItems) {
        _cart.totalItems = 0;
    }
    _cart.totalItems += 1;

    dispatch({type:"CART_UPDATED",payload:_cart})

    toast.success("Product added to cart successfully.",{
      position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
    });

    } catch (error) {
      dispatch({type:"CART_FAILURE",
      payload:{message : "Sorry something went wrong!"}})
      toast.error("Something went wrong.",{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

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
                      onChange={handleChange}
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
                    value={product.pro_attr._id}
                    id="attr"
                    onChange={handleChange}
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
                    value={product.pro_addon._id}
                    id="addon"
                    onChange={handleChange}
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
                              user ?
                                <> <Button variant="danger" size="lg" onClick={handleSubmit}><Cart className='me-2' style={{marginTop:'-5%'}}/>
                                Add To Cart
                            </Button>
                            <ToastContainer />
                            </>
                             :
                             <Alert variant='info'><Person/> ☺ You need to login to add this product to cart.</Alert>
                             : 
                             <Alert variant='danger'><WifiOff/> 😕 Kinldy check your internect connection to add product to cart.</Alert>
                              }
                            </div>
                        </div>
                    </Col>
                </Row>
    </Container>
    </>
  )
}

export default SingleProduct;