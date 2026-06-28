import { serverMutation } from "../server"

export const updateUsersStatus = async (id, status) => {
  const res = await serverMutation(`/api/admin/users/${id}`, "PATCH", { status });
  return res;
}

export const setDefaultUsersStatus = async (email) => {
  const res = await serverMutation(`/api/users/default-status/${email}`, "PATCH");
  return res;
}

