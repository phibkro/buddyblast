import { ComboBoxResponsive } from "@/components/ComboBoxResponsive";
import PostsFeed from "@/components/PostsFeed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [sortOption, setSortOption] = useState("Newest");
  const [filterCategory, setFilterCategory] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [name] = useText("name");
  const [textInput, setTextInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textInput.trim() && !searchQuery) return;
    setSearchQuery(textInput.trim().toLocaleLowerCase());
  };

  const searchFilteredPosts = useMemo(() => {
    return posts
      ? posts.filter((post) =>
          post?.postTitle
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase()),
        )
      : [];
  }, [posts, searchQuery]);

  // filter the posts by report count (less than 3)
  const nonReportedPosts = useMemo(() => {
    return searchFilteredPosts
      ? searchFilteredPosts.filter((post) => post.reportCount < 3)
      : [];
  }, [searchFilteredPosts]);

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
        <form
          className="neutral-100 flex gap-2 rounded-md bg-gray-100 p-2"
          onSubmit={handleSearch}
        >
          <Input
            value={textInput}
            placeholder="Search posts..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTextInput(e.currentTarget.value)
            }
          />
          <Button
            className="bg-sky-400 font-bold text-black hover:bg-sky-400 hover:text-white"
            type="submit"
          >
            Search
          </Button>
        </form>
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
