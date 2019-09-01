import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from './components/home'
import Login from './components/auth/login'
import SignUp from './components/auth/signUp'
import NotFound from './components/partials/notFound'

import AuthRoute from './components/partials/authRoute'
import GuestRoute from './components/partials/guestRoute'

const Routes = () => {
  return (
    <Switch>
      {/* <AuthRoute path="/home" component={Home} /> */}
      <AuthRoute
        path="/dashboard"
        render={props => <Home {...props} menu="dashboard" />}
      />
      <AuthRoute
        path="/branches"
        render={props => <Home {...props} menu="branches" />}
      />
      <AuthRoute
        path="/agents"
        render={props => <Home {...props} menu="agents" />}
      />
      <AuthRoute
        path="/users/edit/:id"
        render={props => <Home {...props} menu="users" sub="editUser" />}
      />
      <AuthRoute
        path="/users/:id"
        render={props => <Home {...props} menu="users" sub="viewUser" />}
      />
      <AuthRoute
        path="/users"
        render={props => <Home {...props} menu="users" />}
      />
      <AuthRoute
        path="/reports"
        render={props => <Home {...props} menu="reports" />}
      />
      <GuestRoute path="/login" component={Login} />
      <GuestRoute path="/sign-up" component={SignUp} />
      <Route path="/not-found" component={NotFound} />>
      <Redirect from="/" exact to="/dashboard" />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default Routes
