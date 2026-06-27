import { Avatar, Button, Chip, Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const ProfileCard = ({ profile }) => {


  return (
    <div className='flex justify-center p-6'>
      <Card className="w-full p-6 sm:p-10 shadow-lg border border-default-200 rounded-3xl bg-background flex flex-col gap-6">

        <div className="flex flex-col items-center">

          <div className='h-24 w-24 rounded-full overflow-hidden'>
            <Image
              src={profile.image}
              alt={profile.name}
              height={96}
              width={96}
              className='object-cover rounded-full'
            />
          </div>

          <h2 className="text-3xl font-bold mt-4">
            {profile?.name}
          </h2>

          <div className="w-full mt-8">

            <h3 className="text-xl font-semibold mb-3">
              Skills
            </h3>

            {
              profile?.skills ? (

                <div className="flex gap-2 flex-wrap">

                  {
                    profile.skills
                      .split(',')
                      .map((skill, index) => (

                        <Chip key={index}>
                          {skill.trim()}
                        </Chip>

                      ))
                  }

                </div>

              ) : (

                <p className="text-default-500">
                  No skills added yet
                </p>

              )
            }

          </div>

          <div className="w-full mt-8">

            <h3 className="text-xl font-semibold mb-3">
              Bio
            </h3>

            <p className="text-default-600 leading-7">
              {
                profile?.bio ||
                "No bio added yet"
              }
            </p>

          </div>

          <div className="w-full flex justify-end mt-8">

            <Button color="primary">
              Edit Profile
            </Button>

          </div>

        </div>

      </Card>
    </div>
  );
};

export default ProfileCard;