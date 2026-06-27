import { CiCoins1 } from "react-icons/ci"
import { serverFetch } from "../server"

export const getMyApplications = async (applicantId) => {
  const res = await serverFetch(`/api/applications/users/${applicantId}`)
  return res;
}

export const getStartupApplications = async (startupId) => {
  const res = await serverFetch(`/api/applications/startup/${startupId}`)
  return res;
}