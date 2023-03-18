import { useQuery } from '@tanstack/react-query'
import http from '../api/axios'
import { IClientExpensesResponse } from '../interfaces/clientExpenses'

const GetAllOwnerExpenses = async () => {
	const { data } = await http.get<IClientExpensesResponse>('/owner-expenses?sort=ContractId')
	return data
}

export const useOwnerExpenses = () => {
	const ownerExpense = useQuery({
		queryKey: ['owner-expenses'],
		queryFn: GetAllOwnerExpenses,
	})

	return ownerExpense
}
