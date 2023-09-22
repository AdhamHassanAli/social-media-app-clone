import { useState } from "react";
export default (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const bind = (e) => {
    setValue(e.target.value);
  };
  const reset = () => setValue("");
  return { value, bind, reset };
};
