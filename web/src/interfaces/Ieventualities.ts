// Generated by https://quicktype.io

import { Contract } from "./Icontracts"
import { Iproperty } from "./Iproperties"

export interface IEventualitiesResponse {
	results: number
	code: number
	status: string
	ok: boolean
	data: IEventuality[]
}

export interface IEventuality {
	id: number
	// ContractId: number
	PropertyId: number
	clientAmount: number
	ownerAmount: number
	clientPaid: boolean
	ownerPaid: boolean
	description: string
	expiredDate: string
	createdAt: string
	updatedAt: string
	deletedAt: null
	// Contract?: Contract
	Property?: Iproperty
}
