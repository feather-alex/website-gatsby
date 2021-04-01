/** @jsx jsx */
import { jsx } from "@emotion/react";
import { BRAND } from "../variables";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  width?: string;
}

const SofaLampIcon = ({ onClick, width }: Props) => {
  return (
    <svg
      onClick={onClick}
      width={width ? width : "32"}
      height="26"
      viewBox="0 0 32 26"
      fill="none"
    >
      <path
        d="M18.9271 16.7332H7.05225C6.11534 16.7332 5.35583 17.5619 5.35583 18.5841V20.435C5.35583 21.4573 6.11534 22.286 7.05225 22.286H18.9271C19.864 22.286 20.6235 21.4573 20.6235 20.435V18.5841C20.6235 17.5619 19.864 16.7332 18.9271 16.7332Z"
        stroke={`${BRAND.PRIMARY_TEXT}`}
      />
      <path
        d="M15.9583 9.32819H10.0209C9.08397 9.32819 8.32446 10.1569 8.32446 11.1791V14.8809C8.32446 15.9032 9.08397 16.7319 10.0209 16.7319H15.9583C16.8952 16.7319 17.6547 15.9032 17.6547 14.8809V11.1791C17.6547 10.1569 16.8952 9.32819 15.9583 9.32819Z"
        stroke={`${BRAND.PRIMARY_TEXT}`}
      />
      <path
        d="M7.47549 22.749L7.05139 24.5999"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeLinecap="round"
      />
      <path
        d="M18.5034 22.749L18.9275 24.5999"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeLinecap="round"
      />
      <path
        d="M0.737305 16.9077L2.28425 15.8936"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeLinecap="round"
      />
      <path
        d="M1.95244 17.3169L1.02295 15.6291"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeLinecap="round"
      />
      <path
        d="M13.462 4.87823L15.009 3.86409"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeLinecap="round"
      />
      <path
        d="M14.6771 5.28726L13.7476 3.59943"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeLinecap="round"
      />
      <path
        d="M29.1527 16.908L30.6997 15.8938"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeLinecap="round"
      />
      <path
        d="M30.3677 17.3169L29.4382 15.6291"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeLinecap="round"
      />
      <path
        d="M27.1983 22.749H23.8055C23.5712 22.749 23.3813 22.9562 23.3813 23.2118V24.1372C23.3813 24.3928 23.5712 24.5999 23.8055 24.5999H27.1983C27.4325 24.5999 27.6224 24.3928 27.6224 24.1372V23.2118C27.6224 22.9562 27.4325 22.749 27.1983 22.749Z"
        stroke={`${BRAND.PRIMARY_TEXT}`}
      />
      <path d="M25.5006 22.7489V7.47882" stroke={`${BRAND.PRIMARY_TEXT}`} />
      <path
        d="M25.713 1H23.9337C23.7761 1.0096 23.6343 1.11036 23.5594 1.26604L21.0736 7.20769C21.04 7.26471 21.0392 7.33847 21.0716 7.39638C21.1039 7.45429 21.1634 7.48568 21.2239 7.47669H25.713"
        stroke={`${BRAND.PRIMARY_TEXT}`}
      />
      <path
        d="M25.2889 1H27.0632C27.2203 1.0096 27.3617 1.11036 27.4365 1.26604L29.9284 7.20769C29.9619 7.26471 29.9627 7.33847 29.9304 7.39638C29.8982 7.45429 29.8388 7.48568 29.7786 7.47669H25.2889"
        stroke={`${BRAND.PRIMARY_TEXT}`}
      />
      <path
        d="M19.5632 16.7331C20.383 16.7331 21.0476 16.008 21.0476 15.1135C21.0476 14.2191 20.383 13.494 19.5632 13.494C18.7434 13.494 18.0789 14.2191 18.0789 15.1135C18.0789 16.008 18.7434 16.7331 19.5632 16.7331Z"
        stroke={`${BRAND.PRIMARY_TEXT}`}
      />
      <path
        d="M6.41478 16.7331C7.23457 16.7331 7.89914 16.008 7.89914 15.1135C7.89914 14.2191 7.23457 13.494 6.41478 13.494C5.59499 13.494 4.93042 14.2191 4.93042 15.1135C4.93042 16.008 5.59499 16.7331 6.41478 16.7331Z"
        stroke={`${BRAND.PRIMARY_TEXT}`}
      />
    </svg>
  );
};

export default SofaLampIcon;
