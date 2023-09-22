import React from "react";
import { useMutation } from "@tanstack/react-query";
import Instance from "../AxiosInstance/Instance";
import { QueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function DeleteButton({ slug }) {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => Instance.delete(`/articles/${slug}`, {}),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["article", slug] });
      navigate("/profile");
    },
  });
  const handleDelete = () => {
    mutateDelete();
  };
  return (
    <button
      className=" border rounded-lg border-red-700 text-red-700  "
      onClick={handleDelete}
    >
      Delete Article
    </button>
  );
}

export default DeleteButton;
