"use client";
import DashboardHeading from "@/app/component/dashboard/DashboardHeading";
import FounderApplicationsTable from "@/app/component/dashboard/FounderApplicationsTable";
import { getStartupApplications } from "@/lib/api/applyOpportunities/data";
import { getMyStartup } from "@/lib/api/startUpsDetails/data";
import { useSession } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";

const ApplicationsPage = () => {

  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);

  useEffect(() => {

    const loadApplications = async () => {

      if (!session?.user?.email) return;
      const startup = await getMyStartup(session.user.email);
      if (!startup) return;
      const data = await getStartupApplications(startup._id);
      setApplications(data);
    };
    loadApplications();
  }, [session]);

  return (
    <div>

      <DashboardHeading
        title="Applications"
        description="Manage Your All Applications"
      />

      <FounderApplicationsTable
        applications={applications}
      />

    </div>
  );
};

export default ApplicationsPage;