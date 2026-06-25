"use client";

import React, { useState } from "react";
import { Form, Input, Button, Label, ListBox, Select, TextField, TextArea } from "@heroui/react";
import { ArrowChevronUp } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { createStartup, updateStartup } from "@/lib/api/startUp/actions";
// import { CloudArrowUp } from "@gravity-ui/icons";

const industries = [
  { id: "technology", textValue: "Technology" },
  { id: "healthcare", textValue: "Healthcare" },
  { id: "finance", textValue: "Finance" },
  { id: "education", textValue: "Education" },
  { id: "ecommerce", textValue: "E-Commerce" },
];

const fundingStages = [
  { id: "bootstrap", textValue: "Bootstrap / Self-Funded" },
  { id: "seed", textValue: "Seed Stage" },
  { id: "series_a", textValue: "Series A" },
  { id: "series_b", textValue: "Series B" },
];

export default function FounderStartupForm() {
  const [logoUrl, setLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleLogoUpload = async (e) => {
    // const { data: session } = useSession();
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const IMGBBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        alert("Upload failed. Please check your ImgBB API key.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload = { ...data, logo: logoUrl };
    // console.log(payload, "payload");
    const res = await createStartup(payload);
    // console.log(res, "response");
    if (res.insertedId) {
      toast.success("Startup posted Successfully!")
      e.target.reset();
      redirect("/dashboard/founder")
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Startup Information</h2>

      <Form onSubmit={handleSubmit} validationBehavior="native">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">

          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <TextField isRequired name="startupName" className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Startup Name</Label>
              <Input placeholder="Name" variant="primary" className="rounded-md" />
            </TextField>

            {/* Industry Select */}
            <Select name="industry" className="w-full" placeholder="Select an industry" isRequired>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Industry</Label>
              <Select.Trigger className="border border-gray-200 rounded-md p-2 flex justify-between items-center w-full bg-transparent min-h-[40px]">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {industries.map((item) => (
                    <ListBox.Item key={item.id} id={item.id} textValue={item.textValue}>
                      {item.textValue}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Funding Stage Select */}
            <Select name="fundingStage" className="w-full" placeholder="Select funding stage" isRequired>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Funding Stage</Label>
              <Select.Trigger className="border border-gray-200 rounded-md p-2 flex justify-between items-center w-full bg-transparent min-h-[40px]">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {fundingStages.map((stage) => (
                    <ListBox.Item key={stage.id} id={stage.id} textValue={stage.textValue}>
                      {stage.textValue}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <TextField isRequired type="email" name="founderEmail" className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Founder Email</Label>
              <Input placeholder="Enter Startup Email" variant="primary" className="rounded-md" />
            </TextField>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {/* Logo Upload Box */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">
                Logo <span className="text-red-500">*</span>
              </span>

              <label className="flex flex-col items-center justify-center h-44 w-full border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50/50 transition relative overflow-hidden group">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                  required={!logoUrl}
                />

                {logoUrl ? (
                  <div className="absolute inset-0 p-2 flex items-center justify-center bg-white">
                    <img src={logoUrl} alt="Preview" className="h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white text-xs font-semibold">
                      Change Logo
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center px-4">
                    <ArrowChevronUp className="text-gray-400 mb-2" size={28} />
                    <span className="text-sm font-semibold text-gray-800">Upload Logo</span>
                    <span className="text-xs text-gray-400 mt-1">Upload your logo (JPG, PNG)</span>
                    <span className="text-[11px] text-gray-400">Recommended size: 500x500px</span>
                    <span className="text-[10px] text-gray-300 mt-1 italic">(Uploaded via imgbb)</span>
                  </div>
                )}

                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-sm font-medium text-indigo-600">
                    Uploading...
                  </div>
                )}
              </label>
            </div>

            {/* Fixed Composable TextArea implementation */}
            <TextField isRequired name="description" className="w-full">
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Description</Label>
              <TextArea
                placeholder="Enter Message..."
                variant="primary"
                rows={5}
                className="w-full rounded-md border border-gray-200 p-2 focus-visible:outline-indigo-500 resize-y"
              />
            </TextField>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 w-full mt-8 pt-4 border-t border-gray-100">
          <Button type="button" variant="secondary" className="px-6 font-medium text-gray-600 bg-gray-100 rounded-md">
            Cancel
          </Button>
          <Button type="submit" className="px-6 font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-md">
            Save Startup
          </Button>
        </div>
      </Form>
    </div>
  );
}