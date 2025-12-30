import { createFileRoute } from "@tanstack/react-router";
import "./-styles/posts.css";
import { fetchPosts } from "./-services/fetch-posts";
import { PostItem } from "./-components/PostItem";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="posts-container">
      {/* <ul className="posts">
        {data.posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul> */}
    </div>
  );
}
