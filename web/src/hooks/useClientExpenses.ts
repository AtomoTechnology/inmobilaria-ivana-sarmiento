import { useQuery } from '@tanstack/react-query'
import http from '../api/axios'
import { IClientExpensesResponse } from '../interfaces/clientExpenses'

const GetAllClientExpenses = async () => {
	const { data } = await http.get<IClientExpensesResponse>('/client-expenses?sort=ContractId')
	return data
}

export const useClientExpenses = () => {
	const clientExpense = useQuery({
		queryKey: ['client-expenses'],
		queryFn: GetAllClientExpenses,
	})

	return clientExpense
}
