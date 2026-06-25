import { serverFetch } from "../server"

export const manageAllOpportunities = async (founderId) => {
  const res = await serverFetch(`/api/addOpportunity/${founderId}`)
  return res;
}