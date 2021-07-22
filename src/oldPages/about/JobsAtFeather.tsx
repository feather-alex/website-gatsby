/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";

import Header2 from "../../ui/headers/Header2";
import ResponsiveImage from "../../ui/images/ResponsiveImage";
import { MARGINS, COLORS } from "../../ui/variables";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import { getOpenPositions } from "./store/about.selectors";
import { fetchOpenPositionsRequest } from "./store/about.actions";
import useMount from "../../utils/useMount";
import JobsByDepartment from "./JobsByDepartment";
import { Z_INDICIES } from "../../ui/zIndicies";

const jobsMobileView = `
  width: 100%;
  padding: 150px ${MARGINS.MOBILE} 110px;
  text-align: center;
  margin-top: -120px;
  order: 2;
`;

const jobsDesktopView = `
  min-height: 500px;
  width: 55%;
  padding: 5% 10%;
  margin-right: -50px;
`;

interface Props {
  imageUrl: string;
}

const JobsAtFeather = ({ imageUrl }: Props) => {
  const dispatch = useDispatch();
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const jobsByDepartment = useSelector(getOpenPositions);
  useMount(() => {
    dispatch(fetchOpenPositionsRequest());
  });

  return (
    <section
      css={css`
        display: flex;
        flex-direction: ${isMobileBreakpoint ? "column" : "row"};
        align-items: center;
        margin: 60px 0;
      `}
    >
      <div
        css={css`
          background: ${COLORS.CLOUD};
          ${isMobileBreakpoint ? jobsMobileView : jobsDesktopView}
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: ${isMobileBreakpoint ? "center" : "flex-start"};
          `}
        >
          <Header2>Interested in joining us?</Header2>

          <div
            css={css`
              margin-top: 20px;
              max-width: 491px;
            `}
          >
            <JobsByDepartment
              isMobileBreakpoint={isMobileBreakpoint}
              jobsByDepartment={jobsByDepartment}
            />
          </div>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          z-index: ${Z_INDICIES.JOBS_AT_FEATHER};
          ${isMobileBreakpoint
            ? `width: 100%; padding: ${MARGINS.MOBILE}; order: 1;`
            : `width: 50%; padding: 5% 0;`}
        `}
      >
        <ResponsiveImage
          src={imageUrl}
          height={625}
          width={705}
          queryParams={{
            sat: 38,
          }}
        />
      </div>
    </section>
  );
};

export default JobsAtFeather;
