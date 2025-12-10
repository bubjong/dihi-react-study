import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          height: "100vh",
          width: "200px",
          borderRight: "1px solid #ccc",
        }}
      >
        <ul>
          <li>
            <Link to=".">대시보드</Link>
          </li>
          <li>
            <Link
              to="/posts"
              search={{
                page: 1,
              }}
              activeProps={{
                style: {
                  color: "red",
                  fontWeight: "bold",
                },
              }}
              activeOptions={{
                includeSearch: false,
              }}
            >
              게시글
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
