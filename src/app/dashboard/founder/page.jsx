'use client'
import DashboardPage from '@/app/component/dashboard/DashboardPage';
import { getStartupApplications } from '@/lib/api/applyOpportunities/data';
import { getTotalOpportunities } from '@/lib/api/opportunities/data';
import { getMyStartup } from '@/lib/api/startUpsDetails/data';
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';

const FounderHomePage = () => {

  const { data: session, isPending } = useSession()
  const [stats, setStats] = useState({
    totalOpportunities: 0,
    totalApplications: 0,
    acceptedMembers: 0,
  })

  useEffect(() => {
    const loadDashboard = async () => {
      if (!session?.user?.email) {
        return;
      }
      const startup = await getMyStartup(session.user.email);
      if (!startup) {
        return;
      }
      const totalOpportunities = await getTotalOpportunities(startup._id);
      const totalApplications = await getStartupApplications(startup._id);
      const acceptedMembers = totalApplications.filter(
        (app) => app.status === 'accepted'
      );
      console.log(acceptedMembers, "Accepted");
      setStats({
        totalOpportunities: totalOpportunities,
        totalApplications: totalApplications.length,
        acceptedMembers: acceptedMembers.length
      })
    }
    loadDashboard()
  }, [session])
  if (isPending) {
    return <div>Loading...</div>
  }
  const user = session?.user
  console.log(session, "session in the founder page");

  return (
    <div>
      <h3 className='font-bold text-2xl'>Welcome Back, {user?.name}</h3>
      <DashboardPage stats={stats}></DashboardPage>
    </div>
  );
};

export default FounderHomePage;