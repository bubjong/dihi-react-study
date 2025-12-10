import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reset-password/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <form>
        <div style={{ display: "flex", gap: 4 }}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" placeholder="Email" />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
