import React from 'react'
import { ToastContainer } from 'react-toastify'
import Nav from './components/partials/nav'
import Routes from './routes'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <React.Fragment>
      <Nav />
      <ToastContainer autoClose={3000} />
      <main className="container">
        <Routes />
      </main>
    </React.Fragment>
  )
}

export default App
