"use client";

import { useEffect, useState } from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { getMdxContent } from "@/lib/actions/get-mdx";
import { mdxComponents } from "@/lib/mdx-components";
import Loader from "@/components/loader";

const WindowLayout = ({ doc_path }: { doc_path: string }) => {
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    getMdxContent(doc_path).then((res) => {
      setSource(res.mdxSource);
    });
  }, []);

  if (!source)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <article className="prose prose-headings:font-normal prose-headings:tracking-tighter prose-code:font-normal prose-headings:text-secondary prose-code:text-secondary prose-p:text-secondary prose-code:tracking-tight prose-a:text-primary prose-a:no-underline prose-a:bg-primary/10 max-w-none prose-h1:text-[40px] prose-h1:leading-[60px] prose-h2:text-[36px] prose-h2:leading-[55px] prose-h3:text-[32px] prose-h3:leading-[50px] prose-h4:text-[30px] prose-h4:leading-[45px] prose-h5:text-[26px] prose-h5:leading-[40px] prose-h6:text-[24px] prose-h6:leading-[35px] prose-p:text-[24px] prose-p:leading-[35px]">
      <MDXRemote {...source} components={mdxComponents} />
    </article>
  );
};

export default WindowLayout;
