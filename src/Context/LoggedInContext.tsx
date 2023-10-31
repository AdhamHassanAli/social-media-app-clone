import React, { createContext, useState, ReactNode } from "react";

type User = {
  username: string;
  email: string;
  password?: number;
  image: string;
  bio: string;
};

export type LoggedInContextType = {
  User: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const LoggedInContext = createContext<LoggedInContextType>({
  User: {
    username: "",
    email: "",
    password: 0,
    image: "",
    bio: "",
  },
  setUser: () => {},
});

type LoggedInProviderProps = {
  children: ReactNode;
};

export function LoggedInProvider({ children }: LoggedInProviderProps) {
  const [User, setUser] = useState<User>({
    username: "",
    email: "",
    password: 0,
    image: "",
    bio: "",
  });

  const contextValue: LoggedInContextType = {
    User: User,
    setUser,
  };

  return (
    <LoggedInContext.Provider value={contextValue}>
      {children}
    </LoggedInContext.Provider>
  );
}

export default LoggedInContext;
