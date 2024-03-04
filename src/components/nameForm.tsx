import { useText } from "@/hooks/useText";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { cn } from "@/lib/utils";

interface SearchFormProps {
  className?: string;
}
function NameForm({ className }: SearchFormProps) {
  const [textInput, setTextInput] = useState("");
  const [name, setName] = useText("name", "Anonymous");
  return (
    <form
      className={cn("flex gap-2 rounded-md bg-sky-100 p-2", className)}
      onSubmit={(e) => {
        // e.preventDefault(); //TODO denne kan brukes for at vi ikke trenger å refreshe siden
        setName(textInput);
        // TODO send to database
      }}
    >
      <Input
        value={textInput}
        placeholder="Enter you name here..."
        onChange={(e) => {
          setTextInput(e.currentTarget.value);
          console.log(textInput);
        }}
      />
      <Button className="bg-sky-400 font-bold text-black hover:bg-sky-400 hover:text-white">
        Submit
      </Button>
    </form>
  );
}

export { NameForm };
