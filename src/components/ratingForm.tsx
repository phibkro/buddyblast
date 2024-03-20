import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

import { TextareaWithLabel } from "@/components/textAreaWithLabel";
import { Label } from "./ui/label";

import { useText } from "@/hooks/useText";
import { addReview } from "@/lib/addReview";
interface RatingFormProps {
  docID: string;
}
const RatingForm: React.FC<RatingFormProps> = ({ docID }) => {
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState(0);
  const [isWordLimitExceeded, setIsWordLimitExceeded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name] = useText("name");

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  let timeoutId: ReturnType<typeof setTimeout>;

  const countWords = (input: string): number => {
    return input.split(/\s+/).filter(Boolean).length;
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const wordCount = countWords(event.target.value);
    if (wordCount <= 250) {
      setTextValue(event.target.value);
      setIsWordLimitExceeded(false);
    } else {
      setIsWordLimitExceeded(true);
    }
  };

  const handleStarClick = (rating: number) => {
    setNumberValue(rating);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addReview(docID, name, textValue, numberValue);
    setFormSubmitted(true);

    timeoutId = setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
    setTextValue("");
    setNumberValue(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <div className="flex grid-cols-4 items-center gap-4">
          <TextareaWithLabel
            label={"Review Description:"}
            placeholder="Description here"
            id="textInput"
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
      </div>
      {isWordLimitExceeded && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Your review must be 250 words or less.
        </div>
      )}
      <div style={{ marginBottom: "10px" }}></div>
      <Label htmlFor="numberInput">Number of stars: </Label>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleStarClick(star)}
            style={{
              cursor: "pointer",
              color: star <= numberValue ? "orange" : "gray",
            }}
          >
            ★
          </span>
        ))}
      </div>
      <button
        type="submit"
        disabled={isWordLimitExceeded}
        className={cn(
          "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-sky-400 px-4 py-2 text-sm font-bold text-black ring-offset-background transition-colors hover:bg-sky-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          { "cursor-not-allowed": isWordLimitExceeded },
        )}
      >
        Submit
      </button>
      {formSubmitted && (
        <div style={{ marginTop: "10px" }}>Review has been submitted!</div>
      )}
    </form>
  );
};

export default RatingForm;
