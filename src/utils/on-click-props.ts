export default function getOnClickProps(
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
) {
  return onClick
    ? {
        onClick,
        role: "button",
        tabIndex: 0,
      }
    : {};
}
