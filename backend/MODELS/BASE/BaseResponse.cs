namespace MODELS.BASE
{
    public class BaseResponse<T>
    {
        public bool Success { get; set; }
        required
        public string Message { get; set; } 
        public T? Data { get; set; }

        public static BaseResponse<T> SuccessResponse(T data, string message = "") =>
            new() { Success = true, Message = message, Data = data };

        public static BaseResponse<T> FailResponse(string message) =>
            new() { Success = false, Message = message, Data = default };

    }
}
