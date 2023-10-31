import { useQuery } from "@tanstack/react-query";
import DeleteComment from "./DeleteComment";
import { useParams } from "react-router-dom";
import { getAllComments } from "../api/getAllComments";
function Comments() {
  const { slug } = useParams();

  const { data: allComments } = useQuery({
    queryKey: ["allComments"],
    queryFn: () => getAllComments(slug),
  });

  return (
    <div>
      <ul>
        {allComments?.comments.map((comment) => (
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
