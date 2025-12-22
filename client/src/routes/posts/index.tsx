import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import "./-styles/posts.css";
import { fetchPosts, postsOptions } from "./-services/fetch-posts";
import { useSuspenseQuery } from "@tanstack/react-query";

type RouteSearch = {
  page: number;
};

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  pendingComponent() {
    return <div>게시글 목록 로딩중... in pendingComponent</div>;
  },
  errorComponent() {
    return <div>게시글 목록 로딩 실패: in errorComponent</div>;
  },
  validateSearch: (search: Record<string, unknown>): RouteSearch => {
    return {
      page: search?.page ? Number(search.page) : 1,
    };
  },
  beforeLoad() {
    return {
      bar: 10,
    };
  },
  loaderDeps(opts) {
    return {
      page: opts.search.page,
    };
  },
  async loader({ context, deps }) {
    return context.queryClient.ensureQueryData(postsOptions(deps.page));
  },
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const { data } = useSuspenseQuery({
    queryKey: ["posts", { page }],
    queryFn({ signal }) {
      return fetchPosts(page, signal);
    },
    retry(failureCount, error) {
      if (error.message.includes("페이지를 찾을 수 없습니다.")) {
        return false;
      }
      if (failureCount >= 3) {
        return false;
      }
      return true;
    },
  });
  const navigate = useNavigate();

  return (
    <div className="posts-container">
      <ul className="posts">
        {data.posts.map((post) => (
          <li className="post" key={post.id}>
            <Link to="/posts/$postId" params={{ postId: post.id }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <ol style={{ listStyle: "none", display: "flex", gap: 4 }}>
        {Array.from({ length: data.totalPages }).map((_, index) => (
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
      {/* <Await
        promise={recommendedPostsResponsePromise}
        fallback={<div>추천 게시글 로딩중...</div>}
      >
        {(recommendedPosts) => (
          <ul className="recommended-posts">
            {recommendedPosts.posts.map((post) => (
              <li className="post" key={post.id}>
                <Link to="/posts/$postId" params={{ postId: post.id }}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Await> */}
    </div>
  );
}
