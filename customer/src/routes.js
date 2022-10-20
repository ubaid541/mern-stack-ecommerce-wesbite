import React from 'react'
import {  Route, Routes, BrowserRouter } from 'react-router-dom'
import SingleProduct  from './pages/singleProduct/SingleProductPage'
import AllCategories from './pages/Categories/AllCategories'
import SingleCategoryPage from './pages/singlecategory/SingleCategoryPage'
import AllBusiness from './pages/businesses/AllBusiness'
import SingleBusinessPage from './pages/singleBusiness/SingleBusinessPage'
const Home = React.lazy(() => import('./pages/Home/Home'))

const routes = [
    { path: '/', name: 'Home', element: Home, exact: true },
    { path: '/customer/category', name: 'All Categories', element: AllCategories, exact: true },
    { path: '/customer/singlecategory', name: 'Single Category', element: SingleCategoryPage, exact: true },
    { path: '/customer/singleproduct', name: 'Single Product', element: SingleProduct, exact: true },
    { path: '/customer/businesses', name: 'All Businesses', element: AllBusiness, exact: true },
    { path: '/customer/singlebusiness', name: 'All Businesses', element: SingleBusinessPage, exact: true },
]

export default routes