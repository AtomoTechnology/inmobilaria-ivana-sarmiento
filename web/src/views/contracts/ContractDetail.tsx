import React from 'react'
import { useParams } from 'react-router-dom'
import { useContractDetail } from '../../hooks/useContractDetail'

const ContractDetail = () => {

  const params = useParams()
  const { data, isLoading, error, isError } = useContractDetail(Number(params.id) * 1);
  console.log(data)
  console.log(params)
  return (
    <div>ContractDetail</div>
  )
}

export default ContractDetail