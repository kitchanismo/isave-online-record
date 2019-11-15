import React, { useEffect, memo } from 'react'
import SideMenu from './sideMenu'
import Dashboard from './menus/dashboard/index'
import AddFS from './menus/client/addFs'
import AddGPA from './menus/client/addgpa'
import Branch from './menus/branch/index'
import { toast } from 'react-toastify'
import Users from './menus/users/index'
import Clients from './menus/client/index'
import Footer from './common/footer'
import UserProvider from '../providers/userProvider'
import ClientProvider from '../providers/clientProvider'
import ViewUser from './menus/users/view'
import Me from './menus/profile/me'
import EditProfile from './menus/profile/edit'
import EditUser from './menus/users/edit'
import NewUser from './menus/users/new'
import EditBranch from './menus/branch/edit'
import NewBranch from './menus/branch/new'
import EditFs from './menus/client/edit'
import EditGPA from './menus/client/editgpa'
import Backup from './menus/settings/backup'
import Restore from './menus/settings/restore'
import ReactTooltip from 'react-tooltip'
import ShowClient from './menus/client/show'
import SideMenuMobile from './mobile/sideMenu'

import { useMedia } from 'react-use'

const Home = ({ menu, sub, ...props }) => {
  const isMobile = useMedia('(max-width: 600px)')
  return (
    <React.Fragment>
      <UserProvider>
        <ClientProvider>
          {isMobile && <SideMenuMobile {...props}> </SideMenuMobile>}

          <div className="container">
            <div
              className="row"
              style={{ backgroundColor: 'transparent', minHeight: '800px' }}
            >
              {!isMobile && <SideMenu {...props}> </SideMenu>}
              <main
                role="main"
                className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
              >
                {menu === 'dashboard' && <Dashboard {...props} />}

                {menu === 'profile' && (
                  <React.Fragment>
                    {sub === 'me' && <Me {...props} />}
                    {sub === 'edit' && <EditProfile {...props} />}
                    {!sub && <Dashboard {...props} />}
                  </React.Fragment>
                )}
                {menu === 'branches' && (
                  <React.Fragment>
                    {sub === 'editBranch' && <EditBranch {...props} />}
                    {sub === 'newBranch' && <NewBranch {...props} />}
                    {!sub && <Branch {...props} />}
                  </React.Fragment>
                )}
                {menu === 'users' && (
                  <React.Fragment>
                    {sub === 'viewUser' && <ViewUser {...props} />}
                    {sub === 'editUser' && <EditUser {...props} />}
                    {sub === 'newUser' && <NewUser {...props} />}
                    {!sub && <Users {...props} />}
                  </React.Fragment>
                )}
                {menu === 'clients' && (
                  <React.Fragment>
                    {sub === 'editFs' && <EditFs {...props} />}
                    {sub === 'newFs' && <AddFS {...props} />}
                    {sub === 'newGPA' && <AddGPA {...props} />}
                    {sub === 'editGPA' && <EditGPA {...props} />}
                    {sub === 'show' && <ShowClient {...props} />}
                    {!sub && <Clients {...props} />}
                  </React.Fragment>
                )}
                {menu === 'settings' && (
                  <React.Fragment>
                    {sub === 'backup' && <Backup {...props} />}
                    {sub === 'restore' && <Restore {...props} />}
                  </React.Fragment>
                )}
              </main>

              <Footer></Footer>
            </div>
          </div>
        </ClientProvider>
      </UserProvider>
      <ReactTooltip type="info" effect="float" />

      <style jsx="">{`
        .dashboard {
          border-radius: 5px px 0 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Home
