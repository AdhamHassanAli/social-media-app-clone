import React, { useState } from "react";
import Instance from "../AxiosInstance/Instance";
import { useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

function LikeButton({ slug, favoritesCount, favorited }) {
  const [Likes, setLikes] = useState(favoritesCount);
  const [Clicked, setClicked] = useState(favorited);
  const queryClient = new QueryClient();

  const { mutate: mutateLike } = useMutation({
    mutationFn: () => Instance.post(`/articles/${slug}/favorite`, {}),
    onSuccess: (data) => {
      setLikes(data.data.article.favoritesCount);
      setClicked(data.data.article.favorited);
      queryClient.invalidateQueries({ queryKey: ["article", slug] });
    },
  });

  const { mutate: mutateDisLike } = useMutation({
    mutationFn: () =>
      Instance.delete(
        `articles/${slug}/favorite`,

        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      ),
    onSuccess: (data) => {
      setLikes(data.data.article.favoritesCount);
      setClicked(data.data.article.favorited);
      queryClient.invalidateQueries({ queryKey: ["article", slug] });
    },
  });

  const likeArticle = () => {
    if (!favorited) {
      mutateLike();
    } else if (favorited) {
      mutateDisLike();
    }
  };

  return (
    <button
      className={`border  rounded-lg  hover:bg-[#5CB85C]  ${
        Clicked ? "bg-[#5CB85C]" : ""
      }`}
      onClick={likeArticle}
    >
      {Clicked ? "unlike" : "like"}
      {Likes} &#10084;
    </button>
  );
}

export default LikeButton;
