import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Instance from "../AxiosInstance/Instance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LikeButton from "./LikeButton";
import FollowButton from "./FollowButton";
import { useContext } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useForm } from "react-hook-form";

function ArticleBody() {
  const queryClient = useQueryClient();
  const { User } = useContext(LoggedInContext);
  const { slug } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: AddComment } = useMutation({
    mutationFn: (comment) =>
      Instance.post(`/articles/${slug}/comments`, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "comments" });
    },
  });

  const fetchArticle = async () => {
    const response = await Instance.get(`/articles/${slug}`);
    return response.data.article;
  };

  const { data, isLoading, error } = useQuery(["article", slug], fetchArticle);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const onSubmit = (data) => {
    AddComment({
      comment: {
        body: data.comment,
      },
    });
  };
  return (
    <div className=" ">
      <div className="bg-gray-700 text-white p-5 sm:p-10 ">
        <h1 className="text-start break-words mb-4 text-2xl min-[370px]:text-3xl min-[470px]:text-4xl font-bold ">
          {data.title}
        </h1>
        <div className="flex flex-col sm:flex-row  justify-between  ">
          <div className="flex items-center">
            <div className="mr-4 rounded-full ">
              <img
                className=" min-w-[20px] max-w-[40px]"
                src={data.author.image}
                alt=""
              />
            </div>

            <div>
              <p>{data.author.username}</p>
              <p>{data.createdAt}</p>
            </div>
          </div>
          <div className="flex ">
            <LikeButton
              slug={data.slug}
              favoritesCount={data.favoritesCount}
              favorited={data.favorited}
            />
            {data.author.username === User.username && (
              <DeleteButton slug={slug} />
            )}
            {data.author.username === User.username && (
              <EditButton slug={slug} />
            )}
            {data.author.username !== User.username && (
              <FollowButton
                following={data.author.following}
                username={data.author.username}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="break-words mt-5 p-5">{data.body}</p>
      </div>
      <form
        className="flex flex-col justify-center items-center w-full px-3 sm:px-0 sm:w-[50%] mx-auto mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          cols="30"
          rows="5"
          placeholder="Write a comment"
          className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
          {...register("comment", { required: true })}
        ></textarea>
        {errors.comment && (
          <span className="mb-2 text-red-600">comment body is required</span>
        )}
        <button
          className="bg-[#5CB85C] text-white py-2 px-6 rounded block mx-auto"
          type="submit"
        >
          Post Comment
        </button>
      </form>
      <Outlet />
    </div>
  );
}
export default ArticleBody;
