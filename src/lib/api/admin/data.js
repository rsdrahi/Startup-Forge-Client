import { serverFetch } from "../server"

export const getTotalUsers = async () => {
  const res = await serverFetch('/api/admin/users/count');
  return res;
}

export const getTotalStartUps = async () => {
  const res = await serverFetch('/api/admin/startups/count');
  return res;
}

export const getTotalOpportunities = async () => {
  const res = await serverFetch('/api/admin/opportunities/count');
  return res;
}