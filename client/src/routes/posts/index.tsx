import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import "./-styles/posts.css";
import { fetchPosts } from "./-services/fetch-posts";

type RouteSearch = {
  page: number;
};

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): RouteSearch => {
    return {
      page: search?.page ? Number(search.page) : 1,
    };
  },
  loaderDeps({ search }) {
    return {
      page: search.page,
    };
  },
  async loader({ deps: { page }, abortController }) {
    const postsResponse = await fetchPosts(page, abortController);
    return postsResponse;
  },
  pendingMs: 0,
  pendingComponent() {
    return <div>게시글 목록 로딩중...</div>;
  },
});

function RouteComponent() {
  const { posts, totalPages } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <ul className="posts">
        {posts.map((post) => (
          <li className="post" key={post.id}>
            <Link to="/posts/$postId" params={{ postId: post.id }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <ol style={{ listStyle: "none", display: "flex", gap: 4 }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => {
                navigate({
                  to: "/posts",
                  search: {
                    page: index + 1,
                  },
                });
              }}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
