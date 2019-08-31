import React, { useState, useContext, useEffect } from 'react'
import Table from './partials/table'
import { UserContext } from '../context'
import Paginate from './paginate'
import CustomModal from './partials/modal'
import { verifyUser } from '../services/userService'
import SearchForm from './partials/searchForm'
import { pagination } from '../config.json'

const Users = props => {
  const {
    state: { total, users, pageNum, start, end, notFound, statusCount },
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
          {status === 1 ? 'active' : 'unverify'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      content: () => (
        <div className="row pl-2 pt-1">
          <div className="d-flex justify-content-around">
            <button className="btn btn-sm btn-outline-primary ml-1">
              VIEW
            </button>
            <button className="btn btn-sm btn-outline-warning ml-1">
              EDIT
            </button>
            <button
              className="btn btn-sm btn-outline-danger ml-1"
              name="delete"
            >
              DELETE
            </button>
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

  const handleSearch = async ({ e, search }) => {
    e.preventDefault()
    // if (!search) return
    onSetStart(1)
    onSetEnd(pagination.pageNumbers)
    onPageChange(1)
    onSearch(search)
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
          <span className="h5">
            Total:
            <span className="h5 text-primary"> {total} </span>
          </span>
          <span className="h5">
            Active:
            <span className="h5 text-success">{statusCount.active}</span>
          </span>
          <span className="h5">
            Unverify:
            <span className="h5 text-danger">{statusCount.unverify}</span>
          </span>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <SearchForm
              handleSearch={handleSearch}
              placeholder="Search username, firstname, middlename or lastname"
            />
          </div>

          <Table
            columns={columns}
            data={users}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          {users.length === 0 && !notFound && <h6>Loading ...</h6>}
          {notFound && <h6>{`No records found!`}</h6>}
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
