import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LoggedInContext from "../Context/LoggedInContext";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/signIn";

function SignIn() {
  const { setUser } = useContext(LoggedInContext);
  const [errs, setErrs] = useState<string[]>([]);

  const { mutate: signInMutation, isError } = useMutation({
    mutationFn: signIn,

    onSuccess: (data: any) => {
      setUser(data.data.user);
      setErrs([]);
      localStorage.clear();
      localStorage.setItem("token", data.data.user.token);
      localStorage.setItem("password", data.data.user.password);
      // window.location = "/";
    },

    onError: (err: any) => {
      const errors = err.response.data.errors;
      let text = [];
      for (const er in errors) {
        text.push(`${er}: ${errors[er][0]} `);
      }
      setErrs(text);
    },
  });

  type Inputs = {
    email: string;
    password: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInMutation({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="mt-32 ">
      <div className="text-center ">
        <h1 className="font-bold text-4xl text-[#5CB85C] mb-4">Sign in</h1>
        <Link to="/SignUp">create an account?</Link>
      </div>

      <form
        className="flex flex-col justify-center items-center w-[50%] mx-auto mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isError && <div className="mb-2 text-red-600">{errs}</div>}

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

export default SignIn;
