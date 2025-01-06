"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";

interface AcceptTransactionDialogProps {
  onAccept: () => void;
  isPending: boolean;
}

const AcceptTransactionDialog: React.FC<AcceptTransactionDialogProps> = ({
  onAccept,
  isPending,
}) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleAccept = () => {
    onAccept();
    setOpen(false);
    setNote("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="default" className="space-x-2">
          <CheckCircle className="h-4 w-4" />
          <span>Accept</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept Transaction</DialogTitle>
          <DialogDescription>
            Add an optional note for accepting this transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Add any additional notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            disabled={isPending}
            className="space-x-2"
          >
            {isPending ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Confirm Accept</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptTransactionDialog;
