import { serverFetch } from "../server"

export const getAllStartups = async () => {
  const res = await serverFetch(`/api/myStartup`)
  return res;
}