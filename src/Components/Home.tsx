import { useState, useContext, useEffect } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import { Link, Outlet } from "react-router-dom";

function Home() {
  const [feed, setfeed] = useState<string>("globalFeed");
  const { User } = useContext(LoggedInContext);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setisLoggedIn(true);
    }
  }, [User]);

  return (
    <div className="mt-5 p-7">
      <ul className="flex mb-4 border-b sm:w-full md:max-w-[60%] mx-auto">
        <li
          onClick={() => setfeed("globalFeed")}
          className={
            feed === "globalFeed" ? "text-[#5CB85C] mr-3 mb-3" : "text-black"
          }
        >
          <Link to="GlobalFeed">GlobalFeed</Link>
        </li>
        {isLoggedIn && (
          <li
            onClick={() => setfeed("yourFeed")}
            className={
              feed === "yourFeed" ? "text-[#5CB85C] ml-3 mb-3 " : "text-black"
            }
          >
            <Link to="YourFeed">YourFeed</Link>
          </li>
        )}
      </ul>
      <Outlet />
    </div>
  );
}

export default Home;
