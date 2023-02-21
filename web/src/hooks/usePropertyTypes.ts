import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IpropertyResponse } from '../interfaces/IPropertyType';

const GetAllPropertyTypes = async () => {
  const { data } = await http.get<IpropertyResponse>('/propertytypes');
  return data;
};

export const usePropertyTypes = () => {
  const propertyTypeQuery = useQuery({
    queryKey: ['property-types'],
    queryFn: GetAllPropertyTypes,
    refetchOnWindowFocus: false,
  });

  return propertyTypeQuery;
};
