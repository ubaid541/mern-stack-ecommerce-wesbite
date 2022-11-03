import React from 'react'
import { CartProduct } from '../../components'
import "./Cart.css"

const Cart = () => {
  return (
    <div className='cart_page m-5'>

        <div className='container bg-light p-5 border rounded-3'>
            <div className='cart_page_heading mb-5'>
                <h1>Cart Item</h1>
                <hr/>
            </div>

            <div className='cart_details'>
                <div className='cart_product_list'>
                    <CartProduct/>
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default Cart