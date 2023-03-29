import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IEventualitiesResponse } from '../interfaces/IEvents';

const GetAllEventualities = async () => {
  const { data } = await http.get<IEventualitiesResponse>('/eventualities')
  return data
};

export const useEventualities = () => {
  const eventQuery = useQuery({
    queryKey: ['eventualities'],
    queryFn: GetAllEventualities,
  });

  return eventQuery;
};
