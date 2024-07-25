import { getAllPosts } from "@/utils/posts";
import Link from "next/link";

export default async function Home() {
  const allPosts = getAllPosts();
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));

  return (
    <div>
      <h1>My Blog</h1>
      {categories.map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {allPosts
              .filter((post) => post.category === category)
              .map(({ id, title, date }) => (
                <li key={id}>
                  <Link href={`/${id}`}>{title}</Link>
                  <br />
                  <small>{date}</small>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
