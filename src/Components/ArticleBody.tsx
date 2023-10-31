import { Outlet, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient/queryClient";
import LikeButton from "./LikeButton";
import FollowButton from "./FollowButton";
import { useContext } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { addComment } from "../api/addComment";
import { getArticleBySlug } from "../api/getArticleBySlug";
import { Comment } from "../api/addComment";

function ArticleBody() {
  const { User } = useContext(LoggedInContext);
  const { slug } = useParams();

  type Inputs = {
    comment: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: addCommentMutation } = useMutation({
    mutationFn: (variables: { slug: string; comment: Comment }) =>
      addComment(variables.slug, variables.comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allComments"] });
    },
  });

  const { data: articleBySlug } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!slug) return;
    addCommentMutation({ slug, comment: { body: data.comment } });
  };

  return (
    <div className=" ">
      <div className="bg-gray-700 text-white p-5 sm:p-10 ">
        <h1 className="text-start break-words mb-4 text-2xl min-[370px]:text-3xl min-[470px]:text-4xl font-bold ">
          {articleBySlug?.article.title}
        </h1>
        <div className="flex flex-col sm:flex-row  justify-between  ">
          <div className="flex items-center">
            <div className="mr-4 rounded-full ">
              <img
                className=" min-w-[20px] max-w-[40px]"
                src={articleBySlug?.article.author.image}
                alt=""
              />
            </div>

            <div>
              <p>{articleBySlug?.article.author.username}</p>
              <p>{articleBySlug?.article.createdAt}</p>
            </div>
          </div>
          <div className="flex ">
            <LikeButton
              slug={articleBySlug?.article.slug}
              favoritesCount={articleBySlug?.article.favoritesCount}
              favorited={articleBySlug?.article.favorited}
            />
            {articleBySlug?.article.author.username === User.username && (
              <DeleteButton slug={slug} />
            )}
            {articleBySlug?.article.author.username === User.username && (
              <EditButton slug={slug} />
            )}
            {articleBySlug?.article.author.username !== User.username && (
              <FollowButton
                following={articleBySlug?.article.author.following}
                username={articleBySlug?.article.author.username}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="break-words mt-5 p-5">{articleBySlug?.article.body}</p>
      </div>
      <form
        className="flex flex-col justify-center items-center w-full px-3 sm:px-0 sm:w-[50%] mx-auto mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          cols={30}
          rows={5}
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
