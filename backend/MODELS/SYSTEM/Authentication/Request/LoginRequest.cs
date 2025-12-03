using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MODELS.BASE;

namespace MODELS.SYSTEM.Authentication.Request
{
    public class LoginRequest: BaseRequest
    {
        public string? UsernameOrEmail { get; set; }
        public string Password { get; set; } = null!;

        public class Validator : AbstractValidator<LoginRequest>
        {
            public Validator()
            {
                RuleFor(x => x.UsernameOrEmail)
                    .NotEmpty().WithMessage("Tên đăng nhập hoặc Email không được để trống");

                RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Mật khẩu không được để trống")
                    .MinimumLength(6).WithMessage("Mật khẩu phải từ 6 ký tự trở lên");
            }
        }
    }
}
