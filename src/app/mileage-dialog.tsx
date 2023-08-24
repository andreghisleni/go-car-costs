import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { MileageForm } from './mileageForm';

export const MileageDialog: React.FC<DialogPrimitive.DialogProps> = props => {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <MileageForm />
      </DialogContent>
    </Dialog>
  );
};
