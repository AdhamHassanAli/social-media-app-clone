import Article from "./SingleArticle";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { getAllArticles } from "../api/getAllArticles";

function GlobalFeed() {
  const { data: allArticles } = useQuery({
    queryKey: ["allArticles"],
    queryFn: getAllArticles,
  });
  return (
    <>
      <ul className="">
        {allArticles?.articles?.map((article) => (
          <Article article={article} />
        ))}
      </ul>
      {/* 
      <ReactPaginate
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

export default GlobalFeed;
