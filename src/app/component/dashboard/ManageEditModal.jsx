import React, { useState } from 'react';
import { Envelope, Pencil } from "@gravity-ui/icons";
import { Button, Form, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea } from "@heroui/react";
import { updateOpportunities } from '@/lib/api/opportunities/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const workTypes = [
  { id: "remote", textValue: "Remote" },
  { id: "hybrid", textValue: "Hybrid" },
  { id: "on-site", textValue: "On-site" },
];

const commitmentLevels = [
  { id: "full-time", textValue: "Full-time" },
  { id: "part-time", textValue: "Part-time" },
  { id: "contract", textValue: "Contract" },
  { id: "internship", textValue: "Internship" },
];

const ManageEditModal = ({ opportunity, onUpdate }) => {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { roleTitle, commitmentLevel, workType, deadline } = opportunity

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data, "Data find");
    const res = await updateOpportunities(data, opportunity?._id);
    if (res.modifiedCount) {
      toast.success("Opportunities Update Successfully!")
      await onUpdate();
      setIsOpen(false)
    }
  }

  return (
    <div>
      <Modal className={'w-64'} open={isOpen} onChange={setIsOpen}>
        <Button isIconOnly size="sm" variant="light" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-md min-w-[32px] h-[32px]">
          <Pencil size={16} />
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
                  <Form onSubmit={handleSubmit} validationBehavior="native">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">

                      {/* Row 1 - Left: Role Title */}
                      <TextField defaultValue={roleTitle} isRequired name="roleTitle" className="w-full">
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Role Title
                        </Label>
                        <Input placeholder="e.g. Frontend Developer" variant="primary" className="rounded-md" />
                      </TextField>

                      {/* Row 2 - Left: Work Type Dropdown */}
                      <Select defaultValue={workType} name="workType" className="w-full" placeholder="Select work type" isRequired>
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Work Type
                        </Label>
                        <Select.Trigger className="border border-gray-200 rounded-md p-2 flex justify-between items-center w-full bg-transparent min-h-[40px]">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {workTypes.map((type) => (
                              <ListBox.Item key={type.id} id={type.id} textValue={type.textValue}>
                                {type.textValue}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      {/* Row 2 - Right: Commitment Level Dropdown */}
                      <Select defaultValue={commitmentLevel} name="commitmentLevel" className="w-full" placeholder="Select commitment level" isRequired>
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Commitment Level
                        </Label>
                        <Select.Trigger className="border border-gray-200 rounded-md p-2 flex justify-between items-center w-full bg-transparent min-h-[40px]">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {commitmentLevels.map((level) => (
                              <ListBox.Item key={level.id} id={level.id} textValue={level.textValue}>
                                {level.textValue}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      {/* Row 3 - Left: Deadline Date Picker Input */}
                      <TextField defaultValue={deadline} isRequired type="date" name="deadline" className="w-full">
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Deadline
                        </Label>
                        <Input placeholder="dd/mm/yyyy" variant="primary" className="rounded-md" />
                      </TextField>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 w-full mt-8 pt-4 border-t border-gray-100">
                      <Button type="button" slot="close" className="px-6 font-medium text-gray-600 bg-gray-100 rounded-md">
                        Cancel
                      </Button>
                      <Button type="submit" className="px-6 font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-md">
                        Update Opportunity
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

export default ManageEditModal;