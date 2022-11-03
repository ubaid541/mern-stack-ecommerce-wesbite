import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/CustomerAuthContext'
import { LoginUser } from '../../../utils/loginuser'

const Login = () => {
  
  LoginUser()
  const [userDetail, setUserDetail] = useState([])
  const navigate = useNavigate()
  const {user,error,dispatch} = useContext(AuthContext)

  const user_role = "customer"

  const handleChange = (e)=>{
    setUserDetail(
      prev=>({...prev,[e.target.id]:e.target.value})
      )
  }

  const handleClick = async (e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{

        const res = await axios.post("/customer/login",userDetail,{params:{
          user_role
        }})
        if(res.data.role === "customer"){
          dispatch({type:"LOGIN_SUCCESS",payload:[res.data.details,res.data.role]})

         navigate("/")
        }else{
          dispatch({type:"LOGIN_FAILURE",
          payload:{message : "You are not allowed!"}})
        }

    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err.response.data.message})
    }

}
  return (
    <>
               <div className='customer_login'>
            <Container fluid="md">
                <div className='cust_login_heading my-5'>
                <h2>Login Now</h2>
                </div>

                <div className='customer_login_form mb-5' style={{  display: "grid",
    placeItems: "center"}}>
                    <Card style={{width:"60%"}}>
                        
                <div className='form-messages'>
          {error &&
          (<div className='form_error'>
            <Alert variant='danger'>{error}</Alert>
          </div>)
          }
        </div>
                    <Card.Body>
                            
        <Form>

          <Form.Group className="mb-3" controlId="username">
            <Form.Control type="text" name='username' placeholder="Username"
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control type="password" name='password' placeholder="Password"
              onChange={handleChange} />
          </Form.Group>

          <Button variant="danger" type="submit" onClick={handleClick}>
            Login
          </Button>
        </Form>

        <Link to="/customer/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </Button>
                    </Link>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    </>
  )
}

export default Login