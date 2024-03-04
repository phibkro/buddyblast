import { ComboBoxResponsive } from "@/components/ComboBoxResponsive";
import PostsFeed from "@/components/PostsFeed";
import { SearchForm } from "@/components/searchForm";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { getPosts } from "@/lib/getPosts";
import { Separator } from "@radix-ui/react-separator";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => await getPosts(),
});

function Index() {
  const posts = useLoaderData({ from: "/", select: (data) => data });
  const [sortOption, setSortOption] = useState("Random");
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [sortedPosts, setSortedPosts] = useState(filteredPosts);

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setSortOption(event.currentTarget.value);
  };
  //Filter posts
  useEffect(() => {
    console.log("filtering by: " + filterCategory);
    setFilteredPosts(
      posts.filter(
        (post) => post.category == filterCategory || filterCategory == "",
      ),
    );
  }, [filterCategory, posts]);
  //another useEffect to sort when the favorite button is toggled TODO!
  //sort the filtered posts
  useEffect(() => {
    console.log("sorting...");
    switch (sortOption) {
      case "Random":
        console.log("Sorting by random");

        setSortedPosts(filteredPosts.sort(() => Math.random() - 0.5));
        break;

      case "Newest":
        console.log("Sorting by newest");

        setSortedPosts(
          filteredPosts.sort(
            (a, b) => a.creationDate.seconds < b.creationDate.seconds,
          ),
        );
        break;
      case "Popular":
        console.log("Sorting by popular");

        break;
      default:
        setSortedPosts(filteredPosts);
        break;
    }
    setSortedPosts(filteredPosts);
  }, [filteredPosts, sortOption]);

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
          <RadioGroup defaultValue="Random">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Newest"
                id="Newest"
                checked={sortOption === "Newest"}
                onClick={handleChange}
              />
              <Label htmlFor="Newest">Newest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Popular"
                id="Popular"
                checked={sortOption === "Popular"}
                onClick={handleChange}
              />
              <Label htmlFor="Popular">Popular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Random"
                id="Random"
                checked={sortOption === "Random"}
                onClick={handleChange}
              />
              <Label htmlFor="Random">Random</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center space-x-2 p-2">
            <Switch id="favorites" />
            <Label htmlFor="favorites">Favorites</Label>
          </div>
          <ComboBoxResponsive
            onChange={(selectedCategory) => setFilterCategory(selectedCategory)}
          />
        </div>
        <PostsFeed data={sortedPosts} />
      </div>
      <Separator />
    </div>
  );
}
