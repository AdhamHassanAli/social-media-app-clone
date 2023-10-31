import axiosInstance from "../AxiosInstance/axiosInstance";

type CommentAuthor = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: CommentAuthor;
};

type GetAllCommentsResponse = {
  comments: Comment[];
};

export const getAllComments = async (
  slug: string | undefined
): Promise<GetAllCommentsResponse> => {
  const response = await axiosInstance.get(`/article${slug}/comments`);
  return response.data;
};
