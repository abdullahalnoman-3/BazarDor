"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await signUp.email({ 
        email, 
        password, 
        name, 
        fetchOptions: { 
            onResponse: () => { 
                setLoading(false); 
            }, 
            onRequest: () => { 
                setLoading(true); 
            }, 
            onError: (ctx) => { 
                toast.error(ctx.error.message); 
            }, 
            onSuccess: async () => { 
                toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
                router.push("/signin"); 
            }, 
        }, 
    }); 
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
      await signUp.social({
          provider,
          callbackURL: "/"
      });
  };

  return (
    <div className="max-w-md mx-auto my-20 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">নাম</label>
          <input 
            type="text" 
            placeholder="আপনার নাম লিখুন" 
            className="input input-bordered w-full focus:outline-none focus:border-bazar-green"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">ইমেইল</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            className="input input-bordered w-full focus:outline-none focus:border-bazar-green"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">পাসওয়ার্ড</label>
          <input 
            type="password" 
            placeholder="কমপক্ষে ৮ অক্ষর" 
            className="input input-bordered w-full focus:outline-none focus:border-bazar-green"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-solid w-full bg-bazar-green text-white hover:bg-[#096931] mt-6"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="divider text-sm text-gray-400 my-6">অথবা</div>

      <div className="flex gap-4">
        <button onClick={() => handleSocialLogin('google')} className="btn btn-outline flex-1 flex items-center justify-center gap-2">
          <FaGoogle className="text-red-500" /> Google
        </button>
        <button onClick={() => handleSocialLogin('github')} className="btn btn-outline flex-1 flex items-center justify-center gap-2">
          <FaGithub /> GitHub
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        অ্যাকাউন্ট আছে? <Link href="/signin" className="text-bazar-green hover:underline">লগিন করুন</Link>
      </p>
    </div>
  );
}
