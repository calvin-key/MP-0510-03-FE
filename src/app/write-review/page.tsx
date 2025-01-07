"use client";

import WriteReviewPage from "@/features/write-review";
import CustomerAuthGuard from "@/hoc/AuthGuardCustomer";

const writeReview = () => {
  return <WriteReviewPage />;
};

export default CustomerAuthGuard(writeReview);
