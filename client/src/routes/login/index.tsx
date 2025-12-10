import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          alert("로그인 성공");
          navigate({ to: "/posts", search: { page: 1 } });
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
        </div>
        <div>
          <Link to="/reset-password">비밀번호 재설정</Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
