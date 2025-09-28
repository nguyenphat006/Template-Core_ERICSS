# 🚀 Fullstack Web App | .NET Web API + Next.js By ERICSS Developer
[![.NET](https://img.shields.io/badge/.NET-8.0-blue?logo=dotnet&style=flat-square)](https://dotnet.microsoft.com/en-us/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.24-blue?logo=tailwindcss&style=flat-square)](https://tailwindcss.com/)
[![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-1.0-purple?logo=shadcn&style=flat-square)](https://shadcn.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2019-red?logo=microsoft-sql-server&style=flat-square)](https://www.microsoft.com/en-us/sql-server)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 🇻🇳 Mô tả dự án
Đây là một dự án fullstack được xây dựng theo kiến trúc hiện đại, tách biệt frontend và backend rõ ràng. Backend được viết bằng ASP.NET Core Web API theo mô hình Repository Pattern, còn frontend sử dụng Next.js với Tailwind CSS và ShadCN UI. Hệ thống dễ mở rộng, dễ bảo trì, phù hợp với nhiều mô hình triển khai khác nhau (Web, Mobile, Microservices...).

---

## 🇺🇸 Project Description
A modern fullstack web application structured with clean architecture principles. The backend is built with ASP.NET Core Web API using the Repository Pattern and EF Core (Database First). The frontend is a fully decoupled Next.js application styled with TailwindCSS and enhanced with ShadCN UI components.

---

## 🔧 Tech Stack

### 🧠 Backend (.NET)
- ASP.NET Core 8 Web API
- Entity Framework Core (DB First)
- SQL Server
- AutoMapper
- Repository Pattern (Multi-project architecture)
- Swagger UI
- Dependency Injection
- Clean Architecture (Entities, Models, Repository layers)
- JSON-based REST API

### 🎨 Frontend (Next.js)
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI (Radix UI + Tailwind variants)
- Redux Toolkit
- Axios or React Query
- Zod (optional: schema validation)

---

## 🏗️ Cấu trúc dự án | Project Structure

```
📦 fullstack-app/
├── 📁 backend/                    # .NET Web API Solution
│   ├── 📁 BE-template-netcore/   # Main Web API Project
│   │   ├── 📁 Controllers/       # API Controllers
│   │   ├── 📁 AutoMapper/        # AutoMapper Profiles
│   │   ├── 📁 Helper/            # Helper Classes & Utilities
│   │   ├── 📁 Template/          # Template Files
│   │   ├── 📄 appsettings.json   # Configuration
│   │   ├── 📄 ConfigService.cs   # Configuration Service
│   │   ├── 📄 Program.cs         # App Entry Point
│   │   ├── 📄 WeatherForecast.cs # Sample Model
│   │   └── 📄 BE-template-netcore.http # HTTP Test File
│   ├── 📁 ENTITIES/              # Entity Models Project
│   │   ├── 📁 DbContent/         # Database Context
│   │   └── 📄 Template_EricsContext.cs # EF DbContext
│   ├── 📁 MODELS/                # Models Project
│   │   ├── 📁 BASE/              # Base Models & DTOs
│   │   └── 📁 SYSTEM/            # System Models
│   └── 📁 REPOSITORY/            # Repository Pattern Project
│       ├── 📁 SYSTEM/            # System Repositories
│       └── 📄 Dependencies       # Repository Dependencies
├── 📁 frontend/                   # Next.js Project
│   ├── 📁 app/                   # App Router (Next.js 15)
│   │   ├── 📁 (auth)/           # Auth Route Group
│   │   ├── 📁 dashboard/        # Dashboard Pages
│   │   ├── 📁 api/              # API Routes (optional)
│   │   ├── 📄 layout.tsx        # Root Layout
│   │   └── 📄 page.tsx          # Home Page
│   ├── 📁 components/            # Reusable Components
│   │   ├── 📁 ui/               # ShadCN UI Components
│   │   └── 📁 common/           # Custom Components
│   ├── 📁 lib/                   # Utilities & Configurations
│   │   ├── 📄 utils.ts          # Helper Functions
│   │   └── 📄 api.ts            # API Client Setup
│   ├── 📁 hooks/                 # Custom React Hooks
│   ├── 📁 store/                 # Redux Store (optional)
│   ├── 📁 types/                 # TypeScript Type Definitions
│   ├── 📄 tailwind.config.js    # Tailwind Configuration
│   ├── 📄 next.config.js        # Next.js Configuration
│   └── 📄 package.json          # Dependencies
├── 📁 database/                   # Database Scripts
│   ├── 📄 schema.sql            # Database Schema
│   └── 📄 seed-data.sql         # Initial Data
└── 📄 README.md                  # Documentation
```

---

## 🚀 Cách khởi tạo và chạy dự án | Getting Started

### 📋 Yêu cầu hệ thống | Prerequisites

- **Visual Studio 2022** (cho Backend)
- **Node.js** >= 18.0.0
- **npm** hoặc **yarn** hoặc **pnpm**
- **SQL Server** (LocalDB hoặc SQL Server Instance)
- **Git**

### 🗄️ Cài đặt Database | Database Setup

1. **Tạo database trong SQL Server:**
```sql
CREATE DATABASE FullstackAppDB;
```

2. **Chạy script tạo schema:**
```bash
# Sử dụng SQL Server Management Studio hoặc
# Chạy file database/schema.sql
```

3. **Thêm dữ liệu mẫu (tùy chọn):**
```bash
# Chạy file database/seed-data.sql
```

---

## 🧠 Cài đặt và chạy Backend (.NET Web API)

### 📥 Cài đặt | Installation

1. **Clone repository:**
```bash
git clone <repository-url>
cd fullstack-app
```

2. **Mở Solution trong Visual Studio:**
   - Mở Visual Studio 2022
   - File → Open → Project/Solution
   - Chọn file `backend/backend.sln` (Solution file chứa 4 projects)

3. **Cấu hình Connection String:**
   - Mở file `BE-template-netcore/appsettings.json`
   - Cập nhật connection string cho database:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=FullstackAppDB;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

4. **Restore NuGet Packages:**
   - Trong Visual Studio: Tools → NuGet Package Manager → Package Manager Console
   - Chạy lệnh:
```powershell
Update-Package
```

### ⚡ Chạy Backend | Running Backend

**Cách 1: Từ Visual Studio**
1. Set startup project là `BE-template-netcore` (Main Web API project)
2. Nhấn `F5` hoặc click `Start` để chạy
3. Swagger UI sẽ mở tự động tại: `https://localhost:5001/swagger`

**Cách 2: Từ Command Line**
```bash
cd backend/BE-template-netcore
dotnet restore
dotnet build
dotnet run
```

**Cách 3: Sử dụng IIS Express**
1. Trong Visual Studio, chọn "IIS Express" thay vì "BE-template-netcore"
2. Nhấn `F5` để chạy

### 🔍 Kiểm tra Backend

- **Swagger UI:** `https://localhost:5001/swagger`
- **Health Check:** `https://localhost:5001/health`
- **Sample API:** `https://localhost:5001/api/users`

---

## 🎨 Cài đặt và chạy Frontend (Next.js)

### 📥 Cài đặt | Installation

1. **Di chuyển vào thư mục frontend:**
```bash
cd frontend
```

2. **Cài đặt dependencies:**

**Với npm:**
```bash
npm install
```

**Với yarn:**
```bash
yarn install
```

**Với pnpm:**
```bash
pnpm install
```

3. **Cấu hình environment variables:**
   - Tạo file `.env.local` trong thư mục `frontend/`
   - Thêm cấu hình:
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://localhost:5001/api
NEXT_PUBLIC_APP_NAME=Fullstack App

# Optional: Other configurations
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 🔧 Cài đặt ShadCN UI (nếu chưa có)

```bash
# Khởi tạo ShadCN UI
npx shadcn-ui@latest init

# Cài đặt các components cơ bản
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
```

### ⚡ Chạy Frontend | Running Frontend

**Development Mode:**
```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

**Production Build:**
```bash
# Build project
npm run build
# hoặc yarn build / pnpm build

# Chạy production server
npm start
# hoặc yarn start / pnpm start
```

### 🔍 Kiểm tra Frontend

- **Development:** `http://localhost:3000`
- **Production:** `http://localhost:3000` (sau khi build)

---

## 🔗 Kết nối Frontend và Backend | Frontend-Backend Integration

### 📡 Cấu hình API Client

Tạo file `frontend/lib/api.ts`:
```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 🧪 Test kết nối | Testing Connection

1. **Đảm bảo Backend đang chạy** tại `https://localhost:5001`
2. **Đảm bảo Frontend đang chạy** tại `http://localhost:3000`
3. **Kiểm tra Network tab** trong Browser DevTools
4. **Test API call** từ frontend

---

## 📚 Scripts hữu ích | Useful Scripts

### Backend Scripts
```bash
# Tạo migration mới
dotnet ef migrations add <MigrationName>

# Cập nhật database
dotnet ef database update

# Xem danh sách migrations
dotnet ef migrations list

# Build project
dotnet build

# Run tests
dotnet test
```

### Frontend Scripts
```bash
# Development
npm run dev

# Build production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check

# Add ShadCN component
npx shadcn-ui@latest add <component-name>
```

---

## 🐛 Troubleshooting | Khắc phục sự cố

### Backend Issues

**❌ Database connection error:**
```
Fix: Kiểm tra connection string trong appsettings.json
```

**❌ Port already in use:**
```
Fix: Thay đổi port trong launchSettings.json hoặc kill process đang sử dụng port
```

**❌ CORS error:**
```csharp
// Thêm vào Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

app.UseCors("AllowAll");
```

### Frontend Issues

**❌ API connection refused:**
```
Fix: Đảm bảo backend đang chạy và check NEXT_PUBLIC_API_URL
```

**❌ ShadCN components not found:**
```bash
Fix: npm install && npx shadcn-ui@latest add <component>
```

**❌ TypeScript errors:**
```bash
Fix: npm run type-check và sửa các lỗi type
```

---

## 📝 Ghi chú | Notes

- **Backend** chạy trên port `5001` (HTTPS) và `5000` (HTTP)
- **Frontend** chạy trên port `3000`
- **Database** sử dụng LocalDB mặc định
- **Hot reload** được bật cho cả frontend và backend
- **Swagger UI** có sẵn để test API

---

## 🤝 Đóng góp | Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**ERICSS Developer**
- GitHub: [@ericss-developer](https://github.com/nguyenphat006)
- Email: developer@ericss.com

---

## 🙏 Acknowledgments

- [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/)
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)