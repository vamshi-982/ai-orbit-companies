import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070707] text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-3">AI ORBIT</p>

        <h1 className="text-4xl font-semibold mb-4">
          AI Companies
        </h1>

        <p className="text-gray-400 mb-8">
          Discover companies shaping the AI ecosystem.
        </p>

        <Link
          href="/companies"
          className="inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-medium hover:bg-white hover:text-black transition"
        >
          Explore AI Companies →
        </Link>
      </div>
    </main>
  );
}