import axiosInstance from "../AxiosInstance/axiosInstance";

type UnFollowProfileResponse = {};
export const unFollowProfile = async (
  username: string | undefined
): Promise<UnFollowProfileResponse> => {
  const response = await axiosInstance.delete(
    `/profiles/${username}/follow`,
    {}
  );
  return response.data;
};
