export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#D0201C] p-6">
      <img
        src="/images/404/404-illustration.svg"
        alt="404 Illustration"
        className="w-[600px] h-auto mb-6"
      />
      <h2 className="text-2xl font-semibold mb-2">Không tìm thấy trang</h2>
      <p className="mb-6 text-center max-w-md">
        Trang bạn đang cố gắng truy cập không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
      </p>
      <a
        href="/"
        className="mt-4 px-6 py-2 border border-[#D0201C] text-[#D0201C] hover:bg-[#D0201C] hover:text-white transition rounded"
      >
        Về trang chủ
      </a>
    </div>
  );
}
