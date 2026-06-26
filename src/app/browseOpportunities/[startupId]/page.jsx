import { getAllOpportunitiesById } from '@/lib/api/opportunities/data';
import React from 'react';

const StartUpDetailsId = async ({ params }) => {

  const { startupId } = await params;
  console.log(startupId, "ID");
  const opportunities = await getAllOpportunitiesById(startupId);
  console.log(opportunities, "Opportunities");

  return (
    <div>
      <h1>Browse Opportunities</h1>
    </div>
  );
};

export default StartUpDetailsId;