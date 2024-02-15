import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NameForm } from "./nameForm";
import { TextBadge } from "./ui/textBadge";

import user from "@/assets/User.svg";
import { useText } from "@/hooks/useText";

export function UserComponent() {
  const [name] = useText("name");
  return (
    <div className="flex">
      {name == "" ? <NameForm /> : <TextBadge />}
      <Avatar className="top-2">
        <AvatarImage src={user} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
