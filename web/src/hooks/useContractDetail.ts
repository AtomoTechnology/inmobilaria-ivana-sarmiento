import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IcontractsResponse } from '../interfaces/Icontracts';

const GetAllContractDetails = async (id: number) => {
  const { data } = await http.get<IcontractsResponse>('/contracts/' + id);
  return data;
};

export const useContractDetail = (id: number) => {
  const contractDetailQuery = useQuery({
    queryKey: ['contracts', id],
    queryFn: () => GetAllContractDetails(id),
  });

  return contractDetailQuery;
};
