import * as React from 'react';
import { Meta } from '../../contentful/contentful.types';
import { APIError } from '../../types/ReduxState';
import Layout from '../../app/Layout';
import ErrorPage from '../../components/ErrorPage';
import Helmet from '../../components/Helmet';

interface Props {
  meta?: Meta | null;
  error: APIError;
}

const FullscreenErrorPage = ({ meta, error }: Props) => {
  const MetaInfo = meta && <Helmet title={meta.title} description={meta.description} imageUrl={meta.imageUrl} />;

  return (
    <Layout>
      {MetaInfo}
      <ErrorPage title={`${error.status} ${error.error}`} content={error.message} />
    </Layout>
  );
};

export default FullscreenErrorPage;
