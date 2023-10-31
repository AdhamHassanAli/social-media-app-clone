import axiosInstance from "../AxiosInstance/axiosInstance";

type Author = {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
};

export type Article = {
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

type GetUserArticlesResponse = {
  articles: Article[];
};

export const getUserArticles = async (
  username: string
): Promise<GetUserArticlesResponse> => {
  const response = await axiosInstance.get(`/articles?author=${username}`);
  return response.data;
};
