import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient/queryClient";
import { deleteComment } from "../api/deleteComment";

interface IProps {
  slug: string | undefined;
  id: number;
}

function DeleteComment({ id, slug }: IProps) {
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: (variables: { id: number; slug: string }) =>
      deleteComment(variables.id, variables.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allComments"] });
    },
  });

  const handleDeleteComment = () => {
    if (!slug) return;
    deleteCommentMutation({ id, slug });
  };

  return (
    <button className="text-red-700" onClick={handleDeleteComment}>
      Delete
    </button>
  );
}

export default DeleteComment;
