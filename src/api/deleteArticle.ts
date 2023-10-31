import axiosInstance from "../AxiosInstance/axiosInstance";

type DeleteArticleResponse = {};

export const deleteArticle = async (
  slug: string | undefined
): Promise<DeleteArticleResponse> => {
  const response = await axiosInstance.delete(`/articles/${slug}`, {});
  return response.data;
};
