"use client";

import { usePathname } from "next/navigation";
import { useEffect, type RefObject } from "react";

export function useResetScrollOnNavigation(ref: RefObject<HTMLElement | null>) {
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [pathname, ref]);
}