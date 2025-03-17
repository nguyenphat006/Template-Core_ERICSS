"use client";

import React from "react";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";

export default function DashboardPage() {
  // Hook sẽ tự động cập nhật tiêu đề dựa trên đường dẫn
  useSetPageTitle();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Total Sales</h2>
        <p className="text-3xl font-bold text-[#4F46E5]">$24,780</p>
        <p className="text-sm text-green-500 mt-2">+12% from last month</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">New Customers</h2>
        <p className="text-3xl font-bold text-[#4F46E5]">120</p>
        <p className="text-sm text-green-500 mt-2">+5% from last month</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Pending Orders</h2>
        <p className="text-3xl font-bold text-[#4F46E5]">15</p>
        <p className="text-sm text-red-500 mt-2">+3 from yesterday</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">📦</span>
            </div>
            <div>
              <p className="font-medium">New order #1234</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">👤</span>
            </div>
            <div>
              <p className="font-medium">New customer registered</p>
              <p className="text-sm text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">💰</span>
            </div>
            <div>
              <p className="font-medium">Payment received #5678</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button className="w-full py-2 px-4 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors">
            Add New Product
          </button>
          <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            View Reports
          </button>
          <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Manage Orders
          </button>
        </div>
      </div>
    </div>
  );
}

