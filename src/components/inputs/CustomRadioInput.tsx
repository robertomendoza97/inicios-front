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
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        className="cursor-pointer"
        onChange={handleChange}
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};
