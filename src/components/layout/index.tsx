import { Box } from "@chakra-ui/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouter } from "next/router";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Box>{children}</Box>
      {router.pathname !== "/" && <Footer />}
    </>
  );
};

export default Layout;
