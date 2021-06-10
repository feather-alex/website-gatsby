import { FluxStandardAction } from '../../../types/FluxStandardActions';
import * as actions from './about.actions';
import { Department } from './about.types';

describe('About Actions', () => {
  it('should create a fetch open positions request', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.FETCH_OPEN_POSITIONS_REQUEST
    };

    const action = actions.fetchOpenPositionsRequest();

    expect(action).toEqual(expectedAction);
  });

  it('should create a successful fetch open positions action', () => {
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

    const expectedAction: FluxStandardAction = {
      type: actions.FETCH_OPEN_POSITIONS_SUCCESS,
      payload: departments
    };

    const action = actions.fetchOpenPositionsSuccess(departments);

    expect(action).toEqual(expectedAction);
  });

  it('should create a failed fetch open positions action', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.FETCH_OPEN_POSITIONS_FAILURE
    };

    const action = actions.fetchOpenPositionsFailure();

    expect(action).toEqual(expectedAction);
  });
});
