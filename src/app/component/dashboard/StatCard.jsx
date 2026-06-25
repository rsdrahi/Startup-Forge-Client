"use client";
import React from "react";
import { Card } from "@heroui/react";
import Link from "next/link";

export default function StatCard({ statsData = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4 w-full max-w-7xl mx-auto">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;

        return (
          <Card
            key={index}
            variant="default"
            className="w-full border border-default-100 shadow-sm rounded-2xl bg-background p-5"
          >
            {/* Circle Icon Container */}
            <div className={`p-3 rounded-full flex items-center justify-center self-start mb-4 ${stat.iconBgColor} ${stat.iconColor}`}>
              {IconComponent && <IconComponent size={20} />}
            </div>

            {/* Dynamic Content Area */}
            <Card.Content className="flex flex-col gap-1 p-0 min-h-[64px] justify-center">
              {stat.isTextCard ? (
                <>
                  <Card.Title className="text-2xl font-bold tracking-tight text-foreground m-0 p-0">
                    {stat.title}
                  </Card.Title>
                  <Card.Description className="text-sm font-medium text-default-500 m-0 p-0">
                    {stat.value}
                  </Card.Description>
                </>
              ) : (
                <>
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </span>
                  <Card.Description className="text-sm font-medium text-default-500 m-0 p-0">
                    {stat.title}
                  </Card.Description>
                </>
              )}
            </Card.Content>

            {/* Action Footer */}
            <Card.Footer className="p-0 mt-4 flex justify-start">
              <Link
                href={stat.linkHref || "#"}
                className="text-xs font-semibold text-primary hover:underline transition-all"
              >
                {stat.linkText}
              </Link>
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
}