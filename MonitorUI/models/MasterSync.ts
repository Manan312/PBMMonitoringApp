export interface MasterStatResponse {
  EntityType: string;
  FailureCount: number;
  SuccessCount: number;
  PendingCount: number;
}

export interface MasterSyncLog {
  Id: number;
  PolicyId: string;
  EntityId: string;
  EntityType: string;
  Status: string;
  RetryCount: number;
  RequestJson: string;
  ResponseJson: string;
}

export interface MasterSearchRequest {
  StartDate?: string;
  EndDate?: string;
  ReferenceNo?: string;
}
