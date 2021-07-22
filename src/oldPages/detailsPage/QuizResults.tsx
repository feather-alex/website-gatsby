/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Analytics from "../../analytics/analytics";
import PAGES from "../../analytics/pages";
import Layout from "../../app/Layout";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import {
  getQuizState,
  getSubmittedQuizUuid,
} from "../quiz/store/quiz.selectors";
import useMount from "../../utils/useMount";
import {
  getRoomPackage,
  getQuizSelectedItems,
} from "./components/packages/quizResults/quizResults.service";
import QuizResultsDetailsContainer from "./components/packages/quizResults/QuizResultsDetailsContainer";
import { SHADES, BRAND } from "../../ui/variables";
import QuizLoadingScreen from "../quiz/components/QuizLoadingScreen";
import { fetchQuizResultsByUuid } from "./components/packages/quizResults/store/quizResults.actions";
import {
  getIsFetchingQuizResults,
  getQuizResults,
} from "./components/packages/quizResults/store/quizResults.selectors";
import { QuizRoom } from "./components/packages/quizResults/store/quizResults.types";
import Subheader1 from "../../ui/subheaders/Subheader1";

const QuizResults = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector(getQuizState);
  const submittedQuizUuid = useSelector(getSubmittedQuizUuid);
  const quizPackages = useSelector(getQuizResults);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const isFetching = useSelector(getIsFetchingQuizResults);

  // we want to make sure this is called only once
  useMount(() => {
    Analytics.trackPage(PAGES.QUIZ_PACKAGE);
    // if we have a uuid and its different than the uuid of the quiz results we have in redux, fetch it
    if (uuid && uuid !== submittedQuizUuid) {
      dispatch(fetchQuizResultsByUuid(uuid));
    }
  });

  const renderRoomPackage = useCallback(
    (room: QuizRoom) => {
      if (quizPackages && quizPackages[room] && quizPackages[room].length) {
        const pkg = getRoomPackage(
          room,
          quizPackages[room],
          quiz.name,
          quizPackages.name
        );
        return (
          <QuizResultsDetailsContainer
            packageInfo={pkg}
            room={room}
            selectedItems={getQuizSelectedItems(pkg.items)}
          />
        );
      }

      return;
    },
    [quizPackages, quiz]
  );

  if (isFetching) {
    return <QuizLoadingScreen />;
  }

  return (
    <Layout>
      <div
        css={css`
          padding: ${isMobileBreakpoint ? "24px 0 32px" : "48px 0"};
          background-color: ${BRAND.BACKGROUND};
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <Subheader1>
            Welcome Home <span data-cy="quiz-name">{quiz.name}!</span>
          </Subheader1>
        </div>
      </div>

      <div
        css={css`
          background-color: ${SHADES.WHITE};
          padding: ${isMobileBreakpoint ? `50px 0` : `100px 0 250px`};
        `}
      >
        {Object.values(QuizRoom).map((roomId: QuizRoom) => (
          <span key={roomId}>{renderRoomPackage(roomId)}</span>
        ))}
      </div>
    </Layout>
  );
};

export default QuizResults;
