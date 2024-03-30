import React from "react";

import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGrid,
} from "lucide-react";

import { CallLayout } from "./FlexibleCallLayout";

interface CallLayoutButtonProps {
  layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
}

const CallLayoutButton = ({ layout, setLayout }: CallLayoutButtonProps) => {
  return (
    <div className="mx-auto w-fit space-x-6">
      <button onClick={() => setLayout("speaker-vert")}>
        <BetweenVerticalEnd
          className={layout !== "speaker-vert" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("speaker-horiz")}>
        <BetweenHorizonalEnd
          className={layout !== "speaker-horiz" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("grid")}>
        <LayoutGrid className={layout !== "grid" ? "text-gray-400" : ""} />
      </button>
    </div>
  );
};

export default CallLayoutButton;
