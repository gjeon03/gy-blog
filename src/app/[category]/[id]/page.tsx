import { getPostData, getAllPostIds } from "@/utils/posts";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    category: string;
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, id } = params;
  const postData = await getPostData(category, id);

  if (!postData) {
    notFound();
  }

  return (
    <div>
      <h1>{postData.title}</h1>
      <div>{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}
