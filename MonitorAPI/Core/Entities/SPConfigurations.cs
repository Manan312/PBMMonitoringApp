namespace Core.Entities
{
    public class SPConfigurations
    {
        public string Action { get; set; }
        public string SPName { get; set; }
        public string DBConnection { get; set; } //RW for Read/Write, RO for ReadOnly
    }
}
