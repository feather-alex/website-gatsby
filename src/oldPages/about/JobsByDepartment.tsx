/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Department } from "./store/about.types";
import Title1 from "../../ui/titles/Title1";
import ArrowIcon, { Direction } from "../../ui/icons/ArrowIcon";
import Paragraph2 from "../../ui/paragraphs/Paragraph2";
import { Fragment } from "react";
import Caption from "../../ui/captions/Caption";
import { SHADES } from "../../ui/variables";

interface Props {
  isMobileBreakpoint: boolean;
  jobsByDepartment: Department[] | null;
}

const JobsByDepartment = ({ isMobileBreakpoint, jobsByDepartment }: Props) => {
  if (jobsByDepartment === null || jobsByDepartment.length === 0) {
    return <Title1>There are no positions available at this time</Title1>;
  }

  return (
    <Fragment>
      <div
        css={css`
          ${isMobileBreakpoint && `margin-bottom: 30px;`}
        `}
      >
        <Paragraph2>
          We are a creative, innovative team driven by Feather’s mission and
          dedicated to making a positive impact on our customers and the planet,
          and we’d love to have you be a part of our journey.
        </Paragraph2>
      </div>
      {jobsByDepartment.map((dept) => (
        <div
          key={dept.name}
          css={css`
            margin: 25px 0;
          `}
        >
          <div
            css={css`
              margin-bottom: 5px;
            `}
          >
            <Title1 isBold={true}>{dept.name}</Title1>
          </div>
          {dept.jobs.map((job) => (
            <a
              key={job.id}
              href={`${job.absolute_url}`}
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                display: flex;
                align-items: center;
                transition: all 150ms ease;
                width: fit-content;
                margin-top: 8px;
                > div {
                  display: flex;
                  padding-top: 4px;
                  height: 10px;
                }
                &:hover {
                  & small {
                    color: ${SHADES.SHADE_LIGHT};
                  }
                }
              `}
            >
              <Caption>{job.title}</Caption>
              <ArrowIcon direction={Direction.Right} width={10} />
            </a>
          ))}
        </div>
      ))}
    </Fragment>
  );
};

export default JobsByDepartment;
