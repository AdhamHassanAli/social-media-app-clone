import axiosInstance from "../AxiosInstance/axiosInstance";

type Author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};
type DisLikeArticleResponse = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
};

export const disLikeArticle = async (
  slug: string | undefined
): Promise<DisLikeArticleResponse> => {
  const response = await axiosInstance.delete(`/articles/${slug}/favorite`, {});
  return response.data;
};
