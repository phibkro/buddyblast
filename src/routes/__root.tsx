import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          <Button>Home</Button>
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          <Button>About</Button>
        </Link>
      </div>
      <Separator />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
