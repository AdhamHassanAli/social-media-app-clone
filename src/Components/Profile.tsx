import React from "react";
import { useState, useContext } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  const { User } = useContext(LoggedInContext);
  const { image, bio, username } = User;
  const [feed, setFeed] = useState<string>("userArticles");
  return (
    <div className="mt-5">
      <div className="text-center bg-gray-700 text-white py-5 mb-5">
        <img className="block mx-auto mb-3" src={image} alt="" />
        <h1>{username}</h1>
        <p>{bio}</p>
      </div>
      <ul className="flex mb-4 border-b sm:w-full px-7  md:max-w-[60%] mx-auto  ">
        <li
          onClick={() => setFeed("userArticles")}
          className={
            feed === "userArticles"
              ? "text-[#5CB85C] mr-3 mb-3"
              : "text-black mr-3 mb-3"
          }
        >
          <Link to="UserArticles">Your Articles</Link>
        </li>

        <li
          onClick={() => setFeed("favoritedArticles")}
          className={
            feed === "favoritedArticles"
              ? "text-[#5CB85C] ml-3 mb-3 "
              : "text-black  ml-3 mb-3"
          }
        >
          <Link to="FavoritedArticles">Favorited Articles</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Profile;
