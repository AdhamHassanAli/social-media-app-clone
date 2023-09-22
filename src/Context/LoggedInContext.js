import { React, createContext, useState } from "react";

const LoggedInContext = createContext();

export function LoggedInProvider(props) {
  const [User, setUser] = useState({});

  return (
    <LoggedInContext.Provider value={{ User, setUser }}>
      {props.children}
    </LoggedInContext.Provider>
  );
}
export default LoggedInContext;
