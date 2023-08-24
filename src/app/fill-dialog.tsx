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
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FillForm />
      </DialogContent>
    </Dialog>
  );
};