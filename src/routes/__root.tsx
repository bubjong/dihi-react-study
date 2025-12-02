import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => {
  return (
    <div>
      <p>hello world</p>
      <Outlet />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
