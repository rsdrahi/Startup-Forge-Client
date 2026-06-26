import { getAllOpportunities, getStartupOpportunities } from '@/lib/api/opportunities/data';
import OpportunitiesCard from '@/app/component/dashboard/OpportunitiesCard';

const BrowseOpportunitiesPage = async () => {

  const opportunities = await getAllOpportunities();

  return (

    <div className="max-w-7xl mx-auto py-10 px-4">

      <h2 className="text-3xl font-bold mb-8">
        Browse Opportunities
      </h2>

      <OpportunitiesCard
        opportunities={opportunities}
      />

    </div>
  );
};

export default BrowseOpportunitiesPage;