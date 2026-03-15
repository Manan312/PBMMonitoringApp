namespace MonitorAPI.Models
{
    public class PBMSyncModel
    {
    }
    public class PBMDataCountModel
    {
        public string RequestName { get; set; }
        public int RecordCount { get; set; }
    }
    public class PBMDenialCodeDataCountModel
    {
        public string DenialCode { get; set; }
        public int RecordCount { get; set; }
    }
    public class PBMDumpRequestModel
    {
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
    }
    public class PreApprovalRequestModel
    {
        public string? PBMReferenceNo { get; set; }
        public string? LivaReferenceNo { get; set; }
    }
    public class PreApprovalDetailsModel
    {
        public string PBMReferenceNo { get; set; }
        public string LivaReferenceNo { get; set; }
        public string DenialCode { get; set; }
        public string PBMComments { get; set; }
        public decimal? PBMApprovedAmount { get; set; }
        public string RequestJson { get; set; }
        public string ResponseJson { get; set; }
        public List<ApprovalDiagnosisDetailsModel> ApprovalDiagnosisDetails { get; set; }
        public List<ApprovalServiceDetailsModel> ApprovalServiceDetails { get; set; }
    }
    public class ApprovalDiagnosisDetailsModel
    {
        public string ICDCode { get; set; }
        public string Description { get; set; }
        public string DiagnosisType { get; set; }
    }
    public class ApprovalServiceDetailsModel
    {
        public int SNo { get; set; }
        public string ServiceCode { get; set; }
        public string PBMServiceCode { get; set; }
        public string ServiceDescription { get; set; }
        public decimal RequestAmount { get; set; }
        public decimal ApprovedAmount { get; set; }
        public string DenialCode { get; set; }
        public string PBMComments { get; set; }
    }
}
