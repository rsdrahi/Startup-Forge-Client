import React from 'react';
import StatCard from './StatCard';
import { Briefcase, FileText, Persons } from '@gravity-ui/icons';

const AdminDashboardPage = ({ stats }) => {

  const { totalOpportunities, totalStartups, totalUsers } = stats

  const adminStats = [
    {
      title: "Total Users",
      value: totalUsers,
      linkText: "View all",
      linkHref: "/opportunities",
      icon: Briefcase,
      iconBgColor: "bg-indigo-100 dark:bg-indigo-950/40",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Total Startups",
      value: totalStartups,
      linkText: "View all",
      linkHref: "/applications",
      icon: FileText,
      iconBgColor: "bg-emerald-100 dark:bg-emerald-950/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Total Opportunities",
      value: totalOpportunities,
      linkText: "View all",
      linkHref: "/members",
      icon: Persons,
      iconBgColor: "bg-purple-100 dark:bg-purple-950/40",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="p-6 bg-content1/50 min-h-screen">
      <div className="mb-6 max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground">Overview Dashboard</h1>
      </div>
      <StatCard statsData={adminStats} />
    </div>
  );
};

export default AdminDashboardPage;