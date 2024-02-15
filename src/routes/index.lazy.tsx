import { SearchForm } from "@/components/searchForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ComboBoxResponsive } from "@/components/ui/ComboBoxReactive";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@radix-ui/react-separator";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const data = [
  {
    id: 1,
    userId: 1,
    category: "comedy",
    title: "Hello world",
    description: "Welcome to the world",
    rules: ["Gjør ditt", "gjør datt"],
    date_created: "07.07.2001",
    reports: [],
    favorites: [],
  },
  {
    id: 2,
    userId: 2,
    category: "drama",
    title: "The Great Adventure",
    description: "Embark on a thrilling journey",
    rules: ["Follow the map", "Trust your instincts"],
    date_created: "10.12.2019",
    reports: [],
    favorites: [],
  },
  {
    id: 3,
    userId: 3,
    category: "action",
    title: "Mission Impossible",
    description: "No task is too daunting",
    rules: ["Think fast", "Act decisively"],
    date_created: "05.03.2020",
    reports: [],
    favorites: [],
  },
  {
    id: 4,
    userId: 1,
    category: "comedy",
    title: "The Pranksters",
    description: "Get ready to laugh until it hurts",
    rules: ["Expect the unexpected", "Keep it light-hearted"],
    date_created: "20.09.2022",
    reports: [],
    favorites: [],
  },
];

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
        <div className="">
          {data.map((entry) => {
            return (
              <Card key={entry.id} className="">
                <CardHeader>
                  <CardTitle>{entry.title}</CardTitle>
                  <CardDescription>{entry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc">
                    {entry.rules.map((rule, i) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <ul>
                    <li>Category: {entry.category}</li>
                    <li>Date created: {entry.date_created}</li>
                    <li>Favorites: {entry.favorites.length}</li>
                    <li>Reports : {entry.reports.length}</li>
                  </ul>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      <Separator />
    </div>
  );
}
