import React from "react";
import Article from "./Article";
import { useQuery } from "@tanstack/react-query";
import Instance from "../AxiosInstance/Instance";
import ReactPaginate from "react-paginate";
function YourFeed() {
  let offset = 0;
  const fetchFollowedArticles = async () => {
    const response = await Instance.get(
      `/articles/feed/?limit=10&offset=${offset}`
    );
    return response.data.articles;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["yourfeed"],
    queryFn: fetchFollowedArticles,
  });
  if (isLoading) return <div className="w-[50%] mx-auto">loading...</div>;
  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  const handlePageClick = (data) => {
    offset = data.selected * 10;
    refetch();
  };

  return (
    <>
      <ul className="">
        {data?.map((article) => (
          <Article article={article} />
        ))}
      </ul>

      <ReactPaginate
        className="flex justify-around  mt-7 p-5 text-lg w-[50%] mx-auto"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default YourFeed;
