namespace MonitorAPI.Models
{
    public class LoginRequestModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    public class LoginResponseModel
    {
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
