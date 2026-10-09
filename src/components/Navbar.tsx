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
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-bazar-green rounded-xl flex items-center justify-center p-1.5 sm:p-2 shrink-0">
              <img src="/logo-icon.png" alt="Bazar Dor Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">বাজার দর</span>
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</span>
            </div>
          </Link>
          
          <div className="flex gap-4 items-center">
            {session ? (
               <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost rounded-full border border-gray-200 px-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 overflow-hidden shrink-0">
                      {session.user.image ? (
                         <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                      ) : (
                         <span className="text-sm font-bold">{session.user.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{session.user.name}</span>
                  </div>
                  <div tabIndex={0} className="mt-3 z-[100] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dropdown-content bg-white rounded-2xl w-64 border border-gray-100">
                    <div className="mb-3 px-2">
                      <p className="font-bold text-gray-900">{session.user.name}</p>
                      <p className="text-sm text-gray-500">{session.user.email}</p>
                    </div>
                    <ul className="flex flex-col">
                      <li>
                        <Link href="/profile" className="flex items-center gap-3 py-2.5 px-2 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors">
                          <span className="text-lg text-blue-500">👤</span>
                          <span className="font-medium text-[15px]">আমার প্রোফাইল</span>
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleSignOut} className="flex items-center gap-3 py-2.5 px-2 hover:bg-gray-50 rounded-lg text-[#e53e3e] transition-colors w-full text-left">
                          <span className="text-lg">↩</span>
                          <span className="font-medium text-[15px]">সাইন আউট</span>
                        </button>
                      </li>
                    </ul>
                  </div>
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
