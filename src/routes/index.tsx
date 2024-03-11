import { ComboBoxResponsive } from "@/components/ComboBoxResponsive";
import PostsFeed from "@/components/PostsFeed";
import { SearchForm } from "@/components/searchForm";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useText } from "@/hooks/useText";
import { getPosts } from "@/lib/getPosts";
import { Separator } from "@radix-ui/react-separator";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => await getPosts(),
});

function Index() {
  const posts = useLoaderData({ from: "/", select: (data) => data });
  const [sortOption, setSortOption] = useState("Random");
  const [filterCategory, setFilterCategory] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [name] = useText("name");

  // filter the posts by report count (less than 3)
  const nonReportedPosts = useMemo(() => {
    return posts ? posts.filter((post) => post.reportCount < 3) : [];
  }, [posts]);

  // filter the posts by category
  const filteredPosts = useMemo(() => {
    return nonReportedPosts
      ? nonReportedPosts.filter(
          (post) => post.category == filterCategory || filterCategory == "",
        )
      : [];
  }, [nonReportedPosts, filterCategory]);

  // filter posts by favorites
  const favoritePosts = useMemo(() => {
    // console.log(name);
    return favorited
      ? filteredPosts.filter((post) => post.favorites?.includes(name))
      : filteredPosts;
  }, [favorited, filteredPosts, name]);

  //sort the filtered posts
  const sortedPosts = useMemo(() => {
    switch (sortOption) {
      case "Random":
        console.log("Sorting by random");

        return favoritePosts.toSorted(() => Math.random() - 0.5);

      case "Newest":
        console.log("Sorting by newest");

        return favoritePosts.toSorted(
          (a, b) => b.creationDate.seconds - a.creationDate.seconds,
        );

      case "Popular":
        return favoritePosts.toSorted(
          (a, b) => b.favorites.length - a.favorites.length,
        );
    }
  }, [favoritePosts, sortOption]);

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setSortOption(event.currentTarget.value);
  };

  return (
    <div className="p-2" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div>
        <SearchForm className="neutral-100" />
      </div>
      <div className="p-5" />
      <div className="flex pl-5 pr-24">
        <div className="pr-5">
          <Label className="text-lg">Search options</Label>
          <RadioGroup defaultValue="Random">
            <div className="mt-2 flex items-center space-x-2">
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
            <Switch
              id="favorites"
              onClick={() => {
                setFavorited((favorited) => !favorited);
              }}
            />
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
