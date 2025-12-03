using System.ComponentModel.DataAnnotations;
using MODELS.BASE;

namespace ENTITIES.SYSTEM.Authentication
{
    public class Users: ModelBase
    {
        public Guid Id { get; set; }
        [Required, MaxLength(50)]
        public string Username { get; set; } = null!;
        [Required, MaxLength(100)]
        public string Email { get; set; } = null!;
        [Required]
        public string PasswordHash { get; set; } = null!;
        public string? FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public DateTime? BirthDay { get; set; }
        public string PhoneNumber { get; set; } = null!;
        // === THÊM 2 FIELD CHO REFRESH TOKEN ===
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
}
