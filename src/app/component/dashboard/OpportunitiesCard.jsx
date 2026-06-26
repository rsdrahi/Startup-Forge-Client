'use client'
import { Button, Card, Chip } from '@heroui/react';
import ApplyModal from './ApplyModal';

const OpportunitiesCard = ({ opportunities }) => {

  console.log(opportunities, "Opportunities");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {
        opportunities?.map((opportunity) => (

          <Card
            key={opportunity._id}
            className="p-6 border rounded-xl"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {opportunity.roleTitle}
              </h2>
              <p className="text-gray-600">
                {opportunity.roleDescription}
              </p>
              <div className="flex gap-2 flex-wrap">
                <Chip color="primary">
                  {opportunity.workType}
                </Chip>
                <Chip color="secondary">
                  {opportunity.commitmentLevel}
                </Chip>
              </div>
              <p className='flex gap-2'>
                <span className="font-semibold">
                  Skills:
                </span>
                {opportunity.requiredSkills}
              </p>
              <p className=" font-medium flex gap-2">
                <span className='text-red-500'>
                  Deadline:
                </span>
                {opportunity.deadline}
              </p>
            </div>
            <div className='flex justify-end'>
              <ApplyModal></ApplyModal>
            </div>
          </Card>
        ))
      }

    </div>
  );
};

export default OpportunitiesCard;