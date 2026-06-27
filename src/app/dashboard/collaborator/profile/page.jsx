'use client'
import ProfileCard from '@/app/component/dashboard/ProfileCard';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const ProfilePage = () => {

  const { data: session } = useSession();
  const profile = {
    name: session?.user?.name,
    image: session?.user?.image,
    skills: "",
    bio: ""
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-10 px-4 md:px-10 max-w-4xl mx-auto">
      <h1 className='font-bold text-center text-2xl'>Profile</h1>
      <ProfileCard profile={profile}></ProfileCard>
    </div>
  );
};

export default ProfilePage;