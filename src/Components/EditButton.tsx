interface IProps {
  slug: string | undefined;
}

function EditButton({ slug }: IProps) {
  return (
    <button className="border  rounded-lg  hover:bg-[#5CB85C] ">
      edit article
    </button>
  );
}

export default EditButton;
