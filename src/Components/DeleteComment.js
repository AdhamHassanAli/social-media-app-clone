import React from "react";
import { useMutation } from "@tanstack/react-query";
import Instance from "../AxiosInstance/Instance";
import { useQueryClient } from "@tanstack/react-query";
function DeleteComment({ id, slug }) {
  const queryClient = useQueryClient();
  const deleteComment = () => {
    DeleteComment();
  };

  const { mutate: DeleteComment } = useMutation({
    mutationFn: () => Instance.delete(`/articles/${slug}/comments/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  return (
    <button className="text-red-700" onClick={deleteComment}>
      Delete
    </button>
  );
}

export default DeleteComment;
