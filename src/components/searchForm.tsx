import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

interface Post {
  id: string;
  userId: string;
  category: string[];
  postTitle: string;
  postDescription: string;
  rules: string[];
  date_created: string;
  reports: string[];
}

interface SearchFormProps {
  className?: string;
}

function SearchForm({ className }: SearchFormProps) {
  const [textInput, setTextInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    const postsQuery = query(
      collection(db, "posts"),
      where("postTitle", ">=", textInput),
      where("postTitle", "<=", textInput + "\uf8ff"),
    );

    const querySnapshot = await getDocs(postsQuery);
    const results: Post[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    setSearchResults(results);
  };

  return (
    <div>
      <form
        className={`flex gap-2 rounded-md bg-gray-100 p-2 ${className}`}
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
      <ul>
        {searchResults.map((post: Post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.postTitle}</CardTitle>
              <CardDescription>{post.postDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc">
                {post.rules.length ? (
                  post.rules.map((rule, index) => <li key={index}>{rule}</li>)
                ) : (
                  <span>No rules</span>
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <ul>
                <li>
                  Category:
                  {post.category ? post?.category : <span>No category</span>}
                </li>
                <li>
                  Date created:
                  {post.date_created ? (
                    post?.date_created
                  ) : (
                    <span>No creation date</span>
                  )}
                </li>
                <li>
                  Report count:
                  {post.reports}
                </li>
                <li>
                  User id:
                  {post.userId}
                </li>
              </ul>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
}

export { SearchForm };
