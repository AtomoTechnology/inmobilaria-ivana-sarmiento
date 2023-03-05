import { useQuery } from '@tanstack/react-query';
import http from '../api/axios';
import { IpaymentTypeResponse } from '../interfaces/IpaymentType';

const GetAllPaymentTypes = async () => {
  const { data } = await http.get<IpaymentTypeResponse>('/paymenttypes?sort=name');
  return data;
};

export const usePaymentTypes = () => {
  const paymentTypeQuery = useQuery({
    queryKey: ['paymenttypes'],
    queryFn: GetAllPaymentTypes,
  });

  return paymentTypeQuery;
};
