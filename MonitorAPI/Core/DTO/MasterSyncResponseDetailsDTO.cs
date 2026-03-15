namespace Core.DTO
{
    public class MasterSyncRequestDetailsDTO
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? ReferenceNo { get; set; }
    }
    public class MasterSyncResponseDetailsDTO
    {
        public string Id { get; set; }
        public string EntityId { get; set; }
        public string PolicyId { get; set; }
        public string EntityType { get; set; }
        public string Status { get; set; }
        public int RetryCount { get; set; }
        public string RequestJson { get; set; }
        public string ResponseJson { get; set; }
    }
}
