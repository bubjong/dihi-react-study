export type Post = {
  id: string;
  title: string;
  content: string;
};

export async function fetchPost(
  id: Post["id"],
  abortController: AbortController
): Promise<Post> {
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    signal: abortController.signal,
  });
  if (!response.ok && response.status === 404) {
    const errorJson = await response.json();
    throw new Error(errorJson.error);
  }
  const post: Post = await response.json();
  return post;
}
