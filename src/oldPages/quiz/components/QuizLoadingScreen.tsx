/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Layout from "../../../app/Layout";
import ErrorPage from "../../../components/ErrorPage";
import Loading from "../../../components/Loading";
import { getQuizResultsError } from "../../detailsPage/components/packages/quizResults/store/quizResults.selectors";

const LoadingScreen = styled(Loading)`
  height: 100vh;
  width: 100vw;
`;

const QuizLoadingScreen = () => {
  const error = useSelector(getQuizResultsError);

  if (error) {
    return (
      <Layout>
        <ErrorPage
          title="Oh no! Something went wrong when loading this content."
          content="Try refreshing the page, but if that doesn't work you can always reach out to us with questions about renting with Feather."
          to="/contact"
          buttonText="Contact Us"
        />
      </Layout>
    );
  }

  return (
    <LoadingScreen message="Your dream space is right around the corner." />
  );
};

export default QuizLoadingScreen;
