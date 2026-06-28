'use client'
import ManageUsersTable from '@/app/component/dashboard/ManageUsersTable';
import { getAllUsers } from '@/lib/api/admin/data';
import React, { useEffect, useState } from 'react';

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data)
  }

  useEffect(() => {
    loadUse rs();
  }, []);

  return (
    <div>
      <h2>Manage Users</h2>
      <ManageUsersTable users={users} refreshUsers={loadUsers}></ManageUsersTable>
    </div>
  );
};

export default ManageUsers;