'use client'
import React from 'react';
import { Button, Form, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea } from "@heroui/react";
import { useSession } from '@/lib/auth-client';
import { updateCollaboratorProfile } from '@/lib/api/collaboratorProfile/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const EditProfileModal = () => {
  const { data: session } = useSession();
  const router = useRouter()

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const image = formData.get('image');

    const imageData = new FormData();
    imageData.append('image', image)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
      method: "POST",
      body: imageData,
    });
    const result = await res.json();
    console.log(result, "result");
    const imageUrl = result.data.display_url;
    const profileData = {
      name: formData.get("name"),
      skills: formData.get("skills"),
      bio: formData.get("bio"),
      image: imageUrl,
    }
    const response = await updateCollaboratorProfile(profileData, session.user.email);
    console.log(session.user.email, "USer");
    console.log(response, "response")
    if (response.modifiedCount > 0) {
      toast.success("Profile Update Successful!");
      router.refresh();
    }
  }

  return (
    <div>
      <Modal className={'w-64'} >
        <Button color="primary">
          Edit Profile
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header className='text-center'>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                </Modal.Icon>
                <Modal.Heading>Update Opportunity</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <Form onSubmit={handleUpdateProfile} validationBehavior="native">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">

                      <TextField isRequired name="name" className="w-full">
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Name
                        </Label>
                        <Input placeholder="Your Name" variant="primary" className="rounded-md" />
                      </TextField>

                      <TextField isRequired name="skills" className="w-full">
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Skills
                        </Label>
                        <Input placeholder="Your Skills" variant="primary" className="rounded-md" />
                      </TextField>

                      <TextField isRequired name="bio" className="w-full">
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Bio
                        </Label>
                        <Input placeholder="Write Your Bio" variant="primary" className="rounded-md" />
                      </TextField>

                      <TextField isRequired name="image" className="w-full">
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Image
                        </Label>
                        <input name='image' type="file" accept='image/*' placeholder="image file" variant="primary" className="rounded-md" />
                      </TextField>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 w-full mt-8 pt-4 border-t border-gray-100">
                      <Button type="button" slot="close" className="px-6 font-medium text-gray-600 bg-gray-100 rounded-md">
                        Cancel
                      </Button>
                      <Button type="submit" slot='close' className="px-6 font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-md">
                        Update Profile
                      </Button>
                    </div>
                  </Form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditProfileModal;