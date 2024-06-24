import { createContext } from "react";

import { User } from "../types/User";

type UserContextProps = {
  userData: User | undefined;
  updateUser: (token: string) => void;
};

const initialContextValue = {
  userData: undefined,
  updateUser: () => {},
};

const UserContext = createContext<UserContextProps>(initialContextValue);

export default UserContext;
