import { serverMutation } from "../server"

export const updateUsersStatus = async (id, status) => {
  const res = await serverMutation(`/api/admin/users/${id}`, "PATCH", { status });
  return res;
}

export const setDefaultUsersStatus = async (email) => {
  const res = await serverMutation(`/api/users/default-status/${email}`, "PATCH");
  return res;
}

export const approvedStartup = async (id) => {
  const res = await serverMutation(`/api/admin/startups/${id}`, "PATCH");
  return res;
}

export const deleteStartup = async (id) => {
  const res = await serverMutation(`/api/admin/startups/${id}`, "DELETE");
  return res;
}

