/** @jsx jsx */
import { jsx } from "@emotion/react";
import { BRAND } from "../variables";

interface Props {
  color?: string;
}

const ThreeDIcon = ({ color = BRAND.PRIMARY_TEXT }: Props) => (
  <svg
    width="37"
    height="19"
    viewBox="0 0 37 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.25756 0L7.79327 0.323907L14.5174 4.38954L15 4.68133V5.24528V13.3766V13.9405L14.5174 14.2323L7.79327 18.2979L7.25756 18.6218L6.73216 18.2815L0.456298 14.2158L0 13.9202V13.3766V5.24528V4.7016L0.456298 4.406L6.73216 0.340367L7.25756 0ZM7.29416 2.35929L2.48892 5.47223L7.29416 8.58517L12.4426 5.47223L7.29416 2.35929ZM2 12.8329V7.5385L6.276 10.3086V15.603L2 12.8329ZM8.276 15.6689L13 12.8126V7.47239L8.276 10.3287V15.6689Z"
      fill={color}
    />
    <path
      d="M21.934 9.49569C22.13 9.49569 22.312 9.46302 22.48 9.39769C22.6573 9.32302 22.8113 9.22502 22.942 9.10369C23.0727 8.98235 23.1753 8.84235 23.25 8.68369C23.3247 8.52502 23.362 8.35702 23.362 8.17969C23.362 7.81569 23.2313 7.51235 22.97 7.26969C22.7087 7.02702 22.368 6.90569 21.948 6.90569C21.5 6.90569 21.136 7.05502 20.856 7.35369C20.5853 7.64302 20.4407 8.01635 20.422 8.47369H18.826C18.8353 8.00702 18.9193 7.58235 19.078 7.19969C19.2367 6.81702 19.4513 6.49502 19.722 6.23369C20.002 5.96302 20.3333 5.75769 20.716 5.61769C21.0987 5.46835 21.5187 5.39369 21.976 5.39369C22.4147 5.39369 22.8207 5.45902 23.194 5.58969C23.5673 5.72035 23.8847 5.90235 24.146 6.13569C24.4167 6.36902 24.6267 6.64435 24.776 6.96169C24.9253 7.27902 25 7.62435 25 7.99769C25 8.44569 24.8927 8.84702 24.678 9.20169C24.4633 9.55635 24.1553 9.84102 23.754 10.0557C24.2767 10.2424 24.6827 10.541 24.972 10.9517C25.2707 11.3624 25.42 11.8384 25.42 12.3797C25.42 12.8184 25.3313 13.2197 25.154 13.5837C24.986 13.9477 24.7527 14.2604 24.454 14.5217C24.1553 14.783 23.796 14.9884 23.376 15.1377C22.956 15.2777 22.5033 15.3477 22.018 15.3477C21.5047 15.3477 21.038 15.273 20.618 15.1237C20.2073 14.965 19.8527 14.7457 19.554 14.4657C19.2647 14.1857 19.036 13.845 18.868 13.4437C18.7093 13.033 18.6253 12.5757 18.616 12.0717H20.226C20.2447 12.3237 20.3007 12.557 20.394 12.7717C20.4967 12.977 20.6273 13.159 20.786 13.3177C20.9447 13.4764 21.1313 13.6024 21.346 13.6957C21.57 13.7797 21.808 13.8217 22.06 13.8217C22.5547 13.8217 22.9607 13.6864 23.278 13.4157C23.5953 13.145 23.754 12.7717 23.754 12.2957C23.754 11.8477 23.5813 11.493 23.236 11.2317C22.8907 10.961 22.4567 10.8257 21.934 10.8257H21.458V9.49569H21.934ZM36.3454 10.2797C36.3454 10.9704 36.2147 11.6144 35.9534 12.2117C35.7014 12.809 35.3514 13.327 34.9034 13.7657C34.4554 14.2044 33.9327 14.5497 33.3354 14.8017C32.738 15.0537 32.0987 15.1797 31.4174 15.1797H28.2114V5.37969H31.4174C32.0987 5.37969 32.738 5.50569 33.3354 5.75769C33.9327 6.00969 34.4554 6.35502 34.9034 6.79369C35.3514 7.23235 35.7014 7.75035 35.9534 8.34769C36.2147 8.94502 36.3454 9.58902 36.3454 10.2797ZM34.6234 10.2797C34.6234 9.81302 34.5394 9.37902 34.3714 8.97769C34.2127 8.56702 33.9887 8.21235 33.6994 7.91369C33.41 7.61502 33.0647 7.38169 32.6634 7.21369C32.2714 7.03635 31.842 6.94769 31.3754 6.94769H29.8914V13.6117H31.3754C31.842 13.6117 32.2714 13.5277 32.6634 13.3597C33.0647 13.1824 33.41 12.9444 33.6994 12.6457C33.9887 12.347 34.2127 11.997 34.3714 11.5957C34.5394 11.185 34.6234 10.7464 34.6234 10.2797Z"
      fill={color}
    />
  </svg>
);

export default ThreeDIcon;
