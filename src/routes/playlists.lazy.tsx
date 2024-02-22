import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/playlists")({
  component: About,
});

function About() {
  return <div className="p-2">The playlists will be here</div>;
}
