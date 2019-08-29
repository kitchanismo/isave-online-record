import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
const SideMenu = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/home">
              <span data-feather="home"></span>
              Dashboard <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              <span data-feather="file-text"></span>
              Branch
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              <span data-feather="file-text"></span>
              Agent
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              <span data-feather="file-text"></span>
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              <span data-feather="file-text"></span>
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default SideMenu
