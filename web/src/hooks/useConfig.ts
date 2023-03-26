import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IConfigResponse } from '../interfaces/Iconfig';

const GetAllConfig = async () => {
  const { data } = await http.get<IConfigResponse>('/config?sort=key');
  return data;
};

export const useConfig = () => {
  const configQuery = useQuery({
    queryKey: ['configs'],
    queryFn: GetAllConfig,
  });

  return configQuery;
};
