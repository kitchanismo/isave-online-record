import React from 'react'
import { ToastContainer } from 'react-toastify'
import Nav from './components/common/nav'
import Routes from './routes'
import UserProvider from './providers/userProvider'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <React.Fragment>
      <UserProvider>
        <Nav></Nav>
        <React.Fragment>
          <ToastContainer autoClose={5000} />
          <div className="container">
            <Routes />
          </div>
        </React.Fragment>
      </UserProvider>
    </React.Fragment>
  )
}

export default App
