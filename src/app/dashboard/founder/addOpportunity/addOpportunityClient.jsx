'use client';

import { useSession } from "@/lib/auth-client";
import { getMyStartup } from "@/lib/api/startUpsDetails/data";
import DashboardHeading from "@/app/component/dashboard/DashboardHeading";
import AddOpportunityForm from "@/app/component/dashboard/AddOpportunityForm";
import { useEffect, useState } from "react";

export default function AddOpportunityClient() {
  const { data: session } = useSession();
  const [startup, setStartup] = useState(null);
  useEffect(() => {
    const loadStartup = async () => {
      if (!session?.user?.email) return;
      const data = await getMyStartup(session.user.email);
      setStartup(data);
    };
    loadStartup();
  }, [session]);
  if (!startup) return <p>Loading...</p>;

  return (
    <>
      <DashboardHeading
        title="Add Opportunity"
        description="Add New Opportunity"
      />
      <AddOpportunityForm startup={startup} />
    </>
  );
}