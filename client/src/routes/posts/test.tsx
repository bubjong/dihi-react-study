import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { postsOptions } from "./-services/fetch-posts";

type RouteSearch = {
  page: number;
};

export const Route = createFileRoute("/posts/test")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): RouteSearch => {
    return {
      page: search?.page ? Number(search.page) : 1,
    };
  },
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const queryClient = useQueryClient();

  return (
    <div>
      <div>
        <button
          onClick={async () => {
            try {
              const data = await queryClient.fetchQuery({
                ...postsOptions(page),
                staleTime: 10 * 1000,
              });
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          fetchQuery
        </button>
        <button
          onClick={async () => {
            try {
              await queryClient.prefetchQuery({
                ...postsOptions(page),
                staleTime: 10 * 1000,
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          prefetchQuery
        </button>
        <button
          onClick={async () => {
            try {
              const data = await queryClient.ensureQueryData({
                ...postsOptions(page),
                revalidateIfStale: true,
              });
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          ensureQueryData
        </button>
      </div>
    </div>
  );
}
