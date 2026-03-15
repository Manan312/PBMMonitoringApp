namespace Core.DTO
{
    public class PreApprovalRequestDTO
    {
        public string? PBMReferenceNo { get; set; }
        public string? LivaReferenceNo { get; set; }
    }
    public class PreApprovalSyncDTO
    {
        public string? LivaReferenceNo { get; set; }
        public string Status { get; set; }
        public string CreatedDate { get; set; }
    }
    public class PreApprovalDetailsDTO
    {
        public string PBMReferenceNo { get; set; }
        public string LivaReferenceNo { get; set; }
        public string DenialCode { get; set; }
        public string PBMComments { get; set; }
        public decimal? PBMApprovedAmount { get; set; }
        public string RequestJson { get; set; }
        public string PBMResponseJson { get; set; }
        public string ResponseJson { get; set; }
        public List<ApprovalDiagnosisDetailsDTO> ApprovalDiagnosisDetails { get; set; }
        public List<ApprovalServiceDetailsDTO> ApprovalServiceDetails { get; set; }
    }
    public class ApprovalDiagnosisDetailsDTO
    {
        public string ICDCode { get; set; }
        public string Description { get; set; }
        public string DiagnosisType { get; set; }
    }
    public class ApprovalServiceDetailsDTO
    {
        public int SNo { get; set; }
        public string ServiceCode { get; set; }
        public string PBMServiceCode { get; set; }
        public string ServiceDescription { get; set; }
        public decimal RequestedQuantity { get; set; }
        public decimal RequestedNetAmount { get; set; }
        public decimal ApprovedAmount { get; set; }
        public string DenialCode { get; set; }
        public string PBMComments { get; set; }
    }
}
