import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserComponent } from "@/components/userComponent";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2 p-1.5">
          <Link to="/" className="[&.active]:font-bold">
            <Button>Home</Button>
          </Link>
          <Link to="/spillelister" className="[&.active]:font-bold">
            <Button>Spillelister</Button>
          </Link>
        </div>
        <UserComponent />
      </div>
      <Separator />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
