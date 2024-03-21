import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NameForm } from "./nameForm";
import { TextBadge } from "./ui/textBadge";

import user from "@/assets/User.svg";
import newEntry from "@/assets/newEntry.svg";
import { useText } from "@/hooks/useText";
import { addPost } from "@/lib/addPost";
import { ComboBoxResponsive } from "./ComboBoxResponsive";
import { TextareaWithLabel } from "./textAreaWithLabel";
import { Button } from "./ui/button";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function UserComponent() {
  const [name] = useText("name");
  const [category, setCategory] = useText("category", "", sessionStorage);
  const [title, setTitle] = useText("title", "", sessionStorage);
  const [description, setDescription] = useText(
    "description",
    "",
    sessionStorage,
  );
  const [rules, setRules] = useText("rules", "", sessionStorage);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // console.log(sessionStorage);

  const handleSubmit = async () => {
    // e.preventDefault(); //kan skape problemer

    const ruleArray = rules.split("\n");
    await addPost(
      name,
      category,
      title,
      description,
      ruleArray,
      new Date(),
      0,
      [],
      minutes * 60 + seconds,
    );
    // console.log("submitted");

    window.location.reload();
  };
  return (
    <div className="flex">
      {name ? (
        <Dialog>
          <DialogTrigger>
            <Avatar className="rounded-none hover:border-opacity-100 hover:bg-primary/10">
              <AvatarImage src={newEntry} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add your game!</DialogTitle>
              <DialogDescription>
                Make changes to your game here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  value={title}
                  placeholder="Title here"
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                  }}
                />
              </div>
              <div className="flex grid-cols-4 items-center gap-4">
                <TextareaWithLabel
                  label={"Description"}
                  placeholder="Description here"
                  id="description"
                  onChange={(e) => {
                    setDescription(e.currentTarget.value);
                    console.log("description");
                  }}
                  value={description}
                />
              </div>
              <div className="flex grid-cols-4 items-center gap-4">
                <TextareaWithLabel
                  label={"Rules"}
                  placeholder="Write the rules of your game here"
                  id="description"
                  onChange={(e) => {
                    setRules(e.currentTarget.value);
                    console.log("rules");
                  }}
                  value={rules}
                />
              </div>
              <div>
                <Label>Default time limit</Label>
              </div>
              <div className="flex grid-cols-4 items-center gap-4">
                <div>
                  <Label>Minutes</Label>
                  <div>
                    <Input
                      type="number"
                      min={0}
                      value={minutes || 0}
                      onChange={(e) => setMinutes(parseInt(e.target.value))}
                      className="w-1/2"
                    />
                  </div>
                  <Label>Seconds</Label>
                  <div>
                    <Input
                      type="number"
                      min={0}
                      max={59}
                      value={seconds || 0}
                      onChange={(e) => setSeconds(parseInt(e.target.value))}
                      className="w-1/2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <ComboBoxResponsive
                  onChange={(selectedCategory) => setCategory(selectedCategory)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Save game
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <span />
      )}

      {name === "" ? <NameForm /> : <TextBadge />}
      <Avatar className="top-2">
        <AvatarImage src={user} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
