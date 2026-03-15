namespace Core.DTO
{
    public class LoginResponseDTO
    {
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
