import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

const RootLayout = () => {
  return <Outlet />;
};

// export const Route = createRootRoute({ component: RootLayout });

type RootRouterContext = {
  queryClient: QueryClient;
};
export const Route = createRootRouteWithContext<RootRouterContext>()({
  component: RootLayout,
});
