using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.BASE
{
    public class BaseRequest
    {
        // Các thuộc tính chung (nếu có)
        public string? RequestId { get; set; } = Guid.NewGuid().ToString(); // ID duy nhất cho mỗi request (tùy chọn, dùng để trace)
        // Phương thức validate cơ bản (có thể override trong subclass)
        public virtual void Validate()
        {
            // Logic validate chung (nếu cần)
            // Ví dụ: Kiểm tra RequestId không null
            if (string.IsNullOrEmpty(RequestId))
            {
                throw new ArgumentException("RequestId cannot be empty.");
            }
        }
    }
}
