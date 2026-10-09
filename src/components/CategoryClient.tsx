"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface CategoryClientProps {
  products: any[];
  categoryInfo: any;
}

export default function CategoryClient({ products, categoryInfo }: CategoryClientProps) {
  const [sortOption, setSortOption] = useState("default");

  if (!categoryInfo || products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl mb-4">🛒</h2>
        <h1 className="text-2xl font-bold mb-4">দুঃখিত, এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h1>
        <p className="text-gray-500 mb-8">হয়তো আপনি ভুল লিংকে এসেছেন অথবা এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।</p>
        <Link href="/" className="btn btn-solid bg-bazar-green hover:bg-[#096931] text-white rounded-md px-6 py-2">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

 
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "asc") return a.today - b.today;
    if (sortOption === "desc") return b.today - a.today;
    return 0; 
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl bg-gray-100 p-2 rounded-lg">{categoryInfo.icon}</span>
          <h1 className="text-2xl font-bold">{categoryInfo.nameBn}</h1>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600 font-medium">সাজান:</label>
          <select 
            id="sort"
            className="select select-bordered select-sm w-full max-w-xs focus:outline-none focus:border-bazar-green"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
