export interface FailedJob {
  reason: string;
  jobId?: string;
}

export interface ImportLog {
  _id: string;
  fileName: string;
  timestamp: string;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: FailedJob[];
}
