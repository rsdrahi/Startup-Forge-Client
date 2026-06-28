import { updateUsersStatus } from '@/lib/api/admin/actions';
import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import React from 'react';

const ManageUsersTable = ({ users, refreshUsers }) => {

  // const { name, email, role, status, _id } = users;

  const handleStatus = async (id, status) => {
    await updateUsersStatus(id, status);
    refreshUsers();
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200 mt-6">
      <table className="min-w-full divide-y divide-gray-200">

        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Role
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">

          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition"
              >

                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <Chip
                    color={
                      user.role === "Admin"
                        ? "danger"
                        : user.role === "Founder"
                          ? "primary"
                          : "secondary"
                    }
                    variant="flat"
                  >
                    {user.role}
                  </Chip>
                </td>

                <td className="px-6 py-4">
                  <Chip
                    color={
                      user.status === "active"
                        ? "success"
                        : "danger"
                    }
                    variant="flat"
                  >
                    {user.status}
                  </Chip>
                </td>

                <td className="px-6 py-4 text-center">

                  {user.role === "Admin" ? (
                    <Chip color="warning" variant="flat">
                      Protected
                    </Chip>
                  ) : user.status === "active" ? (
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() =>
                        handleStatus(user._id, "blocked")
                      }
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      color="success"
                      onPress={() =>
                        handleStatus(user._id, "active")
                      }
                    >
                      Unblock
                    </Button>
                  )}

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center py-8 text-gray-500"
              >
                No users found.
              </td>
            </tr>
          )}

        </tbody>

      </table>
    </div>
  );
};

export default ManageUsersTable;