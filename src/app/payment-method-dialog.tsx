import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { PaymentMethodForm } from './payment-method-form';

export const PaymentMethodDialog: React.FC<
  DialogPrimitive.DialogProps
> = props => {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Payment Method</DialogTitle>
          <DialogDescription>Create a new payment method.</DialogDescription>
        </DialogHeader>
        <PaymentMethodForm />
      </DialogContent>
    </Dialog>
  );
};
