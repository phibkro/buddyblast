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
    <ul>
      {data.map((entry) => {
        return (
          <Card key={entry.id ? entry?.id : Math.random()}>
            <CardHeader>
              <CardTitle>
                {entry.postTitle ? entry?.postTitle : <span>No title</span>}
              </CardTitle>
              <CardDescription>
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
            <CardFooter>
              <ul>
                <li>
                  Category:
                  {entry.category ? entry?.category : <span>No category</span>}
                </li>
                <li>
                  Date created:
                  {entry.creationDate ? (
                    entry?.creationDate.toDate().toLocaleDateString()
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
