"use client";

import { routes } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="sticky top-0 backdrop-blur-xl flex gap-x-2.5 bg-primary/[1%] border-b border-primary/10 px-5 pt-5 select-none z-50">
      <Link
        href={routes.default}
        className="flex items-center gap-x-2.5 pb-2.5 cursor-pointer"
      >
        <div>
          <Image
            src="/icon.png"
            alt="logo"
            loading="lazy"
            width={30}
            height={30}
            className="aspect-square"
          />
        </div>

        <div className="text-xl leading-2">
          Dastyare Social
          <span className="text-sm">
            &nbsp;—/ Raise Visibility, Build Brand, Grow SALES
          </span>
        </div>
      </Link>

      <div className="pb-2.5"></div>
    </div>
  );
};

export default Header;
