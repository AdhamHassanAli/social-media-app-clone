import axiosInstance from "../AxiosInstance/axiosInstance";

type SignInResponse = {
  token: string;
};

type User = {
  email: string;
  password: number;
};

export const signIn = async (user: User): Promise<SignInResponse> => {
  const response = await axiosInstance.post(`/users/login`, user);
  return response.data;
};
