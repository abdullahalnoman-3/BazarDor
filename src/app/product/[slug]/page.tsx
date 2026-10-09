import Link from "next/link";
import { toBengaliNumber } from "@/components/ProductCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex gap-2 items-center">
        <Link href="/" className="hover:text-gray-900 transition-colors">হোম</Link>
        <span className="text-gray-400 text-xs">❯</span>
        <Link href={`/category/${product.category}`} className="hover:text-gray-900 transition-colors">{product.categoryNameBn}</Link>
        <span className="text-gray-400 text-xs">❯</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </div>

      {/* Top Summary / Hero Card */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 md:p-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="text-5xl bg-gray-50 w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100/50">
            {product.image}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.nameBn}</h1>
            <p className="text-gray-500 text-sm mb-3">{displayUnit} - {product.categoryNameBn}</p>
            <p className="text-sm text-gray-600">
              গতকালের তুলনায় আজ দাম <span className="font-bold text-gray-800">{product.change.dir === 'up' ? 'বেড়েছে' : product.change.dir === 'down' ? 'কমেছে' : 'অপরিবর্তিত'}</span>
            </p>
          </div>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-2xl min-w-[140px] flex flex-col items-center justify-center shrink-0 border border-gray-100/50">
          <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
          <p className="text-4xl font-bold text-gray-900 leading-tight">{toBengaliNumber(Math.round(overallAvg))}</p>
          <p className="text-xs text-gray-500 mb-3 mt-1">টাকা / {unitMap[product.unit]?.replace('প্রতি ', '') || 'কেজি'}</p>
          <div className={`text-sm font-bold flex items-center gap-1 ${product.change.dir === 'up' ? 'text-red-500' : product.change.dir === 'down' ? 'text-bazar-green' : 'text-gray-500'}`}>
            {product.change.dir === 'up' ? '▲' : product.change.dir === 'down' ? '▼' : '—'} {toBengaliNumber(product.change.pct)}%
          </div>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-5">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm">
            <span className="text-xs text-gray-500 mb-2">সর্বনিম্ন দাম</span>
            <span className="text-2xl font-bold text-bazar-green mb-1">{toBengaliNumber(overallMin)} <span className="text-base font-normal">টাকা</span></span>
            <span className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm">
            <span className="text-xs text-gray-500 mb-2">সর্বাধিক দাম</span>
            <span className="text-2xl font-bold text-red-500 mb-1">{toBengaliNumber(overallMax)} <span className="text-base font-normal">টাকা</span></span>
            <span className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm">
            <span className="text-xs text-gray-500 mb-2">গড় দাম</span>
            <span className="text-2xl font-bold text-bazar-green mb-1">{toBengaliNumber(Math.round(overallAvg))} <span className="text-base font-normal">টাকা</span></span>
            <span className="text-xs text-gray-400">প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit}-এর হিসাবে</span>
          </div>
        </div>
      </div>

      {/* Market Table */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-5">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <tr>
                <th className="font-medium py-4 px-6">বাজার</th>
                <th className="font-medium py-4 px-6">বিভাগ</th>
                <th className="font-medium text-center py-4 px-6">সর্বনিম্ন</th>
                <th className="font-medium text-center py-4 px-6">সর্বাধিক</th>
                <th className="font-medium text-right py-4 px-6">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m: any, i: number) => {
                const avgValue = (m.min + m.max) / 2;
                const minFormatted = m.min % 1 !== 0 ? m.min.toFixed(2) : m.min;
                const maxFormatted = m.max % 1 !== 0 ? m.max.toFixed(2) : m.max;
                const avgFormatted = avgValue % 1 !== 0 ? avgValue.toFixed(2) : avgValue;
                
                return (
                  <tr key={i} className="text-sm border-b border-gray-300 last:border-none hover:bg-gray-50 transition-colors">
                    <td className="font-medium text-gray-800 py-4 px-6">{m.market}</td>
                    <td className="text-gray-500 py-4 px-6">{m.division}</td>
                    <td className="text-center text-gray-800 py-4 px-6">{toBengaliNumber(minFormatted)} টাকা</td>
                    <td className="text-center text-gray-800 py-4 px-6">{toBengaliNumber(maxFormatted)} টাকা</td>
                    <td className="text-right font-bold text-gray-900 py-4 px-6">{toBengaliNumber(avgFormatted)} টাকা</td>
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
