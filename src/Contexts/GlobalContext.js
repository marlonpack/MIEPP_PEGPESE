import React from "react";
import { ProviderStorage } from "./ProviderContext";
import { UserStorage } from "./UserContext";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  return (
    <GlobalContext.Provider value={{}}>
      <UserStorage>
        <ProviderStorage>
          {children}
        </ProviderStorage>
      </UserStorage>
    </GlobalContext.Provider>
  );
};
