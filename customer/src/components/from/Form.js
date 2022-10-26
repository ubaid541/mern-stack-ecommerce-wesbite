import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CustomerForm = () => {
  const [userDetail, setUserDetail] = useState([])
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState()
  const navigate = useNavigate()


  const city = useFetch(`/customer/city/`)

  const user_role = "customer"



  const handleChange = (e) => {
    setUserDetail((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/customer/register', userDetail,{
        params:{
          user_role
        }
      })

      setSuccess(res.data[0] + "Redirecting to login.")
      setTimeout(() => {
        navigate('/customer/login')
      }, 2000)
    } catch (err) {
      setError([true, err.response.data])
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <>
      <div className='customer_register_form'>
        <div className='form-messages'>
          {error &&
          (<div className='form_error'>
            <Alert variant='danger'>{error}</Alert>
          </div>)
          }

          {success &&
          (<div className='form_success'>
            <Alert variant='success'>{success}</Alert>
          </div>)
          }
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="fname">
            <Form.Control type="text" name='name' placeholder="Enter Name"
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Control type="text" name='username' placeholder="Username"
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control type="password" name='password' placeholder="Password"
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Control type="email" placeholder="Email" name='email'
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Control type="tel" placeholder="Phone" name='phone'
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Control type="text" placeholder="Address" name='address'
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Select aria-label="Default select example"
              name='city'
              onChange={handleChange} >
              <option>Select City</option>
              {city.data?.map((item, index) => (
                <option key={item._id} value={item._id}>{item.city_name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="danger" type="submit" onClick={handleClick}>
            Register
          </Button>
        </Form>
      </div>
    </>
  )
}

export default CustomerForm