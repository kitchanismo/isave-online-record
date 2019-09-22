import React, { useEffect, useState } from 'react'
import { ClientContext } from '../context'
import { getStatus, addClient } from '../services/clientService'

const ClientProvider = props => {
  const [status, setStatus] = useState({})

  useEffect(() => {
    getStatus().then(status => setStatus(status))
  }, [])

  const handleAddClient = async client => {
    await addClient(client)
    setStatus(await getStatus())
  }

  return (
    <ClientContext.Provider
      value={{
        status,
        onAddClient: handleAddClient
      }}
    >
      {props.children}
    </ClientContext.Provider>
  )
}

export default ClientProvider
