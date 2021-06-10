interface ChildID {
  id: number;
}

interface Location {
  name: string;
}

interface Job {
  id: number;
  title: string;
  location: Location;
  updated_at: string;
  absolute_url: string;
  internal_job_id: number;
  metadata: null;
}

export interface Department {
  id: number;
  name: string;
  jobs: Job[];
  parent_id: null | number;
  child_ids: ChildID[];
}

export interface About {
  isFetching: boolean;
  error: boolean;
  allDepartments: Department[] | null;
}
