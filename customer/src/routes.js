import React from 'react'
import {  Route, Routes, BrowserRouter } from 'react-router-dom'
import SingleProduct  from './pages/singleProduct/SingleProductPage'
import AllCategories from './pages/Categories/AllCategories'
import SingleCategoryPage from './pages/singlecategory/SingleCategoryPage'
import AllBusiness from './pages/businesses/AllBusiness'
import SingleBusinessPage from './pages/singleBusiness/SingleBusinessPage'
import AllProducts from './pages/products/AllProducts'
import AllCities from './pages/city/AllCities'
import SingleCity from './pages/singlecity/SingleCity'
import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login'
import Cart from './pages/cart/Cart'
const Home = React.lazy(() => import('./pages/Home/Home'))

const routes = [
    { path: '/customer/register', name: 'Customer Registeration', element: Register, exact: true },
    { path: '/customer/login', name: 'Customer Registeration', element:Login, exact: true },


    { path: '/', name: 'Home', element: Home, exact: true },
    { path: '/customer/category', name: 'All Categories', element: AllCategories, exact: true },
    { path: '/customer/singlecategory/:id', name: 'Single Category', element: SingleCategoryPage, exact: true },
    { path: '/customer/cities', name: 'All Cities', element: AllCities, exact: true },
    { path: '/customer/singlecity/:id', name: 'All Cities', element: SingleCity, exact: true },
    { path: '/customer/productlist', name: 'All Products', element: AllProducts, exact: true },
    { path: '/customer/singleproduct/:id', name: 'Single Product', element: SingleProduct, exact: true },
    { path: '/customer/businesses', name: 'All Businesses', element: AllBusiness, exact: true },
    { path: '/customer/singlebusiness/:id', name: 'All Businesses', element: SingleBusinessPage, exact: true },
    { path: '/customer/cart', name: 'Cart Products', element: Cart, exact: true },
]

export default routes