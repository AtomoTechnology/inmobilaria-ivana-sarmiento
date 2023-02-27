import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IpropertyResponse } from '../interfaces/Iproperties';

const GetAllContract = async () => {
  const { data } = await http.get<any>('/contracts');
  return data;
};

export const useContracts = () => {
  const cocontractQuery = useQuery({
    queryKey: ['contracts'],
    queryFn: GetAllContract,
  });

  return cocontractQuery;
};
