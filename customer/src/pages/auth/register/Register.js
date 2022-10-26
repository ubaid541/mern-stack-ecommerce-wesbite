import React from 'react'
import { Card, Container } from 'react-bootstrap'

import {Form} from '../../../components/'
import { LoginUser } from '../../../utils/loginuser'
import "./Register.css"

const Register = () => {
    LoginUser()

  return (
    
         <div className='customer_register'>
            <Container fluid="md">
                <div className='cust_reg_heading my-5'>
                <h2>Get Registered</h2>
                </div>

                <div className='customer_reg_form mb-5' style={{  display: "grid",
    placeItems: "center"}}>
                    <Card style={{width:"60%"}}>
                        <Card.Body>
                            <Form/>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    
  )
}

export default Register