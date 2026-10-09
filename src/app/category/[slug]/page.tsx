import CategoryClient from "@/components/CategoryClient";

// export const instant = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let products = [];
  let categoryInfo = null;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`, { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
      
      if (products.length > 0) {
        categoryInfo = {
          nameBn: products[0].categoryNameBn,
          icon: products[0].categoryIcon
        };
      } else {
         const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: 'no-store' });
         if (catRes.ok) {
            const cats = await catRes.json();
            const matchedCat = cats.find((c: any) => c.slug === slug);
            if (matchedCat) {
               categoryInfo = matchedCat;
            }
         }
      }
    }
  } catch (error) {
    console.error("Failed to fetch category data:", error);
  }

  return <CategoryClient products={products} categoryInfo={categoryInfo} />;
}
