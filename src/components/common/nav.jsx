import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import auth from '../../services/authService'
import { cap } from '../../services/utilsService'
import { theme } from '../../config.json'
import { UserContext } from './../../context'

const Nav = props => {
  const {
    state: { unverify },
    onSetStatus
  } = useContext(UserContext)

  const handleLogout = async () => {
    await auth.logout()
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <h5 className="text-white mt-1">
            <span style={{ color: theme.secondary }}>COCOLIFE </span>: HYBRID
            MANAGEMENT INFORMATION SYSTEM
          </h5>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {auth.isValidUser() && (
                <React.Fragment>
                  <Link
                    data-toggle="tooltip"
                    title={`You have ${unverify} unverify user/s!`}
                    onClick={() => onSetStatus(0)}
                    to="/users"
                    className="fa fa-user text-white"
                  />
                  <span className="badge badge-sm badge-danger mb-4">
                    {unverify ? unverify : ''}
                  </span>
                  <li className="nav-item">
                    <NavLink className="nav-link active" to="/home">
                      {cap(auth.getCurrentUser().username) +
                        ' | ' +
                        cap(auth.getCurrentUser().position)}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </React.Fragment>
              )}
            </ul>
            <div className="dropdown-menu">
              <h6 className="dropdown-header">Dropdown header</h6>
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </div>
          </div>
        </div>
        <style jsx="">{`
          .navbar {
            margin-bottom: 20px;
          }
          .fa {
            margin-top: 12px !important;
          }

          i {
            cursor: pointer;
          }
        `}</style>
      </nav>
    </React.Fragment>
  )
}

export default Nav
