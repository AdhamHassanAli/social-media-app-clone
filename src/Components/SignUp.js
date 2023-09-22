import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import { useMutation } from "@tanstack/react-query";
import Instance from "../AxiosInstance/Instance";
function SignUp() {
  const { setUser } = useContext(LoggedInContext);
  const [errs, seterrs] = useState([]);

  const SignUp = useMutation({
    mutationFn: (user) => Instance.post("/users", user),
    onSuccess: (data) => {
      setUser(data.data.user);
      seterrs([]);
      localStorage.setItem("token", data.data.user.token);
      window.location = "/";
      console.log(data);
    },
    onError: (err) => {
      const errors = err.response.data.errors;
      let text = [];
      for (const er in errors) {
        text.push(`${er}: ${errors[er][0]} `);
      }
      seterrs(text);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    SignUp.mutate({
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <div className="mt-32 ">
      <div className="text-center ">
        <h1 className="font-bold text-4xl text-[#5CB85C] mb-4">Sign up</h1>
        <Link to="/SignIn">already have an account?</Link>
      </div>

      <form
        className="flex flex-col justify-center items-center w-[50%] mx-auto mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {SignUp.isError && <div className="mb-2 text-red-600">{errs}</div>}
        <input
          className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
          placeholder="username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="mb-2 text-red-600">username is required</span>
        )}

        <input
          className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="mb-2 text-red-600">email is required</span>
        )}
        <input
          type="password"
          className="mb-5 w-full p-3 outline-[#5CB85C] border border-solid border-[#5CB85C] rounded "
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="mb-2 text-red-600">password is required</span>
        )}

        <input
          className="bg-[#5CB85C] text-white py-2 px-6 rounded"
          type="submit"
        />
      </form>
    </div>
  );
}

export default SignUp;
