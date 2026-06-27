import { serverMutation } from "../server"

export const getCollaboratorProfile = async (email) => {
  const res = await serverMutation(`/api/collaboratorProfile/${email}`);
  return res;
}