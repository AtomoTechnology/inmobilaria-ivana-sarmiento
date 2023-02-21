export interface IpropertyResponse {
  results: number;
  status: string;
  code: number;
  ok: boolean;
  data: Iproperty[];
}

export interface Iproperty {
  id: number;
  uuid?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
