'use client'
import DashboardPage from '@/app/component/dashboard/DashboardPage';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const FounderHomePage = () => {

  const { data: session, isPending } = useSession()
  if (isPending) {
    return <div>Loading...</div>
  }
  const user = session?.user
  console.log(session, "session in the founder page");

  return (
    <div>
      <h3 className='font-bold text-2xl'>Welcome Back, {user?.name}</h3>
      <DashboardPage></DashboardPage>
    </div>
  );
};

export default FounderHomePage;