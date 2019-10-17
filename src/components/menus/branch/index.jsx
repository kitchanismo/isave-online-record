import React, { useState } from 'react'
import Joi from 'joi-browser'
import { toast } from 'react-toastify'
import AddBranch from './addBranch'
import TableBranch from './tableBranch'
import useBranches from '../../../hooks/useBranches'
import Spinner from './../../common/spinner'

const Branch = () => {
  const { branches, setRefresh, setBranches, isLoaded } = useBranches()
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Branch</h1>
      </div>

      <div className="row mb-4">
        <div className="col-8 side-content pt-4">
          <Spinner isLoaded={isLoaded} className="spinner">
            <TableBranch branches={branches} setBranches={setBranches} />
          </Spinner>
        </div>
        <div className="col-4 pt-4 pl-0">
          <AddBranch onRefresh={setRefresh}></AddBranch>
        </div>
      </div>

      <style jsx="">{`
        .side-content {
          border-radius: 5px 0 0 5px;
        }
        .spinner {
          margin-top: 200px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Branch
