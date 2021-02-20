import React from "react";
import { MediaStorage } from "./MediaContext";
import { ProviderStorage } from "./ProviderContext";
import { ScreenStorage } from "./ScreenContext";
import { UserStorage } from "./UserContext";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  return (
    <GlobalContext.Provider value={{}}>
      <UserStorage>
        <ProviderStorage>
          <ScreenStorage>
          <MediaStorage>
            {children}
            </MediaStorage>
          </ScreenStorage>
        </ProviderStorage>
      </UserStorage>
    </GlobalContext.Provider>
  );
};
