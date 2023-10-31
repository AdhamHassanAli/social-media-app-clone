import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import { Article } from "../api/getAllArticles";
interface IProps {
  article: Article;
}
function SingleArticle({ article }: IProps) {
  return (
    <li
      key={article.slug}
      className="sm:w-full md:max-w-[60%] mx-auto mb-10 border-b "
    >
      <div className="max-[380px]:flex-col max-[380px]:items-start flex flex-row justify-between items-center">
        <div className="flex items-center mb-2">
          <Link to="/UserArticles">
            <img
              className="mr-2 rounded-full max-w-[40px] min-w-[20px] "
              src={article.author.image}
              alt=""
            />
          </Link>
          <div>
            <Link to="/UserArticles">{article.author.username}</Link>
            <p>{article.createdAt}</p>
          </div>
        </div>

        <LikeButton
          slug={article.slug}
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
        />
      </div>
      <p className="mb-2 font-bold text-black ">{article.title}</p>
      <p className="mb-2 text-gray-400">{article.description}</p>
      <Link to={`/ArticleBody/${article.slug}`}>readmore...</Link>
    </li>
  );
}

export default SingleArticle;
