import React, { Suspense } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from '../routes'

const AppContent = () => {
  return (
    <div>
         <Container fluid>
      <Suspense >
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="home" replace />} />
        </Routes>
      </Suspense>
    </Container>
    </div>
  )
}

export default AppContent