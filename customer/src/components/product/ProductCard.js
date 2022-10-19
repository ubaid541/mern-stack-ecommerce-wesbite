import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { ArrowRight} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'


const ProductCard = () => {
  return (
    <>
        <div className='product_list'>
            <div className='row'>
            <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
        <Link to="/customer/singleproduct" className='btn btn-primary mt-2 me-3'><ArrowRight/> Product  </Link>
        <Link to="/customer/singlebusiness" className='btn btn-primary mt-2'><ArrowRight/> Business  </Link>
        </Card.Body>
        </Card>
    </div>
        </div>

        <div className='product_list_btn my-3'>
            <Link to="/customer/product" className='btn btn-primary'>
              All Products
            </Link>
        </div>
    </>
  )
}

export default ProductCard