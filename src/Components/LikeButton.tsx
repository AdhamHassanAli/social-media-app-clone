import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeArticle } from "../api/likeArticle";
import { disLikeArticle } from "../api/disLikeArticle";
import { queryClient } from "../queryClient/queryClient";
interface IProps {
  slug: string | undefined;
  favoritesCount: number | undefined;
  favorited: boolean | undefined;
}
function LikeButton({ slug, favoritesCount, favorited }: IProps) {
  const { mutate: likeMutation } = useMutation({
    mutationFn: () => likeArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allArticles"] });
    },
  });

  const { mutate: disLikeMutation } = useMutation({
    mutationFn: () => disLikeArticle(slug),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allArticles"] });
    },
  });

  const handleLike = () => {
    if (!favorited) {
      likeMutation();
    } else if (favorited) {
      disLikeMutation();
    }
  };

  return (
    <button
      className={`border  rounded-lg  hover:bg-[#5CB85C]  ${
        favorited ? "bg-[#5CB85C]" : ""
      }`}
      onClick={handleLike}
    >
      {favorited ? "unlike" : "like"}
      {favoritesCount} &#10084;
    </button>
  );
}

export default LikeButton;
