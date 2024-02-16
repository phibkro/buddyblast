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
  const [category, setCategory] = useText("", "", sessionStorage);
  const [title, setTitle] = useText("title", "", sessionStorage);
  const [description, setDescription] = useText(
    "description",
    "",
    sessionStorage,
  );
  const [rules, setRules] = useText("rules", "", sessionStorage);
  console.log(sessionStorage);

  const handleSubmit = () => {
    // e.preventDefault(); //kan skape problemer
    // TODO send new entry to database
    const tmpArray: [string] = [""];
    tmpArray[0] = category;

    const ruleArray = rules.split("\n");
    addPost(name, tmpArray, title, description, ruleArray, new Date(), 0);
    console.log("submitted");
    window.location.reload();
  };
  return (
    <div className="flex">
      {}

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
                  placeholder="Flasketuten"
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                  }}
                />
              </div>
              <div className="flex grid-cols-4 items-center gap-4">
                <TextareaWithLabel
                  label={"description"}
                  placeholder="yeet the bottle and do a dare!"
                  id="description"
                  onChange={(e) => {
                    setDescription(e.currentTarget.value);
                  }}
                />
              </div>
              <div className="flex grid-cols-4 items-center gap-4">
                <TextareaWithLabel
                  label={"rules"}
                  placeholder="write the rules of your game here"
                  id="description"
                  onChange={(e) => {
                    setRules(e.currentTarget.value);
                  }}
                />
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
