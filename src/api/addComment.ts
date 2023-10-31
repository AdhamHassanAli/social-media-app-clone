import axiosInstance from "../AxiosInstance/axiosInstance";

type AddCommentResponse = {
  comment: {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
};
export type Comment = {
  body: string;
};

export const addComment = async (
  slug: string | undefined,
  comment: Comment
): Promise<AddCommentResponse> => {
  const response = await axiosInstance.post(`/articles/${slug}/comments`, {
    comment,
  });
  return response.data;
};
