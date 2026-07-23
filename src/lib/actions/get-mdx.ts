"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export async function getMdxContent(relativePath: string) {
  const filePath = path.join(process.cwd(), "src/content", relativePath);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);

  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm] },
  });

  return { mdxSource, frontmatter: data };
}
