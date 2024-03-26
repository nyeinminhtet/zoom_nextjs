import { useState } from "react";

interface ParticipantsInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ParticipantsInput({
  value,
  onChange,
}: ParticipantsInputProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-2">
      <div className="font-medium">Participants:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onChange("");
          }}
        />
        Everyone with link can join
      </label>

      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
          }}
        />
        Private meeting
      </label>

      {active && (
        <label className="block space-y-1">
          <span>Participant emails</span>

          <textarea
            placeholder="Enter participant email addresses separated by commas"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border border-gray-200 p-2"
          />
        </label>
      )}
    </div>
  );
}
