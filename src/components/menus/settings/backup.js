import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { onBackup } from './../../../services/databaseService'
import Help from './../../common/help'

const Backup = () => {
  const [file, setFile] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setFile(getFile())
  }, [])

  const getFile = () => {
    const now = new Date(Date.now())
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    const day = now.getDate()
    const time = now.getTime()

    return `${month}-${day}-${year}-${time}`
  }

  const handleBackup = e => {
    e.preventDefault()

    if (!file) return

    setIsLoaded(true)

    onBackup(file)
      .then(() => {
        setFile(getFile())
        setIsLoaded(false)
        toast.success('Successfully backed up!')
      })
      .catch(e => console.log(e))
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Backup Database</h1>
      </div>

      <div className="col-6 p-0 m-0">
        <form onSubmit={handleBackup}>
          <div className="form-group">
            <label htmlFor="file">Filename</label>
            <div className="row m-0 p-0">
              <div className="col-11 m-0 p-0">
                <input
                  type="text"
                  name="file"
                  value={file}
                  onChange={e => setFile(e.currentTarget.value)}
                  className="form-control"
                />
              </div>
              <div className="col-1 m-0 p-0">
                <a
                  title="Generate new filename by date"
                  onClick={() => setFile(getFile())}
                  className="fa fa-refresh text-info ml-2"
                ></a>
              </div>
            </div>
            <p className="error-message text-danger p-1">
              {file ? '' : `"Filename" is not allowed to be empty!`}
            </p>
            <button
              disabled={isLoaded}
              type="submit"
              className="btn btn-grad-primary"
            >
              {!isLoaded ? 'BACK UP NOW' : 'BACKING UP...'}
            </button>
          </div>
        </form>
        <Help.Info text="Create a backup of database(.sql) file in a server. Filename will be the restore point."></Help.Info>
      </div>

      <style jsx="">{`
        .side-content {
          border-radius: 5px 0 0 5px;
        }
        .fa-refresh {
          cursor: pointer;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Backup
