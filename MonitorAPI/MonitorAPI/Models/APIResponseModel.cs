namespace Models
{
    public class APIResponseModel<T>
    {
        public string Status { get; set; } = default!;
        public T? Data { get; set; }
        public List<ApiErrorModel>? Errors { get; set; }

        public static APIResponseModel<T> Success(T data)
            => new()
            {
                Status = "Success",
                Data = data,
                Errors = null
            };

        public static APIResponseModel<T> Failure(List<ApiErrorModel> errors)
            => new()
            {
                Status = "Failure",
                Data = default,
                Errors = errors
            };
    }
    public class ApiErrorModel
    {
        public string Code { get; set; } = default!;
        public string Message { get; set; } = default!;
    }
}
