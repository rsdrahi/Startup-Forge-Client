'use server'

import { serverMutation } from "../server"

export const createStartup = async (data) => {
  const res = await serverMutation("/api/myStartup", "POST", data);
  return res;
}

export const updateStartup = async (data, id) => {
  const res = await serverMutation(`/api/myStartup/${id}`, "PATCH", data);
  return res;
}