'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/services/api';

interface Fill {
  id: string;

  totalPrice: number;
  totalLiters: number;
  filledAt: string;

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

      return {
        ...mileage,
        totalPrice,
        totalLiters,
        kilometersPerLiter,
      };
    });
  }, [mileages]);

  return (
    <div className="w-[40rem]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Kilometers</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Total Liters</TableHead>
            <TableHead>Kilometer per liter</TableHead>
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
              <TableCell>{mileage.kilometersPerLiter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
