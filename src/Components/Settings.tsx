import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import useInputState from "../Hooks/useInputState";
import { useMutation } from "@tanstack/react-query";
import { setSettings } from "../api/settings";
import { useNavigate } from "react-router-dom";
function Settings() {
  const { User, setUser } = useContext(LoggedInContext);
  const { value: image, bind: bindImage } = useInputState(User.image);
  const { value: username, bind: bindUsername } = useInputState(User.username);
  const { value: bio, bind: bindBio } = useInputState(User.bio);
  const { value: email, bind: bindEmail } = useInputState(User.email);
  const storedPassword = localStorage.getItem("password");
  const passwordValue = storedPassword !== null ? storedPassword : "";
  const { value: password, bind: bindPassword } = useInputState(passwordValue);
  const navigate = useNavigate();

  type Inputs = {
    username: string;
    userimage: string;
    bio: string;
    email: string;
    password: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: settingsMutation, isError } = useMutation({
    mutationFn: setSettings,
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/profile");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    settingsMutation({
      email: data.email,
      password: data.password,
      username: data.username,
      bio: data.bio,
      image: data.userimage,
    });
  };

  return (
    <div className="mt-5">
      <div className="container">
        <h1 className="text-center font-bold text-3xl ">Your Settings</h1>
        <form
          className="flex flex-col justify-center items-center w-full px-7 sm:px-0 sm:w-[50%]  mx-auto mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isError && <div className="text-red-700">Something went wrong</div>}
          <input
            type="text"
            placeholder="userimage"
            value={image}
            className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
            {...register("userimage")}
            onChange={bindImage}
          />
          <input
            type="text"
            placeholder="userName"
            value={username}
            className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
            {...register("username")}
            onChange={bindUsername}
          />
          <textarea
            cols={30}
            rows={10}
            placeholder="my bio "
            value={bio}
            className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
            {...register("bio")}
            onChange={bindBio}
          ></textarea>
          <input
            type="text"
            placeholder="email"
            value={email}
            className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
            {...register("email")}
            onChange={bindEmail}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
            {...register("password")}
            onChange={bindPassword}
          />
          <button
            className="bg-[#5CB85C] text-white py-2 px-6 rounded block mx-auto"
            type="submit"
          >
            Update Settings
          </button>
        </form>

        <button
          className="bg-white border-red-700 text-red-700 py-2 px-6 rounded block mx-auto"
          onClick={() => {
            localStorage.clear();
            // window.location = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
