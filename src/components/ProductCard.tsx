import Link from "next/link";

interface ProductCardProps {
  product: {
    slug: string;
    image: string;
    nameBn: string;
    unit: string;
    today: number;
    change: {
      dir: string;
      pct: number;
    };
  };
}


export const toBengaliNumber = (num: number | string) => {
  const englishToBengali: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    '.': '.', ',': ','
  };
  return num.toString().replace(/[0-9.,]/g, (match) => englishToBengali[match] || match);
};

export default function ProductCard({ product }: ProductCardProps) {

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  
  let changeColor = "text-gray-500";
  let changeArrow = "—";
  
  if (isUp) {
    changeColor = "text-bazar-red";
    changeArrow = "▲";
    changeColor = "text-bazar-green"; 
  } else if (isDown) {
    changeColor = "text-bazar-red";
    changeArrow = "▼";
  }

 
  const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    "500g": "৫০০ গ্রাম"
  };
  
  const displayUnit = unitMap[product.unit] || `প্রতি ${product.unit}`;

  return (
    <Link href={`/product/${product.slug}`} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl bg-gray-50 p-2 rounded-lg">{product.image}</div>
        <div>
          <h3 className="font-bold text-gray-800">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">{displayUnit}</p>
        </div>
      </div>
      
      <div className="mt-auto border-t border-gray-100 pt-3 flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
          <p className="font-bold text-lg">{toBengaliNumber(product.today)} টাকা</p>
        </div>
        <div className={`text-sm font-semibold flex items-center gap-1 ${changeColor}`}>
          <span>{changeArrow}</span>
          <span>{toBengaliNumber(product.change.pct)}%</span>
        </div>
      </div>
    </Link>
  );
}
