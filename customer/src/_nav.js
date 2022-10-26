import React from "react"

const _nav = [

    {
        name: 'Home',
        to: '/'
    },
    {
        name: 'Categories',
        to: '/customer/category'
    },
    {
        name: 'Businesses',
        to: '/customer/businesses'
    },
    {
        name: 'Products',
        to: '/customer/productlist'
    },

    {
        name: 'Account',
        items:[
    {
        name: 'Register',
        to: '/customer/register'
    },
    {
        name: 'Login',
        to: '/customer/login'
    }
        ]
    },


]

export default _nav