import React from 'react'

const Home = React.lazy(() => import('./views/pages/Home/Home'))

const routes = [{ path: '/', exact: true, name: 'Home', element: Home }]

export default routes
