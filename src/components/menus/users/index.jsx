import React, { useState, useContext, useEffect } from 'react'
import Table from '../../common/table'
import { UserContext } from '../../../context'
import Paginate from '../../common/paginate'
import CustomModal from '../../common/modal'
import { verifyUser } from '../../../services/userService'
import { cap } from '../../../services/utilsService'
import SearchForm from '../../common/searchForm'
import { pagination } from '../../../config.json'
import { Link } from 'react-router-dom'
import Spinner from '../../common/spinner'
import { toast } from 'react-toastify'

import withAuth from './../../hoc/withAuth'

const Users = ({ auth, ...props }) => {
  const {
    state: { users, pageNum, start, end, notFound },
    onDelete,
    onRefresh,
    onPageChange,
    onSort,
    onSearch,
    onSetStart,
    onSetEnd,
    onSetStatus
  } = useContext(UserContext)

  const [search, setSearch] = useState('')

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
      path: 'profile.lastname',
      key: 'fullname',
      label: 'Fullname',
      content: user =>
        `${user.profile.firstname}, ${user.profile.middlename} ${user.profile.lastname}`
    },

    {
      path: 'position',
      label: 'Position'
    },
    {
      path: 'profile.branch.name',
      label: 'Branch'
    },
    {
      path: 'profile.codeNo',
      key: 'codeNo',
      label: 'Code #',
      content: ({ profile }) => profile.codeNo
    },
    {
      path: 'status',
      key: 'status',
      label: 'Status',
      content: user => (
        <span
          onClick={async e => {
            setSelectedUser(user)
            await toggle(e)
          }}
          className={`badge badge-${user.status === 1 ? 'success' : 'danger'}`}
        >
          {user.status === 1 ? 'active' : 'inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      content: user => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-around">
            <Link to={`/users/${user.id}`}>
              <button className="btn btn-sm btn-outline-primary ml-1">
                VIEW
              </button>
            </Link>
            <Link to={`/users/edit/${user.id}`}>
              <button className="btn btn-sm btn-outline-warning ml-1">
                EDIT
              </button>
            </Link>
            <button
              onClick={e => {
                if (user.status) {
                  alert('Cannot archive user when status is active!')
                  return
                }
                setSelectedUser(user)
                toggleDelete(e).then(data => data)
              }}
              className="btn btn-sm btn-outline-danger ml-1"
              name="delete"
            >
              ARCHIVE
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

  const [modalDelete, setModalDelete] = useState(false)

  const toggleDelete = async ({ target }) => {
    setModalDelete(modalDelete => !modalDelete)
    if (target && target.name === 'primary') {
      await doDelete(selectedUser)

      if (selectedUser.position === 'manager') {
        toast.info(
          `${cap(selectedUser.profile.branch.name)} branch is now available`
        )
      }

      setSelectedUser({})
      onRefresh()
    }
  }

  const renderModal = () => {
    return (
      <CustomModal
        title="Cocolife"
        modal={modal}
        toggle={toggle}
        label={`Are you sure to ${
          selectedUser.status === 0 ? 'activate' : 'deactivate'
        } ${selectedUser.username}?`}
        primary={{ type: 'primary', label: 'CONFIRM' }}
      />
    )
  }

  const renderModalDelete = () => {
    return (
      <CustomModal
        title="Cocolife"
        modal={modalDelete}
        toggle={toggleDelete}
        label={`Are you sure to archive ${selectedUser.username}?`}
        primary={{ type: 'danger', label: 'ARCHIVE' }}
      />
    )
  }

  const doDelete = async user => {
    if (!(await onDelete(user))) {
      onPageChange(pageNum - 1)
      if (start > 1) {
        onSetStart(start - 1)
      }
      onSetEnd(end - 1)
      return
    }
  }

  const handleSort = sortColumn => {
    onSort(sortColumn)
    setSortColumn(sortColumn)
  }

  const handleSearch = async ({ e, search }) => {
    e.preventDefault()
    // if (!search)
    props.history.replace('/users')
    onSetStatus(null)
    onSetStart(1)
    onSetEnd(pagination.pageNumbers)
    onPageChange(1)
    onSearch(search)
  }

  return (
    <React.Fragment>
      {renderModal()}
      {renderModalDelete()}

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Users Management</h1>
        {auth.isAdmin() && (
          <button
            onClick={() => props.history.replace('/users/new')}
            className="btn btn-sm btn-grad-primary ml-1"
          >
            <span className="fa fa-plus mr-1"></span>
            MANAGER
          </button>
        )}
      </div>

      <div className="col-12">
        <div className="mb-3">
          <SearchForm
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
            onRefresh={() => setSearch('')}
          />
        </div>

        <Table
          columns={columns}
          data={users}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        {users.length === 0 && !notFound && (
          <Spinner className="spinner mt-5 pt-5 mb-5" />
        )}
        {notFound && <h6 className="mt-2 mb-5">No records found!</h6>}
        {users.length > 0 && <Paginate />}
      </div>

      <style jsx="">{`
        .col-4 {
          padding: 0;
        }
        .badge {
          cursor: pointer;
        }

        .spinner {
          margin-bottom: 200px !important;
        }
        .fa-plus {
          margin-top: 0 !important;
        }
      `}</style>
    </React.Fragment>
  )
}

export default withAuth(Users)
