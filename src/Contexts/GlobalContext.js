import React from "react";
import { MediaStorage } from "./MediaContext";
import { ProviderStorage } from "./ProviderContext";
import { UserStorage } from "./UserContext";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  return (
    <GlobalContext.Provider value={{}}>
      <UserStorage>
        <ProviderStorage>
          <MediaStorage>{children}</MediaStorage>
        </ProviderStorage>
      </UserStorage>
    </GlobalContext.Provider>
  );
};
