import React from "react";
import Instance from "../AxiosInstance/Instance";
import useInputState from "../Hooks/useInputState";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Editor() {
  const navigate = useNavigate();
  const { value: title, bind: bindTitle } = useInputState("");
  const { value: description, bind: bindDescription } = useInputState("");
  const { value: body, bind: bindBody } = useInputState("");
  const { value: tags, bind: bindTags } = useInputState("");

  const { mutate: mutateArticle, isError } = useMutation({
    mutationFn: (article) => Instance.post("articles", article),
    onSuccess: (data) => {
      console.log("article published");
      navigate(`/ArticleBody/${data.data.article.slug}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    mutateArticle({
      article: {
        title,
        description,
        body,
        tagList: tags.split(" "),
      },
    });
  };

  return (
    <div className="mt-5">
      <form
        className="flex flex-col justify-center items-center w-full px-7 sm:px-0 sm:w-[50%] mx-auto mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isError && (
          <div className="text-red-700">Article title must be unique</div>
        )}
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
          {...register("title", { required: true })}
          onChange={bindTitle}
        />
        {errors.title && (
          <span className="mb-2 text-red-600">title is required</span>
        )}
        <input
          type="text"
          placeholder="Whats this article about"
          value={description}
          className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
          {...register("about", { required: true })}
          onChange={bindDescription}
        />
        {errors.about && (
          <span className="mb-2 text-red-600">description is required</span>
        )}
        <textarea
          cols="30"
          rows="10"
          placeholder="Write your article"
          value={body}
          className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
          {...register("body", { required: true })}
          onChange={bindBody}
        ></textarea>
        {errors.body && (
          <span className="mb-2 text-red-600">Article body is required</span>
        )}
        <input
          type="text"
          placeholder="Enter tags"
          value={tags}
          className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
          {...register("tags")}
          onChange={bindTags}
        />
        <button
          className="bg-[#5CB85C] text-white py-2 px-6 rounded block mx-auto"
          type="submit"
        >
          publish Article
        </button>
      </form>
    </div>
  );
}

export default Editor;
