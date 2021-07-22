import React from "react";
import RoundCheckbox from "./RoundCheckbox";

export interface Props {
  src: string;
  id: number;
  choice: string;
  handleSelect: (event: React.MouseEvent<HTMLDivElement>) => void;
  checked: boolean;
}

const MasonryTile = ({ handleSelect, choice, checked, id, src }: Props) => (
  <div
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
    className="clickable tile"
    onClick={handleSelect}
    data-choice={choice}
  >
    <RoundCheckbox choice={choice} checked={checked} />
    <img alt="" className={`nb-${id}`} src={src} />
  </div>
);

export default MasonryTile;
