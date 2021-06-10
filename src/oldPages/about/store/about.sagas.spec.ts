import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { handleFetchOpenPositions, fetchJobs } from './about.sagas';
import { fetchOpenPositionsSuccess, fetchOpenPositionsFailure } from './about.actions';
import { Department } from './about.types';

describe('About Sagas', () => {
  it('should handle successfully fetching positions by departments', () => {
    const departments: Department[] = [
      {
        child_ids: [],
        id: 4021344002,
        jobs: [],
        name: 'Account Management',
        parent_id: null
      },
      {
        child_ids: [],
        id: 4024777002,
        jobs: [
          {
            id: 4438706002,
            title: 'Senior Data Scientist',
            location: { name: 'NYC Office' },
            updated_at: '2019-12-10T10:19:42-05:00',
            absolute_url: 'https://boards.greenhouse.io/feather/jobs/4438706002',
            internal_job_id: 4360427002,
            metadata: null
          }
        ],
        name: 'Data',
        parent_id: null
      }
    ];

    return expectSaga(handleFetchOpenPositions)
      .provide([[matchers.call(fetchJobs), { departments }]])
      .put(fetchOpenPositionsSuccess(departments))
      .run();
  });

  it('should handle unsuccessfully fetching positions by departments', () => {
    return expectSaga(handleFetchOpenPositions)
      .provide([[matchers.call(fetchJobs), Promise.reject()]])
      .put(fetchOpenPositionsFailure())
      .run();
  });
});
