import { useText } from "@/hooks/useText";
import { updatePostFav } from "@/lib/updatePostFavs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function handleFavUpdate(entry: any, name: string) {
  const docID = entry.id;
  const userId = entry.userId;
  const category = entry.category;
  const postTitle = entry.postTitle;
  const postDescription = entry.postDescription;
  const rules = entry.rules;
  const creationDate = entry.creationDate;
  const reportCount = entry.reportCount;
  const favorites = entry.favorites;
  //add or remove user from fav list
  favorites.includes(name)
    ? favorites.splice(favorites.indexOf(name), 1)
    : favorites.push(name);
  entry.favorites = favorites;

  updatePostFav(
    docID,
    userId,
    category,
    postTitle,
    postDescription,
    rules,
    creationDate,
    reportCount,
    favorites,
  );
}
function PostsFeed({ data }: { data: any[] }) {
  const [name] = useText("name");
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {data.map((entry) => {
        return (
          <Card
            key={entry.id ? entry.id : Math.random()}
            className="rounded-lg border-2 border-sky-300 bg-sky-100 p-4 shadow-md"
          >
            <CardHeader>
              <CardTitle
                defaultHeartState={entry.favorites?.includes(name)}
                onHeartClick={() => {
                  handleFavUpdate(entry, name);
                }}
              >
                {entry.postTitle ? entry?.postTitle : <span>No title</span>}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {entry.postDescription ? (
                  entry?.postDescription
                ) : (
                  <span>No description</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc">
                {entry.rules ? (
                  entry.rules.map((rule, i) => <li key={i}>{rule}</li>)
                ) : (
                  <span>No rules</span>
                )}
              </ul>
            </CardContent>
            <CardFooter className="mt-4">
              <ul>
                <li className="text-sm text-gray-600">
                  Category:
                  {entry.category ? (
                    " " + entry?.category
                  ) : (
                    <span> no category</span>
                  )}
                </li>
                <li className="text-sm text-gray-600">
                  Date created:
                  {entry.creationDate ? (
                    entry?.creationDate?.toDate().toLocaleDateString()
                  ) : (
                    <span>No creation date</span>
                  )}
                </li>
              </ul>
            </CardFooter>
          </Card>
        );
      })}
    </ul>
  );
}

export default PostsFeed;
