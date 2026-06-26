import { serverFetch } from "../server"

export const manageAllOpportunities = async (startupId) => {
  const res = await serverFetch(`/api/addOpportunity/${startupId}`)
  return res;
}

export const getAllOpportunitiesById = async (Id) => {
  const res = await serverFetch(`/api/addOpportunity/${Id}`)
  return res;
}

export const getStartupOpportunities = async (startupId) => {
  const res = await serverFetch(`/api/addOpportunity/${startupId}`)
  return res;
}

export const getAllOpportunities = async () => {
  const res = await serverFetch('/api/browseOpportunities')
  return res;
}