"use client"
import { useSetPageTitle } from "@/hooks/useSetPageTitle";
import React from "react";

export default function ProductPage() {
  // Hook sẽ tự động cập nhật tiêu đề dựa trên đường dẫn
  useSetPageTitle();
  return (
    <div>
      <h1>Product</h1>
    </div>
  );
}
