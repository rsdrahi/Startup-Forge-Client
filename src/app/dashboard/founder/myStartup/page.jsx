import DashboardHeading from '@/app/component/dashboard/DashboardHeading';
import FounderStartupForm from '@/app/component/dashboard/FounderStartupForm';
import React from 'react';

const FounderStartupPage = () => {

  return (
    <div>
      <DashboardHeading
        title={'Start Up Profile'} description={'Update Your Startup Name, Email, Description'}
      ></DashboardHeading>
      <FounderStartupForm></FounderStartupForm>
    </div>
  );
};

export default FounderStartupPage;