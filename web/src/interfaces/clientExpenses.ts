// Generated by https://quicktype.io

export interface IClientExpensesResponse {
	results: number
	code: number
	status: string
	ok: boolean
	data: IClientExpenses[]
}
export interface IClientExpensesResponseSimple {
	results: number
	code: number
	status: string
	ok: boolean
	data: IClientExpItem[]
}

export interface IClientExpItem {
	id: number | string
	description: string
	amount: number
	date: string
	ContractId: number
	createdAt: string
	updatedAt: string
	deletedAt: null | string
}

export interface IClientExpenses extends IClientExpItem {
	Contract: Contract
}

export interface Contract {
	id: number
	PropertyId: number
	Property: Property
}

export interface Property {
	floor: string
	dept: string
	street: string
	number: string
}
