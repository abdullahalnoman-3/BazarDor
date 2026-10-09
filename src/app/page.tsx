import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// export const instant = false;

export default async function Home() {
  // Fetch data from API
  let products = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  // Filter top risers (Section A)
  const topRisers = [...products]
    .filter(p => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Filter top fallers (Section B)
  const topFallers = [...products]
    .filter(p => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-10">
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold text-bazar-green bg-green-100 inline-block px-3 py-1 rounded-full mb-4">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <Link href="#সব-পণ্য" className="btn btn-solid bg-bazar-green hover:bg-[#096931] text-white rounded-md px-8">
            সব পণ্য দেখুন
          </Link>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="Bazar Dor Hero"
            width={400}
            height={300}
            className="w-full max-w-sm"
          />
        </div>
      </section>
      
      {/* Section A — “আজ দাম বেড়েছে ▲” */}
      {topRisers.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-bazar-red text-xl">▲</span>
            <h2 className="text-xl font-bold">আজ দাম বেড়েছে</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {topRisers.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Section B — “আজ দাম কমেছে ▼” */}
      {topFallers.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-bazar-green text-xl">▼</span>
            <h2 className="text-xl font-bold">আজ দাম কমেছে</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {topFallers.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Section C — “সব পণ্য” */}
      <div id="সব-পণ্য" className="mt-16">
        <h2 className="text-xl font-bold mb-2">সব পণ্য</h2>
        <p className="text-gray-500 mb-6 text-sm">ভাই এখানে সব দাম দেওয়া আছে</p>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-8 text-center border rounded-lg bg-gray-50">কোনো পণ্য পাওয়া যায়নি</p>
        )}
      </div>
    </div>
  );
}
