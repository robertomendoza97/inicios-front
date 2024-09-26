import { Label, Radio } from "flowbite-react";
import { ChangeEvent, useId } from "react";

interface Props {
  name: string;
  value: string;
  label: string;
  onChange: (name: string, value: string) => void;
}

export const CustomRadioInput = ({ name, value, label, onChange }: Props) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.name, target.value);
  };

  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <Radio name={name} id={id} value={value} onChange={handleChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};
