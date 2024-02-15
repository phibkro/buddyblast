import { Badge } from "@/components/ui/badge";
import { useText } from "@/hooks/useText";

export function TextBadge() {
  const [text, setText] = useText("name", "Anonymous");
  const handleClick = (e) => {
    e.preventDefault();
    setText("");
    window.location.reload();
  };
  return (
    <Badge variant={"outline"} onClick={handleClick}>
      {text}
    </Badge>
  );
}
