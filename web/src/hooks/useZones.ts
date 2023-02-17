import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IzonesResponse } from '../interfaces/Izones';

const GetAllZones = async () => {
  const { data } = await http.get<IzonesResponse>('/zones');
  return data;
};

export const useZones = () => {
  const zonesQuery = useQuery({
    queryKey: ['zones'],
    queryFn: GetAllZones,
    refetchOnWindowFocus: false,
  });

  return zonesQuery;
};
