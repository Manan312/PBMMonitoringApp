export interface ApprovalDiagnosisDetails {
  ICDCode: string;
  Description: string;
  DiagnosisType: string;
}

export interface ApprovalServiceDetails {
  SNo: number;
  ServiceCode: string;
  PBMServiceCode: string;
  ServiceDescription: string;
  RequestedQuantity: number;
  RequestedNetAmount: number;
  ApprovedAmount: number;
  DenialCode: string;
  PBMComments: string;
}

export interface ApprovalDetails {
  PBMReferenceNo: string;
  LivaReferenceNo: string;
  DenialCode: string;
  PBMComments: string;
  PBMApprovedAmount: number;
  RequestJson: string;
  PBMResponseJson: string;
  ResponseJson: string;
  ApprovalDiagnosisDetails: ApprovalDiagnosisDetails[];
  ApprovalServiceDetails: ApprovalServiceDetails[];
}


export interface PBMSyncLog {
  ID: number;
  PBMReferenceNo: string;
  LivaReferenceNo: string;
  Status:string;
  CreatedDate:string;
}

export interface PBMStatResponse {
  RequestName:string;
  RecordCount: number;
}

export interface PBMDenialResponse {
  DenialCode: string;
  RecordCount: number;
}

export interface PBMSearchRequest {
  PBMReferenceNo?: string;
  LivaReferenceNo?: string;
}

export interface PBMDailyDumpRequest{
  StartDate:string;
  EndDate:string;
}