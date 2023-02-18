import axios from 'axios'
import React from 'react'

const RequestError = ({ error }: { error: any }) => {
  return (
    <div className="request-error">{axios.isAxiosError(error) && error.message || 'Algo malo paso !'}</div>
  )
}

export default RequestError