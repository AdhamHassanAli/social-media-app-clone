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

type GetAllArticlesResponse = {
  articles: Article[];
};

export const getAllArticles = async (): Promise<GetAllArticlesResponse> => {
  const response = await axiosInstance.get("/articles");
  return response.data;
};
