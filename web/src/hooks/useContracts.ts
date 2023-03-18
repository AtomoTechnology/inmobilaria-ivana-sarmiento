import { useQuery } from '@tanstack/react-query'
import http from '../api/axios'
import { IcontractsResponse } from '../interfaces/Icontracts'

const GetAllContract = async (filter: string) => {
	const { data } = await http.get<IcontractsResponse>(`/contracts${filter.length > 0 ? filter : ''}`)
	return data
}

export const useContracts = (filter: string = '') => {
	// console.log('...jkjk :: ', filter)
	const cocontractQuery = useQuery({
		queryKey: ['contracts'],
		queryFn: () => GetAllContract(filter),
	})

	return cocontractQuery
}
