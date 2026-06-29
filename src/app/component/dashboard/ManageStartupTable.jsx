'use client'
import { approvedStartup, deleteStartup } from '@/lib/api/admin/actions';
import { Button, Chip } from '@heroui/react';
import React from 'react';

const ManageStartupTable = ({ startups, refreshStartups }) => {

  const handleApprove = async (id) => {
    await approvedStartup(id);
    refreshStartups();
  }

  const handleDelete = async (id) => {
    await deleteStartup(id);
    refreshStartups();
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-default-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-default-100">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Startup</th>
            <th className="px-6 py-4 text-left font-semibold">Founder Email</th>
            <th className="px-6 py-4 text-left font-semibold">Industry</th>
            <th className="px-6 py-4 text-left font-semibold">Status</th>
            <th className="px-6 py-4 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {startups.map((startup) => (
            <tr key={startup._id} className='"border-t hover:bg-default-50 transition-all duration-200"'>
              <td className="px-6 py-5">{startup.startupName}</td>
              <td className="px-6 py-5">{startup.founderEmail}</td>
              <td className="px-6 py-5">{startup.industry}</td>
              <td className="px-6 py-5">
                <Chip
                  color={
                    startup.status === "approved"
                      ? "success"
                      : "warning"
                  }
                  variant="flat"
                >
                  {startup.status}
                </Chip>
              </td>
              <td className="flex gap-2 justify-center">
                {startup.status === "pending" ? (
                  <Button
                    color="success"
                    size="sm"
                    onPress={() => handleApprove(startup._id)}
                  >
                    Approve
                  </Button>
                ) : (
                  <Chip color="success">
                    Approved
                  </Chip>
                )}
                <Button
                  color="danger"
                  size="sm"
                  onPress={() => handleDelete(startup._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStartupTable;