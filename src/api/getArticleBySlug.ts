import axiosInstance from "../AxiosInstance/axiosInstance";

type Author = {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
};
type Article = {
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
type SingleArticleResponse = {
  article: Article;
};
export const getArticleBySlug = async (
  slug: string | undefined
): Promise<SingleArticleResponse> => {
  const response = await axiosInstance.get(`/articles/${slug}`);
  return response.data;
};
