import React from "react";
import { useContext } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import { useQuery } from "@tanstack/react-query";
import Instance from "../AxiosInstance/Instance";
import Article from "./Article";
function UserArticles() {
  const { User } = useContext(LoggedInContext);
  const { username } = User;
  const fetchUserArticles = async () => {
    const response = await Instance(`/articles?author=${username}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userarticles"],
    queryFn: fetchUserArticles,
  });
  return (
    <>
      <ul className="px-7">
        {data?.articles.map((article) => (
          <Article article={article} />
        ))}
      </ul>
      {isLoading && <div className="text-center">loading...</div>}
      {error && <div className="text-center">Something went wrong </div>}
    </>
  );
}

export default UserArticles;
