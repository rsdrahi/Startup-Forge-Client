import { serverFetch } from "../server"

export const getCollaboratorProfile = async (email) => {
  const res = await serverFetch(`/api/collaboratorProfile/${email}`);
  return res;
}