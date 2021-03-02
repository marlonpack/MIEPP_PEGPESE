import React from "react";
import { MediaStorage } from "./MediaContext";
import { ProductStorage } from "./ProductContext";
import { ProviderStorage } from "./ProviderContext";
import { ScreenStorage } from "./ScreenContext";
import { UserStorage } from "./UserContext";
import { TimelineStorage } from "./TimelineContext";
import { ShopTimelineStorage } from "./ShopTimelinecontext";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  return (
    <GlobalContext.Provider value={{}}>
      <UserStorage>
        <ProviderStorage>
          <ScreenStorage>
            <MediaStorage>
              <TimelineStorage>
                <ShopTimelineStorage>
                  <ProductStorage>{children}</ProductStorage>
                </ShopTimelineStorage>
              </TimelineStorage>
            </MediaStorage>
          </ScreenStorage>
        </ProviderStorage>
      </UserStorage>
    </GlobalContext.Provider>
  );
};
