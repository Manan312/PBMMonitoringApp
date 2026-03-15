namespace Core.DTO
{
    public class GetUserDetailsDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public List<string> UserMenus { get; set; }
    }
}
