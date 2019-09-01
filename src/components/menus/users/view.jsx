import React, { useState, useEffect } from 'react'
import { getUser } from './../../../services/userService'
import { cap } from '../../../services/utilsService'

const ViewUser = props => {
  const { id } = props.match.params
  const [user, setUser] = useState({})

  useEffect(() => {
    getUser(id).then(data => {
      setUser(data)
    })
  }, [])
  return (
    <React.Fragment>
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">User Overview</h1>
        </div>

        <div className="row">
          <div className="col-4 pr-0">
            <div className="photo"></div>

            <div className="card" style={{ width: 'auto' }}>
              <img src="public/logo.png" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{`${cap(user.lastname)}, ${cap(
                  user.firstname
                )} ${cap(user.middlename)}`}</h5>
                <p className="card-subtitle">{cap(user.username)}</p>
                <span
                  className={`mt-4 badge badge-${
                    user.status === 1 ? 'success' : 'danger'
                  }`}
                >
                  {user.status === 1 ? 'active' : 'unverify'}
                </span>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card" style={{ width: 'auto' }}>
              <div className="card-body">
                <h5 className="card-title">Personal Details</h5>
                <br></br>
                <p className="card-subtitle">
                  Firstname:{' '}
                  <span className="text-secondary">{cap(user.firstname)}</span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Middlename:{' '}
                  <span className="text-secondary">{cap(user.middlename)}</span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Lastname:{' '}
                  <span className="text-secondary">{cap(user.lastname)}</span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Email: <span className="text-secondary">{user.email}</span>
                </p>
              </div>
            </div>
            <div className="card mt-3" style={{ width: 'auto' }}>
              <div className="card-body">
                <h5 className="card-title">Employment Details</h5>
                <br></br>
                <p className="card-subtitle">
                  Position:{' '}
                  <span className="text-secondary">{cap(user.position)}</span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Branch:{' '}
                  <span className="text-secondary">
                    {cap(user.branch ? user.branch.name : '')}
                  </span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Code Number:{' '}
                  <span className="text-secondary">{cap(user.codeNo)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx="">{`
          .dashboard {
            border-radius: 0px 7px 0 0;
          }
          .photo {
            width: auto;
            height: 303px;
            background-color: #343a40;
          }
        `}</style>
      </main>
    </React.Fragment>
  )
}

export default ViewUser
