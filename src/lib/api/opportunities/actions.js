'use server'

import { serverMutation } from "../server"

export const addOpportunity = async (data) => {
  const res = await serverMutation("/api/addOpportunity", "POST", data);
  return res;
}

export const updateOpportunities = async (data, id) => {
  const res = await serverMutation(`/api/addOpportunity/${id}`, 'PATCH', data);
  return res;
}