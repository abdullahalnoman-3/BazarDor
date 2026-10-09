"use client";

import { useState, useEffect } from "react";
import { useSession, authClient, signOut } from "@/lib/auth-client";
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

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে লগআউট হয়েছেন");
          router.push("/");
        }
      }
    });
  };

  if (isPending || !session) {
    return <div className="max-w-md mx-auto py-20 text-center text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-12 px-4">
      {/* Header & Summary Card */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">আমার প্রোফাইল</h1>
        <p className="text-gray-500 text-sm mb-6">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4 text-left w-full sm:w-auto">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              {session.user.image ? (
                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-gray-500">{session.user.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{session.user.name}</h2>
              <p className="text-gray-500 text-sm">{session.user.email}</p>
            </div>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="w-full sm:w-auto px-5 py-2.5 flex items-center justify-center gap-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            সাইন আউট
          </button>
        </div>
      </div>

      {/* Update Profile Form */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">প্রোফাইল আপডেট</h2>

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
    </div>
  );
}
