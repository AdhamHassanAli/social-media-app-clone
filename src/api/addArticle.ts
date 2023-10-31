import axiosInstance from "../AxiosInstance/axiosInstance";

type AddArticleResponse = {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
};

type Article = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export const addArticle = async (
  article: Article
): Promise<AddArticleResponse> => {
  const response = await axiosInstance.post(`/articles`, { article });
  return response.data;
};
