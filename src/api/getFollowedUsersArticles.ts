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

type GetFollowedUsersArticlesResponse = {
  articles: Article[];
};

export const getFollowedUsersArticles =
  async (): Promise<GetFollowedUsersArticlesResponse> => {
    const response = await axiosInstance.get(`/articles/feed`);
    return response.data;
  };
