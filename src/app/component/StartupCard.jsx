'use client';

import { Card, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const StartupCard = ({ startup }) => {
  const {
    _id, startupName, founderEmail, description, logo, industry } = startup;

  return (
    <Link href={`/browseOpportunities?startup=${_id}`}>
      <Card className="h-full flex flex-col overflow-hidden rounded-2xl shadow-lg">

        {/* Logo */}
        <div className="relative aspect-square w-full h-40 overflow-hidden rounded-t-2xl">
          <Image
            src={logo}
            alt={startupName}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">

          <div>
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
              {startupName}
            </h2>

            <p className="text-sm text-gray-500 truncate">
              {founderEmail}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3 min-h-[72px]">
            {description}
          </p>

          <Chip
            size="sm"
            color="primary"
            variant="flat"
            className="w-fit uppercase"
          >
            {industry}
          </Chip>

        </div>

      </Card>
    </Link>
  );
};

export default StartupCard;