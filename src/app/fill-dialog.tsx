import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { FillForm } from './fillForm';

export const FillDialog: React.FC<DialogPrimitive.DialogProps> = props => {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Fill</DialogTitle>
          <DialogDescription>Create a new fill for your car.</DialogDescription>
        </DialogHeader>
        <FillForm />
      </DialogContent>
    </Dialog>
  );
};
