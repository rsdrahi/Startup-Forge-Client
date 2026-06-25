'use server'

import { serverMutation } from "../server"

export const createStartup = async (data) => {
  const res = await serverMutation("/api/myStartup", "POST", data);
  return res;
}