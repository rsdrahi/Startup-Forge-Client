import React from 'react';

const DashboardHeading = ({ title, description }) => {
  return (
    <div>
      <div className=' border-b text-center'>
        <h1 className='text-3xl font-bold p-1 my-2'>
          {title}
        </h1>
        <p className='text-muted'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeading;