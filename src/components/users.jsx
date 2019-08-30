import React, { useState, useContext, useEffect } from 'react'
import Table from './partials/table'
import { UserContext } from '../context'
import Paginate from './paginate'
import CustomModal from './partials/modal'
import { verifyUser } from '../services/userService'

const Users = props => {
  const {
    state: { users, pageNum, start, end },
    onDelete,
    onRefresh,
    onPageChange,
    onSort,
    onSearch,
    onSetStart,
    onSetEnd
  } = useContext(UserContext)

  const [selectedUser, setSelectedUser] = useState({})

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  const columns = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'username',
      label: 'Username'
    },
    {
      key: 'fullname',
      label: 'Fullname',
      content: user => `${user.lastname}, ${user.firstname}`
    },

    {
      path: 'position',
      label: 'Position'
    },
    {
      key: 'branch',
      label: 'Branch',
      content: ({ branch }) => (branch ? branch.name : '')
    },
    {
      key: 'status',
      label: 'Status',
      content: ({ status, ...user }) => (
        <span
          onClick={async e => {
            if (status === 1) return
            setSelectedUser(user)
            await toggle(e)
          }}
          className={`badge badge-${status === 1 ? 'success' : 'danger'}`}
        >
          {status === 1 ? 'active' : 'inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      content: () => (
        <div className="row pl-2 pt-1">
          <div className="d-flex justify-content-around">
            <span className="badge badge-primary">VIEW</span>
            <span className="badge badge-warning">EDIT</span>
            <span className="badge badge-danger" name="delete">
              DELETE
            </span>
          </div>
        </div>
      )
    }
  ]
  const [modal, setModal] = useState(false)

  const toggle = async ({ target }) => {
    setModal(modal => !modal)

    if (target && target.name === 'primary') {
      await verifyUser(selectedUser.id)
      setSelectedUser({})
      onRefresh()
    }
  }

  const renderModal = () => {
    return (
      <CustomModal
        title="iSave"
        modal={modal}
        toggle={toggle}
        label={`Activate ${selectedUser.username}?`}
        primary={{ type: 'primary', label: 'CONFIRM' }}
        className="modal-dialog-centered"
      />
    )
  }

  const doDelete = async anime => {
    if (!(await onDelete(anime))) {
      onPageChange(pageNum - 1)
      if (start > 1) {
        onSetStart(start - 1)
      }
      onSetEnd(end - 1)
      return
    }
    onRefresh()
  }

  const handleSort = sortColumn => {
    onSort(sortColumn)
    setSortColumn(sortColumn)
  }
  return (
    <React.Fragment>
      {renderModal()}
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Users Management</h1>
        </div>

        <div className="col-12">
          <Table
            columns={columns}
            data={users}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          {users.length === 0 && <h6>Loading ...</h6>}
          {users.length > 0 && <Paginate />}
        </div>

        <style jsx="">{`
          .dashboard {
            border-radius: 0px 7px 0 0;
          }
          .col-4 {
            padding: 0;
          }
          .badge {
            cursor: pointer;
            margin-right: 2px !important;
          }
        `}</style>
      </main>
    </React.Fragment>
  )
}

export default Users
