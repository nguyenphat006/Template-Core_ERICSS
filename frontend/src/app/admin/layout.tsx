export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex">
        <aside className="w-64 bg-gray-100 p-4">
          <h2>Quản lý Sản phẩm</h2>
          <ul>
            <li><a href="/admin/products">Danh sách</a></li>
            <li><a href="/admin/products/create">Thêm mới</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    )
  }
  