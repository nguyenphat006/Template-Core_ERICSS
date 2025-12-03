using FluentValidation;
using MODELS.BASE;
using System.ComponentModel.DataAnnotations;


namespace MODELS.SYSTEM.Authentication.Request
{
    public class RegisterRequest: BaseRequest
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FullName { get; set; } = null!;

        public class Validator : AbstractValidator<RegisterRequest>
        {
            public Validator()
            {
                RuleFor(x => x.Username)
                    .NotEmpty().WithMessage("Tên đăng nhập là bắt buộc")
                    .Length(3, 50).WithMessage("Tên đăng nhập từ 3-50 ký tự")
                    .Matches(@"^[a-zA-Z0-9_.]+$").WithMessage("Tên đăng nhập chỉ được chứa chữ, số, dấu chấm và gạch dưới");

                RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email là bắt buộc")
                    .EmailAddress().WithMessage("Email không đúng định dạng");

                RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Mật khẩu là bắt buộc")
                    .MinimumLength(6).WithMessage("Mật khẩu phải từ 6 ký tự trở lên")
                    .Matches(@"[A-Z]").WithMessage("Mật khẩu phải chứa ít nhất 1 chữ hoa")
                    .Matches(@"[a-z]").WithMessage("Mật khẩu phải chứa ít nhất 1 chữ thường")
                    .Matches(@"[0-9]").WithMessage("Mật khẩu phải chứa ít nhất 1 số");

                RuleFor(x => x.FullName)
                    .NotEmpty().WithMessage("Họ tên là bắt buộc")
                    .MaximumLength(100).WithMessage("Họ tên không quá 100 ký tự");
            }
        }
    }
}
