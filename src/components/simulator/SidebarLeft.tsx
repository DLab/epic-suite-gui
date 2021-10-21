import { useState } from "react";

import SidebarClosed from "components/SidebarClosed";
import SidebarOpen from "components/SidebarOpen";

const SidebarLeft = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return isSidebarOpen ? (
    <SidebarOpen
      setIsSidebarOpen={setIsSidebarOpen}
      isSidebarOpen={isSidebarOpen}
    />
  ) : (
    <SidebarClosed
      setIsSidebarOpen={setIsSidebarOpen}
      isSidebarOpen={isSidebarOpen}
    />
  );
};

export default SidebarLeft;
