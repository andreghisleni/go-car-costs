'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/services/api';
import { format } from 'date-fns';

interface PaymentMethod {
  id: string;

  name: string;

  createdAt: string;
  updatedAt: string;
}

export const PaymentMethodList: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  async function getPaymentMethods() {
    const response = await api.get('/payments/methods');
    setPaymentMethods(response.data);
  }

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const formatDate = useCallback((date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  }, []);

  return (
    <div className="w-[25rem]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentMethods.map(paymentMethod => (
            <TableRow>
              <TableCell className="font-medium">
                {paymentMethod.name}
              </TableCell>
              <TableCell className="text-right">
                {formatDate(paymentMethod.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
