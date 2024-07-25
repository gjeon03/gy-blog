import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

interface PostData {
  id: string;
  category: string;
  title: string;
  date: string;
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), "_posts");

export function getAllPosts(): PostData[] {
  const categories = fs.readdirSync(postsDirectory);

  const allPosts = categories.flatMap((category) => {
    const categoryDir = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(categoryDir);

    return fileNames.map((fileName) => {
      const id = `${category}/${fileName.replace(/\.md$/, "")}`;
      const fullPath = path.join(categoryDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        id,
        category,
        ...matterResult.data,
      };
    });
  });

  return allPosts as PostData[];
}

interface PostId {
  params: {
    category: string;
    id: string;
  };
}

export function getAllPostIds(): PostId[] {
  const categories = fs.readdirSync(postsDirectory);
  const allPostIds = categories.flatMap((category) => {
    const categoryDir = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(categoryDir);

    return fileNames.map((fileName) => {
      return {
        params: {
          category,
          id: fileName.replace(/\.md$/, ""),
        },
      };
    });
  });
  return allPostIds;
}

interface PostData {
  id: string;
  category: string;
  title: string;
  date: string;
  contentHtml: string;
}

export async function getPostData(category: string, id: string) {
  const fullPath = path.join(postsDirectory, category, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    category,
    contentHtml,
    ...matterResult.data,
  } as PostData;
}
