import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => {
          router.history.back();
        }}
      >
        뒤로 가기
      </button>
      <h1>게시글 ID: {postId}</h1>
      <p>게시글 내용...</p>
    </div>
  );
}
