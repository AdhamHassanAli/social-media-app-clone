import axiosInstance from "../AxiosInstance/axiosInstance";

type SignUpResponse = {
  token: string;
};

type User = {
  username: string;
  email: string;
  password: number;
};

export const signUp = async (user: User): Promise<SignUpResponse> => {
  const response = await axiosInstance.post(`/users`, user);
  return response.data;
};
