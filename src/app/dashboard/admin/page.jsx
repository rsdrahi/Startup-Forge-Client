'use client'
import AdminDashboardPage from '@/app/component/dashboard/AdminDashboardPage';
import { getTotalOpportunities, getTotalStartUps, getTotalUsers } from '@/lib/api/admin/data';
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStartups: 0,
    totalOpportunities: 0,
  })

  useEffect(() => {
    const loadDashboard = async () => {
      const users = await getTotalUsers();
      const opportunities = await getTotalOpportunities();
      const startups = await getTotalStartUps();

      setStats({
        totalUsers: users,
        totalStartups: startups,
        totalOpportunities: opportunities,
      });
    }
    loadDashboard();
  }, [])

  return (
    <div>
      <h3 className='font-bold text-2xl'>Welcome Back,{session?.user?.name}</h3>
      <AdminDashboardPage stats={stats}></AdminDashboardPage>
    </div>
  );
};

export default AdminPage;