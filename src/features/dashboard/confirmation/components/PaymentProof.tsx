import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface PaymentProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export const PaymentProofModal = ({
  isOpen,
  onClose,
  imageUrl,
}: PaymentProofModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="relative h-[600px] w-full">
          <Image
            src={imageUrl}
            alt="Payment Proof"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
