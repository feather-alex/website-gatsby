/** @jsx jsx */
import { jsx } from "@emotion/core";
import { SHADES, BRAND } from "../variables";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
}

const RecycleIcon = ({ onClick }: Props) => {
  return (
    <svg
      onClick={onClick}
      width="109"
      height="98"
      viewBox="0 0 109 98"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25766 67.0068L1.3902 65.8472C0.899758 65.0933 0.869583 64.1417 1.31134 63.3602L10.8692 47.5379C11.295 46.7997 11.0613 45.8689 10.333 45.4018L7.0366 43.3725C6.31109 42.9148 6.40572 42.4266 7.25741 42.2893L29.4329 38.4748C29.845 38.4038 30.2693 38.4942 30.6125 38.726C30.9556 38.9578 31.1895 39.312 31.2625 39.7107L34.7166 59.088C34.8743 59.9119 34.3854 60.2171 33.6599 59.7746L30.9944 58.142C30.6593 57.9214 30.2413 57.8536 29.8501 57.9562C29.4589 58.0589 29.1337 58.3219 28.9598 58.6761L15.4116 84.6752"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M2.25766 67.0068L1.3902 65.8472C0.899758 65.0933 0.869583 64.1417 1.31134 63.3602L10.8692 47.5379C11.295 46.7997 11.0613 45.8689 10.333 45.4018L7.0366 43.3725C6.31109 42.9148 6.40572 42.4266 7.25741 42.2893L29.4329 38.4748C29.845 38.4038 30.2693 38.4942 30.6125 38.726C30.9556 38.9578 31.1895 39.312 31.2625 39.7107L34.7166 59.088C34.8743 59.9119 34.3854 60.2171 33.6599 59.7746L30.9944 58.142C30.6593 57.9214 30.2413 57.8536 29.8501 57.9562C29.4589 58.0589 29.1337 58.3219 28.9598 58.6761L15.4116 84.6752"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.37256 65.832L18.7218 88.7186C19.3385 89.4563 20.2502 89.9056 21.2296 89.9545H43.5471C44.4181 89.9545 45.1243 89.2714 45.1243 88.4287V71.5079C45.1243 70.6652 44.4181 69.9821 43.5471 69.9821H23.138"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M1.37256 65.832L18.7218 88.7186C19.3385 89.4563 20.2502 89.9056 21.2296 89.9545H43.5471C44.4181 89.9545 45.1243 89.2714 45.1243 88.4287V71.5079C45.1243 70.6652 44.4181 69.9821 43.5471 69.9821H23.138"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M96.4144 87.7239L95.8308 89.0513C95.3987 89.8326 94.5696 90.3324 93.6543 90.3635L74.7278 90.455C73.8737 90.4935 73.1904 91.1546 73.1506 91.9808L72.9455 95.7037C72.9455 96.5429 72.4408 96.7107 71.873 96.0699L57.205 79.5458C56.6229 78.9217 56.6723 77.9597 57.3154 77.3944L72.7721 64.6695C73.4345 64.1354 73.955 64.3796 73.9234 65.2187L73.8288 68.2703C73.8019 68.6746 73.9631 69.0693 74.2682 69.3468C74.5733 69.6242 74.9905 69.7554 75.406 69.7045L105.468 67.7668"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M96.4144 87.7239L95.8308 89.0513C95.3987 89.8326 94.5696 90.3324 93.6543 90.3635L74.7278 90.455C73.8737 90.4935 73.1904 91.1546 73.1506 91.9808L72.9455 95.7037C72.9455 96.5429 72.4408 96.7107 71.873 96.0699L57.205 79.5458C56.6229 78.9217 56.6723 77.9597 57.3154 77.3944L72.7721 64.6695C73.4345 64.1354 73.955 64.3796 73.9234 65.2187L73.8288 68.2703C73.8019 68.6746 73.9631 69.0693 74.2682 69.3468C74.5733 69.6242 74.9905 69.7554 75.406 69.7045L105.468 67.7668"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M95.82 89.0646L107.491 63.0044C107.816 62.1123 107.747 61.1304 107.302 60.2885L95.9304 41.7046C95.4861 40.98 94.5188 40.7409 93.7697 41.1706L78.7073 49.8064C77.9583 50.2363 77.7112 51.172 78.1553 51.8968L88.5649 68.8786"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M95.82 89.0646L107.491 63.0044C107.816 62.1123 107.747 61.1304 107.302 60.2885L95.9304 41.7046C95.4861 40.98 94.5188 40.7409 93.7697 41.1706L78.7073 49.8064C77.9583 50.2363 77.7112 51.172 78.1553 51.8968L88.5649 68.8786"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M68.66 1.1068H70.2372C71.1532 1.16792 71.9626 1.70551 72.3507 2.51052L79.9213 19.294C80.2875 20.0684 81.2117 20.4354 82.0347 20.1332L85.6623 18.7447C86.4667 18.4396 86.8137 18.7447 86.4352 19.5687L76.4514 39.2512C76.0695 40.002 75.1336 40.3152 74.3537 39.953L56.1528 31.1951C55.3799 30.8289 55.3957 30.2796 56.1528 29.9744L59.0864 28.8606C59.4676 28.7229 59.7683 28.4319 59.9106 28.0631C60.0528 27.6942 60.0226 27.2838 59.8277 26.9382L46.106 1"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M68.66 1.1068H70.2372C71.1532 1.16792 71.9626 1.70551 72.3507 2.51052L79.9213 19.294C80.2875 20.0684 81.2117 20.4354 82.0347 20.1332L85.6623 18.7447C86.4667 18.4396 86.8137 18.7447 86.4352 19.5687L76.4514 39.2512C76.0695 40.002 75.1336 40.3152 74.3537 39.953L56.1528 31.1951C55.3799 30.8289 55.3957 30.2796 56.1528 29.9744L59.0864 28.8606C59.4676 28.7229 59.7683 28.4319 59.9106 28.0631C60.0528 27.6942 60.0226 27.2838 59.8277 26.9382L46.106 1"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70.1717 1.10352H40.8198C39.8415 1.15618 38.9313 1.60476 38.3121 2.33939L25.1739 19.7942C24.9263 20.1217 24.8236 20.5312 24.8888 20.932C24.9539 21.3329 25.1814 21.6921 25.5209 21.9303L39.7158 31.8936C40.3961 32.3756 41.348 32.2546 41.8766 31.619L53.8791 15.6441"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M70.1717 1.10352H40.8198C39.8415 1.15618 38.9313 1.60476 38.3121 2.33939L25.1739 19.7942C24.9263 20.1217 24.8236 20.5312 24.8888 20.932C24.9539 21.3329 25.1814 21.6921 25.5209 21.9303L39.7158 31.8936C40.3961 32.3756 41.348 32.2546 41.8766 31.619L53.8791 15.6441"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
      />
    </svg>
  );
};

export default RecycleIcon;
