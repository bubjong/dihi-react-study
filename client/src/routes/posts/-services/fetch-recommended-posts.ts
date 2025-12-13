import type { Post } from "../$postId/-services/fetch-post";

type RecommendedPostsResponse = {
  posts: Post[];
};

export const fetchRecommendedPosts = async (
  abortController: AbortController
): Promise<RecommendedPostsResponse> => {
  const response = await fetch("http://localhost:3000/posts/recommended", {
    signal: abortController.signal,
  });
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.error);
  }
  const recommendedPostsResponse: RecommendedPostsResponse =
    await response.json();
  return recommendedPostsResponse;
};
