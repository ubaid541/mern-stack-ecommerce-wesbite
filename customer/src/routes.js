import React from 'react'
import {  Route, Routes, BrowserRouter } from 'react-router-dom'
import AllCategories from './pages/Categories/AllCategories'
const Home = React.lazy(() => import('./pages/Home/Home'))

const routes = [
    { path: '/', name: 'Home', element: Home, exact: true },
    { path: '/customer/category', name: 'All Categories', element: AllCategories, exact: true },
]

export default routes