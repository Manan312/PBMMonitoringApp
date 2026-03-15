namespace MonitorAPI.Models
{
    public class MasterSyncModel
    {
    }
    public class MasterSyncEntityCountModel
    {
        public string EntityType { get; set; }
        public int SuccessCount { get; set; }
        public int FailureCount { get; set; }
        public int PendingCount { get; set; }
    }
    public class MasterSyncRequestDetailsModel
    {
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string? ReferenceNo { get; set; }
    }
    public class MasterSyncResponseDetailsModel
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
