/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Button from "../ui/buttons/Button";

export interface Props {
  title: string;
  content: string;
  to?: string;
  buttonText?: string;
}

const ErrorPage = ({
  title,
  content,
  to = "/",
  buttonText = "Back to homepage",
}: Props) => {
  return (
    <div className="error-page body">
      <div className="text">
        <h1>{title}</h1>
        <p>{content}</p>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          `}
        >
          <Button to={to}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
