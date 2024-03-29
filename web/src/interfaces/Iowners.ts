// Generated by https://quicktype.io

import { Iproperty } from './Iproperties'

export interface IownersResponse {
	results: number
	code: number
	status: string
	ok: boolean
	data: IPerson[]
}

export interface IPerson {
	id: number
	fullName: string
	address: string
	phone: string
	email: string
	cuit: string
	codePostal: string
	fixedPhone: string
	province: string
	city: string
	obs: string
	createdAt: string
	updatedAt: string
	commision?: number
	Properties?: Iproperty[]
}
