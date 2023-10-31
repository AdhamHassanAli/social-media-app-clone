import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient/queryClient";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../api/deleteArticle";

interface IProps {
  slug: string | undefined;
}

function DeleteButton({ slug }: IProps) {
  const navigate = useNavigate();
  const { mutate: deleteArticleMutation } = useMutation({
    mutationFn: () => deleteArticle(slug),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userArticles"] });
      navigate("/profile");
      console.log(data);
    },
  });
  const handleDelete = () => {
    deleteArticleMutation();
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
