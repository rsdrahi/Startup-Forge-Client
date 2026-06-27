'use client'
import ProfileCard from '@/app/component/dashboard/ProfileCard';
import { createCollaboratorProfile } from '@/lib/api/collaboratorProfile/actions';
import { getCollaboratorProfile } from '@/lib/api/collaboratorProfile/data';
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {

  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const createProfile = async () => {
      if (!session?.user?.email) return;

      let profileData = await getCollaboratorProfile(session.user.email);

      if (!profileData) {
        await createCollaboratorProfile({
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          skills: "",
          bio: "",
        });
        profileData = await getCollaboratorProfile(session.user.email);
      }

      setProfile(profileData);
    };

    createProfile();
  }, [session]);

  if (!profile) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-10 px-4 md:px-10 max-w-4xl mx-auto">
      <h1 className='font-bold text-center text-2xl'>Profile</h1>
      <ProfileCard profile={profile}></ProfileCard>
    </div>
  );
};

export default ProfilePage;