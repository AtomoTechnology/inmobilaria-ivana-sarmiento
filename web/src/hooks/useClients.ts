import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IzonesResponse } from '../interfaces/Izones';

const getAllClients = async () => {
  const { data } = await http.get<IzonesResponse>('/clients');
  return data;
};

export const useClients = () => {
  const clientQuery = useQuery({
    queryKey: ['clients'],
    queryFn: getAllClients,
    refetchOnWindowFocus: false,
  });

  return clientQuery;
};
