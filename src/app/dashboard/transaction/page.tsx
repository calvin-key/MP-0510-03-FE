import DashboardLayout from "@/features/dashboard/DashboardLayout";
import TransactionPage from "@/features/dashboard/transaction";
import React from "react";

const Transaction = () => {
  return (
    <DashboardLayout>
      <TransactionPage />;
    </DashboardLayout>
  );
};

export default Transaction;
