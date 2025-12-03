using FluentValidation;
using MODELS.BASE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.SYSTEM.Authentication.Request
{
    public class ChangePasswordRequest: BaseRequest
    {
        public string OldPassword { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
        public string ConfirmPassword { get; set; } = null!;

        public class Validator : AbstractValidator<ChangePasswordRequest>
        {
            public Validator()
            {
                RuleFor(x => x.OldPassword)
                    .NotEmpty().WithMessage("Mật khẩu cũ là bắt buộc");

                RuleFor(x => x.NewPassword)
                    .NotEmpty().WithMessage("Mật khẩu mới là bắt buộc")
                    .MinimumLength(6).WithMessage("Mật khẩu phải từ 6 ký tự trở lên")
                    .Matches(@"[A-Z]").WithMessage("Mật khẩu phải chứa ít nhất 1 chữ hoa")
                    .Matches(@"[a-z]").WithMessage("Mật khẩu phải chứa ít nhất 1 chữ thường")
                    .Matches(@"[0-9]").WithMessage("Mật khẩu phải chứa ít nhất 1 số");

                RuleFor(x => x.ConfirmPassword)
                    .Equal(x => x.NewPassword).WithMessage("Xác nhận mật khẩu không khớp");
            }
        }
    }
}
