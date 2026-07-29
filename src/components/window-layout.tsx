import type { ReactNode } from "react";

const WindowLayout = ({ children }: { children: ReactNode }) => {
  return <div className="w-full overflow-x-hidden">{children}</div>;
};

export default WindowLayout;
