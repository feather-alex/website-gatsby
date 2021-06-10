/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, KeyboardEvent as ReactKeyboardEvent, useRef } from "react";
import Button from "../../buttons/Button";
import { SHADES } from "../../variables";
import { OptionValue } from "./QuantitySelect";
import useMount from "../../../utils/useMount";
import { Z_INDICIES } from "../../zIndicies";

interface Props {
  handleUpdate: (value: OptionValue) => void;
}

export default function CustomInput({ handleUpdate }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [customValue, setCustomValue] = useState<number | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (
      ref &&
      ref.current &&
      e.target &&
      !ref.current.contains(e.target as Element)
    ) {
      handleUpdate({ label: "1", value: 1 });
    }
  };

  const handleKeydown = (trigger: "Escape" | "Tab") => (
    e: KeyboardEvent | ReactKeyboardEvent
  ) => {
    if (e.key === trigger) {
      if (trigger === "Tab" && customValue) {
        handleUpdate({ label: customValue.toString(), value: customValue });
      } else {
        handleUpdate({ label: "1", value: 1 });
      }
    }
  };

  useMount(() => {
    document.addEventListener("keydown", handleKeydown("Escape"));
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeydown("Escape"));
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        ref={ref}
        css={css`
          position: absolute;
          left: -40px;
          top: -21px;
          box-shadow: 0px 4px 16px rgba(51, 51, 51, 0.16);
          display: flex;
          flex-direction: column;
          width: min-content;
          z-index: ${Z_INDICIES.CUSTOM_DROPDOWN_INPUT};
        `}
      >
        <div
          css={css`
            padding: 16px;
            background-color: ${SHADES.WHITE};
          `}
        >
          <input
            data-cy="quantity-select-input"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={true}
            css={css`
              width: 100%;
              border: 1px solid black;
              text-align: center;
              padding: 8px 0;
              font-weight: 500;
              font-size: 16px;
              line-height: 16px;
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            `}
            aria-label="Product Quantity"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                customValue &&
                  handleUpdate({
                    label: customValue.toString(),
                    value: customValue,
                  });
              }
            }}
            placeholder="Qty"
            maxLength={2}
            type="tel"
            value={(typeof customValue === "number" && !isNaN(customValue)
              ? customValue
              : ""
            ).toString()}
            onChange={(e) => {
              setCustomValue(parseInt(e.currentTarget.value, 10));
            }}
          />
        </div>
        <Button
          dataCy="quantity-input-update-button"
          css={css`
            border-radius: 0;
          `}
          onClick={() =>
            customValue &&
            handleUpdate({ label: customValue.toString(), value: customValue })
          }
          onKeyDown={handleKeydown("Tab")}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
