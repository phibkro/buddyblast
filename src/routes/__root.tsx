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
      <div
        className="flex items-center justify-between bg-sky-100 p-2"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="flex gap-2 p-1.5">
          <Link to="/" className="[&.active]:font-bold">
            <Button className="bg-sky-400 font-bold text-black hover:bg-sky-400 hover:text-white">
              Home
            </Button>
          </Link>
          <Link to="/playlists" className="[&.active]:font-bold">
            <Button className="bg-sky-400 font-bold text-black hover:bg-sky-400 hover:text-white">
              Playlists
            </Button>
          </Link>
        </div>
        <h1 className="text-xl font-bold">BuddyBlast</h1>
        <UserComponent />
      </div>
      <Separator />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
