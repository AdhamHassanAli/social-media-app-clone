import axiosInstance from "../AxiosInstance/axiosInstance";

type DeleteCommentResponse = {};

export const deleteComment = async (
  id: number,
  slug: string | undefined
): Promise<DeleteCommentResponse> => {
  const response = await axiosInstance.delete(
    `/articles/${slug}/comments/${id}`,
    {}
  );
  return response.data;
};
