/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import AllCaps from "../../../../ui/headers/AllCaps";

export const Headers = () => {
  const columnHeaders: { title: string; width: string }[] = [
    { title: "Date", width: "20%" },
    { title: "Type", width: "55%" },
    { title: "Charge", width: "25%" },
  ];

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {columnHeaders.map((column, index) => (
        <div
          key={index}
          css={css`
            padding: 7px;
            width: ${column.width};
          `}
        >
          <AllCaps>{column.title}</AllCaps>
        </div>
      ))}
    </div>
  );
};
