'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

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

interface Fill {
  id: string;

  totalPrice: number;
  totalLiters: number;
  filledAt: string;

  payment_method?: PaymentMethod;

  createdAt: string;
  updatedAt: string;
}

interface PaymentMethod {
  id: string;

  name: string;

  createdAt: string;
  updatedAt: string;
}
interface Mileage {
  id: string;

  kilometers: number;
  fills: Fill[];

  createdAt: string;
  updatedAt: string;
}

export const MileageList: React.FC = () => {
  const [mileages, setMileages] = useState<Mileage[]>([]);

  async function getMileages() {
    const response = await api.get('/mileages');
    setMileages(response.data);
  }

  useEffect(() => {
    getMileages();
  }, []);

  const parsedMileages = useMemo(() => {
    return mileages.map(mileage => {
      const totalPrice = mileage.fills.reduce((acc, fill) => {
        return acc + fill.totalPrice;
      }, 0);

      const totalLiters = mileage.fills.reduce((acc, fill) => {
        return acc + fill.totalLiters;
      }, 0);

      const kilometersPerLiter = mileage.kilometers / totalLiters;

      const paymentMethods = mileage.fills
        .map(fill => {
          return fill.payment_method?.name;
        })
        .join(', ');

      return {
        ...mileage,
        totalPrice,
        totalLiters,
        kilometersPerLiter,
        paymentMethods,
      };
    });
  }, [mileages]);

  const formatDate = useCallback((date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  }, []);

  const roundValue = useCallback((value: number) => {
    // round value in 3 decimal places
    return Math.round(value * 1000) / 1000;
  }, []);

  return (
    <div className="w-[60rem]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Kilometers</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Total Liters</TableHead>
            <TableHead>Kilometer per liter</TableHead>
            <TableHead>Total fills</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Payment Methods</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parsedMileages.map(mileage => (
            <TableRow>
              <TableCell className="font-medium">
                {mileage.kilometers}
              </TableCell>
              <TableCell>{mileage.totalPrice}</TableCell>
              <TableCell>{mileage.totalLiters}</TableCell>
              <TableCell>{roundValue(mileage.kilometersPerLiter)}</TableCell>
              <TableCell>{mileage.fills.length}</TableCell>
              <TableCell>{formatDate(mileage.createdAt)}</TableCell>
              <TableCell>{mileage.paymentMethods}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
