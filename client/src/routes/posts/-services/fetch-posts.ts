import { queryOptions } from "@tanstack/react-query";
import type { Post } from "../$postId/-services/fetch-post";

export type PostsResponse = {
  posts: Post[];
  total: number;
  pageSize: number;
  page: number;
  totalPages: number;
};

export async function fetchPosts(
  page: number,
  signal: AbortSignal
): Promise<PostsResponse> {
  const response = await fetch(`http://localhost:3000/posts?page=${page}`, {
    signal,
  });
  if (!response.ok && response.status === 404) {
    const errorJson = await response.json();
    throw new Error(errorJson.error);
  }
  const postsResponse: PostsResponse = await response.json();
  return postsResponse;
}

export const postsOptions = (page: number) =>
  queryOptions({
    queryKey: ["posts", { page }],
    queryFn: ({ signal }) => fetchPosts(page, signal),
  });
