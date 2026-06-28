
import React from "react";
// Gravity UI Icons
import { Briefcase, FileText, Persons, Gear } from "@gravity-ui/icons";
import StatCard from "./StatCard";

export default function DashboardPage({ stats }) {
  // Example Dataset for a "Founder" user role
  const founderStats = [
    {
      title: "Total Opportunities",
      value: stats.totalOpportunities,
      linkText: "View all",
      linkHref: "/opportunities",
      icon: Briefcase,
      iconBgColor: "bg-indigo-100 dark:bg-indigo-950/40",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Total Applications",
      value: stats.totalApplications,
      linkText: "View all",
      linkHref: "/applications",
      icon: FileText,
      iconBgColor: "bg-emerald-100 dark:bg-emerald-950/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Accepted Members",
      value: stats.acceptedMembers,
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

      {/* Reusable Grid component taking the data prop */}
      <StatCard statsData={founderStats} />
    </div>
  );
}