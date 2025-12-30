import type { Post } from "../$postId/-services/fetch-post";

export type PostsResponse = {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};

export async function fetchPosts(
  cursor: string | null,
  pageSize: number,
  signal?: AbortSignal
): Promise<PostsResponse> {
  const urlSearchParams = new URLSearchParams();
  if (cursor) {
    urlSearchParams.set("cursor", cursor);
  }
  urlSearchParams.set("pageSize", pageSize.toString());
  const url = new URL("http://localhost:3000/infinite-posts");
  url.search = urlSearchParams.toString();
  const response = await fetch(url.toString(), {
    signal,
  });
  if (!response.ok && response.status === 404) {
    const errorJson = await response.json();
    throw new Error(errorJson.error);
  }
  const postsResponse: PostsResponse = await response.json();
  return postsResponse;
}
