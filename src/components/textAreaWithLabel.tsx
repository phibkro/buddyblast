import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useText } from "@/hooks/useText";
import { ChangeEvent } from "react";

export function TextareaWithLabel({
  label,
  placeholder,
  id,
  onChange,
}: {
  label: string;
  placeholder: string;
  id: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [description] = useText(label, placeholder, "sessionStorage");

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea placeholder={description} id={id} onChange={onChange} />
    </div>
  );
}
