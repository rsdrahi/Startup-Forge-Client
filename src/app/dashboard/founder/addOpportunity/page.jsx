import AddOpportunityForm from '@/app/component/dashboard/AddOpportunityForm';
import DashboardHeading from '@/app/component/dashboard/DashboardHeading';
import React from 'react';

const AddOpportunityPage = () => {
  return (
    <div>
      <DashboardHeading
        title={"Add Opportunity"}
        description={'Add New Opportunity'}
      ></DashboardHeading>
      <AddOpportunityForm></AddOpportunityForm>
    </div>
  );
};

export default AddOpportunityPage;