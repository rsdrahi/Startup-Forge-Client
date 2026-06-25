import { serverFetch } from "../server"

export const myStartUP = async (email) => {
  const res = await serverFetch(`/api/myStartup?/${email}`)
  return res;
}