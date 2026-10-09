"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Navbar */}
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-bazar-green">🛒 বাজার দর</span>
            <span className="text-sm text-gray-500 hidden sm:inline-block">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</span>
          </Link>
          
          <div className="flex gap-4 items-center">
            {session ? (
               <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-gray-200">
                    <div className="w-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-600">
                      {session.user.image ? (
                         <img src={session.user.image} alt="User" />
                      ) : (
                         <span className="text-lg font-bold">{session.user.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-100">
                    <li><Link href="/profile">প্রোফাইল আপডেট</Link></li>
                    <li><button onClick={handleSignOut} className="text-red-500">লগআউট</button></li>
                  </ul>
               </div>
            ) : (
               <>
                 <Link href="/signin" className="btn btn-outline btn-sm text-bazar-green border-bazar-green hover:bg-bazar-green hover:text-white">
                   সাইন ইন
                 </Link>
                 <Link href="/signup" className="btn btn-solid bg-bazar-green text-white hover:bg-[#096931] btn-sm">
                   সাইন আপ
                 </Link>
               </>
            )}
          </div>
        </div>
        
        {/* Category Links */}
        <div className="flex gap-6 overflow-x-auto py-2 text-sm text-gray-600 border-t border-gray-100 whitespace-nowrap hide-scrollbar">
          <Link href="/category/chal" className="hover:text-bazar-green font-medium">চাল</Link>
          <Link href="/category/dal" className="hover:text-bazar-green font-medium">ডাল</Link>
          <Link href="/category/tel" className="hover:text-bazar-green font-medium">তেল</Link>
          <Link href="/category/sobji" className="hover:text-bazar-green font-medium">সবজি</Link>
          <Link href="/category/mach" className="hover:text-bazar-green font-medium">মাছ</Link>
          <Link href="/category/mangsho" className="hover:text-bazar-green font-medium">মাংস</Link>
          <Link href="/category/dim-dudh" className="hover:text-bazar-green font-medium">ডিম-দুধ</Link>
          <Link href="/category/moshla" className="hover:text-bazar-green font-medium">মসলা</Link>
        </div>
      </div>
      
      {/* Price Ticker (Marquee) */}
      <div className="bg-bazar-green text-white text-xs py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          <span className="mx-4">🍚 স্বর্ণমাছি চাল ১৪৮ টাকা/কেজি ▲ ২.১%</span>
          <span className="mx-4">🧅 পেঁয়াজ ৮৮ টাকা/কেজি ▼ ৩.০%</span>
          <span className="mx-4">🥚 ডিম ১৪৮ টাকা/ডজন — ০.০%</span>
          <span className="mx-4">🐟 ইলিশ মাছ ১,৮৫০ টাকা/কেজি ▲ ৪.৫%</span>
          <span className="mx-4">🍚 স্বর্ণমাছি চাল ১৪৮ টাকা/কেজি ▲ ২.১%</span>
          <span className="mx-4">🧅 পেঁয়াজ ৮৮ টাকা/কেজি ▼ ৩.০%</span>
          <span className="mx-4">🥚 ডিম ১৪৮ টাকা/ডজন — ০.০%</span>
          <span className="mx-4">🐟 ইলিশ মাছ ১,৮৫০ টাকা/কেজি ▲ ৪.৫%</span>
        </div>
      </div>
    </header>
  );
}
