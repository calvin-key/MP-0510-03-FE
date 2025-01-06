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
import { XCircle } from "lucide-react";
import React, { useState } from "react";

interface RejectTransactionDialogProps {
  onReject: () => void;
  isPending: boolean;
}

const RejectTransactionDialog: React.FC<RejectTransactionDialogProps> = ({
  onReject,
  isPending,
}) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleReject = () => {
    onReject();
    setOpen(false);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive" className="space-x-2">
          <XCircle className="h-4 w-4" />
          <span>Reject</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Transaction</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Rejection Reason</Label>
            <Textarea
              id="reason"
              placeholder="Enter the reason for rejection..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={isPending}
            className="space-x-2"
          >
            {isPending ? (
              "Processing..."
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                <span>Confirm Reject</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectTransactionDialog;
