import { createContext, useState } from "react";

interface TabType {
  index: number;
  setIndex: (value: number) => void;
}

export const TabIndex = createContext<TabType>({
  index: 0,
  setIndex: () => {},
});

// eslint-disable-next-line react/prop-types
const TabContext: React.FC = ({ children }) => {
  const [index, setIndex] = useState(0);
  return (
    <TabIndex.Provider
      value={{
        index,
        setIndex,
      }}
    >
      {children}
    </TabIndex.Provider>
  );
};

export default TabContext;
