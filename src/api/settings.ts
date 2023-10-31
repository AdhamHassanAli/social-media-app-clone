import axiosInstance from "../AxiosInstance/axiosInstance";

type SettingsResponse = {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
};

type User = {
  image: string;
  username: string;
  bio: string;
  email: string;
  password: number;
};

export const setSettings = async (user: User): Promise<SettingsResponse> => {
  const response = await axiosInstance.put(`/user`, { user });
  return response.data;
};
