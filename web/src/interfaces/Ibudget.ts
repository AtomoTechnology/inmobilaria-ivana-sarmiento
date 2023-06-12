// Generated by https://quicktype.io

export interface IBudgetResponse {
	results: number
	code: number
	status: string
	ok: boolean
	data: IBudget[]
}

export interface IBudget {
	category: string
	type: string
	photo: string
	id: number
	PropertyId: number
	Property: {
		street: string
		number: string
		dept: string
		floor: string
	}
	description: string
	createdAt: string
	updatedAt: string
	deletedAt: null
}
