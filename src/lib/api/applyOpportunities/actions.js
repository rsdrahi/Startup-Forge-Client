import { serverMutation } from "../server"


export const applyForOpportunities = async (data) => {
  const res = await serverMutation('/api/applications', "POST", data)
  return res;
}

export const updateApplicationsStatus = async (id, status) => {
  const res = await serverMutation(`/api/applications/${id}`, "PATCH", { status });
  return res;
}