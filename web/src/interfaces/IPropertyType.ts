export interface IpropertyResponse {
  results: number;
  status: string;
  code: number;
  ok: boolean;
  data: IpropertyType[];
}

export interface IpropertyType {
  id: number;
  uuid?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
