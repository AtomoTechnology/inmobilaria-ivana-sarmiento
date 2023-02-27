import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IpropertyResponse } from '../interfaces/Iproperties';

const GetAllProperty = async () => {
  const { data } = await http.get<IpropertyResponse>('/properties');
  return data;
};

export const useProperties = () => {
  const propertyQuery = useQuery({
    queryKey: ['properties'],
    queryFn: GetAllProperty,
  });

  return propertyQuery;
};
