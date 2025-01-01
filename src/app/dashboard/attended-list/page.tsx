import AttendedListPage from "@/features/dashboard/attended-list";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import React from "react";

const AttendedList = () => {
  return (
    <DashboardLayout>
      <AttendedListPage />;
    </DashboardLayout>
  );
};

export default AttendedList;
