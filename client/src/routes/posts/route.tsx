import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "24px 0px" }}
    >
      <Outlet />
    </div>
  );
}
