import React from 'react';
import { getAllStartups } from '@/lib/api/startUpsDetails/data';
import StartupCard from '../component/StartupCard';

const StartupDetailsPage = async () => {

  const starsUp = await getAllStartups();

  return (
    <div className='my-6'>
      <h2 className='font-bold text-2xl my-3 text-center'>
        Startup Details Page
      </h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
        {
          starsUp.map(startup => (<StartupCard
            key={startup._id}
            startup={startup}
          ></StartupCard>))
        }
      </div>
    </div>
  );
};

export default StartupDetailsPage;