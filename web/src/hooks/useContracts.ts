import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IcontractsResponse } from '../interfaces/Icontracts';

const GetAllContract = async () => {
  const { data } = await http.get<IcontractsResponse>('/contracts');
  return data;
};

export const useContracts = () => {
  const cocontractQuery = useQuery({
    queryKey: ['contracts'],
    queryFn: GetAllContract,
  });

  return cocontractQuery;
};
