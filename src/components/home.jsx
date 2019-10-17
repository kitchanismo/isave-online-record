import React, { useEffect, memo } from 'react'
import SideMenu from './common/sideMenu'
import Dashboard from './menus/dashboard/index'
import AddFS from './menus/dashboard/addFs'
import AddGPA from './menus/dashboard/addgpa'
import Branch from './menus/branch/index'
import { toast } from 'react-toastify'
import Users from './menus/users/index'
import Reports from './menus/reports/index'
import Footer from './common/footer'
import UserProvider from '../providers/userProvider'
import ClientProvider from '../providers/clientProvider'
import ViewUser from './menus/users/view'
import EditUser from './menus/users/edit'
import NewUser from './menus/users/new'

const Home = ({ menu, sub, ...props }) => {
  return (
    <React.Fragment>
      <UserProvider>
        <ClientProvider>
          <div className="container-fluid">
            <div
              className="row"
              style={{ backgroundColor: 'transparent', minHeight: '800px' }}
            >
              <SideMenu>
                <main
                  role="main"
                  className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
                >
                  {menu === 'dashboard' && (
                    <React.Fragment>
                      {sub === 'newFs' && <AddFS {...props} />}
                      {sub === 'newGPA' && <AddGPA {...props} />}
                      {!sub && <Dashboard {...props} />}
                    </React.Fragment>
                  )}
                  {menu === 'branches' && <Branch {...props} />}
                  {menu === 'users' && (
                    <React.Fragment>
                      {sub === 'viewUser' && <ViewUser {...props} />}
                      {sub === 'editUser' && <EditUser {...props} />}
                      {sub === 'newUser' && <NewUser {...props} />}
                      {!sub && <Users {...props} />}
                    </React.Fragment>
                  )}
                  {menu === 'reports' && <Reports {...props} />}
                </main>
              </SideMenu>

              <Footer></Footer>
            </div>
          </div>
        </ClientProvider>
      </UserProvider>
      <style jsx="">{`
        .dashboard {
          border-radius: 0px 7px 0 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Home
