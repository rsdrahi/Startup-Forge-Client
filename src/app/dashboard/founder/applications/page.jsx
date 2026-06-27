import DashboardHeading from '@/app/component/dashboard/DashboardHeading';
import FounderApplicationsTable from '@/app/component/dashboard/FounderApplicationsTable';
import { getStartupApplications } from '@/lib/api/applyOpportunities/data';
import { getMyStartup } from '@/lib/api/startUpsDetails/data';
import React from 'react';

const ApplicationsPage = async () => {

  const founderEmail = 'nafi@gmail.com'
  const startup = await getMyStartup(founderEmail);
  console.log(startup, "Startup");
  if (!startup) {
    return <h1>Not Found</h1>
  }
  console.log(startup._id, "StartupId");
  const applications = await getStartupApplications(startup._id)
  console.log(applications, "applications");

  return (
    <div>
      <DashboardHeading
        title={"Applications"}
        description={'Manage Your All Applications'}
      ></DashboardHeading>
      <FounderApplicationsTable applications={applications}></FounderApplicationsTable>
    </div>
  );
};

export default ApplicationsPage;