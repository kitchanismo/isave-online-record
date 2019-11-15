import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { theme } from './../../config.json'

const SideMenuMobile = () => {
  return (
    <React.Fragment>
      <div className="mobile-menu m-0 d-flex justify-content-around px-0 py-3">
        <NavLink to="/dashboard" className="fa fa-bar-chart"></NavLink>
        <NavLink to="/branches" className="fa fa-home"></NavLink>
        <NavLink to="/users" className="fa fa-users"></NavLink>
        <NavLink to="/clients/enforced" className="fa fa-file"></NavLink>
        <NavLink to="/settings/backup" className="fa fa-gear"></NavLink>
      </div>
      <style jsx="">{`
        .mobile-menu {
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: #343a40;
          z-index: 2;
        }
        .active {
          color: ${theme.secondary} !important;
          cursor: hand;
        }
        a:hover {
          color: ${theme.secondary} !important;
        }
        .fa-file,
        .fa-home,
        .fa-users,
        .fa-bar-chart,
        .fa-gear {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          color: white;

          font-size: 20px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default SideMenuMobile
