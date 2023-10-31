import { useState } from "react";
export default (initialVal: string) => {
  const [value, setValue] = useState(initialVal);
  const bind = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };
  const reset = () => setValue("");
  return { value, bind, reset };
};
