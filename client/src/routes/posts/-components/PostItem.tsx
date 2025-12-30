import { Link } from "@tanstack/react-router";
import type { Post } from "../$postId/-services/fetch-post";

type PostItemProps = {
  post: Post;
};
export function PostItem({ post }: PostItemProps) {
  return (
    <li className="post">
      <Link to="/posts/$postId" params={{ postId: post.id }}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </Link>
    </li>
  );
}
