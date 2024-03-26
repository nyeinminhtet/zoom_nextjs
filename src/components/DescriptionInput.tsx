import { useState } from "react";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DescriptionInput({
  value,
  onChange,
}: DescriptionInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting Info:</div>

      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          className=""
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            onChange("");
          }}
        />
        Add description
      </label>

      {active && (
        <label className="block space-y-1">
          <span className="font-medium">Description</span>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            className="w-full rounded-md border border-gray-200 p-2"
          />
        </label>
      )}
    </div>
  );
}
