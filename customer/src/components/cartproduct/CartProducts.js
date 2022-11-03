import { Alert } from 'react-bootstrap'
import React, { useContext, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Person, WifiOff } from 'react-bootstrap-icons'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/CustomerAuthContext'
import { NetworkConnection } from '../../utils/NetworkConnection'
import "./CartProduct.css"

const CartProducts = () => {
    const {isOnline} = NetworkConnection()
    const {user} = useContext(AuthContext)
    const {cart} = useContext(CartContext)


    useEffect(() => {
        if(!cart.items){
            return;
        }
        //convert object keys into array
       // console.log(Object.keys(cart.items));
    }, [cart])
    



  return (
    <div className='cart_products'>
        <div className=' grid'>
            <div className='col table-responsive'>
            <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Addon</th>
          <th>Attribute</th>
          <th>Qty</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
            <td><button className='btn btn-sm bg-light border rounded-2'>Remove</button></td>
            <td>Coupon</td>
            <td>Tahzeeb</td>
        </tr>
      </tbody>
    </Table>
            </div>
            <div className='col' xs={2}>
                <h3>Summary</h3>
                <hr/>
                <li className="list-group-item d-flex justify-content-between">
                <div>
                  <h6>Item:</h6>
                </div>
                <div>
                  <p>{cart ? cart.totalItems : 0}</p>
                </div>
              </li>
              <hr/>
                <li className="list-group-item d-flex justify-content-between">
                <div>
                  <h6>Total:</h6>
                </div>
                <div>
                  <p>500Rs</p>
                </div>
              </li>
              <div className='order_place_btn'>
               {isOnline ?
                user ?
                cart ?
                (
                    <button className='btn btn-danger btn-lg'>Order Now</button>
                )
                :''
                :
                <Alert variant='info'><Person/>  You need to login to place order.</Alert>
                : 
                <Alert variant='info'><WifiOff/> 😕 Kinldy check your internect connection to place order.</Alert>
               }
              </div>
            </div>
        </div>
    </div>
  )
}

export default CartProducts