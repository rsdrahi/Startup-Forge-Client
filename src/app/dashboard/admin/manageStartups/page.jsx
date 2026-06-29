'use client'
import ManageStartupTable from '@/app/component/dashboard/ManageStartupTable';
import { getAllStartups } from '@/lib/api/admin/data';
import React, { useEffect, useState } from 'react';

const ManageStartupPage = () => {

  const [startups, setStartup] = useState([]);
  const loadStartup = async () => {
    const data = await getAllStartups();
    setStartup(data);
  }
  useEffect(() => {
    loadStartup();
  }, [])

  return (
    <div>
      <h1>Manage Startup Page</h1>
      <ManageStartupTable startups={startups} refreshStartups={loadStartup}></ManageStartupTable>
    </div>
  );
};

export default ManageStartupPage;