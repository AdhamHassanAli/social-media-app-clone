import { useContext } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import { useQuery } from "@tanstack/react-query";
import Article from "./SingleArticle";
import { getUserArticles } from "../api/getUserArticles";
function UserArticles() {
  const { User } = useContext(LoggedInContext);
  const { username } = User;

  const { data, isLoading, error } = useQuery({
    queryKey: ["userArticles"],
    queryFn: () => getUserArticles(username),
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
