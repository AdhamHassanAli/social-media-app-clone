import React from "react";
import SingleArticle from "./SingleArticle";
import { useQuery } from "@tanstack/react-query";
import Instance from "../AxiosInstance/axiosInstance";
import ReactPaginate from "react-paginate";
import { getFollowedUsersArticles } from "../api/getFollowedUsersArticles";
function YourFeed(): JSX.Element {
  // let offset = 0;
  // const fetchFollowedArticles = async () => {
  //   const response = await Instance.get(
  //     `/articles/feed/?limit=10&offset=${offset}`
  //   );
  //   return response.data.articles;
  // };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["yourfeed"],
    queryFn: getFollowedUsersArticles,
  });
  if (isLoading) return <div className="w-[50%] mx-auto">loading...</div>;
  if (error) return <div>An error has occurred </div>;

  // const handlePageClick = (data) => {
  //   offset = data.selected * 10;
  //   refetch();
  // };

  return (
    <>
      <ul>
        {data?.articles.map((article) => (
          <SingleArticle article={article} />
        ))}
      </ul>

      {/* <ReactPaginate
        className="flex justify-around  mt-7 p-5 text-lg w-[50%] mx-auto"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      /> */}
    </>
  );
}

export default YourFeed;
