import axiosInstance from "../AxiosInstance/axiosInstance";
type Author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};
type LikeArticleResponse = {
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

export const likeArticle = async (
  slug: string | undefined
): Promise<LikeArticleResponse> => {
  const response = await axiosInstance.post(`/articles/${slug}/favorite`, {});
  return response.data;
};
