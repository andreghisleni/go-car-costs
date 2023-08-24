'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { use, useCallback, useState } from 'react';
import { MileageDialog } from "../mileage-dialog";
import { FillDialog } from "../fill-dialog";

export const CreateDropDowMenu: React.FC = () => {
  const [mileageDialogOpen, setMileageDialogOpen] = useState(false);
  const [fillDialogOpen, setFillDialogOpen] = useState(false);

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

  return (
    <>
      <MileageDialog open={mileageDialogOpen} onOpenChange={handleMileageDialogChange} />
      <FillDialog open={fillDialogOpen} onOpenChange={handleFillDialogChange} />
      <DropdownMenu>
        <DropdownMenuTrigger>Create</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleFillDialogOpen}>Fill</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleMileageDialogOpen}>Mileage</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
