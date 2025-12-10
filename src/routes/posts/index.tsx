import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import "./-styles/posts.css";

const posts = [
  { id: "1", title: "게시글 1" },
  { id: "2", title: "게시글 2" },
  { id: "3", title: "게시글 3" },
  { id: "4", title: "게시글 4" },
  { id: "5", title: "게시글 5" },
  { id: "6", title: "게시글 6" },
  { id: "7", title: "게시글 7" },
  { id: "8", title: "게시글 8" },
  { id: "9", title: "게시글 9" },
  { id: "10", title: "게시글 10" },
];

type RouteSearch = {
  page: number;
};

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): RouteSearch => {
    console.log(search.page);
    return {
      page: search?.page ? Number(search.page) : 1,
    };
  },
});

const PAGE_SIZE = 3;

function RouteComponent() {
  const { page } = useSearch({ from: "/posts/" });
  const navigate = useNavigate();

  return (
    <div>
      <ul className="posts">
        {posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((post) => (
          <li className="post" key={post.id}>
            <Link to="/posts/$postId" params={{ postId: post.id }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <ol style={{ listStyle: "none", display: "flex", gap: 4 }}>
        {Array.from({ length: Math.ceil(posts.length / PAGE_SIZE) }).map(
          (_, index) => (
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
          )
        )}
      </ol>
    </div>
  );
}
