import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function PostsFeed({ data }: { data: any[] }) {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {data.map((entry) => {
        return (
          <Card
            key={entry.id ? entry.id : Math.random()}
            className="rounded-lg bg-white p-4 shadow-md"
          >
            <CardHeader>
              <CardTitle className="mb-2 text-lg font-bold">
                {entry.postTitle ? entry.postTitle : <span>No title</span>}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {entry.postDescription ? (
                  entry.postDescription
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
                  {entry.category ? entry.category : <span>No category</span>}
                </li>
                <li className="text-sm text-gray-600">
                  Date created:
                  {entry.creationDate ? (
                    entry.creationDate.toDate().toLocaleDateString()
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
