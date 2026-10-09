import Link from "next/link";
import { toBengaliNumber } from "@/components/ProductCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// export const instant = false;

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/signin");
  }
  const { slug } = await params;
  
  // Fetch product data
  let product: any = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?slug=${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      product = Array.isArray(data) ? data[0] : data;
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl mb-4">🛒</h2>
        <h1 className="text-2xl font-bold mb-4">পণ্য পাওয়া যায়নি</h1>
        <Link href="/" className="btn btn-solid bg-bazar-green hover:bg-[#096931] text-white rounded-md px-6 py-2">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Calculate stats
  let overallMin = Infinity;
  let overallMax = -Infinity;
  let sumAvg = 0;

  const markets = product.markets || [];
  markets.forEach((m: any) => {
    if (m.min < overallMin) overallMin = m.min;
    if (m.max > overallMax) overallMax = m.max;
    sumAvg += (m.min + m.max) / 2;
  });

  const overallAvg = markets.length > 0 ? sumAvg / markets.length : 0;
  
  const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    "500g": "৫০০ গ্রাম"
  };
  const displayUnit = unitMap[product.unit] || `প্রতি ${product.unit}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex gap-2">
        <Link href="/" className="hover:text-bazar-green">হোম</Link>
        <span>&gt;</span>
        <Link href={`/category/${product.category}`} className="hover:text-bazar-green">{product.categoryNameBn}</Link>
        <span>&gt;</span>
        <span className="text-gray-800">{product.nameBn}</span>
      </div>

      {/* Top Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl bg-gray-50 p-4 rounded-lg">{product.image}</div>
          <div>
            <h1 className="text-2xl font-bold mb-1">{product.nameBn}</h1>
            <p className="text-gray-500 text-sm mb-2">বাজারভিত্তিক সর্বনিম্ন-সর্বোচ্চ দাম একসাথে - {displayUnit}</p>
            <div className="flex gap-2">
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{product.categoryNameBn}</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{displayUnit}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center md:text-right p-4 bg-gray-50 rounded-lg min-w-[150px]">
          <p className="text-sm text-gray-500 mb-1">আজকের গড় দাম</p>
          <p className="text-3xl font-bold text-bazar-green mb-1">{toBengaliNumber(Math.round(overallAvg))} <span className="text-sm font-normal text-gray-600">টাকা</span></p>
          <div className={`text-sm font-medium ${product.change.dir === 'up' ? 'text-bazar-green' : product.change.dir === 'down' ? 'text-bazar-red' : 'text-gray-500'}`}>
            {product.change.dir === 'up' ? '▲' : product.change.dir === 'down' ? '▼' : '—'} {toBengaliNumber(product.change.pct)}%
          </div>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col">
            <span className="text-sm text-gray-500">সর্বনিম্ন দাম</span>
            <span className="text-xl font-bold text-bazar-green mt-1">{toBengaliNumber(overallMin)} টাকা</span>
            <span className="text-xs text-gray-400 mt-1">সব বাজারের মধ্যে সর্বনিম্ন</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col">
            <span className="text-sm text-gray-500">সর্বোচ্চ দাম</span>
            <span className="text-xl font-bold text-bazar-red mt-1">{toBengaliNumber(overallMax)} টাকা</span>
            <span className="text-xs text-gray-400 mt-1">সব বাজারের মধ্যে সর্বোচ্চ</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col">
            <span className="text-sm text-gray-500">গড় দাম</span>
            <span className="text-xl font-bold text-gray-800 mt-1">{toBengaliNumber(Math.round(overallAvg))} টাকা</span>
            <span className="text-xs text-gray-400 mt-1">প্রতি {product.unit}-এর গড় দাম</span>
          </div>
        </div>
      </div>

      {/* Market Table */}
      <div>
        <h2 className="text-lg font-bold mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="font-medium text-left">বাজার</th>
                <th className="font-medium text-left">বিভাগ</th>
                <th className="font-medium text-right">সর্বনিম্ন</th>
                <th className="font-medium text-right">সর্বোচ্চ</th>
                <th className="font-medium text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m: any, i: number) => {
                const avg = Math.round((m.min + m.max) / 2);
                return (
                  <tr key={i} className="hover:bg-gray-50 border-t border-gray-100">
                    <td className="font-medium text-gray-800">{m.market}</td>
                    <td className="text-gray-500">{m.division}</td>
                    <td className="text-right text-gray-600">{toBengaliNumber(m.min)} টাকা</td>
                    <td className="text-right text-gray-600">{toBengaliNumber(m.max)} টাকা</td>
                    <td className="text-right font-medium">{toBengaliNumber(avg)} টাকা</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
