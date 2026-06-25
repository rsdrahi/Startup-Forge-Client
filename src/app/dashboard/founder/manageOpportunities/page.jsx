import DashboardHeading from '@/app/component/dashboard/DashboardHeading';
import ManageOpportunitiesTable from '@/app/component/dashboard/manageOpportunitiesTable';
import React from 'react';

const ManageOpportunitiesPage = () => {
  return (
    <div>
      <DashboardHeading
        title={"Manage Opportunity"}
        description={"Manage Your Opportunities"}
      ></DashboardHeading>
      <ManageOpportunitiesTable></ManageOpportunitiesTable>
    </div>
  );
};

export default ManageOpportunitiesPage;