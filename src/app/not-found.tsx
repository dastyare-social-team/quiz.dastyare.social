import { Button } from "@/components/button";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Not Found",
  };
}

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-5">
      <div className="text-lg text-center max-w-xs">
        Are You Lost — Seems There&apos;s Not What You&apos;re Looking For —
        Back To Home
      </div>
      <Link href="https://dastyare.social">
        <Button className="text-sm md:text-sm">
          Get Back To Dastyare Social
        </Button>
      </Link>
    </div>
  );
}
