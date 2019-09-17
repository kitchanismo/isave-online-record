import React, { useEffect, memo } from 'react'
import SideMenu from './common/sideMenu'
import Dashboard from './menus/dashboard/index'
import Branch from './menus/branch/index'
import { toast } from 'react-toastify'
import Users from './menus/users/index'
import Reports from './menus/reports'
import Footer from './common/footer'
import UserProvider from '../providers/userProvider'
import ViewUser from './menus/users/view'
import EditUser from './menus/users/edit'
import NewUser from './menus/users/new'

const Home = ({ menu, sub, ...props }) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div
          className="row"
          style={{ backgroundColor: 'transparent', minHeight: '800px' }}
        >
          <SideMenu>
            {menu === 'dashboard' && <Dashboard {...props} />}
            {menu === 'branches' && <Branch {...props} />}
            {menu === 'users' && (
              <React.Fragment>
                {sub === 'viewUser' && <ViewUser {...props} />}
                {sub === 'editUser' && <EditUser {...props} />}
                {sub === 'newUser' && <NewUser {...props} />}
                {!sub && <Users {...props} />}
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
