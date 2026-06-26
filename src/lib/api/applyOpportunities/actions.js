import { serverMutation } from "../server"


export const applyForOpportunities = async (data) => {
  const res = await serverMutation('/api/applications', "POST", data)
  return res;
}