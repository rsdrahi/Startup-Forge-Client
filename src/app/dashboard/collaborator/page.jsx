'use client';

import Link from "next/link";
import { Card } from "@heroui/react";

const CollaboratorPage = () => {
  const cards = [
    {
      title: "Browse Opportunities",
      description:
        "Explore startup opportunities and apply to collaborate with founders.",
      href: "/browseOpportunities",
    },
    {
      title: "My Applications",
      description:
        "Track all your applications and view their current status.",
      href: "/dashboard/collaborator/myApplications",
    },
    {
      title: "My Profile",
      description:
        "Manage your profile information and showcase your skills.",
      href: "/dashboard/collaborator/profile",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Collaborator Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Manage your profile, explore opportunities, and track your applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-default-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {card.title}
              </h2>

              <p className="text-sm text-gray-500 mt-3 leading-6">
                {card.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorPage;