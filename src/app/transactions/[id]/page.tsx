import TransactionSummary from "@/features/transaction/TransactionSummary";

const transactionDetail = ({ params }: { params: { id: string } }) => {
  return <TransactionSummary transactionId={Number(params.id)} />;
};

export default transactionDetail;
