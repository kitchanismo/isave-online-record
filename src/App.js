import React from 'react'
import { ToastContainer } from 'react-toastify'
import Nav from './components/common/nav'
import Routes from './routes'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <React.Fragment>
      <Nav>
        {({ onRefreshUnverify }) => {
          return (
            <React.Fragment>
              <ToastContainer autoClose={5000} />
              <div className="container">
                <Routes onRefreshUnverify={onRefreshUnverify} />
              </div>
            </React.Fragment>
          )
        }}
      </Nav>
    </React.Fragment>
  )
}

export default App
