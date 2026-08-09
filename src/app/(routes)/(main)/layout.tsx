"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [pageHeight, setPageHeight] = useState<number | null>(null);

  const updateOffsets = useCallback(() => {
    requestAnimationFrame(() => {
      setPageHeight(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    updateOffsets();
    window.addEventListener("resize", updateOffsets);
    return () => window.removeEventListener("resize", updateOffsets);
  }, [updateOffsets]);

  return (
    <div
      ref={pageRef}
      style={{ height: pageHeight !== null ? `${pageHeight}px` : "100vh" }}
      className="px-5 py-5 sm:px-7.5 sm:py-7.5 h-full outline-0"
    >
      <div className="border-2 border-primary/5 bg-white/10 overflow-y-scroll none-scroll-bar flex flex-col flex-1 w-full h-full">
        <Header />

        <div className="pt-15 px-6.25 sm:pt-20 sm:px-12.5 flex flex-col items-center flex-1 w-full h-full">
          <div className="lg:max-w-5xl w-full h-full">
            {children}

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
