namespace MonitorAPI.Models
{
    public class GetUserDetailsModel
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public List<string> UserMenus { get; set; }
    }
    public class MenuResponseModel
    {
        public int UserId { get; set; }
        public string FormName { get; set; }
    }
}
