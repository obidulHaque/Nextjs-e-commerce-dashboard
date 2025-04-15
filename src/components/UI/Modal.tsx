import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Modal {
  children: React.ReactNode;
}
const Modal: React.FC<Modal> = ({ children }) => {
  return (
    <>
      <Dialog open={true} onOpenChange={() => !open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Store</DialogTitle>
            <DialogDescription>
              Add a new store to manage products and categories
            </DialogDescription>
            <div>{children}</div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
