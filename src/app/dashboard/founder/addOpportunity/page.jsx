import AddOpportunityForm from '@/app/component/dashboard/AddOpportunityForm';
import DashboardHeading from '@/app/component/dashboard/DashboardHeading';
import { getMyStartup } from '@/lib/api/startUpsDetails/data';
import React from 'react';

const AddOpportunityPage = async () => {
  // const session = await auth();
  // console.log(session, "StartUp Session");
  // const startup = await getMyStartup();
  // console.log(startup, "Start UP");
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