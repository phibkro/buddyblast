import PostsFeed from "@/components/PostsFeed";
import { SearchForm } from "@/components/searchForm";
import { ComboBoxResponsive } from "@/components/ui/ComboBoxReactive";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { getPosts } from "@/lib/getPosts";
import { Separator } from "@radix-ui/react-separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => await getPosts(),
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div>
        <SearchForm />
      </div>
      <div className="p-10" />
      <div className="flex">
        <div>
          <Label>Search options</Label>
          <RadioGroup defaultValue="Newest">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Newest" id="Newest" />
              <Label htmlFor="Newest">Newest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Popular" id="Popular" />
              <Label htmlFor="Popular">Popular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Random" id="Random" />
              <Label htmlFor="Random">Random</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center space-x-2 p-2">
            <Switch id="favorites" />
            <Label htmlFor="favorites">Favorites</Label>
          </div>
          <ComboBoxResponsive></ComboBoxResponsive>
        </div>
        <PostsFeed />
      </div>
      <Separator />
    </div>
  );
}
