import axiosInstance from "../AxiosInstance/axiosInstance";

type FollowProfileResponse = {};
export const followProfile = async (
  username: string | undefined
): Promise<FollowProfileResponse> => {
  const response = await axiosInstance.post(`/profiles/${username}/follow`, {});
  return response.data;
};
