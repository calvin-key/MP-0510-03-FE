"use client";

import UserTransactions from "@/features/transactions";
import CustomerAuthGuard from "@/hoc/AuthGuardCustomer";

const transactionsPage = () => {
  return <UserTransactions />;
};

export default CustomerAuthGuard(transactionsPage);
