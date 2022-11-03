import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Cart, Cart2, Cart3, Link } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/CustomerAuthContext'

const NavItems = ({items}) => {
  const { user,dispatch } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState()

  const handleClick = async (e) =>{
    e.preventDefault()
      const res = await axios.post("/customer/logout")
        dispatch({type:"LOGOUT"})
       navigate("/")

  }

  useEffect(() => {
    setCartItems(cart?.totalItems)
  }, [cart])
  
  
  return (
    <>
                <Navbar bg="light" expand="lg">
      <Container >
        
                 {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
        {items && items.map((item,index)=>(
          item.items ?  
          <NavDropdown title={item.name} id="navbarScrollingDropdown">
          {item.items.map((subItem,subIndex)=>(
            <>
              <NavDropdown.Item key={subIndex} href={subItem.to}>{subItem.name}</NavDropdown.Item>
              </>
        )) }
            </NavDropdown>
        :
            <>
            <Nav.Link key={index} href={item.to}>{item.name}</Nav.Link>
          </>
        ))}
         <Nav.Link  href="#" onClick={handleClick}>Logout</Nav.Link>
         <Nav.Link  href="/customer/cart" className='position-relative' style={{color:"#BB2D3B"}}><Cart3 /><span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger">
   {cartItems ? cartItems : 0}
  </span></Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>      
      </Container>
    </Navbar>
    </>
  )
}

export default NavItems