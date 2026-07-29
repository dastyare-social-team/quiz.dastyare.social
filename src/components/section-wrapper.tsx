"use client";

import { cn } from "@/lib/utils";

const SectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center gap-y-10 gap-x-15 border-t-2 border-primary/5 pt-8 pb-8 md:pt-16 md:pb-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
