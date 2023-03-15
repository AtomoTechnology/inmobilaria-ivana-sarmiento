import { useQuery } from '@tanstack/react-query'
import http from '../api/axios'
import { IzonesResponse } from '../interfaces/Izones'

const GetAllClientExpenses = async () => {
	const { data } = await http.get<IzonesResponse>('/client-expenses?sort=ContractId')
	return data
}

export const useClientExpenses = () => {
	const clientExpense = useQuery({
		queryKey: ['client-expenses'],
		queryFn: GetAllClientExpenses,
	})

	return clientExpense
}
