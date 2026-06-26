import { serverFetch } from "../server"

export const getAllStartups = async () => {
  const res = await serverFetch(`/api/myStartup`)
  return res;
}
export const getMyStartup = async (email) => {
  const res = await serverFetch(`/api/myStartup/${email}`)
  return res;
}

