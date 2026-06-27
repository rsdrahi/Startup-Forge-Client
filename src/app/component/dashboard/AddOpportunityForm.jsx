"use client";

import { Form, Input, Button, Label, ListBox, Select, TextField, TextArea } from "@heroui/react";
import { addOpportunity } from "@/lib/api/opportunities/actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";

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


const AddOpportunityForm = ({ startup }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(formData.entries()),
      startupId: startup._id,
    }

    console.log("Submitted Opportunity Data:", data);
    const res = await addOpportunity(data);
    console.log(res, "Response");
    if (res.insertedId) {
      toast.success("Add Opportunity Successfully...")
      redirect('/browseOpportunities')
    }
    return res;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Opportunity Details</h2>

      <Form onSubmit={handleSubmit} validationBehavior="native">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">

          {/* Row 1 - Left: Role Title */}
          <TextField isRequired name="roleTitle" className="w-full">
            <Label className="text-sm font-medium text-gray-700 mb-1 block">
              Role Title
            </Label>
            <Input placeholder="e.g. Frontend Developer" variant="primary" className="rounded-md" />
          </TextField>

          {/* Row 1 - Right: Required Skills */}
          <TextField isRequired name="requiredSkills" className="w-full">
            <Label className="text-sm font-medium text-gray-700 mb-1 block">
              Required Skills
            </Label>
            <Input placeholder="e.g. React, JavaScript, Tailwind CSS" variant="primary" className="rounded-md" />
            <span className="text-xs text-gray-400 mt-1 block">Enter skills separated by commas</span>
          </TextField>

          {/* Row 2 - Left: Work Type Dropdown */}
          <Select name="workType" className="w-full" placeholder="Select work type" isRequired>
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
          <Select name="commitmentLevel" className="w-full" placeholder="Select commitment level" isRequired>
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
          <TextField isRequired type="date" name="deadline" className="w-full">
            <Label className="text-sm font-medium text-gray-700 mb-1 block">
              Deadline
            </Label>
            <Input placeholder="dd/mm/yyyy" variant="primary" className="rounded-md" />
          </TextField>

          {/* Empty right column placeholder to push Role Description full width underneath */}
          <div className="hidden md:block"></div>

          {/* Row 4 - Full Span: Role Description */}
          <div className="md:col-span-2">
            <TextField isRequired name="roleDescription" className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">
                Role Description
              </Label>
              <TextArea
                placeholder="Describe the role, responsibilities, and expectations..."
                variant="primary"
                rows={4}
                className="w-full rounded-md border border-gray-200 p-2 focus-visible:outline-indigo-500 resize-y"
              />
            </TextField>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 w-full mt-8 pt-4 border-t border-gray-100">
          <Button type="button" className="px-6 font-medium text-gray-600 bg-gray-100 rounded-md">
            Cancel
          </Button>
          <Button type="submit" className="px-6 font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-md">
            Create Opportunity
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddOpportunityForm;