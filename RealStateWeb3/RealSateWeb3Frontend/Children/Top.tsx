import React from "react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
const Top = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return <div>{children}</div>;
};

export default Top;
