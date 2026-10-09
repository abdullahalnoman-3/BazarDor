"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    } else if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.updateUser({
        name,
        image: image || undefined,
        fetchOptions: {
          onSuccess: () => {
            toast.success("প্রোফাইল আপডেট হয়েছে!");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          }
        }
      });
    } catch (error) {
       toast.error("কোথাও কোনো সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return <div className="max-w-md mx-auto py-20 text-center text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">প্রোফাইল আপডেট</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">নাম</label>
          <input 
            type="text" 
            className="input input-bordered w-full focus:outline-none focus:border-bazar-green"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">প্রোফাইল ছবির লিংক (অপশনাল)</label>
          <input 
            type="url" 
            placeholder="https://example.com/image.jpg"
            className="input input-bordered w-full focus:outline-none focus:border-bazar-green"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">ইমেইল (পরিবর্তনযোগ্য নয়)</label>
          <input 
            type="email" 
            className="input input-bordered w-full bg-gray-50 text-gray-500 cursor-not-allowed"
            value={session.user.email}
            disabled
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-solid w-full bg-bazar-green text-white hover:bg-[#096931] mt-4"
        >
          {loading ? "অপেক্ষা করুন..." : "আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}
