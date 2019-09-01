import React, { useState, memo } from 'react'
import SideMenu from './partials/sideMenu'
import Dashboard from './menus/dashboard'
import Branch from './menus/branch'
import Agent from './menus/agent'
import Users from './menus/users/index'
import Reports from './menus/reports'
import Footer from './partials/footer'
import UserProvider from '../providers/userProvider'
import ViewUser from './menus/users/view'

const Home = ({ menu, sub, ...props }) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <SideMenu>
            {menu === 'dashboard' && <Dashboard {...props} />}
            {menu === 'branches' && <Branch {...props} />}
            {menu === 'agents' && <Agent {...props} />}
            {menu === 'users' && (
              <React.Fragment>
                {sub === 'viewUser' && <ViewUser {...props} />}
                {sub === 'editUser' && <h1>editForm</h1>}
                {!sub && (
                  <UserProvider>
                    <Users {...props} />
                  </UserProvider>
                )}
              </React.Fragment>
            )}
            {menu === 'reports' && <Reports />}
          </SideMenu>

          <Footer></Footer>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
