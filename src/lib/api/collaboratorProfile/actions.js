import { serverMutation } from "../server"

export const createCollaboratorProfile = async (data) => {
  const res = await serverMutation('/api/collaboratorProfile', "POST", data);
  return res;
}

export const updateCollaboratorProfile = async (data, email) => {
  const res = await serverMutation(`/api/collaboratorProfile/${email}`, "PATCH", data);
  return res;
}

