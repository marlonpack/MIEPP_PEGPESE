import React from "react";
import { MediaStorage } from "./MediaContext";
import { ProductStorage } from "./ProductContext";
import { ProviderStorage } from "./ProviderContext";
import { ScreenStorage } from "./ScreenContext";
import { UserStorage } from "./UserContext";
import { TimelineStorage } from "./TimelineContext";
import { ShopTimelineStorage } from "./ShopTimelinecontext";
import { PreviewStorage } from "./PreviewContext";
import { RecordStorage } from "./RecordContext";
import { StatusStorage } from "./StatusContext";

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
                  <PreviewStorage>
                    <RecordStorage>
                      <StatusStorage>
                        <ProductStorage>{children}</ProductStorage>
                      </StatusStorage>
                    </RecordStorage>
                  </PreviewStorage>
                </ShopTimelineStorage>
              </TimelineStorage>
            </MediaStorage>
          </ScreenStorage>
        </ProviderStorage>
      </UserStorage>
    </GlobalContext.Provider>
  );
};
