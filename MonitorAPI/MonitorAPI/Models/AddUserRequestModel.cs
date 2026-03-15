namespace MonitorAPI.Models
{
    public class AddUserRequestModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public int Role { get; set; }
        public List<string> UserMenus { get; set; }
    }
}
