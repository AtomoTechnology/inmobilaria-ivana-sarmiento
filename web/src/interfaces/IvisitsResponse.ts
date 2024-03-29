// Generated by https://quicktype.io

import { Iproperty } from "./Iproperties"

export interface IVisitsResponse {
	results: number
	code: number
	status: string
	ok: boolean
	data: IVisit[]
}

export interface IVisit {
	id: number
	PropertyId: number
	Property: Iproperty
	date: string
	fullName: string
	phone: string
	description: string
	createdAt: string
	updatedAt: string
	deletedAt: null
	participants?: []
}
