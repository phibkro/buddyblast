import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/spillelister")({
  component: About,
});

function About() {
  return <div className="p-2">Her tenkte jeg å ha spillesiste siden</div>;
}
