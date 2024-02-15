import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { cn } from "@/lib/utils";

interface SearchFormProps {
  className?: string;
}
function SearchForm({ className }: SearchFormProps) {
  const [textInput, setTextInput] = useState("");
  return (
    <form
      className={cn("flex gap-2 rounded-md bg-gray-100 p-2", className)}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(textInput);
      }}
    >
      <Input
        value={textInput}
        placeholder="Flasketuten"
        onChange={(e) => {
          setTextInput(e.currentTarget.value);
          console.log(textInput);
        }}
      />
      <Button>Search</Button>
    </form>
  );
}

export { SearchForm };
