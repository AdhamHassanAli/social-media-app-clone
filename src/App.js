import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import { useContext } from "react";
import LoggedInContext from "./Context/LoggedInContext";
import Instance from "./AxiosInstance/Instance";
import { useEffect } from "react";
import SignIn from "./Components/SignIn";
import Editor from "./Components/Editor";
import Settings from "./Components/Settings";
import ArticleBody from "./Components/ArticleBody";
import Profile from "./Components/Profile";
import Comments from "./Components/Comments";
import GlobalFeed from "./Components/GlobalFeed";
import YourFeed from "./Components/YourFeed";
import UserArticles from "./Components/UserArticles";
import FavoritedArticles from "./Components/FavoritedArticles";
function App() {
  const { User, setUser } = useContext(LoggedInContext);
  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.hasOwnProperty("token")) {
        const res = await Instance("/user");
        setUser(res.data.user);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<GlobalFeed />} />
          <Route path="/GlobalFeed" element={<GlobalFeed />} />
          <Route path="/YourFeed" element={<YourFeed />} />
        </Route>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ArticleBody/:slug" element={<ArticleBody />}>
          <Route index element={<Comments />} />
          <Route path="/ArticleBody/:slug/comments" element={<Comments />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route index element={<UserArticles />} />
          <Route path="/profile/UserArticles" element={<UserArticles />} />
          <Route
            path="/profile/FavoritedArticles"
            element={<FavoritedArticles />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
