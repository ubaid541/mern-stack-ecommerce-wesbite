/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

import editCoupon from './views/pages/coupon/editCoupon'

// Pages

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AllProducts = React.lazy(() => import('./views/pages/Product/allProducts/AllProducts'))
const AddProduct = React.lazy(() => import('./views/pages/Product/addProduct/AddProduct'))
const EditProduct = React.lazy(() => import('./views/pages/Product/editProduct/editProduct'))
const Addons = React.lazy(() => import('./views/pages/addons/AllAddons'))
const editAddon = React.lazy(() => import('./views/pages/addons/editAddons'))
const Attributes = React.lazy(() => import('./views/pages/attributes/Attributes'))
const editAttr = React.lazy(() => import('./views/pages/attributes/editAttribute'))
const Categories = React.lazy(() => import('./views/pages/categories/Categories'))
const editCategory = React.lazy(() => import('./views/pages/categories/editCategory'))
const Coupons = React.lazy(() => import('./views/pages/coupon/Coupon'))
const Profile = React.lazy(() => import('./views/pages/business_profile/BusinessProfile'))

const routes = [
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin/all-products', name: 'All Products', element: AllProducts, exact: true },
  { path: '/admin/add-product', name: 'Add Product', element: AddProduct, exact: true },
  {
    path: '/admin/products/edit-product/:id',
    name: 'Edit Product',
    element: EditProduct,
    exact: true,
  },
  { path: '/admin/categories', name: 'Categories', element: Categories, exact: true },
  {
    path: '/admin/categories/edit-category/:id',
    name: 'Edit Category',
    element: editCategory,
    exact: true,
  },
  { path: '/admin/addons', name: 'Addons', element: Addons, exact: true },
  { path: '/admin/addons/edit-addon/:id', name: 'Edit Addon', element: editAddon, exact: true },
  {
    path: '/admin/attributes/edit-attribute/:id',
    name: 'Edit Addon',
    element: editAttr,
    exact: true,
  },
  { path: '/admin/attributes', name: 'Attributes', element: Attributes, exact: true },
  { path: '/admin/coupons', name: 'Coupon', element: Coupons, exact: true },
  {
    path: '/admin/coupons/edit-coupon/:id',
    name: 'Edit Coupon',
    element: editCoupon,
    exact: true,
  },
  { path: '/admin/profile', name: 'Coupon', element: Profile, exact: true },
]

export default routes
