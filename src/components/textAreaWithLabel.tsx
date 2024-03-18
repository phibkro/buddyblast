import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useText } from "@/hooks/useText";
import { ChangeEvent } from "react";

export function TextareaWithLabel({
  label,
  placeholder,
  id,
  onChange,
  value, 
}: {
  label: string;
  placeholder: string;
  id: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}) {
  const [description] = useText(label, placeholder, "sessionStorage");

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea placeholder={description} id={id} onChange={onChange} value={value !== undefined ? value : ''}/>
    </div>
  );
}
