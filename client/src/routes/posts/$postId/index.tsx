import { createFileRoute, useRouter } from "@tanstack/react-router";
import { fetchPost } from "./-services/fetch-post";

export const Route = createFileRoute("/posts/$postId/")({
  component: RouteComponent,
  async loader({ abortController, params: { postId } }) {
    const post = await fetchPost(postId, abortController);
    return post;
  },
});

function RouteComponent() {
  const { id, content } = Route.useLoaderData();
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
      <h1>게시글 ID: {id}</h1>
      <p>게시글 내용: {content}</p>
    </div>
  );
}
