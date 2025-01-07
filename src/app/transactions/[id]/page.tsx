"use client";

import TransactionSummary from "@/features/transaction";
import CustomerAuthGuard from "@/hoc/AuthGuardCustomer";

const transactionDetail = ({ params }: { params: { id: string } }) => {
  return <TransactionSummary transactionId={Number(params.id)} />;
};

export default CustomerAuthGuard(transactionDetail);
