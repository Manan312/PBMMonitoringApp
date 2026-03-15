using CsvHelper.Configuration.Attributes;

namespace Core.DTO
{
    internal class PBMDumpDTOs
    {
    }
    public class PBMDumpRequestDTO
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class PBMServiceReportDTO
    {
        [Name("Toshfa Pre Approval No")]
        public string ToshfaPreApprovalNo { get; set; }

        [Name("PBM pre approval Number")]
        public string PBMPreApprovalNumber { get; set; }

        [Name("Dhamani Pre approval Number")]
        public string DhamaniPreApprovalNumber { get; set; }

        [Name("Extension No")]
        public string ExtensionNo { get; set; }

        [Name("Status")]
        public string Status { get; set; }

        [Name("Approved Amount")]
        public decimal? ApprovedAmount { get; set; }

        [Name("Name of the medicine")]
        public string NameOfTheMedicine { get; set; }

        [Name("Liva Service Status")]
        public string LivaServiceStatus { get; set; }

        [Name("PBM Service Status")]
        public string PBMServiceStatus { get; set; }

        [Name("Service Sno.")]
        public int? ServiceSno { get; set; }

        [Name("Liva Service Approved Amount")]
        public decimal? LivaServiceApprovedAmount { get; set; }

        [Name("Requested Amount")]
        public decimal? RequestedAmount { get; set; }

        [Name("PBM Approved amount")]
        public decimal? PBMApprovedAmount { get; set; }

        [Name("PBM Patient Share Amount")]
        public decimal? PBMPatientShareAmount { get; set; }

        [Name("PBM denial code")]
        public string PBMDenialCode { get; set; }

        [Name("PBM Denial reason")]
        public string PBMDenialReason { get; set; }
    }
}
