import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { ArrowRight} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'


const ProductCard = ({product}) => {

  return (
    <>
        <div className='product_list'>

            <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product?.pro_image} height="200px" />
        <Card.Body>
            <Card.Title>{product?.pro_name}</Card.Title>
            <Card.Text>
            {product?.pro_desc}
            </Card.Text>
        </Card.Body>
      
        <ListGroup className="list-group-flush">
        {product?.pro_category ?
        <ListGroup.Item className='d-flex justify-content-between'>
            <h6>Product Category</h6>
            <p>{product?.pro_category.cat_name}</p>
        </ListGroup.Item>
        :""
        }
        {product?.pro_addon ?
        <ListGroup.Item className='d-flex justify-content-between'>
            <h6>Product Addon</h6>
            <p>{product?.pro_addon.addon_name}</p>
        </ListGroup.Item>
        :""
        }
        {product?.pro_attr ?
        <ListGroup.Item className='d-flex justify-content-between'>
            <h6>Product Attribute</h6>
            <p>{product?.pro_attr.attr_name}</p>
        </ListGroup.Item>
        :""
        }
    </ListGroup>
   
        <Card.Body>
        <Link to={`/customer/singleproduct/${product?._id}`} className='btn btn-primary mt-2 me-3'><ArrowRight/> {product?.pro_name}  </Link>
        <Link to={`/customer/singlebusiness/${product?.seller_id._id}`} className='btn btn-primary mt-2'><ArrowRight/> {product?.seller_id.business_name}  </Link>
        </Card.Body>
        </Card>

        </div>

    </>
  )
}

export default ProductCard