import React from 'react'
import { Github } from 'react-bootstrap-icons'
import "./Footer.css"

const Footer = () => {
  return (
    <>
        <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">Fatafut is a <i>instant delivery application</i> that not only encourages the businesses to promote their businesses But also provides jobs for the riders. Our aim is to be a leading Company of Pakistan</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/admin/register">Become a partner</a></li>
              <li><a href="/customer/product">Products</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by 
         <a href="/">Fatafut-Mungwaen</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><Github/></a></li>
            </ul>
          </div>
        </div>
      </div>
</footer>
    </>
  )
}

export default Footer