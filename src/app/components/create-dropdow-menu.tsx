'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import React, { useCallback, useState } from 'react';
import { MileageDialog } from '../mileage-dialog';
import { FillDialog } from '../fill-dialog';
import { PaymentMethodDialog } from '../payment-method-dialog';

export const CreateDropDowMenu: React.FC = () => {
  const [mileageDialogOpen, setMileageDialogOpen] = useState(false);
  const [fillDialogOpen, setFillDialogOpen] = useState(false);
  const [paymentMethodDialogOpen, setPaymentMethodDialogOpen] = useState(false);

  const handleMileageDialogOpen = useCallback(() => {
    setMileageDialogOpen(true);
  }, []);

  const handleMileageDialogChange = useCallback(() => {
    setMileageDialogOpen(false);
  }, []);

  const handleFillDialogOpen = useCallback(() => {
    setFillDialogOpen(true);
  }, []);

  const handleFillDialogChange = useCallback(() => {
    setFillDialogOpen(false);
  }, []);

  const handlePaymentMethodDialogOpen = useCallback(() => {
    setPaymentMethodDialogOpen(true);
  }, []);

  const handlePaymentMethodDialogChange = useCallback(() => {
    setPaymentMethodDialogOpen(false);
  }, []);

  return (
    <>
      <MileageDialog
        open={mileageDialogOpen}
        onOpenChange={handleMileageDialogChange}
      />
      <FillDialog open={fillDialogOpen} onOpenChange={handleFillDialogChange} />
      <PaymentMethodDialog
        open={paymentMethodDialogOpen}
        onOpenChange={handlePaymentMethodDialogChange}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>Create</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleFillDialogOpen}>
            Fill
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMileageDialogOpen}>
            Mileage
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePaymentMethodDialogOpen}>
            Payment Method
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
