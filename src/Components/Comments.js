import React from "react";
import Instance from "../AxiosInstance/Instance";
import { useQuery, useMutation } from "@tanstack/react-query";
import DeleteComment from "./DeleteComment";
import { useParams } from "react-router-dom";

function Comments() {
  const { slug } = useParams();
  const fetchComments = async () => {
    const response = await Instance.get(`/articles/${slug}/comments `);
    return response.data.comments;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });
  console.log(data);
  if (isLoading) return <div className="w-[50%] mx-auto">loading...</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <ul>
        {data.map((comment) => (
          <li
            className="w-full  sm:w-[50%] mx-auto mt-7 border"
            key={comment.id}
          >
            <div className="">
              <p className=" p-5"> {comment.body}</p>
              <div className="flex flex-col justify-between items-center p-3 border-t">
                <div className="flex flex-col items-center   ">
                  <img
                    className="w-[25px] rounded-full mr-3 "
                    src={comment.author.image}
                    alt=""
                  />
                  <p className="mr-3"> {comment.author.username}</p>
                  <p> {comment.createdAt}</p>
                </div>
                <DeleteComment id={comment.id} slug={slug} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
