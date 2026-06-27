import AddOpportunityForm from '@/app/component/dashboard/AddOpportunityForm';
import DashboardHeading from '@/app/component/dashboard/DashboardHeading';
import { getMyStartup } from '@/lib/api/startUpsDetails/data';
import React from 'react';

const AddOpportunityPage = async () => {
 
  const founderEmail = "nafi@gmail.com"
  const startup = await getMyStartup(founderEmail);
  if (!startup) {
    return <h1>No startup</h1>
  }

  return (
    <div>
      <DashboardHeading
        title={"Add Opportunity"}
        description={'Add New Opportunity'}
      ></DashboardHeading>
      <AddOpportunityForm startup={startup}></AddOpportunityForm>
    </div>
  );
};

export default AddOpportunityPage;