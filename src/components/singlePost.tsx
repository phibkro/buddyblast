import { useText } from "@/hooks/useText";
import { incrementPostReportCount } from "@/lib/updatePost";
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
function handleFlagClick(docID: string, name: string) {
  incrementPostReportCount(docID, name);
}

function SinglePost({ entry }: { entry: any }) {
  const [name] = useText("name");

  return (
    <Card
      key={entry.id ? entry.id : Math.random()}
      className="flex h-full flex-col rounded-lg border-2 border-sky-300 bg-sky-100 p-4 shadow-md"
    >
      <CardHeader>
        <CardTitle
          defaultHeartState={entry.favorites?.includes(name)}
          onHeartClick={() => {
            handleFavUpdate(entry, name);
          }}
          onFlagClick={() => handleFlagClick(entry.id, name)}
        >
          {/* {entry.postTitle ? entry?.postTitle : <span>No title</span>} */}
          {entry.postTitle ? (
            <span>{entry?.postTitle}</span>
          ) : (
            <span>No title</span>
          )}
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
      <CardFooter className="mt-auto justify-self-end">
        <ul>
          <li className="text-sm text-gray-600">
            Category:
            {entry.category ? " " + entry?.category : <span> no category</span>}
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
}

export default SinglePost;
